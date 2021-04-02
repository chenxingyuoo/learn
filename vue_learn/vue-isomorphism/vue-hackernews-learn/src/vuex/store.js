/**
 * Created by chenxingyu on 2016/12/9.
 */
import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';
import * as getters from './getters';
import * as actions from './actions';

Vue.use(Vuex);


//定义单一状态树
const state = {
  topicTabs: [{
    name: '全部',
    ename: 'all',
  }, {
    name: '精华',
    ename: 'good',
  }, {
    name: '分享',
    ename: 'share',
  }, {
    name: '问答',
    ename: 'ask',
  }, {
    name: '招聘',
    ename: 'job',
  }],
  topicLists: [],
  topic: '',
  token: '',
  tokenAvail: false,
  user: '',
  loginUser: '',
  collection: new Set(),
  inCollection: false,
  msgCount: 0,
  messages: [],
};

//实际改变 状态(state) 的唯一方式是通过 提交(commit) 一个 mutation
const mutations = {
  // 获取文章列表成功
  FETCH_TOPIC_LISTS_SUCCESS(state, data) {
    state.topicLists = data.data;
    state.currentTab = data.topicTab;
    state.currentPage = data.currentPage;
  },
  // 获取文章成功
  FETCH_TOPIC_SUCCESS(state, topic){
    state.topic = topic;
  },
  // 获取收藏文章列表成功
  FETCH_COLLECTION_SUCCESS(state, topicLists) {
    topicLists.forEach((value) => {
      state.collection.add(value.id);
    });
  },
  //加入收藏成功
  ADD_COLLECTION_SUCCESS(state, id){
    state.collection.add(id);
  },
  // 取消收藏成功
  DE_COLLECTION_SUCCESS(state, id) {
    state.collection.delete(id);
  },
  // 改变收藏状态
  CHANGE_COLLECT_STATUS(state, status) {
    state.inCollection = status;
  },
};


//所有 Vuex 应用的中心就是 store（状态存储）
//store” 本质上是一个保存应用状态的容器。这里有两件要点，让 Vuex store 区别于普通全局对象：

//Vuex store 是响应式的。当 Vue 组件从 store 读取状态，如果 store 中的状态更新，它们也会高效地响应更新。

//你不能直接更改 store 中的状态。更改状态的唯一的方法就是显式 提交更改 (committing mutations)。
//这样可以确保每次状态更改都留有可追踪的记录，并且可以使用工具帮助我们更好地理解我们的应用。

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: process.env.NODE_ENV !== 'production',
  middlewares,
});
