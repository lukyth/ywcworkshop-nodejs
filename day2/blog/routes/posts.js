const express = require('express')

const router = express.Router()

const db = require('../models/db')

router.get('/', (req, res, next) => {
  db.post.find().toArray((err, posts) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.render('post', {posts: posts})
  })
})

router.post('/', (req, res, next) => {
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
  })
})

router.put('/:id', (req, res, next) => {
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
  })
})

router.delete('/:title', (req, res, next) => {
  const title = req.params.title
  db.post.remove({title: title}, (err, result) => {
    if (err) {
      console.error(err.stack)
      return res.status(500).json(err)
    }
    res.status(200).json(result)
  })
})

module.exports = router
