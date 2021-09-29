<template>
    <div class="blank">blank</div>
    <!-- <About /> -->
    <span v-bind:title="message"> 鼠标悬停几秒钟查看此处动态绑定的提示信息！ </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
        return {};
    },
    created() {
        console.log('blank  this---------------------------------->>>', this);
    },
});
</script>

<style lang="less" scoped>
.blank {
    font-size: 12px;
}
</style>
