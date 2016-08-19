const zmq = require('zmq');
const subscriber = zmq.socket('sub')
const config = require('../config')
// var io// = require('socket.io');

const proxyChannel = {
    init: function(io){
        // io = require('socket.io')(require('http').createServer(app));
        subscriber.subscribe(config.channel.pub_name)
        subscriber.connect(config.channel.addr)

        subscriber.on('disconnect', function(){
            console.log("Disconnected from channel.");
        })
    // },
    // listen: function(){
        console.log("Listening notifications from " + config.channel.pub_name + " channel.");

        io.on('connection', function(socket){
            console.log("Web Client connected!");
        });

        subscriber.on('message', function(){
            let messages = [];

            Array.prototype.slice.call(arguments).forEach(function(arg) {
                messages.push(arg.toString());
            });
            console.log(messages);

            let jsonMessage = JSON.parse(messages[1]);
            // TODO Save message to db;
            // TODO emit message via socket;
            io.emit('new_data', messages[1]);
        });
    }
}



const droolsChannel = {
    init: function(){
        subscriber.subscribe(config.channel.pub_name)
        subscriber.connect(config.channel.addr)

        subscriber.on('disconnect', function(){
            console.log("Disconnected from channel.");
        })
    },
    listen: function(){
        console.log("Listening notifications from " + config.channel.pub_name + " channel.");
        subscriber.on('message', function(){
            let messages = [];

            Array.prototype.slice.call(arguments).forEach(function(arg) {
                messages.push(arg.toString());
            });
            console.log(messages);
        });
    }
}

module.exports = {
    proxy: proxyChannel,
    drools: droolsChannel
}
