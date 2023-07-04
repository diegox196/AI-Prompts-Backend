const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  input: { type: String },
  instruction: { type: String },
  temperature: { type: Number },
  user: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: mongoose.ObjectId,
    ref: 'Tag'
  }]
});

module.exports = mongoose.model('Prompts', promptSchema);