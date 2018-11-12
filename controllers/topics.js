const { Topic, Article } = require("../models");
const {addCommentCount} = require("../utils")
exports.getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.send({ topics });
    })
    .catch(next);
};

exports.getTopicsForSlug = (req, res, next) => {
  const slug = req.params.topic_slug;
  Article.find({ belongs_to: slug })
  .populate("created_by")
  .lean()
  .then(articles=>{
    return Promise.all(articles.map(a=>addCommentCount(a)));
  })
    .then(articles => {
      if (articles.length === 0) {
        res.status(400).send({ msg: "Bad request" });
      } else {
        res.status(200).send({ articles });
      }
    })
    .catch(next);
};
exports.addNewArticle = (req, res, next) => {
  const article = {...req.body, belongs_to: req.params.topic_slug};
  Article.create(article)
    .then(article => {
      if (!article) res.status(400).send({ msg: "Bad request" });
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({ article }));
    })
    .catch(next);
};
