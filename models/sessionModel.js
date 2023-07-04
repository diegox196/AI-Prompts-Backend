const mongoose = require('mongoose');

const sessioSchema = new mongoose.Schema({
  user: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  token: {type: String},
  expire: {type: Date}
});

module.exports = mongoose.model('Session', sessioSchema);