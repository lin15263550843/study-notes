<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
    <div class="app-box" ref="appRef">123</div>
    <router-view />
</template>

<style lang="less">
html {
    font-size: 10px;
}
body {
    margin: 0;
    width: 100%;
    height: 100%;
}

#app {
    width: 100%;
    height: 100%;
}
.app-box {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    background: white;
    display: none;
}

// #nav {
//     padding: 20px;

//     a {
//         font-weight: bold;
//         color: #2c3e50;

//         &.router-link-exact-active {
//             color: #42b983;
//         }
//     }
// }
.test {
    overflow: visible;
    visibility: visible;
    visibility: hidden;
    visibility: collapse;
}
</style>

