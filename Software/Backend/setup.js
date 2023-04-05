const express = require('express');
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors');
const mongoose = require('mongoose')

module.exports = class setup {
    constructor(){
        this.setupExpress()
        this.setupMongo()
        this.setupConfig()
        this.setupRoute()
    }

    setupExpress() {
        app.listen(config.port, () => {
            console.log(`server is run on port ${config.port}`)
       })
    }

    setupMongo() {
        mongoose.connect(config.database.url)
        mongoose.Promise = global.Promise
    }

    setupConfig() {
        app.use(express.static('public'))
        app.use(bodyparser.json())
        app.use(bodyparser.urlencoded({ extended : true }))
        app.use(cors({
            origin: '*'
        }));
    }

    setupRoute() {
        app.use(require('src/router'));
    }

}