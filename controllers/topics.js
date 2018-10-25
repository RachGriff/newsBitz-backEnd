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
  exports.addNewArticle = (req, res, next) => {
    Article.create(req.body)
      .then(article => {
        res.status(201).send({ article });
      })
      .catch(next);
  };
  Article.find({ belongs_to: slug })
    .then(articles => res.status(200).send({ articles }))
    .catch(next);
};

exports.addNewArticle = (req, res, next) => {
  Article.create(req.body)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

// # Add a new article to a topic. This route requires a JSON body with title and body key value pairs
// # e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
// ```
// { "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
