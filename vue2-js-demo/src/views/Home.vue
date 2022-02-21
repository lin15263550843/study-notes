<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'Home',
    components: {
        HelloWorld,
    },
    beforeRouteEnter(to, from, next) {
        console.log('【组件内守卫】【beforeRouteEnter】to , form , next --------->>>', to, from);
        console.log('this---------->>>', this);
        // 不能获取组件 this 因为组件实例还没有被创建。
        next();
    },
    beforeRouteUpdate(to, from, next) {
        console.log('【组件内守卫】【beforeRouteUpdate】to , form , next --------->>>', to, from);
        // 当组件被复用时调用，例如带有动态参数的路径 /foo/:id 这种情况。可以访问 this
        next();
    },
    beforeRouteLeave(to, from, next) {
        console.log('【组件内守卫】【beforeRouteLeave】to , form , next --------->>>', to, from);
        // 导航离开改组件时被调用，可以访问组件的 this
        next();
    },
    beforeCreate() {
        console.log('【父】【组件生命周期】【beforeCreate】');
    },
    created() {
        console.log('【父】【组件生命周期】【created】');
    },
    beforeMount() {
        console.log('【父】【组件生命周期】【beforeMount】');
    },
    mounted() {
        console.log('【父】【组件生命周期】【mounted】');
    },
    beforeDestroy() {
        console.log('【父】【组件生命周期】【beforeDestroy】');
    },
    destroyed() {
        console.log('【父】【组件生命周期】【destroyed】');
    },
    beforeUpdate() {
        console.log('【父】【组件生命周期】【beforeUpdate】');
    },
    updated() {
        console.log('【父】【组件生命周期】【updated】');
    },
    activated() {
        console.log('【父】【组件生命周期】【activated】');
        // 页面第一次进入的时候，钩子触发的顺序是created->mounted->activated
    },
    deactivated() {
        console.log('【父】【组件生命周期】【activated】');
        // 页面退出的时候会触发deactivated，当再次前进或者后退的时候只触发activated
    },
};
</script>
