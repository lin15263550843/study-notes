import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: '首页', data: { x: 123 } },
        beforeEnter: (to, from, next) => {
            console.log('【路由独享守卫】【beforeEnter】to , form , next ----------->>>', to, from);
            next();
        },
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    console.log('【全局前置守卫】【beforeEach】to , form , next ------------>>>', to, from);
    // 可以用来登录验证，权限校验什么的
    next();
});

router.beforeResolve((to, from, next) => {
    console.log('【全局解析守卫】【beforeResolve】to , form , next --------->>>', to, from);
    next();
});

router.afterEach((to, from, next) => {
    console.log('【全局后置守卫】【afterEach】to , form , next ------------->>>', to, from, next); // next 为 undefined
    // 可以设置 浏览器 title ，让页面滚动到顶部等操作
});

export default router;
