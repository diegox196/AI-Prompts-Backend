const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const token = require('../helpers/tokenManagement');

const sessionAuth = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    res.status(404);
    res.json({ error: 'User not found' });
    return;
  }

  
  const passwordMatch = bcryptjs.compareSync(password, user.password);
  if (!passwordMatch) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  
  const tokenSession = await token.tokenSing(user);

  const session = new Session({
    user: user.email,
    token: tokenSession,
    expire: new Date(Date.now() + 86400000) // 1 día de expiración en milisegundos
  });
  await session.save()
    .then(() => {
      res.status(200);
      res.json({ user, tokenSession });
    })
    .catch(err => {
      res.status(442); //Unprocessable Content
      res.json({ error: 'There was an error saving the session' });
    })
}

module.exports = { sessionAuth }