const User = require('../models/userModel');
const token = require('../helpers/tokenManagement'); // Import the token management module for token-related functions
const bcryptjs = require('bcryptjs');

const sendResetPasswordEmail = require('../helpers/email/resetPassword');
const sendVerificationEmail = require('../helpers/email/verification');
const httpStatus = require('../utils/httpStatus');

/**
 * Add a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, ...userData } = req.body; // Extract email and password from the request body, and the rest as user data
    const user = await User.findOne({ email: email.toLowerCase() }); // Check if a user with the provided email already exists

    if (user) {
      res.status(httpStatus.CONFLICT).send({ error: "User Already Exist." });
      return;
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ...userData, email: email.toLowerCase(), password: encryptedPassword }); // Create a new user instance with encrypted password
    await newUser.save()
      .then(user => {
        res.status(httpStatus.CREATED).json({message: "User successfully registered"});
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error saving the user' });
      });

    const bodyToken = {
      email: email,
      id: newUser._id,
      active: true,
    };

    const verifyToken = await token.tokenSing(bodyToken, '1h');
    await sendVerificationEmail(newUser.first_name, newUser.email, verifyToken);
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { auth_token } = req.body;
    const tokenData = await token.verifyToken(auth_token);

    const user = await User.findById(tokenData.id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ error: "User not found" });
      return;
    };

    if (user.active) {
      res.status(httpStatus.CONFLICT).json({ error: "Account already activated" });
      return;
    }

    user.active = true;
    await user.save();
    res.status(httpStatus.OK).json({ message: "Account activated" });

  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ error: "Bad request" });
  }
};

const forgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ error: "User not found." });
      return;
    }

    const bodyToken = {
      email: email,
      id: user._id
    };

    const resetToken = await token.tokenSing(bodyToken, '1h');
    await sendResetPasswordEmail(user.first_name, user.email, resetToken);

    res.status(httpStatus.OK).json({ message: "Reset password email sent successfully." });
  } catch (error) {
    console.log(error.message);
    res.status(httpStatus.BAD_REQUEST).json({ error: "Bad request" });
  }
};

const verifyResetPassword = async (req, res) => {
  try {
    const { email, password, auth_token } = req.body;
    const tokenData = await token.verifyToken(auth_token);

    if (tokenData.email !== email) {
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ message: "Invalid Token" });
      return;
    }

    const user = await User.findById(tokenData.id);

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ error: "User not found." });
      return;
    }
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    user.password = encryptedPassword;
    await user.save();

    res.status(httpStatus.OK).json({ message: "Password has been changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.BAD_REQUEST).json({ message: "Bad request" });
  }
};

module.exports = { registerUser, verifyEmail, forgotPasswordEmail, verifyResetPassword };