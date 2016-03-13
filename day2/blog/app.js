const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongo = require('mongoskin')

const app = express()
const db = mongo.db('mongodb://localhost:27017/blog', {native_parser: true})
db.bind('post')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/post', (req, res) => {
  db.post.find().toArray(function (err, posts) {
    if (err) {
      res.status(400).end()
    }
    res.status(200).json(posts)
  })
})

app.post('/post', (req, res) => {
  db.post.insert(req.body)
  res.redirect('/post')
})

process.on('SIGTERM', () => {
  db.close()
  console.log('Closing DB')
})

module.exports = app
