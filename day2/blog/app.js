const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongo = require('mongoskin')

const app = express()

const db = mongo.db('mongodb://localhost:27017/blog', {native_parser: true})
db.bind('post')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/post', (req, res) => {
  db.post.find().toArray((err, posts) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.render('post', {posts: posts})
  })
})

app.post('/post', (req, res) => {
  const insertData = {
    title: req.body.title,
    body: req.body.body,
    author: req.body.author,
    email: req.body.email
  }

  if (insertData.title.length < 5) {
    return res.status(500).send('Title too short.')
  }

  db.post.insert(insertData, (err, result) => {
    if (err) {
      console.error(err.stack)
      return res.status(500).json(err)
    }
    res.status(200).send(result)
  // res.redirect('/post')
  })
})

app.put('/post/:id', (req, res) => {
  const id = req.params.id
  const insertData = {
    $set: {
      title: req.body.title,
      body: req.body.body
    }
  }

  if (req.body.title.length < 5) {
    return res.status(500).send('Title too short.')
  }

  db.post.updateById(id, insertData, (err, result) => {
    if (err) {
      console.error(err.stack)
      return res.status(500).json(err)
    }
    res.status(200).send(result)
  // res.redirect('/post')
  })
})

app.delete('/post/:title', (req, res) => {
  const title = req.params.title
  db.post.remove({title: title}, (err, result) => {
    if (err) {
      console.error(err.stack)
      return res.status(500).json(err)
    }
    res.status(200).json(result)
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

process.on('SIGTERM', () => {
  db.close()
  console.log('Closing DB')
  process.exit()
})

module.exports = app
