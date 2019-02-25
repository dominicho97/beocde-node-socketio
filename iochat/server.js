const express = require('express');
const app = express();

const server = require('http').createServer(app);
const io = require('socket.io').listen(server)

let users = [];
const connections = [];

server.listen(process.env.PORT || 3000)
console.log('Server running...')

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

//conect with sockets
io.sockets.on('connection', function (socket) {
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length)

  //Disconnect
  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1) // show how many connected left
    console.log('Disconnected: %s sockets connected', connections.length);
  })


  //Send Message
  socket.on('send message', function (data) {
    console.log(data);
    io.sockets.emit('new message', { msg: data })
  })


});

