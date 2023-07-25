const jwt = require('jsonwebtoken');

/**
 * Function to create a JWT token for a user.
 * @param {Object} user - User object containing user details.
 * @returns {string} - JWT token containing user data.
 */
const tokenSing = async (user) => {
  //Data to add in the token
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

/**
 * Function to verify the validity of a JWT token.
 * @param {string} token - JWT token to be verified.
 * @returns {Object|null} - Decoded token data if valid, null if invalid.
 */
const verifyToken = async (token) => {
  try {
    // Verify the token using the secret key and return the decoded token data
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return null; // Return null if the token is invalid or expired
  }
}

module.exports = { tokenSing, verifyToken };