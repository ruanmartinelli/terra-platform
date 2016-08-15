const express   = require('express'),
    chalk       = require('chalk'),
    bodyParser  = require('body-parser');

const app = express();

const apis = require('./api'),
    config = require('./config'),
    channel = require('./channel');

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../public'));

// initializes listeners
channel.startProxyListener(app);

// add new apis here
apis.clientApi(app);

// middleware for error-handling
app.use((err, req, res, next) => {
    // logs error to the console
    console.error("Caught error: ", err.stack);

    if(req.xhr){
        // handles client errors
        res.status(500).send("Oops! Something failed.")
    }else{
        // catch-all error handler
        res.status(500).render({error: err})
    }
})

// starts up the server
app.listen(config.app.port);
console.log(chalk.bgRed("Server listening on port: "+ config.app.port));
