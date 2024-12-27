const router = require("express").Router();

const {
  handleGetAllArticles,
  handleCreateArticle,
  handleGetArticleById,
  handleUpdateArticleById,
  handleDeleteArticleById,
} = require("../controllers/article_controller");

router.route("/").get(handleGetAllArticles).post(handleCreateArticle);

router
  .route("/:id")
  .get(handleGetArticleById)
  .put(handleUpdateArticleById)
  .delete(handleDeleteArticleById);

module.exports = router;
