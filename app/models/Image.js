'use strict'
const mongoose = require('mongoose')
let Schema = mongoose.Schema

const image_schema = new Schema({
  url:{
    type: String,
    require: true
  }
})

const Image = mongoose.model('Image', image_schema)
module.exports = Image
