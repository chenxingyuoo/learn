<template>
	<div class="content">
      <div class="panel">
          <ul class="panel-header" v-if="topicLists && !isSearch">
            <li v-for="(tab, index) in topicTabs" :class="index === selected ? 'link-active' : ''"  @click="update(index,tab.categoryID)">
              {{ tab.name }}
            </li>
          </ul>

        <transition name="fade">
          <hint v-if="hint.show"></hint>
          <c-list :items='topicLists' v-else></c-list>
        </transition>

      </div>
    </div>
</template>

<script>

    import { mapGetters, mapActions } from 'vuex';
    import Hint from '../components/hint'
    import cList from '../components/list'

    export default {
        data () {
            return {
            	 selected: 0,
            };
        },
        components : {
        	Hint,
          cList
        },

        computed : {
          ...mapGetters({
              isSearch: 'getSearch',
              topicTabs: 'getTopicTabs',
              topicLists: 'getTopicLists',
              hint: 'getHint',
              getlistname: 'getListname',
          })
        },
        created() {

          // 初始化hint
          this.initHint();
          // 显示hint
          this.showHint();
          // 获取栏目
          this.loginSuccuess();
          // 获取标签
          this.getRecommend();

//          debugger;

          // 获取文章列表
          if (this.getlistname.id) {
            this.selected = this.getlistname.index;
            this.fetchCategoryicLists(Number(this.getlistname.id));
          } else if (this.$route.params.recommend) {
            this.getRecommendOne(this.$route.params.recommend);
          } else {
            this.fetchTopicLists();
          }

        	// 初始化hint
//        	this.$store.dispatch('initHint')
//
//    	    // 显示hint
//    	    this.$store.dispatch('showHint')
//    	    // 获取栏目
//		    this.$store.dispatch('loginSuccuess')
//		    // 获取标签
//		    this.$store.dispatch('getRecommend')
//
//		    // 获取文章列表
//	         if (this.$store.getters.getListname.id) {
//		        this.$store.selected = this.$store.getters.getlistname.index;
//		        this.$store.fetchCategoryicLists(Number(this.$store.getters.getlistname.id));
//		      } else if (this.$route.params.recommend) {
//		        this.$store.getRecommendOne(this.$route.params.recommend);
//		      } else {
//		        this.$store.dispatch('fetchTopicLists');
//		      }
//
//
//		      this.topicLists = this.$store.getters.getTopicLists
//		      this.isSearch = this.$store.getters.getSearch
//		      this.topicTabs = this.$store.getters.getTopicTabs
//
//		      this.hint =  this.$store.getters.getHint

        },
        methods: {
          ...mapActions(
            [
              'initHint' ,
              'showHint',
              'loginSuccuess',
              'getRecommend',
              'getRecommendOne',
              'fetchCategoryicLists',
              'fetchTopicLists',
              'listName',
            ]),

          update(index, categoryId) {
//            debugger;

            // 初始化hint
            this.initHint();
            // 显示hint
            this.showHint();

            this.selected = index;

            if (!categoryId) {
              this.fetchTopicLists();
            } else {
              this.fetchCategoryicLists(Number(categoryId));
            }

            this.topicTabs[index]._index = index;
            this.listName(this.topicTabs[index]);
	        },
        },


    }
</script>

<style lang="scss" scoped>
  .content {
    float: left;
    width: 100%;
    min-height: 1px
  }
  .panel-header{
    overflow: hidden;
    background: #fff;
    margin-bottom: 20px;
    padding: 10px;
  li{
    position: relative;
    top:0;
    float: left;
    padding: 8px 15px;
    margin: 5px 10px;
    border-radius: 10px;
    box-shadow: 0 5px 0 #bbbbbb, 0 5px 3px rgba(0, 0, 0, 0.2);
    transition-property: all;
    transition-duration: .15s;
  &:hover{
     background: #eee;
     cursor: pointer;
   }
  &.link-active{
     top:5px;
     cursor: pointer;
     background: #676262;
     color: #fff;
     box-shadow: 0 2px 0 #bbbbbb, 0 3px 3px rgba(0, 0, 0, 0.2);
     transition-property: all;
     transition-duration: .15s;
   }
  }
  }

  .sider {
    float: left;
    width: 30%;
    box-sizing: border-box;
    padding-left: 20px;
    display: none;
  }

  @media (max-width: 512px) {
    .content {
      float: none;
      width: 100%;
    }
    .sider {
      float: none;
      width: 100%;
      padding-left: 0;
    }
  }

</style>
