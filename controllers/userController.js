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
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  }
};

/**
 * Get all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(httpStatus.OK).json(users);
    } else {
      res.status(httpStatus.NO_CONTENT).json({});
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
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
      res.status(httpStatus.CONFLICT).send({ error: "User Already Exist." });
    } else {
      const encryptedPassword = bcryptjs.hashSync(password, 10);
      const newUser = new User({ ...userData, email: email.toLowerCase(), password: encryptedPassword }); // Create a new user instance with encrypted password
      await newUser.save()
        .then(user => {
          res.header({
            'location': `api/user/?id=${user.id}`
          });
          res.status(httpStatus.CREATED).json(user);
        })
        .catch(err => {
          res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error saving the user' });
        })
    }
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
  }
}

/**
 * Update a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updateUserById = async (req, res) => {
  if (req.params && req.params.id) { // Check if request parameters and user ID are present
    await User.findById(req.params.id) // Find the user by the provided ID
      .then(user => {
        Object.assign(user, req.body); // Update the user object with the data from the request body
        user.save(); // Save the updated user object to the database
        res.status(httpStatus.OK).json(user);
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error updating the user' });
      })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' })
  }
}

/**
 * Delete a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deleteUserById = async (req, res) => {
  if (req.params && req.params.id) { // Check if request parameters and user ID are present
    await User.findById(req.params.id)
      .then(user => {
        user.deleteOne(); // Delete the user from the database
        res.status(httpStatus.OK).json({ message: 'User deleted successfully' });
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error deleting the user' });
      })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' })
  }
}

module.exports = { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById };