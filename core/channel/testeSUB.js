var zmq = require('zmq');
var port = 'tcp://127.0.0.1:12345';

var socket = zmq.socket('sub');

socket.identity = 'subscriber';

socket.connect(port);

//socket.subscribe('Luminosity');
socket.subscribe('Temperature');

console.log('connected!');

socket.on('message', function(data) {
  console.log(socket.identity + ': received data ' + data.toString());
});
