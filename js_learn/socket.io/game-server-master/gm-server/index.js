var app = require('http').createServer()
var io = require('socket.io')(app);
var port = 3000;
var users = {}

app.listen(port,function(){
	console.log('gm-server is listening %s ...',port)
});

io.on('connection',function(socket){
	console.log('conn!!')
	socket.emit('conn','ok')
	var i = 0;
	var heartTimer = setInterval(function(){
		i++;
		var data = {_timestamp:new Date().getTime(),_index:i}
		socket.emit('heart',data)
	},100)

	socket.on('join',function(data){
		console.log(data)
		var _start =new Date().getTime();
		socket.join(data.room)
		users[socket.id] = {room:data.room,account:data.account}
		var _end = new Date().getTime();
		io.sockets.in(data.room).emit('join',{room:data.room,data:data,_time:_end-_start,_id:socket.id})
	})

	socket.on('post',function(data){
		console.log(data)
		var _data = {room:data.room,content:data.content,from_id:socket.id,from_account:users[socket.id].account}
		console.log(_data)
		io.sockets.in(data.room).emit('message',_data)
	})
})

