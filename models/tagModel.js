const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    require: true
  },
  tags: [{
    name: { type: String }
  }]
});

module.exports = mongoose.model('Tag', tagSchema);