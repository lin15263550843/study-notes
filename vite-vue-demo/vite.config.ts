import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.join(__dirname, './src'), // 定义路径别名
            // vue: 'vue/dist/vue.esm-bundler.js', // 定义vue的别名，支持运行时模板解析编译
        },
    },
});
