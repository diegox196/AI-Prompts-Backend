const User = require('../models/userModel'); // Import the User model from userModel.js
const { sendMessage } = require('../helpers/sendSMS'); // Import the token management module for token-related functions

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const sendCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !user.phone_number) {
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'Unregistered phone number for this user' });
    }
    user.two_factor_code = await sendMessage(user.phone_number);
    await user.save();
    res.status(httpStatus.OK).json({ message: '2FA code sent by SMS' });

  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email: email });

    if (!/^\d{6}$/.test(code)) { // Regular expression to check if code contains only digits (numbers) and exactly 6 digits
      return res.status(httpStatus.BAD_REQUEST).json({ message: 'The 2FA code must be a 6-digit number' });
    }

    if (user.two_factor_code === code) {
      res.status(httpStatus.OK).json({ message: 'Valid 2FA code' });
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({ message: 'Invalid 2FA code' });
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  }
};

module.exports = { sendCode, verifyCode };