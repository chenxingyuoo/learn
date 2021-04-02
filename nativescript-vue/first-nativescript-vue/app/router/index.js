/**
 * Created on 2018/4/19.
 */

'use strict';

const Vue = require('nativescript-vue');
const VueRouter = require('vue-router');
Vue.use(VueRouter);

const Recipe = require('../views/Recipe');
const Recipes = require('../views/Recipes');
const Home = require('../views/home')
const More = require('../views/more')
const Detail = require('../views/detail')
const Cinemas = require('../views/cinemas')

const router = new VueRouter({
  routes: [
    {path: '*', redirect: '/home'},
    {name: 'home', path: '/home', component: Home},
    {name: 'more', path: '/more', component: More},
    {name: 'detail', path: '/detail', component: Detail},
    {name: 'cinemas', path: '/cinemas', component: Cinemas},
    {path: '/recipes', component: Recipes},
    {path: '/recipe/:id', name: 'recipe', component: Recipe},
  ]
});

router.replace('/home');

module.exports = router;