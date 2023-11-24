require('dotenv').config()
const mongoose = require('mongoose')

const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const User = require('../models/user')



// create user in sign up form
exports.create_user_post = [

  body('name', 'Name must not be empty.')
    .trim()
    .isLength({ min: 3 })
    .escape(),
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

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err)
      }


      const user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
        membership: 'user'
      })

      if (!errors.isEmpty()) {

        res.render('sign-up-form', {
          errors: errors.array(),
        })


      } else {

        await user.save()

        res.redirect("/log-in")

      }

    })

  })

]


//get member-form 
exports.become_member_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).exec()

  if (req.user === null) {
    const err = new Error('User not found')
    return next(err)
  }

  if (req.user) {
    res.render('member-form', {
      user: user,
      error: ''
    })

  } else {
    res.redirect('/log-in')
  }

})



// handle become a member
exports.become_member_post = [

  body('password').trim().escape(),

  asyncHandler(async (req, res, next) => {
    const secretpass = process.env.SECRET_KEY;
    const user = await User.findById(req.params.id).exec();

    if (req.body.password === secretpass) {
      await User.findByIdAndUpdate(req.params.id, { membership: 'member' });
      res.redirect('/');
    } else {
      res.render('member-form', {
        user: user,
        error: 'Incorrect secret password'
      });
    }
  })
];
