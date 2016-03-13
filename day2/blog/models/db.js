'use strict'

const mongo = require('mongoskin')

const db = mongo.db('mongodb://localhost:27017/blog', {native_parser: true})

db.bind('post')

module.exports = db
