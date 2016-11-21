'use strict'
/*
  * Dependencias
*/
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Image = require('./models/Image');
const app = express()

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: true}))


mongoose.connect('mongodb://localhost/react-agregadorDeFotos', (err,res) => {
  if (err) res.status(500).json({err})
  console.log('Connect to Database')
})

app.use('/static', express.static('public'))

app.get('/imagenes', (req,res) => {
  console.log('GET/')
  Image.find({},{"url":1,"_id":0},(err, images) => {
    if(err) return res.status(500).json({error:true, message:err})
    console.log(images);
    res.status(200).json(images)
  })
})
app.post('/imagenes',(req,res) => {
  console.log(req.body.url);
  let image = new Image({
    url:req.body.url
  })
  image.save((err) => {
    if (err) return res.status(500).json({error:true, message: err})
    res.status(201).json({img:image})
  })
})

app.listen(8030)
module.exports = app
