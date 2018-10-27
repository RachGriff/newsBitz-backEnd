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
