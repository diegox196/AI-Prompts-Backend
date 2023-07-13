const { verifyToken } = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const checkUserRoleAuth = async (req, res, next) => {
  try {
    const tokenData = await verifyToken(authToken);
    if (tokenData.role === 'admin') {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
    }
  } catch (e) {
    res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
  }
}

module.exports = checkUserRoleAuth;  