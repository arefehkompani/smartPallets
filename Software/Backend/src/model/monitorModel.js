const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MonitorSchema = new Schema({
    temperature : { type : Number , required: true } , 
    humidity : { type : Number , required: true } , 
    situation : { type : String , default: null } , 
    createdAt : {type: Date , default : Date.now, required : true},
})


module.exports = mongoose.model('Monitor', MonitorSchema, 'monitor')