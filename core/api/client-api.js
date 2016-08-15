function clientApi(app){

    app.get('/check', (req, res) => res.status(200).send("Welcome to the public API!"))

    // serves the index.html
    app.get('/', (req, res, next) => {
        res.sendFile(__dirname + "/../public/index.html")
    })

}

module.exports = clientApi;
