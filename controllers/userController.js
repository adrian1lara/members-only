const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const User = require('../models/user')


// create user in sign up form
exports.create_user_post = [

  body('name', 'Name must not be empty.')
    .trim()
    .isLength({ min: 3 })
    .escape,
  body('lastname', 'Lastname must not be empty.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('email', 'email must not be empty.')
    .trim()
    .isEmail()
    .escape(),
  body('password', 'Min password length is 5')
    .trim()
    .isLength({ min: 5 })
    .escape(),

  asyncHandler(async (req, res, next) => {

    const errors = validationResult(req)

    const user = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      membership: 'user'

    })

    if (!errors.isEmpty()) {

      res.render('sign-up-form', {
        errors: errors.array(),
      })


    } else {

      await user.save()

      res.redirect("/")

    }
  })


]


