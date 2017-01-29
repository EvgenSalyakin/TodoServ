var express = require('express');
var db = require('./server/db');
var parser = require('body-parser');
var server = express();

server.use(parser.urlencoded());
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
db.connect('mongodb://localhost:27017/todo-db', function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        server.listen(3000, function() {
            console.log('Server started! Listening on port 3000...');
        })
    }
});