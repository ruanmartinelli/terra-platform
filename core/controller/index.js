const sensor = require('./sensor-controller');
const message = require('./message-controller');
const bytecode = require('./bytecode-controller');

module.exports = {
    sensor: sensor,
    message: message,
    bytecode: bytecode
}
