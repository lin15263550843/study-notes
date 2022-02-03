// @ts-nocheck
/**
 * Javascript核心原理,经典面试题
 */
var a = { n: 1 };

a.x = a = { n: 2 };

console.log(a.x); // 输出结果 ？？？
// console.log(a);

// = 运算符 从左到右
