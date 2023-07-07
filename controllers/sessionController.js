const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const token = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const sessionAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
      return;
    }

    const tokenSession = await token.tokenSing(user);

    const session = new Session({
      user: user.email,
      token: tokenSession,
      expire: new Date(Date.now() + 86400000) // 1 day expiration in milliseconds
    });

    await session.save()
      .then(() => {
        res.status(httpStatus.OK).json({ user, tokenSession });
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error saving the session' });
      })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
  }
}

module.exports = { sessionAuth }