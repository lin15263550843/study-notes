// @ts-nocheck
/**
 * Javascript核心原理,经典面试题
 */
var a = { n: 1 };

a.x = a = { n: 2 };

console.log(a.x); // 输出结果 ？？？
// console.log(a);
// = 运算符 从左到右

/**
 * 如何区分 class 和 funciton 的实例对象
 * 怎么判断一个对象是不是 class 类型 new 出来的
 */

class C {
    constructor(parameters) {
        this.parameters = parameters;
    }
    method() {
        console.log('class method');
    }
}
// C.prototype.method2 = function () {
//     console.log('function prototype method2');
// };

function F(params) {
    this.params = params;
    // this.method = function () {
    //     console.log('function method');
    // };
}
// F.prototype.method = function () {
//     console.log('function prototype method');
// };
Object.defineProperty(F.prototype, 'method', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function () {
        console.log('function prototype method');
    },
});
// console.log('C ', C);
console.log('-----C-----');
const c = new C();
console.log('c------------------', c);
console.log('c method descriptor---------', Object.getOwnPropertyDescriptor(c.__proto__, 'method'));

const f = new F();
console.log('f------------------', f);
// console.log('f.constructor------', f.constructor);
// console.log(typeof C);
// console.log(C instanceof Function);
// console.log('-----F-----');
// console.log(new F());
// console.log(typeof F);
// console.log(F instanceof Function);

// 结论，他们实例出来的对象基本样， class 是特殊的语法糖。
