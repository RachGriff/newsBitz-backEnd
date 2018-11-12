const {Comment}=require("../models");

exports.formatArticles = (userDocs, articlesData) => {
  return articlesData.map(article => {
    return {
      title: article.title,
      body: article.body,
      votes: article.votes,
      created_at: article.created_at,
      belongs_to: article.topic,
      created_by: userDocs.find(user => user.username === article.created_by)
        ._id
    };
  });
};

exports.formatComments = (userDocs, articleDocs, commentsData) => {
  return commentsData.map(comment => {
    return {
      ...comment,
      belongs_to: articleDocs.find(
        article => article.title === comment.belongs_to
      )._id,
      created_by: userDocs.find(user => user.username === comment.created_by)
        ._id
    };
  });
};

exports.addCommentCount = article => {
  return Comment.find({ belongs_to: article._id })
    .countDocuments()
    .then(count => {
      return {...article, commentCount: count};
    });
};
