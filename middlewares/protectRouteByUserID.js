const { verifyToken } = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

/**
 * Middleware to check if the user is authorized to access a specific route based on their role and user ID.
 * @returns {function} - Async function to check user's role and authorize access.
 */
const protectRouteByUserID = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'].split(' ')[1]; // Get the authorization token from the request headers
    const tokenData = await verifyToken(authToken);

    if (tokenData.role === "admin" || tokenData.id == req.params.id) {
      next();
    } else { // Return a 401 (Unauthorized) error if the user does not have the required role
      res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
    }
  } catch (e) {// Return a 401 (Unauthorized) error if there's an error during token verification
    console.log(e);
    res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
  }
};
module.exports = protectRouteByUserID;  