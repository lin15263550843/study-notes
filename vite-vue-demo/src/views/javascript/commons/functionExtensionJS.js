/**
 * js 版本
 * 手动实现 apply
 * 注意如下
 * 如果是原始数据类型，均返回对应的包装类型；绑定的 this 如果是 number、string、boolean、symbol 等原始类型，this 会转换为对应的包装对象类型，可以进行正常的 + - * / 等操作
 * 该实现要在 arguments[0]，中取参数列表
 */
Function.prototype.myApply = function () {
    // var thisArg = [].shift.call(arguments);
    // var args = [].shift.call(arguments);
    var thisArg = arguments[0];
    var args = arguments[1];
    // thisArg = thisArg === null || thisArg === undefined ? window : Object(thisArg);
    // 如果是 null 和 undefined 需要特殊处理，其他类型都转成对象
    if (thisArg === null || thisArg === undefined) {
        const o = Object.create(null);
        const v = thisArg; // 保存原始值
        o['valueOf'] = function () {
            return v;
        };
        thisArg = o;
    } else {
        // 除了 this 的类型和原生 apply 不一样，效果基本能保持一致，使用起来问题不大
        // 注意：原始类型数据绑定会返回的 this 是它的对象包装类型！！！
        thisArg = Object(thisArg);
    }
    // 声明一个独有的属性, 防止 __fn__ 覆盖已有属性，此处存在非覆盖风险！
    const fn = '__fn__';
    // 若没有传入this, 默认绑定window对象
    thisArg = thisArg || window; // 若没有传入this, 默认绑定window对象
    // this 指向调用 apply 的对象，即要改变 this 指向的函数
    thisArg[fn] = this;
    // 执行当前函数
    // const result = eval('thisArg[fn](' + args[0].join(',') + ')'); // 该方法虽然能支持多个参数，但是参数只能是原始类型，实现意义不大
    const result = thisArg[fn](args);
    // 删除声明的fn属性
    delete thisArg[fn];
    return result;
};
/**
 * 以下为测试代码
 * ***************************************************************************************************
 */
function f() {
    // this.x = params[0];
    console.log('f---------------------------------------->>>');
    console.log('f arguments[0]-------->>>', arguments[0]); // 只能在 arguments[0] 中取参数列表
    console.log('f this------------->>>', this);
    console.log('f this typeof--->>>', typeof this);
    // console.log('f this - 10----->>>', this - 10);
    // console.log('f this + 10----->>>', this + 10);
    // console.log('f this * 10----->>>', this * 10);
    // console.log('f this / 10----->>>', this / 10);
    // console.log('f this + -string>>>', this + '-string');
}
const o1 = { x: 123 };
// const f1 = () => 'funtion return';
// const a1 = [1, 2, 3];
// const n1 = 123;
// const s1 = '哈哈hh哈哈';
// const sy1 = Symbol('symbol');
console.log('测试对象--------------------------------------------------------------------------');
// f.apply(o1, [4, 5, 6]);
f.myApply(o1, [4, 5, 6]);
// console.log('测试函数--------------------------------------------------------------------------');
// f.apply(f1, [4, 5, 6]);
// f.myApply(f1, [4, 5, 6]);
// console.log('测试数组--------------------------------------------------------------------------');
// f.apply(a1, [4, 5, 6]);
// f.myApply(a1, [4, 5, 6]);
// console.log('测试 number-----------------------------------------------------------------------');
// // 绑定后的 this 类型会转换为 Number 包装类型而不是原始类型
// f.apply(n1, [4, 5, 6]);
// f.myApply(n1, [4, 5, 6]);
// console.log('测试 string-----------------------------------------------------------------------');
// // 和 Number 类型效果类似，绑定后的 this 类型会转换为包装类型而不是原始类型
// f.apply(s1, [4, 5, 6]);
// f.myApply(s1, [4, 5, 6]);
// console.log('测试 boolean----------------------------------------------------------------------');
// // 绑定后的 this 类型会转换为 boolean 包装类型而不是原始类型
// f.apply(true, [4, 5, 6]);
// f.myApply(true, [4, 5, 6]);
// console.log('测试 null-------------------------------------------------------------------------');
// // 绑定后的 this 会转换为一个只含有 [Symbol.toPrimitive] 方法返回 null 的对象
// f.apply(null, [4, 5, 6]);
// f.myApply(null, [4, 5, 6]);
// console.log('测试 undefined--------------------------------------------------------------------');
// // 绑定后的 this 会转换为一个只含有 [Symbol.toPrimitive] 方法返回 undefined 的对象
// f.apply(undefined, [4, 5, 6]);
// f.myApply(213, [4, 5, 6]);
// console.log('测试 RegExp-----------------------------------------------------------------------');
// f.apply(RegExp, [4, 5, 6]);
// f.myApply(RegExp, [4, 5, 6]);
// console.log('测试 symbol---【都会报错！】-------------------------------------------------------');
// // 绑定后的 this 类型会转换为 Symbol 包装类型而不是原始类型
// // f.apply(sy1, [4, 5, 6]);
// // f.myApply(sy1, [4, 5, 6]);
// console.log('----------------------------------------------------------------------------------');
