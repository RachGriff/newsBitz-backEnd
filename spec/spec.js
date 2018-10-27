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
    describe("post/:article_id/comments", () => {
      it("post /:article_id/comments returns 201 and creates a new comment for the given article id", () => {
        const newComment = {
          body:
            "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam!",
          belongs_to: articleDocs[0]._id,
          created_by: userDocs[0]._id,
          votes: 5,
          created_at: 1514987931240
        };
        return request
          .post(`/api/articles/${articleDocs[0]._id}/comments`)
          .send(newComment)
          .expect(201)
          .then(res => {
            expect(res.body.comment).is.not.null;
            expect(res.body.comment).to.contain.keys(newComment);
          });
      });
      it("post /:article_id/comments returns a status 404 when passed an invalid path", () => {
        const newComment = {
          body:
            "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam!",
          belongs_to: articleDocs[0]._id,
          created_by: userDocs[0]._id,
          votes: 5,
          created_at: 1514987931240
        };
        return request
          .post(`/api/articles/${articleDocs[0]._id}/camments`)
          .send(newComment)
          .expect(404);
      });
      it("post /:article_id/comments returns a status 400 when passed an invalid schema format", () => {
        const newComment = {
          body:
            "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam!"
        };
        return request
          .post(`/api/articles/${articleDocs[0]._id}/comments`)
          .send(newComment)
          .expect(400);
      });
    });
    describe("/patch/:article_id", () => {
      it("/patch/:article_id returns a status 200 and an updated vote count", () => {
        const expected = {
          title: "Further Catspiracies catnipped in the bud!",
          body: "Cat burglar ring exposed!",
          created_by: userDocs[0]._id,
          created_at: 1514987931240,
          belongs_to: "cats"
        };
        return request
          .patch(`/api/articles/${articleDocs[0]._id}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.votes).to.equal(1);
            expect(res.body).to.contain.keys(expected);
          });
      });
      it("/patch/:article_id returns status 400 if passed an invalid query string", () => {
        return request
          .patch(`/api/articles/${articleDocs[0]._id}?vote=banana`)
          .expect(400);
      });
    });
    describe("patch/:comment_id", () => {
      it("patch/:comment_id returns a status 200 and an updated vote count", () => {
        const expected = {
          body:
            "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
          belongs_to: "Making sense of Redux",
          created_by: "grumpy19",
          votes: 7,
          created_at: 1478813209256
        };
        return request
          .patch(`/api/comments/${commentDocs[0]._id}?vote=up`)
          .expect(200)
          .then(res => {
            expect(res.body.votes).to.equal(8);
            expect(res.body).to.contain.keys(expected);
          });
      });
      it("/patch/:comment_id returns status 400 if passed an invalid query string", () => {
        return request
          .patch(`/api/comments/${commentDocs[0]._id}?vote=gelato!`)
          .expect(400);
      });
    });
    describe("delete/:comment_id", () => {
      it("delete/:comment_id returns a status 400 and message'comment deleted'", () => {
        return request
          .delete(`/api/comments/${commentDocs[0]._id}`)
          .expect(200);
      });
    });
    describe("get/:username", () => {
      it("get/:username returns a status 200 and the user for the req params username", () => {
        return request
          .get(`/api/users/${userDocs[0].username}`)
          .expect(200)
          .then(res => {
            console.log(res.body);
            expect(res.body.user.name).to.equal(`${userDocs[0].name}`);
          });
      });
    });
    it("get/:username returns a status 404 if the username passed does not exist", () => {
      return request.get(`/api/users/8888888888888`).expect(404);
    });
  });
});
