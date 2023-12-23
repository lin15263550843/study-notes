// @ts-nocheck
/**
 * 尚方能源，面试题
 * this 原型问题
 */
function Foo() {
    Foo.a = function () {
        console.log(1);
    };
    this.a = function () {
        console.log(2);
    };
    console.log('this', this);
    setTimeout(() => {
        console.log(obj, obj === this); // 面试官理解错了， this 就是 返回的 obj
    }, 1000);
}
Foo.prototype.a = function () {
    console.log(3);
};
Foo.a = function () {
    console.log(4);
};
Foo.a();
const obj = new Foo();
obj.a();
Foo.a();

/**
 * 赋值问题
 */
let a = { n: 1 };
let b = a;
a = a.x = { a: 2 };
console.log('a', a);
console.log('b', b);

/**
 * 代码输出
 * 白龙马云行
 */

async function testSometing() {
    console.log('执行testSometing');
    return 'testSometing';
}

async function testAsync() {
    console.log('执行testAsync');
    return Promise.resolve('hello async');
}

async function test() {
    console.log('test start...');
    const v1 = await testSometing();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
    console.log('promise start...');
    resolve('promise');
});
promise.then(val => console.log(val));

console.log('test end...');

