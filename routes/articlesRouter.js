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

// GET /api/articles
// # Returns all the articles
// GET /api/articles/:article_id
// # Get an individual article
// GET /api/articles/:article_id/comments
// # Get all the comments for a individual article
// POST /api/articles/:article_id/comments
// # Add a new comment to an article. This route requires a JSON body with body and created_by key value pairs
// # e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
// PATCH /api/articles/:article_id
// # Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down'
// # e.g: `/api/articles/:article_id?vote=up`
