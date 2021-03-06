const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const planetaryRegistry = require("./routes/planetaryRegistry")


const app = express();

// Allow use of environment variables
require("dotenv").config()

// Set up mongoose connection
const mongoose = require('mongoose');
const mongoDB = `mongodb+srv://${process.env.MONGO_CLIENT_USER}:${process.env.MONGO_CLIENT_PASS}@cluster0.inocc.mongodb.net/known_universe?retryWrites=true&w=majority`

mongoose.connect(mongoDB).catch(error => console.log(error))
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter)
app.use("/planetary-registry", planetaryRegistry)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
