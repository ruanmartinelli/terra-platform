const controller = require('../controller')

function clientApi(app){

    app.del = app.delete;

    // serves the index.html
    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + "/../public/index.html")
    })

    app.get('/api/check', (req, res) => res.status(200).send("Welcome to the public API!"))

    app.get ('/api/sensors/:sensor_id', controller.sensor.get); // OK
    app.post('/api/sensors/new',        controller.sensor.add); // OK
    app.post('/api/sensors/',           controller.sensor.find); // OK
    app.put ('/api/sensors/',           controller.sensor.update);
    app.del ('/api/sensors/:sensor_id',   controller.sensor.delete);
}

module.exports = clientApi;
