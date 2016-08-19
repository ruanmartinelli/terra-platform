const dbConfig = {
    client: 'mysql',
    connection: {
        host     : config.development.db.host,
        user     : config.development.db.user,
        password : config.development.db.password,
        database : config.development.db.database
    },
    debug:true
}
const knex = require('knex')(dbConfig)

module.exports = knex;
