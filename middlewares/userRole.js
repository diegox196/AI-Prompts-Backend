const { verifyToken } = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

/**
 * Middleware to check if the user has the required role for accessing certain routes.
 * @param {array} role - Required role(s) for accessing the route.
 * @returns {function} - Async function to check user's role and authorize access.
 */
const checkUserRoleAuth = (role) => {
  return async (req, res, next) => {
    try {
      const authToken = req.headers['authorization'].split(' ')[1]; // Get the authorization token from the request headers
      const tokenData = await verifyToken(authToken);
      if (role.includes(tokenData.role)) {
        next(); // If the user's role matches any of the required roles, continue to the next middleware or route
      } else { // Return a 401 (Unauthorized) error if the user does not have the required role
        res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
      }
    } catch (e) {// Return a 401 (Unauthorized) error if there's an error during token verification
      console.log(e);
      res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
    }
  }
}
module.exports = checkUserRoleAuth;  