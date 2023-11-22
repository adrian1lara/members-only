const createError = require('http-errors');
const express = require('express');
const flash = require('express-flash');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

dotenv.config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const userDB = process.env.DB_USER
const passDB = process.env.DB_PASS
const database = process.env.DATABASE
const secretKey = process.env.SECRET_KEY

const url = `mongodb+srv://${userDB}:${passDB}@cluster0.uq02s3f.mongodb.net/${database}?retryWrites=true&w=majority`

async function main() {
  try {
    await mongoose.connect(url)
  } catch (error) {
    console.error(error)
  }

}

main().catch(err => console.log(err))


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({ secret: secretKey, resave: false, saveUninitialized: true }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())


passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },

    async (username, password, done) => {


      try {
        const user = await User.findOne({ email: username })

        if (!user) {
          return done(null, false, { message: "Incorrect email" })
        }

        if (user.password !== password) {
          return done(null, false, { message: "Incorrect password" })
        }

        return done(null, user)
      } catch (err) {
        return done(err)
      }
    })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

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
