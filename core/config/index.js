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
            "database": "",
            "user": "",
            "password": "",
        }
    }
}

module.exports = process.env.NODE_ENV == "production"? config.production : config.development;
