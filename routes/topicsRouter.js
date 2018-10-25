const topicsRouter = require("express").Router();
const {
  getTopics,
  getTopicsForSlug,
  addNewArticle
} = require("../controllers/topics");

topicsRouter.get("/", getTopics);
topicsRouter.get("/:topic_slug/articles", getTopicsForSlug);
topicsRouter.post("/:topic_slug/articles", addNewArticle);

module.exports = topicsRouter;

// GET /api/topics
// # Get all the topics
// GET /api/topics/:topic_slug/articles
// # Return all the articles for a certain topic
// # e.g: `/api/topics/football/articles`
// POST /api/topics/:topic_slug/articles
// # Add a new article to a topic. This route requires a JSON body with title and body key value pairs
// # e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
