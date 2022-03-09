<template>
    <div class="blank">
        <h3>blank</h3>
        <span v-bind:title="message"> 鼠标悬停几秒钟查看此处动态绑定的提示信息！ </span>
        <div>{{ computedMsg }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';
import vue from 'vue';
import { log } from 'console';
// import About from './About.vue';
export default defineComponent({
    // components: {
    //     About,
    // },
    data() {
        return {
            msg1: 111,
            msg2: 222,
            message: '页面加载于 ' + new Date().toLocaleString(),
        };
    },
    computed: {
        computedMsg: function () {
            console.log('cpmputed msg1 msg2: ', this.msg1, this.msg2);
            return 'computed-' + this.msg1 + '-' + this.msg2;
        },
    },
    watch: {
        msg1: function () {
            console.log('watch msg1: ', this.msg1);
        },
        msg2: function () {
            console.log('watch msg2: ', this.msg2);
        },
        computedMsg: function () {
            console.log('watch computedMsg: ', this.computedMsg);
        },
    },
    setup() {
        // console.log('blank  getCurrentInstance---------------------------------->>>', getCurrentInstance());
        const r1 = reactive({ a: 123, b: 'hhh' });
        const r2 = reactive(r1);
        return { r1, r2 };
    },
    created() {
        // console.log('blank  vue---------------------------------->>>', vue);
        // console.log('blank  this---------------------------------->>>', this);
        // console.log('blank  this.r1 === this.r2---------------------------------->>>', this.r1 === this.r2);
        this.msg1 = 1;
        this.msg2 = 2;
        // setTimeout(() => {
        //     this.msg1 = 'updatedMsg1';
        //     setTimeout(() => {
        //         this.msg2 = 'updatedMsg2';
        //     }, 0);
        // }, 1000);
    },
});
</script>

<style lang="less" scoped>
.blank {
    font-size: 12px;
}
</style>
