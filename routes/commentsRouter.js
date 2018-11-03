const commentsRouter = require("express").Router();
const { changeCommentVote, deleteComment } = require("../controllers/comments");

commentsRouter.patch("/:comment_id", changeCommentVote);
commentsRouter.delete("/:comment_id", deleteComment);

module.exports = commentsRouter;

