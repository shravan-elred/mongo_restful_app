const Article = require("../models/article");
const HashTag = require("../../hash_tag/models/hash_tag");
const { validateArticle, validateId } = require("../models/article_validator");

async function handleGetAllArticles(req, res) {
  try {
    const result = await Article.find({});
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function handleGetArticleById(req, res) {
  try {
    if (!validateId(req.params)) {
      return res.status(400).json({
        result: validateId.errors,
      });
    }
    const id = req.params.id;
    const result = await Article.findById(id);
    if (!result) {
      return res.status(404).json({
        message: "Article not found",
      });
    }
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}
async function handleCreateArticle(req, res) {
  try {
    if (!validateArticle(req.body)) {
      return res.status(400).json({
        result: validateArticle.errors,
      });
    }
    const body = req.body;
    const hashTags = await HashTag.insertMany(
      body.hashTags.map((hashTag) => ({ name: hashTag }, { upsert: true }))
    );
    const result = await Article.create({
      title: body.title,
      content: body.content,
      hashTags: hashTags.map((tag) => tag._id),
    });
    return res.status(201).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function handleUpdateArticleById(req, res) {
  try {
    if (!validateId(req.params)) {
      return res.status(400).json({
        result: validateId.errors,
      });
    }
    const id = req.params.id;
    const body = req.body;
    const result = await Article.findByIdAndUpdate(
      id,
      {
        title: body.title,
        content: body.content,
      },
      { returnDocument: "after" }
    );
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

async function handleDeleteArticleById(req, res) {
  try {
    const id = req.params.id;
    if (!validateId(req.params)) {
      return res.status(400).json({
        result: validateId.errors,
      });
    }
    const result = await Article.findByIdAndDelete(id);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e);
  }
}

module.exports = {
  handleGetAllArticles,
  handleCreateArticle,
  handleGetArticleById,
  handleUpdateArticleById,
  handleDeleteArticleById,
};
