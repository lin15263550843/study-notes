// @ts-nocheck
/**
 * 测试 this
 */
// ----------------------------------------------------------------------------------
// function foo() {
//     console.log(this.a);
// }

// function doFoo() {
//     foo();
// }

// var obj = {
//     a: 1,
//     doFoo: doFoo,
// };

// var a = 2;
// obj.doFoo();
// 输出结果
// 2

// ----------------------------------------------------------------------------------
// var a = 10;
// var obj = {
//     a: 20,
//     say: () => {
//         console.log(this.a);
//     },
// };
// obj.say();

// var anotherObj = { a: 30 };
// obj.say.apply(anotherObj);
// 10 10

// ----------------------------------------------------------------------------------
// var a = 10;
// var obj = {
//     a: 20,
//     say() {
//         console.log(this.a);
//     },
// };
// obj.say();
// var anotherObj = { a: 30 };
// obj.say.apply(anotherObj);
// 20 30

// ----------------------------------------------------------------------------------
// 注意：浏览器中会输出 window 全局对象 ！！！！！
// 要注意的是，在严格模式中，null 就是 null，undefined 就是 undefined
// ES6的模块Module自动采用严格模式
// function a() {
//     console.log(this);
// }
// a.call(null);
// null

// 'use strict';

// function a() {
//     console.log(this);
// }
// a.call(null); // null
// a.call(undefined); // undefined

// ----------------------------------------------------------------------------------
// var obj = {
//     say: function () {
//         var f1 = () => {
//             console.log('1111', this);
//         };
//         f1();
//     },
//     pro: {
//         getPro: () => {
//             console.log(this);
//         },
//     },
// };
// var o = obj.say;
// o();
// obj.say();
// obj.pro.getPro();
// 注意： o() 的结果是 say 的执行环境 ！！！
// ----------------------------------------------------------------------------------
// var myObject = {
//     foo: 'bar',
//     func: function () {
//         var self = this;
//         console.log(this.foo);
//         console.log(self.foo);
//         (function () {
//             console.log(this.foo);
//             console.log(self.foo);
//         })();
//     },
// };
// myObject.func();
// 注意：立即执行函数汇中 this 指向 window
// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

/**
 * 做错的
 */
// ----------------------------------------------------------------------------------
function foo() {
    console.log(this.a);
}

function doFoo() {
    foo();
}

var obj = {
    a: 1,
    doFoo: doFoo,
};
var a = 2;
obj.doFoo();
// 错误：1
// ----------------------------------------------------------------------------------
function fn() {
    console.log(this.length);
}
var obj = {
    method: function (fn) {
        fn();
        arguments[0]();
    },
};
obj.method(fn, 1);
// arguments[0]() 这时，this 指向 arguments

// ----------------------------------------------------------------------------------
var obj = {
    a: 20,
    fn: function (fn) {
        var a = 30;
        console.log(this.a);
    },
};
// obj.fn();
// obj.fn.call();
// (obj.fn)();
// 错误： (obj.fn)() 这个括号的作用是提高运算符的优先级，点的优先级本来就比 函数调用优先级高

// ----------------------------------------------------------------------------------
function a(xx) {
    this.x = xx;
    return this;
}
var x = a(5);
var y = a(6);
console.log('x.x', x.x); // undefined
console.log('y.x', y.x);
// 错误：原因是，return this 后，x 的值就是 window 了，然后执行完 a(6) 后 window.x 就等于 6 了，所以 x.x => (6).x 等于 undefined

// ----------------------------------------------------------------------------------
var friendName = 'World!'(function () {
    if (friendName === undefined) {
        var friendName = 'Jack';
        console.log('Goodbye ' + friendName);
    } else {
        console.log('Hello ' + friendName);
    }
})();
// 错误原因：里面的   var friendName = 'Jack'; 在函数作用域中会提升，所以 friendName 是 undefined

// ----------------------------------------------------------------------------------
function fn1() {
    console.log('fn1');
}
var fn2;
fn1();
fn2();
fn2 = function fn2() {
    console.log('fn2');
};
fn2();
// 错误原因：第一个 fn2 执行时 fn2 还是 undefined

// ----------------------------------------------------------------------------------
function a() {
    var temp = 10;
    function b() {
        console.log(temp);
    }
    b();
}
a();
function a() {
    var temp = 10;
    b();
}
function b() {
    console.log(temp);
}
a();
// 错误原因：temp 未定义

// ----------------------------------------------------------------------------------
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
// 错误原因：运算符优先级
// () 小括号 -> . 成员访问 -> new 带参数列表 -> () 函数调用 -> new 无参数列表 ！！！
// new Foo.getName(); // 2 -> new (Foo.getName)()
// new Foo().getName(); // 1 -> (new Foo()).getName()
// new new Foo().getName(); // -> new ((new Foo()).getName)()

