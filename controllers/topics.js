const { Topic, Article } = require("../models");

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
  Article.create(req.body)
    .then(article => {
      if (!article) res.status(400).send({ msg: "Bad request" });
      res.setHeader("Content-Type", "application/json");
      res.status(201).send(JSON.stringify({ article }));
    })
    .catch(next);
};
