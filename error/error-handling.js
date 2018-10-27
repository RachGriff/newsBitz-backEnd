const express = require("express");

const handle400s = (err, req, res, next) => {
  console.log(err);

  if (err.status === 400 || err.name === "ValidationError") {
    res.status(400).send({ msg: err.msg || "Bad request" });
  } else next(err);
};

const handle404s = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "not found" });
  } else {
    next(err);
  }
};
const handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};

module.exports = { handle400s, handle404s, handle500s };
