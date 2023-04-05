const projectModel = require('src/model/projectModel')
const realTimeModel = require('src/model/realTimeModel')
const dateTehran = require('src/library/dateTehran')
const station = require('src/library/station')

module.exports = new class projectController {

    async index(req, res) {
        let projects = await projectModel.find()
        
        return res.json({
            data : {
                project : projects.map( (rows) => {
                    return {
                        _id: rows._id,
                        id_project: rows.id_project,
                        temperature: rows.temperature,
                        humidity: rows.humidity,
                        situation: rows.situation.length != 0 ? station.find_station(rows.situation[rows.situation.length - 1].id).name : '-',
                        work: rows.work,
                    }
                }),
                stations: station.stations()
            }
        })
        
    }

    show(req, res) {
        let id_project = req.params.id_project

        projectModel.findOne({id_project} , async (err , project) => {
            if(err || project==null){
                return res.status(404).json({
                    message: "اطلاعات پروژه یافت نشد"
                })
            }
            return res.json({
                data: {
                    project : {
                        id_project: project.id_project,
                    },
                    work : project.work.map(rows => {
                        return {
                            id: rows,
                            name: station.find_station(rows) ? station.find_station(rows).name : '-'
                        }
                    }),
                    stations : project.situation.map(rows => {
                        return {
                            id: rows.id,
                            name: station.find_station(rows.id) ? station.find_station(rows.id).name : '-',
                            time: rows.createdAt ? dateTehran.shamsi(rows.createdAt) : '-',
                        }
                    }),
                    
                    
                }
            })
        })
    }

    async store(req,res) {
        let id_project = req.body.id_project
        let temperature = req.body.temperature
        let humidity = req.body.humidity

        let checkUnique = await projectModel.exists({id_project})
        if(checkUnique){
            return res.status(404).json({
                message: "این کد رهگیری وجود دارد"
            })
        }
       
        new projectModel({
            id_project, temperature, humidity
        }).save(err => {
            if(err){
                return res.status(403).json({
                    message: "پروژه با این کد وجود دارد",
                })
            }
            return res.json({
                message: 'پروژه با موفقیت ذخیره شد',
            })
        })
        
    }

    delete(req,res) {
        let _id = req.body._id

        projectModel.deleteOne({_id}, (err, project) => {
            if (project == null) {
                return res.status(422).json({
                    message: 'همچین پروژه‌ای وجود ندارد'
                })
            }
            return res.json({
                message: 'پروژه با موفقیت حذف شد'
            })
        })

    }

    update(req, res) {
        let _id = req.body._id
        let id_project = req.body.id_project
        let temperature = req.body.temperature
        let humidity = req.body.humidity

        projectModel.findOneAndUpdate({_id}, {
            $set:{
                id_project, temperature, humidity
            }
        }, (err, project) => {
            console.log(err)
            if (project == null) {
                return res.status(422).json({
                    message: 'همچین پروژه‌ای وجود ندارد'
                })
            }
            return res.json({
                message: 'اطلاعات پروژه با موفقیت به روزرسانی شد'
            })
        });
    }

    update_work(req, res) {
        let _id = req.body._id
        let work = req.body.work

        projectModel.findOneAndUpdate({_id}, {
            $push:{
                work: work
            }
        }, (err, project) => {
            console.log(err)
            if (project == null) {
                return res.status(422).json({
                    message: 'همچین پروژه‌ای وجود ندارد'
                })
            }
            return res.json({
                message: 'اطلاعات پروژه با موفقیت به روزرسانی شد'
            })
        });
    }
    
    async countDown_check(req, res) {
        let temperature = []
        let humidity = []

        let join = await projectModel.aggregate([
            {
                $lookup: {
                    from: "realTime",
                    localField: "id_project",
                    foreignField: "id_project",
                    as: "b"
                }
            }
        ])
        join.map(rows => {
            if(rows.b[0]){
                if (parseFloat(rows.temperature) > parseFloat(rows.b[0].temperature)) {
                    temperature.push({
                        'id_project': rows.id_project,
                        'temp': rows.temperature,
                        'realTemp': rows.b[0].temperature
                    })
                }
    
                if (parseFloat(rows.humidity) > parseFloat(rows.b[0].humidity)) {
                    humidity.push({
                        'id_project': rows.id_project,
                        'hum': rows.humidity,
                        'realHum': rows.b[0].humidity
                    })
                }
            }
            
        })
        
        return res.json({
            temperature, humidity
        })

        
    }


}