import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  base: '/',
  history:{type:'hash'},
  title: '金哲羽的官网',
  routes: [
    { path: '/', redirect: '/index' },
    { path: "/login", component:'@/pages/User/login'},
    { path: '/index', component: '@/pages/index' },
    { path: '/product', component: '@/pages/Product' },
    { path: '/join', component: '@/pages/JoinUs' },
  ],

  proxy: {
    "/api": { // 标识需要进行转换的请求的url
      "target": "http://localhost:3000", // 服务端域名
      "changeOrigin": true, // 允许域名进行转换
      "pathRewrite": { '^/api': '' },

    }
  },
  fastRefresh: {},
  scripts: ['https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js'],
});
