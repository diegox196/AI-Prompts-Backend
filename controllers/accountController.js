const User = require('../models/userModel');
const token = require('../helpers/tokenManagement'); // Import the token management module for token-related functions
const bcryptjs = require('bcryptjs');

const sendResetPasswordEmail = require('../helpers/email/resetPassword');
const sendVerificationEmail = require('../helpers/email/verification');
const httpStatus = require('../utils/httpStatus');

/**
 * Register a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const registerUser = async (req, res) => {
  try {
    const { email, password, ...userData } = req.body; // Extract email and password from the request body, and the rest as user data
    if (!email || !password || !userData.username || !userData.first_name || !userData.last_name || !userData.phone_number) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const user = await User.findOne({ email: email.toLowerCase() }); // Check if a user with the provided email already exists
    if (user) {
      return res.status(httpStatus.CONFLICT).send({ error: 'User Already Exist.' });
    };

    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ...userData, email: email.toLowerCase(), password: encryptedPassword }); // Create a new user instance with encrypted password
    await newUser.save();

    const bodyToken = {
      email: email,
      id: newUser._id,
      active: true,
    };
    const verifyToken = await token.tokenSing(bodyToken, '1h');
    await sendVerificationEmail(newUser.first_name, newUser.email, verifyToken);

    res.status(httpStatus.CREATED).json({ message: "User successfully registered" });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error saving the user' });
  };
};

/**
 * Verify the user's email account using the provided auth token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const verifyEmail = async (req, res) => {
  try {
    const { auth_token } = req.params;
    if (!auth_token) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const tokenData = await token.verifyToken(auth_token);
    if (!tokenData) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'The token provided is invalid.' });
    };

    const user = await User.findById(tokenData.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    };

    if (user.active) {
      return res.status(httpStatus.CONFLICT).json({ error: 'Account already activated' });
    };

    user.active = true;
    await user.save();
    res.status(httpStatus.OK).json({ message: 'Account activated' });

  } catch (error) {
    console.error(error);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error verifying the email' });
  };
};

/**
 * Send a password reset email to the user with the provided email address.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found.' });
    };

    const bodyToken = {
      email: user.email,
      id: user._id
    };

    const resetToken = await token.tokenSing(bodyToken, '1h');
    await sendResetPasswordEmail(user.first_name, user.email, resetToken);

    res.status(httpStatus.OK).json({ message: 'Reset password email sent successfully.' });
  } catch (error) {
    console.log(error.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'An error has occurred in the password reset request.' });
  };
};

/**
 * Verify and reset the user's password using the provided authentication token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const verifyResetPassword = async (req, res) => {
  try {
    const { auth_token } = req.params;
    const { password } = req.body;
    if (!auth_token || !password) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const tokenData = await token.verifyToken(auth_token);
    if (!tokenData) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'The token provided is invalid.' });
    };

    const user = await User.findById(tokenData.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found.' });
    };

    const encryptedPassword = bcryptjs.hashSync(password, 10);
    user.password = encryptedPassword;
    await user.save();

    res.status(httpStatus.OK).json({ message: 'Password has been changed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error changing the password' });
  };
};

module.exports = { registerUser, verifyEmail, forgotPassword, verifyResetPassword };