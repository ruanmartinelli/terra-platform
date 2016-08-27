const controller = require('../controller')
const upload = require('multer')();
const request = require('request-promise');


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

    app.post('/api/bytecode/new', upload.single('code'), (req, res, next) => {
        let api_lua = "";
        let file_content = req.file.buffer.toString('utf8');

        request.post(api_lua, file_content)
        .then(response => {
            console.log("Response");
            res.send({success: true, content: file_content});
        })
        .catch(error => {
            res.send({success: false, error: error});
        })


    })
}

module.exports = clientApi;
