const articlesRouter = require("express").Router();
const {
  getAllArticles,

  getArticleById,
  getArticleComments,
  addNewComment,
  updateVotes
} = require("../controllers/articles");

articlesRouter.get("/", getAllArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getArticleComments);
articlesRouter.post("/:article_id/comments", addNewComment);
articlesRouter.patch("/:article_id", updateVotes);

module.exports = articlesRouter;


