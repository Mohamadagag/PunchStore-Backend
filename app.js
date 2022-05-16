require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var createError = require("http-errors");
var cors = require("cors");
var favicon = require("serve-favicon");
const session = require("express-session");
const mongoose = require("mongoose");
var app = express();

//routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var ordersRouter = require("./routes/odres");

//middle ware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); // allows cross domain requests

// app.use(favicon(path.join(__dirname, "../public", "favicon.ico"))); // <-- location of favicon

const IS_PRODUCTION = app.get("env") === "production";
if (IS_PRODUCTION) {
  app.set("trust proxy", 1); // secures the app if it is running behind Nginx/Apache/similar
}

app.use(
  session({
    //handle sessions
    secret: "keyboard cat", // <- this should be a secret phrase
    cookie: { secure: IS_PRODUCTION }, // <- secure only in production
    resave: true,
    saveUninitialized: true,
  })
);

//connect to db
mongoose
  .connect(process.env.CONNECTION_STRING, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("successfully connected");
  })
  .catch(console.error);

//use the routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// create and error object,catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    success: false,
    message: err.message,
  });
});

module.exports = app;
