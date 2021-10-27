<template>
    <div class="blank">
        <h3>blank</h3>
        <span v-bind:title="message"> 鼠标悬停几秒钟查看此处动态绑定的提示信息！ </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';
import vue from 'vue';
// import About from './About.vue';
export default defineComponent({
    // components: {
    //     About,
    // },
    data() {
        return {
            message: '页面加载于 ' + new Date().toLocaleString(),
        };
    },
    setup() {
        console.log('blank  getCurrentInstance---------------------------------->>>', getCurrentInstance());
        const r1 = reactive({ a: 123, b: 'hhh' });
        const r2 = reactive(r1);
        return { r1, r2 };
    },
    created() {
        // console.log('blank  vue---------------------------------->>>', vue);
        console.log('blank  this---------------------------------->>>', this);
        // console.log('blank  this.r1 === this.r2---------------------------------->>>', this.r1 === this.r2);
    },
});
</script>

<style lang="less" scoped>
.blank {
    font-size: 12px;
}
</style>
