process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const request = require("supertest")(app);
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");
const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../seed/testData");

describe("/api", () => {
  let topicDocs, userDocs, articleDocs, commentDocs; //variables
  beforeEach(() => {
    return seedDB({ topicsData, usersData, articlesData, commentsData }).then(
      docs => {
        [topicDocs, userDocs, articleDocs, commentDocs] = docs; //reassigning
      }
    );
  });
  after(() => {
    return mongoose.disconnect();
  });
  describe("/topics", () => {
    it("GET/ returns status 200 and topics data", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics.length).to.equal(topicDocs.length);
        });
    });
  });
});
