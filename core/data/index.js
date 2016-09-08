const config = require('../config')

const dbConfig = {
    client: 'mysql',
    connection: {
        host     : config.db.host,
        user     : config.db.user,
        password : config.db.password,
        database : config.db.database
    },
    debug:false
}
const knex = require('knex')(dbConfig)

module.exports = knex;
