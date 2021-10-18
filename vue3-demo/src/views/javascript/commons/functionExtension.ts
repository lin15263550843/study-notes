/**
 * 手动实现 apply
 */
Function.prototype.myApply = function (thisArg: any, args: any[]) {
    // 如果是 null 和 undefined 需要特殊处理，其他类型都转成对象
    // 除了显示的和 原生 apply 不一样，使用起来问题不大，效果基本能保持一致
    // 注意：原始类型数据绑定返回的 this 是它的对象包装类型！！！
    thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg);
    // 声明一个独有的 Symbol 属性, 防止 fn 覆盖已有属性
    const fn = Symbol('fn');
    // 若没有传入this, 默认绑定window对象
    thisArg = thisArg || window; // 若没有传入this, 默认绑定window对象
    // this 指向调用 apply 的对象，即要改变 this 指向的函数
    thisArg[fn] = this;
    // 执行当前函数
    const result = thisArg[fn](...args);
    // 删除声明的fn属性
    delete thisArg[fn];
    return result;
};
// Function.prototype.myApply = function (thisArg: any, args: any[]) {
//     const fn = Symbol('fn');
//     const context: any = { [Symbol.toPrimitive]: () => thisArg };
//     // 执行当前函数
//     // this = thisArg;
//     context[fn] = this;
//     // 执行当前函数
//     const result = context[fn](...args);
//     // 删除声明的fn属性
//     delete context[fn];
//     return result;
// };
/**
 * 手动实现 call
 * 和 myApply 的实现基本一样，只要把接受参数削微修改一下就可以了
 */
Function.prototype.myCall = function (thisArg: any, ...args: any) {
    // 声明一个独有的 Symbol 属性, 防止 fn 覆盖已有属性
    const fn = Symbol('fn');
    // 若没有传入this, 默认绑定window对象
    // this 指向调用 apply 的对象，即要改变 this 指向的函数
    thisArg[fn] = this || window;
    // 执行当前函数
    const result = thisArg[fn](...args);
    // 删除声明的fn属性
    delete thisArg[fn];
    return result;
};

function f(this: any, ...params: any) {
    // this.x = params[0];
    console.log('f this---->>>', this);
    console.log('f this---->>>', this + 123);
    console.log('f args---->>>', ...params);
}
const o1 = { x: 123 };
// f.apply(o1, [4, 5, 6]);
// f.myApply(o1, [4, 5, 6]);
// f.call(o1, 4, 5, 6);
// f.myCall(o1, 4, 5, 6);

f.apply(null, [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.apply(123, [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.myApply(o1, [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.myApply([1, 2, 3], [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.myApply(f, [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.myApply(123, [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.myApply('123', [4, 5, 6]);
console.log('--------------------------------------------------------------------------');
f.myApply(null, [4, 5, 6]);
