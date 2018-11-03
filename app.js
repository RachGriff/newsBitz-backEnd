const app = require("express")();
const apiRouter = require("./routes/apiRouter");
const mongoose = require("mongoose");
const { DB_URL } =
  process.env.NODE_ENV === "production"
    ? process.env
    : require("./config");//check still works
const bodyParser = require("body-parser");
const {
  handle400s,
  handle404s,
  handle500s
} = require("./error/error-handling");

mongoose
  .connect(
    DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`connected to ${DB_URL}...`));

app.use(bodyParser.json());

app.use("/api", apiRouter);
app.use("/*", (req, res, next) => {
  next({ status: 404, msg: "page not found" });
});

app.use(handle400s);

app.use(handle404s);

app.use(handle500s);


module.exports = app;
