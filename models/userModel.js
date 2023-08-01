const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String },
  phone_number: { type: String },
  two_factor_code: { type: String, default: '001122' },
  two_factor_enabled: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);