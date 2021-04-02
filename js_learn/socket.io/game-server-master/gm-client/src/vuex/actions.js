import io from 'io';
let socket;
import store from './store'
import router from '../main'

export const connect = ({dispatch}) =>{
	socket = io('http://localhost:3000')
	dispatch('CHANGE_SOCKET',socket)
	start_socket()
}

export const input_account = ({dispatch},e) => dispatch('CHANGE_ACCOUNT',e.target.value);

export const input_room = ({dispatch},e) => dispatch('CHANGE_ROOM',e.target.value);

export const join = ({dispatch},account,room)=>{
	socket.emit('join',{account,room})
}

export const post_message = ({dispatch},room,content) =>{
	socket.emit('post',{room:room,content:content})
}

function start_socket(){
	socket.on('conn',function(data){
		console.log(data)
	})

	socket.on('heart',function(_data){
		var data = {..._data,timestamp:new Date().getTime()}
		store.dispatch('CHANGE_DELAY',data.timestamp-data._timestamp)
	})

	socket.on('join',function(_data){
		store.dispatch('CHANGE_TOKEN',_data._id)
		router.go({name:'index'})
	})

	socket.on('message',function(_data){
		console.log(_data)
		store.dispatch('CHANGE_MESSAGES',_data)
	})
}