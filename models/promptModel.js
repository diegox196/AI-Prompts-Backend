const mongoose = require('mongoose');

//Main Schema
const promptSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },
  tags: [{ type: String }],
  user_id: {
    type: mongoose.ObjectId,
    ref: 'User'
  },
  body: {type: mongoose.Schema.Types.Mixed },
  response: { type: String }
});


module.exports = mongoose.model('Prompt', promptSchema);