const Prompt = require('../models/promptModel');

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
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  }
};

const getPromptsByUserId = async (req, res) => {
  try {
    const prompt = await Prompt.find({ user_id: req.params.id });
    if (prompt) {
      res.status(httpStatus.OK).json(prompt);
    } else {
      res.status(httpStatus.NOT_FOUND).json({ error: 'User prompts not found' });
    }
  } catch (err) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
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
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: err.message });
  }
};

const getPromptsTagsByUserId = async (req, res) => {
  try {
    /* Use the 'distinct' method to find all unique values of the 'tags' field
    in the collection 'Prompt' where the 'user_id' matches the value provided
    in the request parameter 'id' (req.params.id). */
    const tags = await Prompt.find({ user_id: req.params.id }).distinct('tags');

    res.status(httpStatus.OK).json(tags);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addNewPrompt = async (req, res) => {
  try {
    const newPrompt = new Prompt(req.body);
    const prompt = await newPrompt.save();
    res.header({
      'location': `api/prompt/?id=${prompt.id}`
    });
    res.status(httpStatus.CREATED).json(newPrompt);

  } catch (error) {
    res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error saving the prompt' });
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
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error updating the prompt' });
    }
  } catch (err) {
    res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' })
  }
}

const deletePromptById = async (req, res) => {
  if (req.params && req.params.id) {
    try {
      const prompt = await Prompt.findById(req.params.id);
      if (!prompt) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' });
      }
      await prompt.deleteOne();
      res.status(httpStatus.OK).json({ message: 'Prompt deleted successfully' });
    } catch (error) {
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ error: 'There was an error deleting the prompt' });
    }
  } else {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request' })
  }
}

module.exports = { getPromptById, getPromptsByUserId, getAllPrompts, getPromptsTagsByUserId, addNewPrompt, updatePromptById, deletePromptById };