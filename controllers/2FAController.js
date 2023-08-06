const User = require('../models/userModel'); // Import the User model from userModel.js
const { sendMessage } = require('../helpers/sendSMS'); // Import the token management module for token-related functions

//Http Status Code
const httpStatus = require('../utils/httpStatus');

/**
 * Send a verification code via SMS to the user's phone number.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const user = await User.findOne({ email: email });
    if (!user || !user.phone_number) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Unregistered phone number for this user' });
    };

    user.two_factor_code = await sendMessage(user.phone_number);
    await user.save();
    res.status(httpStatus.OK).json({ message: '2FA code sent by SMS' });
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  };
};

/**
 * Verify that the code matches the one sent to the user via SMS.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'User not found' });
    };

    if (!/^\d{6}$/.test(code)) { // Regular expression to check if code contains only digits (numbers) and exactly 6 digits
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'The 2FA code must be a 6-digit number' });
    };

    if (user.two_factor_code !== code) {
      return res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid 2FA code' });
    };

    res.status(httpStatus.OK).json({ message: 'Valid 2FA code' });
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  };
};

module.exports = { sendCode, verifyCode };