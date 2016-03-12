'use strict'

const fs = require('fs')
const zlib = require('zlib')

const readable = fs.createReadStream(`${__dirname}/hello.txt`)
const writeable = fs.createWriteStream(`${__dirname}/hellocopy.txt`)
const compressed = fs.createWriteStream(`${__dirname}/hellocopy.txt.gz`)

const gzip = zlib.createGzip()

readable.pipe(writeable)
readable.pipe(gzip).pipe(compressed)
