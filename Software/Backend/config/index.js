const database = require('config/database')

module.exports = {
     database,
     port: process.env.SERVER_PORT,
     secret_key: process.env.SECRET_KEY,
     protocol: process.env.SERVER_PROTOCOL,
}