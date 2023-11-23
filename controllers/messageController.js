const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const { body, validationResult } = require('express-validator')
const Message = require('../models/message')



// get create form 
exports.message_create_get = (req, res, next) => {
  res.render('message-form', {
    title: 'Create Form',
    errors: ''
  })
}


// handle post create Message
exports.message_create_post = [
  body('title', 'Min title lenght is 3')
    .trim()
    .isLength({ min: 3, max: 40 })
    .escape(),
  body('message', 'Min message is 1')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)

    const message = new Message({
      title: req.body.title,
      message: req.body.message,
      added: new Date(),
      user: req.user
    })

    if (!errors.isEmpty()) {

      res.render('message-form', {
        title: 'Create a Message',
        message: message,
        errors: errors.array()
      })
    } else {
      await message.save()
      res.redirect("/")
    }
  })
]



