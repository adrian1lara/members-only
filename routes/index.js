const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get sign-up page
router.get("/sign-up", (req, res) => res.render("sign-up-form"))

// handle post request sign-up
router.post("/sign-up", userController.create_user_post)

module.exports = router;
