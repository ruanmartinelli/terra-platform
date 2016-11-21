const config = {
    "development": {
        "app": {
            "port": 7000,
            "host": '127.0.0.1:9000',
            "env": 'DEVELOPMENT',
            "passwordResetExpires": 3600000
        },
        "db":{
            "host" : "localhost",
            "database": "terra-db",
            "user": "root",
            "password": "",
        },
        "channel":{
            "pub_name": "test",
            "addr":"tcp://172.20.72.42:5563"
        }
    }
}

module.exports = config.development
// module.exports = process.env.NODE_ENV == "production"? config.production : config.development;
