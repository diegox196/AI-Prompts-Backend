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
  response: {type: String}
},
{discriminatorKey: 'promptType'}); //To inherit schema properties depending on the type 'edit' or 'image'

//Subschema for type edit
const editPromptSchema = new mongoose.Schema({
  input: { type: String },
  instruction: { type: String },
  temperature: { type: Number }
});

//Subschema for type image
const imagePromptSchema = new mongoose.Schema({
  prompt: { type: String },
  n: { type: Number },
  size: { type: String }
});

// Subschemas are added as discriminators
promptSchema.discriminator('text', editPromptSchema);
promptSchema.discriminator('image', imagePromptSchema);


module.exports = mongoose.model('Prompt', promptSchema);