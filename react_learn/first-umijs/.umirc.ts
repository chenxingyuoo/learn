import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/index' },
    { exact: true, path: '/posts', component: '@/pages/posts/index' },
    { exact: true, path: '/posts/list', component: '@/pages/posts/list' },
  ],
  fastRefresh: {},
});
