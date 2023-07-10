const jwt = require('jsonwebtoken');

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

const verifyToken = async (token) => {
  try{
    return jwt.verify(token, process.env.JWT_SECRET);
  }catch (e){
    console.log(e);
    return null;
  }
}

module.exports = {tokenSing, verifyToken};