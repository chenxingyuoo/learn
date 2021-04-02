/**
 * Created by chenxingyu on 2017/5/6.
 */
var connect = require('connect');
var http = require('http');

var app = connect();

const request = require('xhr-request');

request('https://api.github.com/users/mattdesl/repos', {
    json: true
}, (err, data) => {
    if (err) throw err;

console.log(data);
});

debugger;
// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// respond to all requests
app.use(function(req, res){
    res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
app.listen(3000, function (){
    console.log('127.0.0.1:3000');
});
// http.createServer(app).listen(3000);

