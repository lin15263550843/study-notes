// @ts-check
// (function () {
//     var x = (y = 1);
// })();
// var z;

// console.log(y); // 1
// console.log(z); // undefined
// console.log(x); // Uncaught ReferenceError: x is not defined
/**
 * function 在块级作用域中的提升问题
 */
// var f = function () {
//     return true;
// };
// var g = function () {
//     return false;
// };
// (function () {
//     if (g() && [] == ![]) {
//         f = function f() {
//             return false;
//         };
//         function g() {
//             return true;
//         }
//     }
// })();
// console.log(f());
// -----------------------------------------------------------------------------------------
/**
 * function 在块级作用域中的提升
 * 一下都是在浏览器中输出
 */
// -------------------------------------------------------
// 第一种情况
// console.log('foo111：', foo);
// {
//     console.log('foo222：', foo);
//     foo = 1;
//     function foo() {}
//     console.log('foo333：', foo);
// }
// console.log('foo444：', foo);
// 结果
// foo111： undefined
// foo222： ƒ foo() {}
// foo333： 1
// foo444： 1

// 第二种情况
// console.log('foo111：', foo);
// {
//     console.log('foo222：', foo);
//     function foo() {}
//     foo = 1;
//     console.log('foo333：', foo);
// }
// console.log('foo444：', foo);
// 结果
// foo111： undefined
// foo222： ƒ foo() {}
// foo333： 1
// foo444： ƒ foo() {}
// 注意：解释：1、在块级作用域的声明 function 也会进行提升，会创建新的作用域，会提升到块级作用域的顶部，也会提升到全局作用域。
//            2、当执行到 function 声明语句之前，会把声明语句之前的值复制给全局
//            3、之后的赋值全是在局部（块级作用域中）进行的，不会复制给全局
// https://blog.csdn.net/weixin_41323217/article/details/107349617

// -------------------------------------------------------
// // a
// function Foo() {
//     getName = function () {
//         console.log(1);
//     };
//     return this;
// }
// // b
// Foo.getName = function () {
//     console.log(2);
// };
// // c
// Foo.prototype.getName = function () {
//     console.log(3);
// };
// // d
// var getName = function () {
//     console.log(4);
// };
// // e
// function getName() {
//     console.log(5);
// }

// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 1
// getName(); // 1
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3
// -------------------------------------------------------
