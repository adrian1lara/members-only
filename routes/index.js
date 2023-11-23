const express = require('express');
const passport = require('passport')
const asyncHandler = require('express-async-handler')
const router = express.Router();

const userController = require('../controllers/userController')
const messageController = require('../controllers/messageController')
const Message = require('../models/message')
/* get home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const allMessages = await Message.find().exec()

  res.render('index', {
    title: 'Members Only',
    user: req.user,
    messages: allMessages
  })
}
));

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


router.get('/message', messageController.message_create_get)

router.post('/message', messageController.message_create_post)

//handle log out
router.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect("/")
  })
})




module.exports = router;
