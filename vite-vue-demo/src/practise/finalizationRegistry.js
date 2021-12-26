/**
 * 监听对象垃圾回收
 */
function finalizationRegistry() {
    const registry = new FinalizationRegistry(heldValue => {
        console.log('注册在 registry 中的对象被销毁了：heldValue----->>>', heldValue);
    });

    setTimeout(() => {
        let obj = {
            name: 'lhd',
            age: 18,
            other: new Array(1000000).fill('哈哈哈'),
        };
        console.log('obj------------------>>>', obj);

        registry.register(obj, 'value-obj');
        obj = null;
    }, 3000);
}

finalizationRegistry();
