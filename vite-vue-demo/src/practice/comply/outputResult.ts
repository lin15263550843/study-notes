// @ts-nocheck
/**
 * 字节面试题
 * 输出结果
 * 注意：this.name + 1 返回的是值，不会改变 name 的值 ！！！！！
 */
// var name = 'GlobalName';
// function Foo(name) {
//     this.name = name || 'foo';
// }
// Foo.prototype.getName = function () {
//     return this.name + 1;
// };
// Foo.prototype.getName2 = () => {
//     return this.name + 1;
// };
// Foo.getName = function () {
//     return this.name + 1;
// };
// const foo = new Foo();
// const getName = foo.getName;
// const getName2 = foo.getName2;

// console.log('输出结果');
// console.log('foo', foo);

// console.log(getName()); // GlobalName1
// console.log(getName2()); // GlobalName1
// console.log(getName.call(foo)); // foo
// console.log(getName2.call(foo)); // GlobalName1

// console.log(getName.call(Foo)); // Foo1

// console.log(foo.getName()); // foo1
// console.log(foo.getName2()); // GlobalName1
