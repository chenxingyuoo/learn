<template>
    <li class="news-item">
        <span class="hello" v-if="!item.author_id"></span>
        <router-link :to="{name : 'all'}" class="avatar">
            <img :src="item.author.avatar_url" alt="avator">
        </router-link>
        <span class="info-count" v-if="item.author_id">
              <span class="reply-count">{{ item.reply_count }}</span>
              <span class="seperator">/</span>
              <span class="visited-count">{{ item.visit_count }}</span>
        </span>
        <div class="last-time">
            <span>{{ item.last_reply_at | timeToNow }}</span>
        </div>
        <div class="topic-wrapper">
            <router-link :to="{name : 'post', params : { id : item.id } }" v-if="item.author_id">
                <span class="top" v-if="item.top">置顶</span>
                <span class="top" v-if="item.good">精华</span>
                <span class="top normal"
                      v-if="!item.top && !item.good && item.tab">{{ item.tab | transTab }}</span>
                {{ item.title }}
            </router-link>
        </div>
    </li>
</template>

<script>

    export default {
        props: ['item'],  //向父组件获取信息
        data() {
            return {};
        },
        components: {
        },
        created () {
        },
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .avatar {
        float: left;
    }

    .info-count {
        float: left;
        line-height: 30px;
        width: 70px;
        text-align: center;
        font-size: 12px;
    }

    .reply-count {
        color: #9e78c0;
        font-size: 13px;
    }

    .seperator {
        margin-left: -3px;
    }

    .last-time {
        float: right;
        font-size: 12px;
        line-height: 30px;

        img {
            width: 20px;
            height: 20px;
        }

        span {
            margin-left: 5px;
            text-align: right;
            min-width: 50px;
            display: inline-block;
        }
    }

    .top {
        background-color: #80BD01;
        font-size: .6em;
        padding: 3px;
        color: #FFF;
        border-radius: 3px;
    }

    .normal {
        background-color: #E5E5E5;
        color: #999;
    }

    .topic-wrapper {
        a {
            color: #333;
            line-height: 30px;
            overflow: hidden;
            vertical-align: middle;
            display: block;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .hello + a {
        margin-right: 20px;
    }

    @media (max-width: 512px) {
        body {
            font-size: 14px;
        }

        .topic-wrapper {
            a {
                display: inline-block;
                width: 90%;
            }
        }
    }
</style>
