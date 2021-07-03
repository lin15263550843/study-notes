import { defineConfig } from 'umi';
import routes from './config/routes';

const openBrowser = require('open-browser-webpack-plugin');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  chainWebpack(config) {
    config
      .plugin('open-browser-webpack-plugin') // yarn dev 自动打开浏览器
      .use(openBrowser, [{ url: 'http://localhost:8888' }]); // 此处url与项目启动的url保持一致
  },
});
