'use strict'

const EventEmitter = require('events').EventEmitter

let id = 1
const database = {
  users: [
    { id: id++, name: 'John Doe', job: 'design'},
    { id: id++, name: 'Mary Doe', job: 'programming'},
    { id: id++, name: 'Tom Doe', job: 'marketing'},
  ]
}

class UserList extends EventEmitter{
  constructor() {
    super()
  }

  save(obj) {
    obj.id = id++
    database.users.push(obj)
    this.emit('saved-user', obj)
  }

  all() {
    return database.users
  }
}

let users = new UserList()

users.on('saved-user', () => {
  console.log(users.all())
})

users.save({ name: 'Kid', job: 'sleeper'})
