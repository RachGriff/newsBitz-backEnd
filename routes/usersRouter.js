const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users");

usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
