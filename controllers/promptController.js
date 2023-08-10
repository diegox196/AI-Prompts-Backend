const Prompt = require('../models/promptModel');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

/**
 * Get a prompt by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findById(req.params.id);
    res.status(httpStatus.OK).json(prompt);

  } catch (err) {
    
    if (err.kind === 'ObjectId') {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' });
    };
    console.error(err.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error processing the request to get the prompt' });
  };
};

/**
 * Get prompts by user ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getPromptsByUserId = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request. Missing user ID in the request parameters.' })
    };

    const prompt = await Prompt.find({ user_id: req.params.id });
    res.status(httpStatus.OK).json(prompt);

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User prompts not found' });
    };

    console.error(err.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error processing the request to get the user prompts' });
  };
};

/**
 * Get all prompts.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getAllPrompts = async (req, res) => {
  try {
    const prompt = await Prompt.find();
    if (!prompt) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Prompts not found' });
    };

    res.status(httpStatus.OK).json(prompt);

  } catch (err) {
    console.error(err.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error processing the request to get the prompts' });
  };
};

/**
 * Get unique prompt tags by user ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getPromptsTagsByUserId = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request. Missing user ID in the request parameters.' })
    };
    // Use the 'distinct' method to find all unique values of the 'tags' field
    const tags = await Prompt.find({ user_id: req.params.id }).distinct('tags');
    res.status(httpStatus.OK).json(tags);

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Tags not found' });
    };

    console.error(err.message);
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error processing the request to get the tags' });
  };
};

/**
 * Create a new prompt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const addNewPrompt = async (req, res) => {
  try {
    const { name, type, tags, user_id, body } = req.body;
    if (!name || !type || !tags || !user_id || !body) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request. Missing user ID in the request parameters.' })
    };

    const newPrompt = new Prompt({ name, type, tags, user_id, body });
    const prompt = await newPrompt.save();
    res.header({
      'location': `api/prompt/?id=${prompt.id}`
    });
    res.status(httpStatus.CREATED).json(newPrompt);

  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error saving the prompt' });
  };
};

/**
 * Update a prompt by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const updatePromptById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request. Missing user ID in the request parameters.' })
    };

    const prompt = await Prompt.findById(req.params.id);
    Object.assign(prompt, req.body);
    prompt.save();
    res.status(httpStatus.OK).json(prompt);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' });
    };
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error updating the prompt' });
  };
};

/**
 * Delete a prompt by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const deletePromptById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Bad request. Missing user ID in the request parameters.' })
    };

    const prompt = await Prompt.findById(req.params.id);
    await prompt.deleteOne();
    res.status(httpStatus.OK).json({ message: 'Prompt deleted successfully' });

  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'Prompt not found' });
    };
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error deleting the prompt' });
  };
};

module.exports = { getPromptById, getPromptsByUserId, getAllPrompts, getPromptsTagsByUserId, addNewPrompt, updatePromptById, deletePromptById };