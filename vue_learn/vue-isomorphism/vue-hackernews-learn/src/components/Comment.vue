<template>
  <div class="panel" v-if="topic.reply_count !== 0">
    <div class="header">
      {{ topic.reply_count }}条评论
    </div>
    <div class="cell" v-for="reply in topic.replies">
      <div class="author-content">
        <a>
          <img :src="reply.author.avatar_url" alt="avatar">
        </a>
        <div class="author-info">
          <a >{{ reply.author && reply.author.loginname }}</a>
          <span>{{reply.create_at | timeToNow }}</span>
          <div class="user-action">
            <a @click.prevent.stop="toStar(reply)"><i class="fa fa-thumbs-o-up"></i> {{ reply.ups.length }}</a>
            <a @click.prevent.stop="replyOne(reply)"><i class="fa fa-reply"></i></a>
          </div>
        </div>
      </div>
      <div class="comment-content markdown-body" v-html="reply.content"></div>
    </div>
  </div>
</template>

<script>
  const MarkdownIt = require('markdown-it');
  import { mapGetters , mapActions } from 'vuex';
    export default {
      data() {
        return {
          editor: '',
          rid: '',
        };
      },
      beforeMount(){
        if (this.token) {
          this.editor = new Editor();
          this.editor.render();
        }
      },
      computed: {
        ...mapGetters({
          topic: 'getTopic',
          token: 'getToken',
          loginUser: 'getLoginUser',
        })
      },
      methods: {
        ...mapActions([
          'star',
          'reply',
        ]),

        toStar(r){
          const starObject = {
            replyId : r.id,
            token : this.token
          };
          this.star(starObject)
            .then((v) => {
              if (v === 'up') {
                r.ups.push(reply.id);
              }
              if (v === 'down') {
                // 随便移除一个值，让 reply.ups.length - 1
                r.ups.pop();
              }
            })
            .catch((e) => console.log(e));
        }
      }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .author-content {
    font-size: 12px;
    float left
    & > a {
      float: left;
    }
  }

  .author-info {
    height: 30px;
    line-height: 30px;
    margin-left: 40px;

    span {
      color: #08C;
    }

  }

  .user-action {
    float: right;
    a {
      margin: 0 5px;
      color: #AAA;

      &:hover {
        color: #333;
      }
    }
  }

  .comment-content {
    float: left;
    width: 70%;
  }

  .panel
    .header
      background-color: #f6f6f6;
      border-radius: 3px 3px 0 0;
      padding: 10px;
    .cell
      padding-right: 10px;
      background: #fff;
      border-top: 1px solid #f0f0f0;
      overflow: hidden;
      img
        width 120px
</style>
