const jwt = require('jsonwebtoken');

/**
 * Function to create a JWT token for a user.
 * @param {Object} bodyToken - User object containing user details.
 * @param {Object} time - Token expires time.
 * @returns {string} - JWT token containing user data.
 */
const tokenSing = async (bodyToken, time) => {
  //Data to add in the token
  return jwt.sign(
    bodyToken,
    process.env.JWT_SECRET,
    { expiresIn: time }
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
    console.error(e);
    return null; // Return null if the token is invalid or expired
  }
}

module.exports = { tokenSing, verifyToken };