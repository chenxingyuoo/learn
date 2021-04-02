<template>
    <div id="chat-room">
        <h1>[{{room}}]: welcome {{account}}</h1>
        <div id="main">
            <ul>
                <li v-for="message in room_messages">
                    {{message.from_account}}:{{message.content}}
                </li>
            </ul>
        </div>
        <div id="post_block">
            <input v-on:keyup.enter="post_btn" v-model="content" >
            <button v-on:keyup.enter="post_btn" @click="post_btn">发送</button>
        </div>
    </div>
</template>
<script>
import {get_account,get_room,get_messages} from '../vuex/getters'
import {post_message} from '../vuex/actions'

export default {
    data(){
        return {
            content:''
        }
    },
    vuex:{
        getters:{
            account:get_account,
            room:get_room,
            messages:get_messages
        },
        actions:{
            post_message
        }
    },
    methods:{
        post_btn(){
            this.post_message(this.room,this.content)
            this.content= ''
        }
    },
    computed:{
        room_messages:{
            get(){
                return this.messages[this.room]
            }
        }
    }
}
</script>
<style scoped>
    #chat-room {
        width: 500px;
        margin:0 auto;
        text-align: left;
    }

    #main{
        width:100%;
        height:400px;
        overflow: scroll;
        font-size:10px;
        text-align: left;
        background-color: #f2f2f2;
    }

    #post_block{
        float:right;
        width:200px;
        height:100px;
    }
</style>