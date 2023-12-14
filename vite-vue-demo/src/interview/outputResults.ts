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

