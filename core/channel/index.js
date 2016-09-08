const zmq = require('zmq');
const subscriber = zmq.socket('sub')
const config = require('../config')
const messageModel = require('../model/message-model')

const proxyChannel = {
    init: function(){
        subscriber.subscribe(config.channel.pub_name)
        subscriber.connect(config.channel.addr)
    },

    listen: function(io){
        console.log("Listening notifications from " + config.channel.pub_name + " channel.");

        io.on('connection', function(socket){
            console.log("Web Client connected!");
        });

        subscriber.on('disconnect', function(){
            console.log("Disconnected from channel.");
        });

        // listens for messages from the proxy
        subscriber.on('message', function(){
            let messages = [];
            console.log("message");
            // creates the message object
            Array.prototype.slice.call(arguments)
            .forEach(function(arg){
                messages.push(arg.toString());
            });

            console.log(messages);

            // Message object:
            //  {
            //      msgID : {string}
            //      Source : {string}
            //      Target : {string}
            //      d8 : {string}
            //      d16 : {string}
            //      d32 : {string}
            //  }
            let jsonMessage = JSON.parse(messages[1]);

            let messageToSave = {
                // "id_sensor" : jsonMessage["Source"],
                "id_sensor" : 562, // TODO remove hardcoding
                "number" : jsonMessage["msgID"],
                "target": jsonMessage["Target"],
                "content": jsonMessage["d8"].concat(jsonMessage["d16"]).concat(jsonMessage["d32"])
            }

            // saves message to database
            messageModel.add(messageToSave)
            .then(m => {
                io.emit('log:message', m);
            });

            // sends message to client
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
