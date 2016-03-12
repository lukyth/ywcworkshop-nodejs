var fs = require('fs')
var options = {
  encoding: 'utf8',
  highWaterMark: 1
}
var readStream = fs.createReadStream('lowercase.txt', options)

readStream.on('data', (chunk) => {
  console.log(chunk)
  console.log('--------')
})
