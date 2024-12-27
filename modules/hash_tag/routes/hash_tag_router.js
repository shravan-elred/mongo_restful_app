const router = require("express").Router();
const {
  createHashTag,
  getHashTags,
  getHashTagById,
  updateHashTag,
  deleteHashTag,
} = require("../controllers/hash_tag_controller");

router.route("/").post(createHashTag).get(getHashTags);
router
  .route("/:id")
  .get(getHashTagById)
  .put(updateHashTag)
  .delete(deleteHashTag);

module.exports = router;
