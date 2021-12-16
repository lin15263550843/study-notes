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
console.log('app--------------------------------->>>', app);

/**
 * 测试
 */
// import './views/javascript/commons';
// import '@/test/test';
// import '@/test/heepPriorityQueueTest'; // 基于二叉堆的优先队列
import '@/views/javascript/commons/functionExtension'; // 手写 apply、call、bind
// import '@/views/javascript/commons/functionExtensionJS'; // 适用于 es5 版本的手写 apply、call、bind
// import '@/views/javascript/commons/myPromise'; // 手写 promise
// import '@/test/parseUrlTest'; // 测试把 url 的拼接参数解析成对象
// import '@/test/binaryTreeSymbolTableTest'; // 基于二叉查找树的符号表
import '@/test/printBinaryTree'; // 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行
