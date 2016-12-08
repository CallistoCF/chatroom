var socket_io = require('socket.io');
var http = require('http');
var express = require('express');
var clients = 0;
var app = express();
app.use(express.static('public'));

var server = http.Server(app);
//wrapping node is http.server(app) allows socket io
var io = socket_io(server);
//socket io is an event emitter

io.on('connection', function (socket) {
    console.log('a Client has connected');
    clients++;
    console.log("There are currently " + clients + " clients connected");
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', function() {
      console.log('a client has disconnected');
      clients--;
      console.log("There are now " + clients + " clients connected");
    });
});


server.listen(process.env.PORT || 8080);
