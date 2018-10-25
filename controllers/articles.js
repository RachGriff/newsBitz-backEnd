const { Topic, Article, Comment } = require("../models");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
}; //populate

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  Article.findById(article_id)
    .lean()
    .then(article => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      res.status(200).send({ article });
    });
}; //populate

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .lean()
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};

exports.addNewComment = (req, res, next) => {
  console.log("here");
  console.log(req.body);
  const articleId = req.params.article_id; //got to include this to say which article
  const body = req.body;
  body.belongs_to = articleId;
  console.log(body);
  Comment.create(body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.updateVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;

  if (vote === "up") {
    Article.findByIdAndUpdate(article_id, { $inc: { votes: 1 } }, { new: true })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  } else {
    Article.findByIdAndUpdate(
      article_id,
      { $inc: { votes: -1 } },
      { new: true }
    )
      .lean()
      .then(result => res.send(result))
      .catch(next);
  }
};
//http://localhost:9090/api/articles/5bd23a1745df591f1617a225?vote=up
