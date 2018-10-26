const { Comment } = require("../models");

exports.changeCommentVote = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;

  if (vote === "up") {
    Comment.findByIdAndUpdate(comment_id, { $inc: { votes: 1 } }, { new: true })
      .lean()
      .then(result => res.send(result))
      .catch(next);
  } else {
    Comment.findByIdAndUpdate(
      comment_id,
      { $inc: { votes: -1 } },
      { new: true }
    )
      .lean()
      .then(result => res.send(result))
      .catch(next);
  }
};

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;

  Comment.deleteOne({ _id: comment_id })
    .then(err => {
      if (err) console.log(err);
      res.status(200).send({ msg: "comment deleted" });
    })
    .catch(next);
};
