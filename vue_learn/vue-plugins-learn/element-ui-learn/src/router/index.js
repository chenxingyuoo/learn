import Vue from 'vue';
import Router from 'vue-router';


import Index from '@/views/Index.vue';

import Modal from '@/views/Modal.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/modal',
      name: 'Modal',
      component: Modal
    }
  ]
});
