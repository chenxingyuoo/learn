import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';
import * as getters from './getters';
import * as actions from './actions';

Vue.use(Vuex);

/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */

//单一状态树
const state = {
  commentsInfo: '',
  comments: [],
  listname: {
    name: '欢迎来到我的博客',
    id: '',
    index: 0,
  },
  webinfo: '',
  friendLink: '',
  me: '',
  image: '',
  recommend: [],
  topicTabs: [],
  topicLists: [],
  currentTab: '',
  currentPage: '',
  topic: '',
  isSearch: false,
  hint: {
    show: false,
    colorRed: false,
    info: '正在加载中...',
  },
  fileId: '',
};


//实际改变 状态(state) 的唯一方式是通过 提交(commit) 一个 mutation
const mutations = {
  // 获取推荐位成功
  FETCH_RECOMMEND_SUCCESS(state, recommend, topicTab, page) {
    state.hint.show = false;
    state.recommend = recommend;
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  // 获取文章列表成功
  FETCH_TOPIC_LISTS_SUCCESS(state, topicLists, topicTab, page, isSearch) {
    state.hint.show = false;
    state.topicLists = topicLists;
    state.currentTab = topicTab;
    state.currentPage = page;
    state.isSearch = isSearch || false;
  },
  // 获取文章列表失败
  FETCH_TOPIC_LISTS_FAILURE(state, topicTab, page) {
    state.showWelcome = true;
    state.hint = {
      show: true,
      info: '获取文章列表失败',
      colorRed: true,
    };
    state.currentTab = topicTab;
    state.currentPage = page;
  },
  // 获取某一文章成功
  FETCH_TOPIC_SUCCESS(state, topic) {
    state.fileId = topic.fileId;
    state.hint.show = false;
    state.topic = topic;
    state.topic.content = decodeURIComponent(state.topic.content);
  },
  // 获取图片成功
  FETCH_IMG_SUCCESS(state, img) {
    // debugger;
    if (img === undefined) {
      state.image.url = 'http://pic.qiantucdn.com/58pic/15/36/43/60d58PICgBI_1024.jpg';
      state.image.name = '只有正直的人才能读取到';
    } else {
      state.image = img;
    }
  },
  // 获取图片失败
  FETCH_IMG_FAILURE(state) {
    state.image.url = 'http://pic.qiantucdn.com/58pic/15/36/43/60d58PICgBI_1024.jpg';
    state.image.name = '只有正直的人才能读取到';
  },
  // 获取文章失败
  FETCH_TOPIC_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取文章内容失败',
      colorRed: true,
    };
  },
  // 获取文章评论成功
  FETCH_COMMENTS_SUCCESS(state, comments) {
    state.comments = comments;
  },
  // 获取文章评论失败
  FETCH_COMMENTS_FAILURE(state) {
    state.comments = [];
  },
  // 设置文章评论成功
  SET_COMMENTS_SUCCESS(state, newComments) {

    newComments.updatedAt = newComments.createdAt;

    /* eslint-disable brace-style */
    const  ls = localStorage;
    if (typeof(Storage) !== 'undefined')
    {
      ls.nickname = newComments.nickname;
      ls.email = newComments.email;
    }
    /* eslint-enable brace-style */
    state.comments.push(newComments);

    //将评论存到本地
    if(!ls['comments']){
      ls['comments'] = JSON.stringify({});
    }
    const comments = JSON.parse(ls['comments']);
    if(ls['comments'] && !comments['article_' + newComments.articleId]){
      comments['article_' + newComments.articleId] = [];
    }

    comments['article_' + newComments.articleId].push(newComments);
    ls['comments'] = JSON.stringify(comments);

    state.commentsInfo = '评论成功';
  },
  // 设置文章评论失败
  SET_COMMENTS_FAILURE(state) {
    state.commentsInfo = '评论失败';
  },
  // 获取用户信息成功
  FETCH_USER_SUCCESS(state, info) {
    state.hint.show = false;
    state.user = info;
  },
  // 获取用户信息失败
  FETCH_USER_FAILURE(state) {
    state.hint = {
      show: true,
      info: '获取用户信息失败',
      colorRed: true,
    };
  },
  // 获取SEO
  FETCH_WEBINFO_SUCCESS(state, data) {
    state.webinfo = data;
  },
  // 获取我的信息
  FETCH_ME_SUCCESS(state, data) {
    state.me = data;
  },
  // 获取友情链接
  FETCH_FRIEND_SUCCESS(state, data) {
    state.friendLink = data;
  },

  // 初始化hint
  INIT_HINT(state, topicTabs) {
     //debugger
    state.topicTabs = topicTabs || state.topicTabs;
    state.hint.show = false;
    state.hint.colorRed = false;
    state.hint.info = '正在加载中...';
  },
  // 显示hint
  SHOW_HINT(state) {
    // debugger
    state.hint.show = true;
  },
  // 显示标题
  LIST_NAME(state, listname) {
    //debugger;
    state.listname.name = listname.name == '全部' ? '欢迎来到我的博客' : listname.name;
    state.listname.id = listname.categoryID;
    state.listname.index = listname._index;
  },
};


//所有 Vuex 应用的中心就是 store（状态存储）
//store” 本质上是一个保存应用状态的容器。这里有两件要点，让 Vuex store 区别于普通全局对象：

//Vuex store 是响应式的。当 Vue 组件从 store 读取状态，如果 store 中的状态更新，它们也会高效地响应更新。

//你不能直接更改 store 中的状态。更改状态的唯一的方法就是显式 提交更改 (committing mutations)。
//这样可以确保每次状态更改都留有可追踪的记录，并且可以使用工具帮助我们更好地理解我们的应用。

/* eslint-disable no-new */
export default new Vuex.Store({
  actions,
  state,
  getters,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares,
});
