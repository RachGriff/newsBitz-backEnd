const { Topic, Article, Comment } = require("../models");
const { addCommentCount } = require("../utils");
exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by")
    .lean()
    .then(articles => {
      return Promise.all(articles.map(a => addCommentCount(a))); //adds count array onto promises, so promises arr is at index 0 of resulting arr.
    })
    .then(articles => {
      res.status(200).send({ articles });
    })

    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  Article.findById(article_id)
    .populate("created_by")
    .lean()
    .then(article => {
      if (!article) {
        return Promise.reject({ status: 404, msg: "article not found" });
      }
      return Promise.all([article, addCommentCount(article)]);
    })
    .then(([article, count]) => {
      article.commentCount = count;
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .populate("created_by")
    .lean()
    .then(comments => {
      res.send({ comments });
    })
    .catch(next);
};

exports.addNewComment = (req, res, next) => {
  const articleId = req.params.article_id; //got to include this to say which article
  const body = req.body;
  body.belongs_to = articleId;
  Comment.create(body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.updateVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;
  if (vote !== "up" && vote !== "down") {
    res.status(400).send({ msg: "bad request" });
  } else {
    Article.findByIdAndUpdate(
      article_id,
      {
        $inc: {
          votes: vote === "up" ? 1 : -1
        }
      },
      { new: true }
    )
      .lean()
      .then(result => res.send(result))
      .catch(next);
  }
};
