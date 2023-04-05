const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    id_project : { type : Number , index: true, unique: true, required : true } , 
    temperature : { type : Number , required: true } , 
    humidity : { type : Number , required: true } , 
    situation : [{
        id: { type : Number , required : true },
        createdAt : { type : Date , default : Date.now, required : true},
    }] , 
    work : { type : Array, default: null } , 
})


module.exports = mongoose.model('Project', ProjectSchema, 'project')