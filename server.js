var express = require('express');
var db = require('./server/db');
var parser = require('body-parser');
var server = express();

var port = (process.env.PORT || '3000');
var uristring =
    process.env.MONGODB_URI ||
    'mongodb://localhost:27017/todo-db';

//server.use(parser.urlencoded());
server.use(parser.json());
server.use(express.static('./client'));

server.post('/load', function (request, response) {
    let col = db.get().collection('records');
    let data;
    col.find().toArray(function (err,doc) {
        data = doc;
        response.json(data);
    });
});

server.post('/save', function (request, response) {
    data = request.body;
    let col = db.get().collection('records');
    col.remove({});
    col.insert(data);
    response.json({status:'ok'});
});

// Connect to Mongo on start
db.connect(uristring, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo. Use command: "sudo service mongod start" ');
        process.exit(1);
    } else {
        server.listen(port, function() {
            console.log('Server started! Listening on port ',port);
        })
    }
});
