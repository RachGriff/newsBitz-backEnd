const { DB_URL } = require("../config"); //check still works
const seedDB = require("./seed");
const mongoose = require("mongoose");
const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("./devData/index");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => {
    return seedDB({ articlesData, commentsData, topicsData, usersData });
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(console.log);
