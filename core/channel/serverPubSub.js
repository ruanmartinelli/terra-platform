var zmq = require('zmq');

//var sock = zmq.socket('pub');

sock.bind('tcp://10.0.0.1:5555',
  function(err){
    ///
  });

//sock.bindSync('tcp://10.0.0.1:5555'); para ser sincrono

sock.connect('tcp://10.0.0.1:5555');

//enviar
sock.send('message');

//receber
sock.on('message',
  function(msg){
    console.log(msg.toString()).
  });

sock.close();
