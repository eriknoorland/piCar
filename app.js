const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const Gpio = require('onoff').Gpio;

let output = {
  forward: new Gpio(14, 'out'),
  backward: new Gpio(15, 'out'),
  left: new Gpio(17, 'out'),
  right: new Gpio(18, 'out')
};

app.use('/', express.static(__dirname + '/static'));

io.on('connection', function(socket) {
  socket.emit('connected');

  socket.on('stateChangeRequest', function(state) {
    for(let key in state) {
      output[key].write(state[key]);
    }

    console.log(JSON.stringify(output));
  });
});

module.exports = server;
