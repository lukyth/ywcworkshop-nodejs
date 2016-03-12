'user strict'

var util = require('util')
var EventEmitter = require('events').EventEmitter

var id = 1
var database = {
  users: [
    { id: id++, name: 'John Doe', job: 'design'},
    { id: id++, name: 'Mary Doe', job: 'programming'},
    { id: id++, name: 'Tom Doe', job: 'marketing'},
  ]
}

function UserList () {}

util.inherits(UserList, EventEmitter)

UserList.prototype.save = function (obj) {
  obj.id = id++
  database.users.push(obj)
  this.emit('saved-user', obj)
}

UserList.prototype.all = function () {
  return database.users
}

var users = new UserList()

users.on('saved-user', function () {
  console.log(users.all())
})

users.save({ name: 'Kid', job: 'sleeper'})
