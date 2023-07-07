const { verifyToken } = require('../helpers/tokenManagement');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const checkUserAuth = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'].split(' ')[1];
    const tokenData = await verifyToken(authToken);
    if (tokenData.id) {
      next();
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
    }
  } catch (e) {
    res.status(httpStatus.UNAUTHORIZED).send({ error: 'Unauthorized' });
  }
}

module.exports = checkUserAuth;  