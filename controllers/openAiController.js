const { Configuration, OpenAIApi } = require("openai");

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

/**
 * Create an image using the OpenAI API.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createImage = async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);
    const { prompt, n, size } = req.body;
    if (!prompt || !n || !size) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const response = await openai.createImage({ prompt, n, size });
    res.status(httpStatus.CREATED).json(response.data);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error executing the open AI method' })
  };
};

/**
 * Create a text completion using the OpenAI API.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createCompletion = async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);
    const { model, prompt, ...completionData } = req.body;
    if (!model || !prompt) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const response = await openai.createCompletion({ model, prompt, ...completionData });
    res.status(httpStatus.CREATED).json(response.data);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error executing the open AI method' })
  };
};

/**
 * Create a edit using the OpenAI API.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createEdit = async (req, res) => {
  try {
    const openai = new OpenAIApi(configuration);
    const { model, input, instruction, ...editData } = req.body;
    if (!model || !input || !instruction) {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Please provide the required information in the request body.' });
    };

    const response = await openai.createEdit({ model, input, instruction, ...editData });
    res.status(httpStatus.CREATED).json(response.data);
  } catch (error) {
    res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: 'There was an error executing the open AI method' })
  };
};

module.exports = { createImage, createCompletion, createEdit };