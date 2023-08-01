const bcryptjs = require('bcryptjs'); // Import the bcryptjs library for password hashing and comparison
const Session = require('../models/sessionModel'); // Import the Session model from sessionModel.js
const User = require('../models/userModel'); // Import the User model from userModel.js
const token = require('../helpers/tokenManagement'); // Import the token management module for token-related functions

//Http Status Code
const httpStatus = require('../utils/httpStatus');

/**
 * Handles the existing session, verifies the session token, and generates a new token if necessary.
 * @param {Object} session - The session object retrieved from the database.
 * @param {Object} user - The user object related to the session.
 * @returns {string} - The token associated with the session.
 */
const handleExistingSession = async (session, tokenSession) => {
  session.token = tokenSession;
  session.expire = new Date(Date.now() + 86400000);  // 1 day expiration in milliseconds
  await session.save();
};

/**
 * Generates a new token and creates a new session in the database.
 * @param {Object} user - The user object related to the new session.
 * @returns {string} - The token associated with the new session.
 */
const createSession = async (user, tokenSession) => {
  const session = new Session({
    user: user.email,
    token: tokenSession,
    expire: new Date(Date.now() + 86400000) // 1 day expiration in milliseconds
  });
  await session.save();
};

/**
 * Returns a JSON object with selected user attributes.
 * @param {Object} user - The user object.
 * @returns {Object} - A JSON object with selected user attributes.
 */
const userInfoJSON = (user) => {
  const { active, _id, first_name, last_name, role, two_factor_enabled } = user;

  return {
    active: active,
    user_id: _id,
    name: `${first_name} ${last_name}`,
    role: role,
    two_factor_enabled: two_factor_enabled,
  }
};

/**
 * Handles the session authentication process.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const sessionAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(httpStatus.NOT_FOUND).json({ error: 'Incorrect username or password.' });
      return;
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);
    if (!passwordMatch) {
      res.status(httpStatus.NOT_FOUND).json({ error: 'Incorrect username or password.' });
      return;
    }

    if (!user.active) {
      res.status(httpStatus.UNAUTHORIZED).json({ error: 'User account inactive, please check your email' });
      return;
    }

    const session = await Session.findOne({ user: email.toLowerCase() });

    const bodyToken = {
      id: user._id,
      role: user.role,
    };

    const tokenSession = await token.tokenSing(bodyToken, '1d');

    if (session) {
      await handleExistingSession(session, tokenSession);
    } else { // Create a new token
      await createSession(user, tokenSession);
    }

    const newUser = userInfoJSON(user);
    res.status(httpStatus.OK).json({ user: newUser, tokenSession });

  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' });
  }
}

module.exports = { sessionAuth }