require('dotenv').config();

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * Generate a random 6-digit verification code.
 * @returns {number} The randomly generated 6-digit code.
 */
const generateCode = () => {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Send a verification code via SMS to the provided phone number.
 * @param {string} phone - The phone number to which the verification code will be sent.
 * @returns {string} The generated verification code as a string.
 */
const sendMessage = async (phone) => {
  const code = generateCode();
  try {
    const message = await client.messages.create({
      body: `\n Your AI Prompt verification code is: ${code}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+506${phone}`
    });
    console.log(message.sid);
  } catch (err) {
    console.error('Error sending message:', err);
  };
  return code.toString();
}

module.exports = { sendMessage };
