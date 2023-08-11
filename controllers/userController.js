const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

/**
 * Get a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch user by the provided ID from the request parameters
    if (user) {
      res.status(httpStatus.OK).json(user);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: err.message });
  }
};

/**
 * Get all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllUsers = async (req, res) => {
  try {
    // Excluding "password" and "two_factor_code" fields from the query result using Mongoose projection
    const users = await User.find({ role: 'user' }, { password: 0, two_factor_code: 0 });
    if (users) {
      res.status(httpStatus.OK).json(users);
    } else {
      res.status(httpStatus.NO_CONTENT).json({});
    }
  } catch (err) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: err.message });
  }
};

/**
 * Add a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addNewUser = async (req, res) => {
  try {
    const { email, password, ...userData } = req.body; // Extract email and password from the request body, and the rest as user data
    const exist = await User.findOne({ email: email.toLowerCase() }); // Check if a user with the provided email already exists

    if (exist) {
      return res.status(httpStatus.CONFLICT).send({ error: "User Already Exist." });
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ...userData, email: email.toLowerCase(), password: encryptedPassword }); // Create a new user instance with encrypted password

    await newUser.save();
    res.header({
      'location': `api/user/?id=${newUser.id}`
    });
    res.status(httpStatus.CREATED).json(newUser);

  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error saving the user' });
  }
}

/**
 * Update a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateUserById = async (req, res) => {
  try {
    if (!req.params || !req.params.id) { // Check if request parameters and user ID are present
      res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' })
    };

    const user = await User.findById(req.params.id); // Find the user by the provided ID
    if (!user) {
      res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    };

    Object.assign(user, req.body); // Update the user object with the data from the request body

    // Exclude "password" and "two_factor_code" fields from the response
    const responseData = user.toObject();
    delete responseData.password;
    delete responseData.two_factor_code;

    await user.save(); // Save the updated user object to the database
    res.status(httpStatus.OK).json(responseData);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error updating the user' });
  }
};

/**
 * Change the user password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateUserPasswordById = async (req, res) => {
  try {
    if (!req.params && !req.params.id) { // Check if request parameters and user ID are present
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    };

    const user = await User.findById(req.params.id); // Find the user by the provided ID
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    };

    const { current_password, new_password, confirm_password } = req.body;
    const passwordMatch = bcryptjs.compareSync(current_password, user.password);
    if (!passwordMatch) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Current password entered does not match' });
    };

    if (new_password !== confirm_password) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'Confirmed password does not match new password' });
    };

    if (current_password === new_password) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'The new password must be different from the current password' });
    };

    const encryptedPassword = bcryptjs.hashSync(new_password, 10);
    Object.assign(user, { password: encryptedPassword }); // Update the user password
    user.save(); // Save the updated user object to the database
    res.status(httpStatus.OK).json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error(err.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error updating the password' });
  };
};

/**
 * Delete a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteUserById = async (req, res) => {
  try {
    if (!req.params && !req.params.id) { // Check if request parameters and user ID are present
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
    };

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }

    await user.deleteOne(); // Delete the user from the database
    res.status(httpStatus.OK).json({ message: 'User deleted successfully' });

  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error deleting the user' });
  }
}

module.exports = { getUserById, getAllUsers, addNewUser, updateUserById, updateUserPasswordById, deleteUserById };