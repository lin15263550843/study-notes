<template>
    <section class="home my-layout my-layout-has-sider">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
        <aside class="my-sider">
            <div class="my-sider-children">
                <div class="logo"></div>
                <a-menu
                    class="menu"
                    mode="inline"
                    v-model:selectedKeys="selectedKeys"
                    v-model:openKeys="openKeys"
                    @select="selectMenu"
                >
                    <a-sub-menu v-for="item in siderList" :key="item.path">
                        <template #title>
                            <span>
                                <user-outlined />
                                <span>{{ item.meta.title }}</span>
                            </span>
                        </template>
                        <a-menu-item v-for="item2 in item.children" :key="`${headerPath}/${item.path}/${item2.path}`">
                            <span>{{ item2.meta.title }}</span>
                        </a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </div>
        </aside>
        <section class="my-layout">
            <header class="my-header">
                <a-menu
                    class="header-menu"
                    theme="light"
                    mode="horizontal"
                    v-model:selectedKeys="selectedKeys1"
                    @select="selectHeaderMenu"
                >
                    <a-menu-item v-for="item in menuList" :key="item.path">{{ item.meta.title }}</a-menu-item>
                </a-menu>
            </header>
            <main class="my-content">
                <router-view />
            </main>
            <footer class="my-footer">footer</footer>
        </section>
    </section>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
// import { ref } from 'vue';
import { defineComponent, ref, h } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import routes from '@/router/routes';

// import Button from 'ant-design-vue/lib/button';
// import Layout from 'ant-design-vue/lib/layout';
// import 'ant-design-vue/lib/button/style';
// import 'ant-design-vue/lib/layout/style';

// @Options({
//     components: {UserOutlined,
//     LaptopOutlined,
//     NotificationOutlined},
// })
// export default class Home extends Vue {
//     /**
//      * 左侧菜单栏缩放
//      */
//     private collapsed = false;

//     private setup() {
//         return {
//             selectedKeys: ref<string[]>(['2']),
//             collapsed: ref<boolean>(false),
//             openKeys: ref<string[]>(['sub1']),
//         };
//     }
// }
export default defineComponent({
    components: {
        UserOutlined,
        // LaptopOutlined,
        // NotificationOutlined,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data(): any {
        return {
            menuList: routes[0].children || [],
            siderList: [],
            headerPath: '/js',
        };
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setup() {
        // let refString = ref('string');
        // refString = ref('string 222');
        // refString.value = 'string 333';
        // // refString = 'string 222';
        // console.log('refString-------------', refString);
        return {
            selectedKeys: ref<string[]>([]),
            selectedKeys1: ref<string[]>([]),
            collapsed: ref<boolean>(false),
            openKeys: ref<string[]>([]),
        };
    },
    methods: {
        /**
         * 左侧导航栏
         */
        selectMenu({ key }: unknown) {
            this.$router.push(key);
        },
        /**
         * 顶部导航栏
         */
        selectHeaderMenu({ key }: unknown) {
            this.headerPath = key;
            this.siderList = this.menuList.find((item: any) => item.path === key)?.children || [];
            this.openKeys = [this.siderList[0]?.path];
            this.selectedKeys = [this.siderList[0]?.children[0]?.path];
            this.$router.push(key);
        },
    },
    created() {
        this.selectedKeys1 = [this.menuList[0].path];
        this.siderList = this.menuList[0]?.children || [];
        this.openKeys = [this.siderList[0]?.path];
        this.selectedKeys = [this.siderList[0]?.children[0].path];
    },
});
</script>
<style scoped lang="less">
.home {
    height: 100%;
    // background: white;
    background: white;
}

.my-layout {
    flex: auto;
    display: flex;
    flex-flow: column nowrap;
    // flex-direction: row;
    // flex-wrap: nowrap;
    justify-content: flex-start;
    box-sizing: border-box;

    .my-sider {
        flex: 0 0 200px;
        width: 200px;
        max-width: 200px;
        min-width: 200px;
        display: block;

        .my-sider-children {
            // height: 100%;
            // background: white;
            // background: #1890ff;
            // 阻止子元素撑开父元素
            margin-top: -0.1px;
            padding-top: 0.1px;
            height: 100%;
            box-shadow: 0 1px 4px #f0f0f0;
            border-right: 1px solid #f0f0f0;

            .logo {
                height: 32px;
                margin: 16px;
                background: #1890ff;
            }

            .menu {
                box-shadow: -1px 0 4px #f0f0f0;

                .ant-menu-inline,
                .ant-menu-vertical,
                .ant-menu-vertical-left {
                    border-right: none;
                }
            }
        }
    }

    .my-header {
        flex: 0 0 auto;
        // padding: 20px;
        // line-height: 50px;
        // background: white;
        box-shadow: 0 1px 4px #f0f0f0;

        .header-menu {
            height: 64px;
            line-height: 64px;
            background: white;
        }
    }
    .my-content {
        flex: 1 1 auto;
        // padding: 20px;
    }
    .my-footer {
        flex: 0 0 auto;
        padding: 20px;
        // background: white;
    }
}

.my-layout-has-sider {
    flex-direction: row;
}
</style>
