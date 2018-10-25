const commentsRouter = require("express").Router();
const { changeCommentVote, deleteComment } = require("../controllers/comments");

commentsRouter.patch("/:comment_id", changeCommentVote);
// commentsRouter.delete("/:comment_id", deleteComment);

module.exports = commentsRouter;

// PATCH /api/comments/:comment_id
// # Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down'
// # e.g: `/api/comments/:comment_id?vote=down`
// DELETE /api/comments/:comment_id
// # Deletes a comment
// Character.deleteOne({ name: "Eddard Stark" }, function(err) {});
