<template>
    <div class="blank">
        <h3>blank</h3>
        <span v-bind:title="message"> 鼠标悬停几秒钟查看此处动态绑定的提示信息！ </span>
        <!-- <div v-if="vif">v-if {{ computedMsg }}</div> -->
        <!-- <div v-else>v-else</div> -->
        <!-- <button @click="vif = !vif">切换 v-if</button> -->
        <button @click="vshow = !vshow">切换 v-show</button>
        <div v-show="vshow" style="display: inline-block">v-show</div>
        <span>v-show 会直接移除 style 的 display 属性，无论之前设置了啥</span>
        <!-- <input v-if="vif" type="text" /> -->
        <!-- <HelloWorld v-show="vshow" msg="Hello Vue 3 + TypeScript + Vite" /> -->
        <div>{{ obj1.obj2.obj3.obj4.obj5.obj6.x }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, getCurrentInstance } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';
// import About from './About.vue';
export default defineComponent({
    components: {
        // About,
        HelloWorld,
    },
    data() {
        return {
            msg1: 111,
            msg2: 222,
            message: '页面加载于 ' + new Date().toLocaleString(),
            vif: true,
            vshow: true,
            delArr: [1, 2, 3],
            obj1: { obj2: { obj3: { obj4: { obj5: { obj6: { x: 6 }, x: 5 }, x: 4 }, x: 3 }, x: 2 }, x: 1 },
        };
    },
    // computed: {
    //     computedMsg: function () {
    //         console.log('cpmputed msg1 msg2: ', this.msg1, this.msg2);
    //         return 'computed-' + this.msg1 + '-' + this.msg2;
    //     },
    // },
    // watch: {
    //     msg1: function () {
    //         console.log('watch msg1: ', this.msg1);
    //     },
    //     msg2: function () {
    //         console.log('watch msg2: ', this.msg2);
    //     },
    //     computedMsg: function () {
    //         console.log('watch computedMsg: ', this.computedMsg);
    //     },
    // },
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
        // this.msg1 = 1;
        // this.msg2 = 2;
        // setTimeout(() => {
        //     this.msg1 = 'updatedMsg1';
        //     setTimeout(() => {
        //         this.msg2 = 'updatedMsg2';
        //     }, 0);
        // }, 1000);
        // 测试 delete 和 Vue delete 区别
        // const arr = [11, 22, 33];
        // delete this.delArr[1];
        // delete arr[1];
        // console.log('delete arr --->>>', arr, arr.length, arr[1]);
        // console.log('delete delArr--->>>', this.delArr, this.delArr.length, this.delArr[1]);
        // setTimeout(() => {
        //     this.obj1.obj2.obj3.obj4.obj5.obj6.x = 666;
        // }, 1000);
    },
    updated() {
        // console.log('v-if 和 v-show 都会触发 updated', this.vif, this.vshow);
    },
});
</script>

<style lang="less" scoped>
.blank {
    font-size: 12px;
}
</style>
