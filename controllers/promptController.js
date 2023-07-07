const Prompt = require('../models/promptModel');
const User = require('../models/userModel');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const promptGet = async (req, res) => {
  //if an especific user id required 
  if (req.query && req.query.id) {
    await Prompt.findById(req.query.id)
      .then(prompt => {
        res.status(httpStatus.OK).json(prompt);
      })
      .catch((err) => {
        res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' });
      });
  } else {
    await Prompt.find()
      .then(prompt => {
        res.status(httpStatus.OK).json(prompt);
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: err });
      })
  }
}

const promptPost = async (req, res) => {

  try {
    const newPrompt = new Prompt(req.body);
    await newPrompt.save()
      .then(prompt => {
        res.header({
          'location': `api/prompt/?id=${prompt.id}`
        });
        res.status(httpStatus.CREATED).json(newPrompt);
      });
  } catch (error) {
    console.log(error);
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error saving the prompt' });
  }
}

const promptPatch = async (req, res) => {
  if (req.query && req.query.id) {
    await Prompt.findById(req.query.id)
      .then(prompt => {
        Object.assign(prompt, req.body);
        prompt.save();
        res.status(httpStatus.OK).json(prompt);
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error updating the prompt' });
      })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' })
  }
}

const promptDelete = async (req, res) => {
  if (req.query && req.query.id) {
    await Prompt.findById(req.query.id)
      .then(prompt => {
        prompt.deleteOne();
        res.status(httpStatus.OK).json({ message: 'Prompt deleted successfully' });
      })
      .catch(err => {
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error deleting the prompt' });
      })
  } else {
    res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' })
  }
}

module.exports = { promptGet, promptPost, promptPatch, promptDelete };