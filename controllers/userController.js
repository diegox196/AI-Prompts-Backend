const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(httpStatus.OK).json(user);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(httpStatus.OK).json(users);
    } else {
      res.status(httpStatus.NO_CONTENT).json({ });
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: err.message });
  }
};

const addNewUser = async (req, res) => {
  const { email, password, ...userData } = req.body;
  const exist = await User.findOne({ email: email.toLowerCase() });

  if (exist) {
    res.status(httpStatus.CONFLICT).send({ error: "User Already Exist." });
  } else {
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ...userData, email: email.toLowerCase(), password: encryptedPassword });
    await newUser.save()
      .then(user => {
        res.header({
          'location': `api/user/?id=${user.id}`
        });
        res.status(httpStatus.CREATED).json(user);
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error saving the user' });
      })
  }
}

const updateUserById = async (req, res) => {
  if (req.params && req.params.id) {
    await User.findById(req.params.id)
      .then(user => {
        Object.assign(user, req.body);
        user.save();
        res.status(httpStatus.OK).json(user);
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error updating the user' });
      })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' })
  }
}

const deleteUserById = async (req, res) => {
  if (req.params && req.params.id) {
    await User.findById(req.params.id)
      .then(user => {
        user.deleteOne();
        res.status(httpStatus.OK).json({ message: 'User deleted successfully' });
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error deleting the user' });
      })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' })
  }
}

module.exports = { getUserById, getAllUsers, addNewUser, updateUserById, deleteUserById };