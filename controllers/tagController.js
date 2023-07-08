const Tag = require('../models/tagModel');
const User = require('../models/userModel');

//Http Status Code
const httpStatus = require('../utils/httpStatus');

const tagGet = async (req, res) => {
  res.status(httpStatus.OK).json({ test: "test" });
};

const tagPost = async (req, res) => {
  try {
    const { userId, tags } = req.body;

    let existingTag = await Tag.findOne({ user_id: userId });

    //Creates a new tag if the userId doesn't exist, but in case they exist it get the arrray of previous tags and adds a new ones
    let newTag;
    if(!existingTag){
      newTag = new Tag(req.body)
    } else {
      existingTag.tags.push(...tags);
      newTag = existingTag;
    }

    await newTag.save()
      .then(tag => {
        res.status(httpStatus.CREATED).json(tag);
      })
      .catch(err => {
        console.log(err);
        res.status(httpStatus.UNPRPOCESSABLE_CONTENT).json({ error: "There was an error saving the tag" });
      });
  } catch (err) {
    console.log(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const tagPatch = async (req, res) => {
  res.status(httpStatus.OK).json({ test: "test" });
};

const tagDelete = async (req, res) => {
  res.status(httpStatus.OK).json({ test: "test" });
};

module.exports = { tagGet, tagPost, tagPatch, tagDelete };