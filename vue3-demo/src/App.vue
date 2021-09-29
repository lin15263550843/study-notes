<template>
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
</style>
