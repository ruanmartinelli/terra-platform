const zmq = require('zmq');
const subscriber = zmq.socket('sub')
const config = require('../config')
const messageModel = require('../model/message-model')
const OFFLINE_MSG = "OFFLINE";
const ONLINE_MSG = "ONLINE";
// more zmq events can be found at https://www.npmjs.com/package/zmq

const proxyChannel = {
    init: function(){
        subscriber.subscribe(config.channel.pub_name)
        subscriber.connect(config.channel.addr)
    },

    listen: function(io){
        var PROXY_CONNECTED = false;
        var WEB_CONNECTED = false;

        console.log("Listening notifications from " + config.channel.pub_name + " channel.");
        /* -- ZeroMQ -- */

        // monitors connection every 500ms
        subscriber.monitor(500, 0);

        // zmq events monitored
        subscriber.on('connect', (fd, ep) => {
            PROXY_CONNECTED = true;
            io.emit('status:proxy', [ONLINE_MSG, ep]);
        });

        subscriber.on('disconnect', function(fd, ep){
            PROXY_CONNECTED = false;
            io.emit('status:proxy', [OFFLINE_MSG, ep]);
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
                // "content": jsonMessage["d8"].concat(jsonMessage["d16"]).concat(jsonMessage["d32"])
                "content": jsonMessage["d16"].concat(jsonMessage["d32"]).concat(00)

            }

            // saves message to database
            messageModel.add(messageToSave)
            .then(m => {
                io.emit('log:message', m);
            });
            /* -- END ZeroMQ -- */



            /* -- WebSockets -- */
            io.on('connection', function(socket){
                socket.on('disconnect', function(){
                    WEB_CONNECTED = false;
                    io.emit('status:core', [OFFLINE_MSG, ""]);
                });
                console.log("Connected SOCKET");

                WEB_CONNECTED = true;
                io.emit('status:core', [ONLINE_MSG, ""]);

                if(PROXY_CONNECTED) io.emit('status:proxy', [ONLINE_MSG, ""]);
                if(!PROXY_CONNECTED) io.emit('status:proxy', [OFFLINE_MSG, ""]);
            });

            io.on('disconnect', function(socket){
                WEB_CONNECTED = false;
                io.emit('status:core', [OFFLINE_MSG, ""]);
            });
            /* -- END WebSockets -- */
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
