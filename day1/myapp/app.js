const express = require('express')
const path = require('path')
const logger = require('morgan')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const checkAdmin = (req, res, next) => {
  if (req.query.username !== 'admin') {
    res.status(400).send('Permission denied')
  } else {
    next()
  }
}

app.use(checkAdmin)

const checkKid = (req, res, next) => {
  if (req.params.username === 'kid') {
    req.status(400).send("No you can't")
  }
}

app.get('/users/:username/:email?', checkKid, (req, res) => {
  const email = req.params.email
  const username = req.params.username
  res.status(200)
  if (email) {
    res.send(`Hello ${email}`)
  } else if (username) {
    res.send(`Hello ${username}`)
  } else {
    res.send("That's the wrong path")
  }
})

app.get('/shop/:name.:format', (req, res) => {
  res.status(200).send(`id: ${req.params.name}, format: ${req.params.format}`)
})

app.get(/dog/, (req, res) => {
  res.status(200).send('You have a dog')
})

app.get('/admin', (req, res) => {
  res.status(200).send('You are admin')
})

module.exports = app
