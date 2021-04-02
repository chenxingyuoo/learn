<template>
    <div id="join-form" v-on:keyup.enter="join_btn">
        <h1>多人聊天室</h1>
        <input @input="input_account" value="{{account}}" placeholder="用户名"><br/>
        <input @input="input_room" value="{{room}}" placeholder="房间名"><br/>
        <button  @click.prevent.stop="join_btn">进入房间</button>
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
<style>
    #join-form {
        width:500px;
        margin:0 auto;
        text-align: center;
    }
</style>