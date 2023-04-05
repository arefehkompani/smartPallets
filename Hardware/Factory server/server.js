const express = require('express');
const app = express();
const WebSocketServer = require('websocket').server;
const http = require('http');
const mongoose = require('mongoose')
const realTimeModel = require('./src/model/realTimeModel')
const projectModel = require('./src/model/projectModel')
const monitorModel = require('./src/model/monitorModel')


mongoose.connect(`mongodb://127.0.0.1:27017/smartPallet`)
mongoose.Promise = global.Promise



var messageS = 'wait'
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8000, function() {
    console.log((new Date()) + ' Server is listening on port 8000');
});

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
      request.reject();
      console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
      return;
    }
    
    var connection = request.accept(null, request.origin)
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', async function(message) {
        if (message.type === 'utf8') {
            newValue = message.utf8Data
            splitID = newValue.split(':')
            id_station = splitID[0].split('-')
            id_project = id_station[1]
            situation = id_station[0]
            temp_hum = splitID[1].split('/')
            temperature = temp_hum[0]
            humidity = temp_hum[1]

            let checkUnique = await realTimeModel.exists({id_project})
            let project = await projectModel.findOne({id_project})
            if(project){
                if (project.situation.length == 0) {
                    await projectModel.updateOne({id_project}, {$push: {
                        situation: {
                            id: situation, 
                            createdAt: Date.now()
                        }
                    }})
                } else if (project.situation[project.situation.length - 1].id != situation){
                    await projectModel.updateOne({id_project}, {$push: {
                        situation: {
                            id: situation, 
                            createdAt: Date.now()
                        }
                    }})
                }
            }
            if(!checkUnique) {
                new realTimeModel({
                    temperature, humidity, id_project
                }).save(err => {
                    if(err){
                        return console.log('Error saving')
                    }
                    return console.log('Success Saving')
                })
            } else {
                realTimeModel.findOneAndUpdate({id_project}, {
                    $set:{
                        temperature, humidity
                    }
                }, (err, project) => {
                    if (project == null) {
                        return console.log('Error Updating')
                    }
                    return console.log('Success Updating')
                });
            }

            // Monitoring_Visualize1
            // new monitorModel({
            //     temperature, humidity, situation, createdAt: Date.now()
            // }).save(err => {
            //     if(err){
            //         return console.log('Error saving vis1')
            //     }
            //     return console.log('Success Saving vis1')
            // })

            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF("Hello from factory server");
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });



    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});


