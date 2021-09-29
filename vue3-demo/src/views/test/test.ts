// import dfn, { x, f, fn } from '@/views/test/exportTest';
import { name, exportTest2Name } from './exportTest';
// import { name, exportTestName } from './exportTest2';
console.log('【test】name：', name);
console.log('【test】exportTest2Name：', exportTest2Name);
// console.log('【test】exportTestName：', exportTestName);

// console.log('dx', dx, x, dx === x);
// dx.a = 2;
// setTimeout(() => {
// console.log('dx', dx, x, dx === x);
// }, 2000);

// console.log('dx', dx);
// console.log('x', x);
// console.log('fn', fn);
// console.log('f', f);
// console.log('f()', f());
// console.log('dfn()', dfn());
const aaa = 'A﻿A\ufeffA';
console.log('零宽空格：', aaa, aaa.length);

/**
 * 数据类型
 */
const arr = [
    '哈',
    123,
    true,
    undefined,
    Symbol(),
    () => {
        /**/
    },
    null,
];
console.log(
    'typeof Type：',
    arr.map(value => typeof value),
);

// ------------------------------------------------------------------------------------------------------------------
const obj: any = {};
Object.defineProperty(obj, 'a', {
    set(val) {
        console.log(`开始设置新值: ${val}`);
    },
    get() {
        console.log(`开始读取属性`);
        return 1;
    },
    // writable: true,
});

obj.a = 2; // 开始设置新值: 2
obj.a; // 开始获取属性

// ------------------------------------------------------------------------------------------------------------------
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
x = ['hello', 10]; // OK
console.log(x);

// Initialize it incorrectly
// x = [10, 'hello']; // Error
