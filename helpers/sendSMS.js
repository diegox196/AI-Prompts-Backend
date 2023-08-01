require('dotenv').config();

const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const generateCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sendMessage = async (phone) => {
  const code = generateCode();

  await client.messages
    .create({
      body: `\n Your AI Prompt verification code is: ${code}`,
      from: '+14706135145',
      to: `+506${phone}`
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));

  return code.toString();
}

module.exports = { sendMessage };
