"use strict";

const createError = require("http-errors");
const express = require("express");
const hbs = require("express-handlebars");
const path = require("path");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("view engine", "hbs");

// configure the view engine
app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultLayout: "default",
        layoutsDir: path.join(__dirname, "/views/layouts/"),
        partialsDir: path.join(__dirname, "/views/partials/")
    })
);

// configure views path
app.set("views", path.join(__dirname, "/views"));

//middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
