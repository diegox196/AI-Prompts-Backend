const User = require('../models/userModel');
const bcryptjs = require('bcryptjs'); 

const userGet = async (req, res) => {
  //if an especific user ir required 
  if (req.query && req.query.id) {
    await User.findById(req.query.id)
      .then(user => {
        res.status(200); //Ok
        res.json(user);
      })
      .catch((err) => {
        res.status(404); //Not found
        res.json({ error: 'User not found' });
      });
  } else {
    await User.find()
      .then(users => {
        res.status(200); //Ok
        res.json(users);
      })
      .catch(err => {
        res.status(442); //Unprocessable Content
        res.json({ error: err });
      })
  }
}

const userPost = async (req, res) => {
  const { email, password, ...userData } = req.body;
  const exist = await User.findOne({ email: email.toLowerCase() });

  if (exist) {
    res.status(409); // Conflict
    res.send({ error: "User Already Exist." });
  } else {
    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ ...userData, email: email.toLowerCase(), password: encryptedPassword });
    await newUser.save()
      .then(user => {
        res.header({
          'location': `api/user/?id=${user.id}`
        });
        res.status(201); //Created
        res.json(user);
      })
      .catch(err => {
        res.status(442); //Unprocessable Content
        res.json({ error: 'There was an error saving the user' });
      })
  }
}

const userPatch = async (req, res) => {
  if (req.query && req.query.id) {
    await User.findById(req.query.id)
      .then(user => {
        newData = req.body
        Object.assign(user, newData);
        user.save();
        res.status(200); //Ok
        res.json(user);
      })
      .catch(err => {
        res.status(442); //Unprocessable Content
        res.json({ error: 'There was an error updating the user' });
      })
  } else {
    res.status(404); //Not found
    res.json({ error: 'User not found' })
  }
}

const userDelete = async (req, res) => {
  if (req.query && req.query.id) {
    await User.findById(req.query.id)
      .then(user => {
        user.deleteOne();
        res.status(200); //Ok
        res.json({ message: 'User deleted successfully' });
      })
      .catch(err => {
        res.status(442); //Unprocessable Content
        res.json({ error: 'There was an error deleting the user' });
      })
  } else {
    res.status(404); //Not found
    res.json({ error: 'User not found' })
  }
}

module.exports = { userGet, userPost, userPatch, userDelete };