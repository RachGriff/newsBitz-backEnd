const { User } = require("../models");

exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username: username }).then(user => {
    if (user === null) {
      res.status(404).send({ msg: "not found" });
    } else {
      res.status(200).send({ user });
    }
  });
};
