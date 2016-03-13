'use strict'

const http = require('http')
const port = 3000
const handleRequest = (request, response) => {
  if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end('Hello world!')
  } else {
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(`<b>Path is ${request.url}</b>`)
  }
}

const server = http.createServer(handleRequest)

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
