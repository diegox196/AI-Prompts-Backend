const Prompt = require('../models/promptModel');
const User = require('../models/userModel');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (prompt) {
      res.status(httpStatus.OK).json(prompt);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' });
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: err.message });
  }
};

const getPromptByUserId = async (req, res) => {
  try {
    const prompt = await Prompt.find({ user_id: req.params.id });
    if (prompt) {
      res.status(httpStatus.OK).json(prompt);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User prompts not found' });
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: err.message });
  }
};

const getAllPrompts = async (req, res) => {
  try {
    const prompt = await Prompt.find();
    if (prompt) {
      res.status(httpStatus.OK).json(prompt);
    } else {
      res.status(httpStatus.NO_CONTENT).json({});
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: err.message });
  }
};

const addNewPrompt = async (req, res) => {
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
    res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error saving the prompt' });
  }
}

const updatePromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    if (prompt) {
      Object.assign(prompt, req.body);
      prompt.save();
      res.status(httpStatus.OK).json(prompt);
    } else {
      res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: 'There was an error updating the prompt' });
    }
  } catch (err) {
    res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' })
  }
}

const deletePromptById = async (req, res) => {
  if (req.params && req.params.id) {
    await Prompt.findById(req.params.id)
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

module.exports = { getPromptById, getPromptByUserId, getAllPrompts, addNewPrompt, updatePromptById, deletePromptById };