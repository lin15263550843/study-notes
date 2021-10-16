import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import About from './views/other/About.vue';

import 'ant-design-vue/dist/antd.css';

console.log('App--------------------------------->>>', App);
const app = createApp(App).use(store).use(router).use(Antd).component('About', About);

// (app.config as any).productionTip = false;

export default app.mount('#app');

// import './views/test/test';

// console.log('createApp--------------------->>>', createApp);
console.log('app--------------------------------->>>', app);
