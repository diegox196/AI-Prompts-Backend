const Tag = require('../models/tagModel');
const User = require('../models/userModel');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const tagGet = async (req, res) => {
  res.status(httpStatus.OK).json({test: "test"});
};

const tagPost = async (req, res) => {
  res.status(httpStatus.OK).json({test: "test"});
};

const tagPatch = async (req, res) => {
  res.status(httpStatus.OK).json({test: "test"});
};

const tagDelete = async (req, res) => {
  res.status(httpStatus.OK).json({test: "test"});
};

module.exports = {tagGet, tagPost, tagPatch, tagDelete};