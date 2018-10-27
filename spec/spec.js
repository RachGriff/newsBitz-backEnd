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
    describe("/:topic_slug/articles", () => {
      it("get /:topic_slug/articles returns a status 200 and articles relating to the slug", () => {
        return request
          .get("/api/topics/cats/articles")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an("array");
            expect(res.body.articles.length).to.equal(2);
            expect(
              res.body.articles.find(a => a.created_by === "butter_bridge")
            ).to.not.equal(null);
          });
      });
      it("get/:topic_slug/articles returns a status 400 and a msg 'bad request' when passed an incorrect slug", () => {
        return request.get("/api/topics/dogs/articles").expect(400);
      });
    });
    describe("/:topic_slug/articles", () => {
      it("post/:topic_slug/articles returns a status 201 and adds a new article to a topic", () => {
        const newArticle = {
          title: "Further Catspiracies catnipped in the bud!",
          body: "Cat burglar ring exposed!",
          created_by: userDocs[0]._id,
          created_at: 1514987931240,
          belongs_to: "cats"
        };
        return request
          .post("/api/topics/cats/articles")
          .send(newArticle)
          .expect(201)
          .then(res => {
            expect(res.body.article).is.not.null;
            expect(res.body.article).to.contain.keys(newArticle);
          });
      });
      it("post/:topic_slug/articles returns a status 404 when passed an invalid slug topic path", () => {
        const newArticle = {
          title: "Further Catspiracies catnipped in the bud!",
          body: "Cat burglar ring exposed!",
          created_by: userDocs[0]._id,
          created_at: 1514987931240,
          belongs_to: "cats"
        };
        return request
          .post("/api/topics/articles")
          .send(newArticle)
          .expect(404);
      });
      it("post/:topic_slug/articles returns a status 400 when passed an invalid schema format", () => {
        const newArticle = {
          title: 1264,
          created_by: userDocs[0]._id,
          created_at: 1514987931240,
          belongs_to: "cats"
        };
        return request
          .post("/api/topics/cats/articles")
          .send(newArticle)
          .expect(400);
      });
    });
    describe("/articles", () => {
      it("get / returns all articles and status 200", () => {
        return request
          .get("/api/articles")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.an("array");
            expect(res.body.articles.length).to.equal(articleDocs.length);
          });
      });
    });
    describe("get/:article_id", () => {
      it("get/:article_id returns a status 200 and an article with the given id", () => {
        return request
          .get(`/api/articles/${articleDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.article.title).to.equal(articleDocs[0].title);
          });
      });
      it("get/:article_id returns a status 404 if the article id is not found", () => {
        return request
          .get("/api/articles/5bd2e193eec309512f6f627f")
          .expect(404);
      });
    });

    describe("GET /api/articles/:article_id/comments", () => {
      it("GET /api/articles/:article_id/comments returns status 200 and the comments for the article with the given id", () => {
        return request
          .get(`/api/articles/${articleDocs[0]._id}/comments`) //test db
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments.length).to.equal(
              commentDocs.filter(com => com.belongs_to === articleDocs[0]._id)
                .length
            );
          });
      });
    });
  });
});
