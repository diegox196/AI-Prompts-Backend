const mongoose = require('mongoose');

//Main Schema
const promptSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  user: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  tags: [{
    type: mongoose.ObjectId,
    ref: 'Tag'
  }],
  model: {type: String},
  input: { type: String },
  instruction: { type: String },
  temperature: { type: Number },
  response: {type: String}
});


module.exports = mongoose.model('Prompt', promptSchema);