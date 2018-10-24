const mongoose = require("mongoose");
const { formatArticles, formatUsers } = require("../utils");
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
    .then(articleDocs => {
      console.log(articleDocs);
    })
    .catch(console.log);
};

module.exports = seedDB;
