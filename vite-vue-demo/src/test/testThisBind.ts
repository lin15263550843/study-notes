// @ts-nocheck
// import '@/views/javascript/commons/functionExtension'; // 手写 apply、call、bind
/**
 * 测试使用 bind 绑定 this 后还能修改 this 的指向吗
 */

function testThisBind() {
    const o1 = { x: 1 };
    const o2 = { x: 2 };
    const o3 = { x: 3 };

    function fn() {
        console.log('this --->>>', this);
    }

    const fn1 = fn.bind(o1);
    const fn2 = fn1.bind(o2);
    const fn3 = fn2.bind(o3);

    fn3();
}

testThisBind();
