const { Topic, Article, Comment } = require("../models");

exports.getAllArticles = (req, res, next) => {
  Article.find()
    .populate("created_by")
    .lean()
    .then(articles => {
      const countsPromises = [];

      articles.forEach(art => countsPromises.push(commentCount(art))); //pushes count to array

      return Promise.all([articles].concat(countsPromises)); //adds count array onto promises, so promises arr is at index 0 of resulting arr.
    })
    .then(results => {
      const articlesWithCounts = results[0].map((e, i) => ({
        ...e,
        commentCount: results[i + 1] //commentcount set to be index plus 1 as these are the matching article and count [[art1,art2]5,2] art 1 count is at position 1 so is [i+1]
      }));
      res.status(200).send({ articles: articlesWithCounts });
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
      return Promise.all([article, commentCount(article)]);
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
    .populate("belongs_to", "created_by")
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
    if (vote === "up") {
      Article.findByIdAndUpdate(
        article_id,
        { $inc: { votes: 1 } },
        { new: true }
      )
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
  }
};

const commentCount = article => {
  return Comment.find({ belongs_to: article._id })
    .countDocuments()
    .then(count => {
      return count;
    });
};
