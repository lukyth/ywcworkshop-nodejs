'use strict'

const fs = require('fs')

const options = {
  encoding: 'utf8',
  highWaterMark: 1
}

const readStream = fs.createReadStream(`${__dirname}/lowercase.txt`, options)
const writeStream = fs.createWriteStream(`${__dirname}/uppercase.txt`, options)

readStream.on('data', (chunk) => {
  writeStream.write(chunk.toUpperCase())
})
