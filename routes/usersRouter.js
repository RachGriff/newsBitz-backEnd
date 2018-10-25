const usersRouter = require("express").Router();
const { getUserByUsername } = require("../controllers/users");

usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
// // GET /api/users/:username
// // # e.g: `/api/users/mitch123`
// # Returns a JSON object with the profile data for the specified user.
