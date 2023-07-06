const { verifyToken } = require('../helpers/tokenManagement');

const checkUserRoleAuth = async (req, res, next) => {
  try {
    const authToken = req.headers['authorization'].split(' ')[1];
    const tokenData = await verifyToken(authToken);
    if (tokenData.id) {
      next();
    } else {
      res.status(401).send({ error: 'Unauthorized' });
    }
  } catch (e) {
    res.status(401).send({ error: 'Unauthorized' });
  }
}

module.exports = checkUserAuth;  