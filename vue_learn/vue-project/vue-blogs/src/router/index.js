import Vue from 'vue';
import VueRouter from 'vue-router';
// import Vuex from 'vuex';

import {fetchMsgCount} from '../vuex/actions';
import {getToken} from '../vuex/getters';
import store from '../vuex/store';

import Index from '../views/page';
import Me from '../views/me';
import ArticleDetails from '../views/article_details';
import Welcome from '../views/welcome';

// console.log(Vuex);

Vue.use(VueRouter);

//实例化 VueRouter ， 配置参数
const router = new VueRouter({
  history: true,
  hashbang: false,
  transitionOnLoad: true,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        isindex: true,
      },
      isindex: true,
      hash : 'iiiii'
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
      isWelcome: true,
    },
    {
      path: '/article_details/:id',
      name: 'article_details',
      component: ArticleDetails,
      isArticleDetails: true,
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      isMe: true,
    },

  ]
});

router.beforeEach((route, redirect, next) => {
  document.body.scrollTop = 0;
  const token = getToken(store.state);
  if (token) {
    fetchMsgCount(store, token)
    /* eslint-disable no-console */
      .catch((e) => console.log(e));
    /* eslint-enable no-console */
  }
  if (route.auth) {
    if (token) {
      next();
    } else {
      const redirect = encodeURIComponent(route.path);
      redirect({name: 'login', query: {redirect}});
    }
  } else {
    next();
  }
});


export default router;
