require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.AUTH_TOKEN);

const generateCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const sendMessage = async (phone) => {
  try {
    const code = generateCode();

    const message = await client.messages.create({
      body: `\n Your AI Prompt verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+506${phone}`
    })
    console.log(message.sid);
  } catch (err) {
    console.error('Error sending message:', err);
  }

  return code.toString();
}

module.exports = { sendMessage };
