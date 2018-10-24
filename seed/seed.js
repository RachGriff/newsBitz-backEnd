const mongoose = require("mongoose");
const { formatArticles, formatComments } = require("../utils");
const { Topic, User, Article, Comment } = require("../models");
const seedDB = ({ articlesData, commentsData, topicsData, usersData }) => {
  return mongoose.connection
    .dropDatabase()
    .then(() => {
      return Promise.all([
        Topic.insertMany(topicsData),
        User.insertMany(usersData)
      ]);
    })

    .then(([topicDocs, userDocs]) => {
      return Promise.all([
        topicDocs,
        userDocs,
        Article.insertMany(formatArticles(articlesData, topicDocs, userDocs))
      ]);
    })
    .then(([articleDocs, topicDocs, userDocs]) => {
      return Promise.all([
        articleDocs,
        topicDocs,
        userDocs,
        Comment.insertMany(
          formatComments(commentsData, articleDocs, topicDocs, userDocs)
        )
      ]);
    })
    .catch(console.log);
};

module.exports = seedDB;
