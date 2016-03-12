'use strict'

let fs = require('fs')
let zlib = require('zlib')

let readable = fs.createReadStream(`${__dirname}/hello.txt`)
let writeable = fs.createWriteStream(`${__dirname}/hellocopy.txt`)
let compressed = fs.createWriteStream(`${__dirname}/hellocopy.txt.gz`)

let gzip = zlib.createGzip()

readable.pipe(writeable)
readable.pipe(gzip).pipe(compressed)
