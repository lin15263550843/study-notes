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
