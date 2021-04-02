<template>
<div id="home">
  <div>i am home</div>
  <div class="mb20">
    <router-link :to="{name: 'article_details' , params: { id: 'article1' } }" >
      跳去article1
    </router-link>
  </div>
  <div class="mb20">
    <router-link :to="{name: 'article_details' , params: { id: randomArticle } }" >
      跳去随机article
    </router-link>
  </div>
  <div class="mb20">
     跳去article
     <input type="text" v-model="article">
     <router-link :to="{name: 'article_details' , params: { id: article } }" >
      点击我
     </router-link>
  </div>
  <div class="get-list mb20" v-on:click="getList">点击获取文章列表</div>
  <div class="mb20">
    <div class="article-item" v-for="item in articleList" >
      <router-link :to="{name: 'article_details' , params: { id: item.id } }" class="article-link">
        跳去文章{{ item.id }}
      </router-link>
    </div>
  </div>
  <!--我是组件-->
  <hello class="mb20"></hello>
  <hello-one></hello-one>
</div>

</template>

<script>

  import alert from '../assets/js/alert';

  debugger;

  console.log(alert);

  //组件
  import Hello from '../components/Hello'
  import HelloOne from '../components/Hello'  //查看上面的组件大小写

  export default {
    data() {
        return {
          article : '',
          articleList : '',
          randomArticle : 'article' + Math.floor(Math.random() * 10)
        };
    },
    components: {  //组件
      Hello,
      HelloOne
    },
    methods : {    //方法
      getList () {
        let self = this;
        let type = "杂志类";
        let url = `../static/json/list.json?type=${type}`;


        this.$http.get(url).then((res)=> { // 响应成功回调
          let data = res.data;
          let text;

          if (data.code === 200) {
            text = "成功";
            self.articleList = data.data;
          } else {
            text = "失败";
          }

          alert.alertTwo(text);

        }, (res)=> {  // 响应错误回调
          alert.alertTwo('网络发生错误');
        });
      }
    }
  };
</script>

<style lang='scss' rel="stylesheet/scss">

  .mb20{
    margin-bottom: 20px;
  }
  .get-list{
    height: 40px;
    line-height: 40px;
    width: 200px;
    background-color: #42b983;
    margin: 0 auto;
    cursor: pointer;
  }

  .article-item{
    border:1px solid #ddd;
    .article-link{
      color: #000;
    }
  }
  .article-item:nth-child(2n){
    background-color: #fff;
  }
</style>
