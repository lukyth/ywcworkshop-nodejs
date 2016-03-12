'use strict'

let fs = require('fs')

let options = {
  encoding: 'utf8',
  highWaterMark: 1
}

let readStream = fs.createReadStream('lowercase.txt', options)
let writeStream = fs.createWriteStream('uppercase.txt', options)

readStream.on('data', (chunk) => {
  writeStream.write(chunk.toUpperCase())
})
