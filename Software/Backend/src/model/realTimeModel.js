const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RealTimeSchema = new Schema({
    id_project : { type : Number , required: true }, 
    temperature : { type : String , required: true }, 
    humidity : { type : String , required: true }, 
})


module.exports = mongoose.model('RealTime', RealTimeSchema, 'realTime')