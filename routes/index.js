const express = require('express');
const passport = require('passport')
const router = express.Router();

const userController = require('../controllers/usercontroller')

/* get home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'express' });
});

// get sign-up page
router.get("/sign-up", (req, res) => res.render("sign-up-form", {
  errors: ''
}))

// handle post request sign-up
router.post("/sign-up", userController.create_user_post)


// get log in page
router.get("/log-in", (req, res) => res.render("log-in-form"))


//handle post log-in
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);



module.exports = router;
