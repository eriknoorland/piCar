var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var Gpio = require('onoff').Gpio;

var output = {
  forward: new Gpio(14, 'out'),
  backward: new Gpio(15, 'out'),
  left: new Gpio(17, 'out'),
  right: new Gpio(18, 'out')
};

app.use('/', express.static(__dirname + '/static'));

io.on('connection', function(socket) {
  socket.emit('connected');

  socket.on('stateChangeRequest', function(state) {
    for(var key in state) {
      output[key].write(state[key]);
    }

    console.log(JSON.stringify(output));
  });
});

module.exports = server;
