import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import About from './views/other/About.vue';

import 'ant-design-vue/dist/antd.css';

// console.log('App--------------------------------->>>', App);
const app = createApp(App).use(store).use(router).use(Antd).component('About', About);

// (app.config as any).productionTip = false;

export default app.mount('#app');

// console.log('createApp--------------------->>>', createApp);
// console.log('app--------------------------------->>>', app);

/**
 * 测试
 */
// import './views/javascript/commons';
// import './views/test/test';
// import '@/test/heepPriorityQueueTest'; // 基于二叉堆的优先队列
// import '@/views/javascript/commons/functionExtension'; // 手写 apply、call、bind
// import '@/views/javascript/commons/functionExtensionJS'; // 适用于 es5 版本的手写 apply、call、bind
import '@/views/javascript/commons/myPromise'; // 手写 promise
