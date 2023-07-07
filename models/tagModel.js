const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  userId: { type: mongoose.ObjectId },
  tags: [{
    id: { type: String, default: mongoose.ObjectId },
    name: { type: String }
  }]
});

module.exports = mongoose.model('Tag', tagSchema);