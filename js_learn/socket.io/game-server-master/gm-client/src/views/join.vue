<template>
	<div id="join-form">
		<input @input="input_account" value="{{account}}">
		<input @input="input_room" value="{{room}}">
		<button v-on:keyup.enter="join_btn" @click.prevent.stop="join_btn">连接服务器</button>
	</div>
</template>
<script>
import {input_account,join,input_room} from '../vuex/actions'
import {get_account,get_room} from '../vuex/getters'

export default {
	vuex:{
		actions:{
			input_account,
			join,
			input_room
		},
		getters:{
			account:get_account,
			room:get_room
		}
	},
	methods:{
		join_btn(){
			this.join(this.account,this.room)
		}
	}

}
</script>