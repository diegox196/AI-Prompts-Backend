const Prompt = require('../models/promptModel');
const { Configuration, OpenAIApi } = require("openai");

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const createImage = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  if (req.body) {
    const response = await openai.createImage(req.body);
    if (response) {
      res.status(httpStatus.CREATED).json(response.data.data);
    } else {
      res.status(httpStatus.UNPRPOCESSABLE_ENTRY).json({ message: "There was an error executing the open AI method" })
    }
  }
}

const createCompletion = async (req, res) => {
  const openai = new OpenAIApi(configuration);
  if (req.body) {
    const response = await openai.createCompletion(req.body);
    console.log(response);
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

module.exports = {createImage, createCompletion, createEdit};