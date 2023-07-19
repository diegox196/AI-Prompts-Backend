const { verifyToken } = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const checkUserRoleAuth = (role) => {
  return async (req, res, next) => {
    try {
      const authToken = req.headers['authorization'].split(' ')[1];
      const tokenData = await verifyToken(authToken);
      if (role.includes(tokenData.role)) {
        next();
      } else {
        res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
      }
    } catch (e) {
      console.log(e);
      res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
    }
  }
}
module.exports = checkUserRoleAuth;  