const HashTag = require("../models/hash_tag");

const createHashTag = async (req, res) => {
  try {
    const hashTag = new HashTag(req.body);
    await hashTag.save();
    return res.status(201).send(hashTag);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getHashTags = async (req, res) => {
  try {
    const hashTags = await HashTag.find();
    return res.status(200).send(hashTags);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getHashTagById = async (req, res) => {
  try {
    const hashTag = await HashTag.findById(req.params.id);
    if (!hashTag) {
      return res.status(404).send("HashTag not found");
    }
    return res.status(200).send(hashTag);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateHashTag = async (req, res) => {
  try {
    const hashTag = await HashTag.findByIdAndUpdate(req.params.id);
    if (!hashTag) {
      return res.status(404).send("HashTag not found");
    }
    return res.status(200).send(hashTag);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteHashTag = async (req, res) => {
  try {
    const hashTag = await HashTag.findByIdAndDelete(req.params.id);
    if (!hashTag) {
      return res.status(404).send("HashTag not found");
    }
    return res.status(200).send(hashTag);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createHashTag,
  getHashTags,
  getHashTagById,
  updateHashTag,
  deleteHashTag,
};
