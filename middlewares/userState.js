const { verifyToken } = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const checkUserRoleAuth = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'].split(' ')[1];
    console.log(authToken);
    const tokenData = await verifyToken(authToken);
    console.log(tokenData);
    if (tokenData.active) {
      console.log(tokenData.active);
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
    }
  } catch (e) {
    res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
  }
}

module.exports = checkUserRoleAuth;  