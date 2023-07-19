const { Configuration, OpenAIApi } = require("openai");

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const createImage = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  if (req.body) {
    const { prompt, n, size } = req.body;
    const response = await openai.createImage({ prompt, n, size });
    if (response) {
      res.status(httpStatus.CREATED).json(response.data);
    } else {
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ message: "There was an error executing the open AI method" })
    }
  }
}

const createCompletion = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  if (req.body) {
    const response = await openai.createCompletion(req.body);
    if (response) {
      res.status(httpStatus.CREATED).json(response.data);
    } else {
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ message: "There was an error executing the open AI method" })
    }
  }
}

const createEdit = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  if (req.body) {
    const response = await openai.createEdit(req.body);
    if (response) {
      res.status(httpStatus.CREATED).json(response.data);
    } else {
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ message: "There was an error executing the open AI method" })
    }
  }
}

module.exports = { createImage, createCompletion, createEdit };