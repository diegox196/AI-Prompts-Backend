const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const token = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const handleExistingSession = async (session, user) => {

  const sessionDate = new Date(session.expire).getTime();  // Get the session date in milliseconds

  if (sessionDate < Date.now()) { //If the session has expired, generate a new token
    const tokenSession = await token.tokenSing(user);
    session.token = tokenSession;
    session.expire = new Date(Date.now() + 86400000);  // 1 day expiration in milliseconds
    console.log(session);
    await session.save();
  } else { //If the session is valid, resend the existing token
    return session.token;
  }
};

// Generates a new token and saves the data in a new session. 
const createSession = async (user) => {
  const tokenSession = await token.tokenSing(user);
  const session = new Session({
    user: user.email,
    token: tokenSession,
    expire: new Date(Date.now() + 86400000) // 1 day expiration in milliseconds
  });
  await session.save();
  return tokenSession
};

// Unstructure data, showing only some user attributes
const userInfoJSON = (user) => {
  const { active, _id, first_name, last_name, role } = user;

  return {
    active: active,
    user_id: _id,
    name: `${first_name} ${last_name}`,
    role: role
  }
};

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

    let tokenSession;
    const session = await Session.findOne({ user: email.toLowerCase() });

    if (session) {
      tokenSession = await handleExistingSession(session, user);
    } else { // Create a new token
      tokenSession = await createSession(user);
    }

    const newUser = userInfoJSON(user);
    res.status(httpStatus.OK).json({ user: newUser, tokenSession });

  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
  }
}

module.exports = { sessionAuth }