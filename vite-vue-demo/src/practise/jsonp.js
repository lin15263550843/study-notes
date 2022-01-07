console.log('服务端脚本  开始执行了');
setTimeout(() => {
    // 要和 jsonpCallbackName 一致
    jsonpCallback({ data: '服务器数据...' });
}, 1000);

console.log('服务端脚本  执行结束了');

console.log('-------', location);
