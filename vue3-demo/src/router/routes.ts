/**
 * 路由表
 */

import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import RouterView from '@/components/RouterView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
        redirect: '/js',
        children: [
            {
                path: '/js',
                name: 'javaScript',
                redirect: '/js/test/example',
                meta: { title: 'javaScript' },
                component: RouterView,
                children: [
                    {
                        path: 'test',
                        name: 'test',
                        redirect: '/js/test/example',
                        meta: { title: '测试' },
                        component: RouterView,
                        children: [
                            {
                                path: 'example',
                                name: 'example',
                                meta: { title: '示例' },
                                component: () =>
                                    import(/* webpackChunkName: "javascript" */ '@/views/javascript/example.vue'),
                            },
                            {
                                path: 'exercise',
                                name: 'exercise',
                                meta: { title: '习题' },
                                component: () =>
                                    import(/* webpackChunkName: "javascript" */ '@/views/javascript/exercise.vue'),
                            },
                        ],
                    },
                ],
            },
            {
                path: '/sf',
                name: 'algorithm',
                redirect: '/sf/algorithmDiagram',
                meta: { title: '算法' },
                component: RouterView,
                children: [
                    {
                        path: 'algorithmDiagram',
                        name: 'algorithmDiagram',
                        redirect: '/sf/algorithmDiagram/binarySearch',
                        meta: { title: '算法图解' },
                        component: RouterView,
                        children: [
                            {
                                path: 'binarySearch',
                                name: 'binarySearch',
                                meta: { title: '二分查找' },
                                component: () =>
                                    import(
                                        /* webpackChunkName: "algorithmDiagram" */ '@/views/algorithmDiagram/BinarySearch.vue'
                                    ),
                            },
                            {
                                path: 'selectSort',
                                name: 'selectSort',
                                meta: { title: '选择排序' },
                                component: () =>
                                    import(
                                        /* webpackChunkName: "algorithmDiagram" */ '@/views/selectSort/selectSort.vue'
                                    ),
                            },
                            {
                                path: 'quickSort',
                                name: 'quickSort',
                                meta: { title: '快速排序' },
                                component: () =>
                                    import(
                                        /* webpackChunkName: "algorithmDiagram" */ '@/views/quickSort/quickSort.vue'
                                    ),
                            },
                            {
                                path: 'breadthFirstSearch',
                                name: 'breadthFirstSearch',
                                meta: { title: '广度优先搜索' },
                                component: () =>
                                    import(
                                        /* webpackChunkName: "algorithmDiagram" */ '@/views/breadthFirstSearch/breadthFirstSearch.vue'
                                    ),
                            },
                            {
                                path: 'dijkstrasAlgorithm',
                                name: 'dijkstrasAlgorithm',
                                meta: { title: '狄克斯特拉算法' },
                                component: () =>
                                    import(
                                        /* webpackChunkName: "algorithmDiagram" */ '@/views/dijkstrasAlgorithm/dijkstrasAlgorithm.vue'
                                    ),
                            },
                            {
                                path: 'greedyAlgorithm',
                                name: 'greedyAlgorithm',
                                meta: { title: '贪婪算法' },
                                component: () =>
                                    import(
                                        /* webpackChunkName: "algorithmDiagram" */ '@/views/greedyAlgorithm/greedyAlgorithm.vue'
                                    ),
                            },
                        ],
                    },
                ],
            },
            // {
            //     path: 'algorithmDiagram/binarySearch',
            //     name: 'binarySearch',
            //     component: () =>
            //         import(/* webpackChunkName: "algorithmDiagram" */ '@/views/algorithmDiagram/BinarySearch.vue'),
            // },
        ],
    },
    // { path: '/', name: 'main', redirect: '/home' },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
];
export default routes;
