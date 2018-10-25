const { User } = require("../models");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.find({ username: username }).then(user => {
    res.status(200).send({ user });
  });
};
