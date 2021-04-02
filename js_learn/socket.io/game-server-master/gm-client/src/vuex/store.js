import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	token:'',
	account:'',
	room:'',
	socket:undefined,
	delay:0,
	messages:{}
}

const mutations = {
	CHANGE_SOCKET (state,socket){
		state.socket = {...socket}
	},
	CHANGE_ACCOUNT (state,account){
		state.account = account
	},
	CHANGE_ROOM (state,room){
		state.room = room
	},
	CHANGE_DELAY (state,delay){
		state.delay = delay
	},
	CHANGE_TOKEN (state,token){
		state.token = token
	},
	CHANGE_MESSAGES (state,data){
		if(state.messages[data.room] && state.messages[data.room].length){
			state.messages[data.room].splice(0,0,data)
		}else{
			console.log(data)
			var new_room = {}
			Object.defineProperty(new_room,data.room.toString(),{
				value: [],
			    writable: true,
			    enumerable: true,
			    configurable: true
			})
			console.log(new_room)
			state.messages = Object.assign({},state.messages,new_room)
			console.log(state.messages)
			state.messages[data.room].push(data)
		}
	}
}

export default new Vuex.Store({
	state,
	mutations
})