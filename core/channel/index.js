const zmq = require('zmq');
const subscriber = zmq.socket('sub')
const config = require('../config')

const proxyChannel = {
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

            let jsonMessage = JSON.parse(messages[0]);

            // TODO Save message to db;
            // TODO emit message via socket;
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
