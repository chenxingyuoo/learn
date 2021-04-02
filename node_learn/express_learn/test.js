/**
 * Created by mac on 16/6/30.
 */
var app = require('./expross')();
var http = require('http');


/*app.use('/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Worlds');
});*/

app.get('/', function(req, res) {
	console.log(req, res);
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.end('Hello World');
    res.sendFile(__dirname + './index.html');
});

app.route('/book')
    .get(function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Get a random book');
    });

app.listen(3000 , console.log('Listening at http://localhost:3000'));

