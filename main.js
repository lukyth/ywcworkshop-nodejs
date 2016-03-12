'user strict'

const EventEmitter = require('events')
const ee = new EventEmitter()

ee.on('hello', (user) => {
  console.log(`Found new user
username: ${user.username}
email: ${user.email}`)
})

ee.once('hello_once', () => {
  console.log('This should appear once')
})

ee.emit('hello', {
  username: "lukyth",
  email: "k.sujautra@gmail.com"
})

ee.emit('hello_once')
ee.emit('hello_once')
ee.emit('hello_once')
ee.emit('hello_once')
