import { name as exportTestName } from './exportTest';
const name = 'exportTest2';
// const x = '哈哈哈';
// const x = { a: 1 };
let x = 111;
const s = '哈哈哈';
const o = { x: 111 };
const n = null;
const f: any = () => {
    return this;
};

setTimeout(() => {
    x = 222;
}, 1000);
export { x, s, o, n, f };
export function fn(): string {
    //...;
    return 'fff';
}
export const ecs = s;
export const els = s;
// export o

export { name, exportTestName };
console.log('【exportTest2】name：', name);
console.log('【exportTest2】exportTestName：', exportTestName);

// export default x;
// export default f;
// export default ()=>{}
// export default f();

// export default class A {}
export default function dfn(): any {
    // const _this = this;
    return 'this';
}
// export default () => {
//     return this;
// };
