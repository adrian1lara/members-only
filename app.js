const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const userDB = process.env.DB_USER
const passDB = process.env.DB_PASS
const database = process.env.DATABASE

const url = `mongodb+srv://${userDB}:${passDB}@cluster0.uq02s3f.mongodb.net/${database}?retryWrites=true&w=majority`

async function main() {
  try {
    await mongoose.connect(url)
  } catch (error) {
    console.error(error)
  }

}

main().catch(err => console.log(err))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
