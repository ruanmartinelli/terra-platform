const model = require('../model')

module.exports = {
    get: function(req, res, next){
        let id = req.params['sensor_id'];

        model.sensor.get(id)
        .then(result => res.send(result))
        .catch(next);
    },
    add: function(req, res, next){
        let sensor = req.body;

        model.sensor.add(sensor)
        .then(result => res.send(result))
        .catch(next);
    },
    update: function(req, res, next){
        let sensor = req.body;

        model.sensor.update(sensor)
        .then(result => res.send(result))
        .catch(next);
    },
    delete: function(req, res, next){
        let id = req.params['sensor_id'];

        model.sensor.delete(id)
        .then(result => res.sendStatus(200))
        .catch(next);
    },
    find: function(req, res, next){
        let filter = req.body;

        model.sensor.find(filter)
        .then(result => res.send(result))
        .catch(next);
    }
}
