const   zmq     = require('zmq'),
        http    = require('http'),//.Server(app),
        io      = require('socket.io')(http)

const subscriber = zmq.socket('sub')

const config = require('../config')

function startProxyListener(app){
    subscriber.on('message', function(){
        let messages = [];

        Array.prototype.slice.call(arguments).forEach(function(arg) {
            messages.push(arg.toString());
        });

        console.log(messages);
    })


    subscriber.on('disconnect', function(){
        console.log("disconnect");
    })

    subscriber.connect(config.channel.addr)
    subscriber.subscribe(config.channel.pub_name)
}


module.exports = {
    startProxyListener: startProxyListener
}
