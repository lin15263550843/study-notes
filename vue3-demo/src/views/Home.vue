<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
        <div class="triangle"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Options({
    components: {
        HelloWorld,
    },
})
export default class Home extends Vue {}
</script>
<style scoped lang="less">
.home {
    padding: 20px;
    background: black;

    .triangle {
        width: 0px;
        height: 0px;
        border-top: 10px solid red;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
    }
}
</style>
