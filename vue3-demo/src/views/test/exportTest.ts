import { name as exportTest2Name } from './exportTest2';
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

export { name, exportTest2Name };
console.log('【exportTest】name：', name);
console.log('【exportTest】exportTest2Name：', exportTest2Name);
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

let uncertain: any = 'Hello world!';
uncertain.hello();
uncertain = 12;
const t1: number = uncertain;
console.log(t1);

// let unk: unknown = 'Hello world!';
// unk = 12;
// const t2: number = unk;
// console.log(t2);
