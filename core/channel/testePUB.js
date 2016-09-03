var zmq = require('zmq');
var port = 'tcp://127.0.0.1:12345';

var socket = zmq.socket('pub');

var stocks = ['Temperature', 'Humidity', 'Luminosity'];

socket.identity = 'publisher';

socket.bind(port, function(err) {
  if (err) throw err;
  console.log('bound!');

  setInterval(function() {
    var symbol = stocks[Math.floor(Math.random()*stocks.length)]
      , value = Math.random()*1000;

    console.log(socket.identity + ': sent ' + symbol + ' ' + value);
    socket.send(symbol + ' ' + value);
  },3000);
});
