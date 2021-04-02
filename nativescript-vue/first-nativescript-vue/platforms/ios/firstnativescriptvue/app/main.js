const Vue = require('nativescript-vue');
// const App = require('./App');
const router = require('./router');
const http = require("http");
const TestUi = require('./components/test-ui/src');

global.process = {env: {}};

Vue.prototype.$http = http;

Vue.use(TestUi);

new Vue({
  router,
  // render: h => h(App),
  template: `
  <page>
    <router-view></router-view>
  </page>
  `
}).$start();
