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
        Article.insertMany(formatArticles(topicDocs, userDocs, articlesData))
      ]);
    })
    .then(([topicDocs, userDocs, articleDocs]) => {
      return Promise.all([
        topicDocs,
        userDocs,
        articleDocs,
        Comment.insertMany(
          formatComments(topicDocs, userDocs, articleDocs, commentsData)
        )
      ]);
    })

    .catch(console.log);
};

module.exports = seedDB;
