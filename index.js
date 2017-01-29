var express = require('express');
var server = express();

server.use(express.static('client'));

server.get('/data', function (request, response) {
    response.json({test:2});
});

server.listen(3000, function () {
    console.log('Server started!');
});