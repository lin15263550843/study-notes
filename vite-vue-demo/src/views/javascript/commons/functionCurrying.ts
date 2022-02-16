// @ts-nocheck
/**
 * 函数柯里化
 */
export function currying(fn: Function) {
    return function curried(...args) {
        if (fn.length <= args.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, [...args, ...args2]);
            };
        }
    };
}

// 如果使用 ... 语法，test.length 则会返回 0
// function test(...args: number[]) {
//     return args.toString();
// }

function test(arg1, arg2, arg3, arg4, arg5) {
    return arg1 + arg2 + arg3 + arg4 + arg5;
}

const curryingTest = currying(test);
console.log('test.length----------->>>', test.length);
console.log('test------------------>>>', test(10, 20, 30, 40, 50));
console.log('curryingTest1--------->>>', curryingTest(10, 20, 30, 40, 50));
console.log('curryingTest2--------->>>', curryingTest(10, 20, 30, 40)(50));
console.log('curryingTest3--------->>>', curryingTest(10, 20, 30)(40)(50));
console.log('curryingTest4--------->>>', curryingTest(10, 20)(30, 40)(50));
console.log('curryingTest5--------->>>', curryingTest(10)(20)(30)(40, 50));
console.log('curryingTest6--------->>>', curryingTest(10)(20)(30)(40)(50));

/**
 * 使用 toString 隐式类型转换实现函数柯里化
 */
function add(arg) {
    const args = [arg];
    function _adder(arg) {
        if (arg !== null && arg !== undefined) args.push(arg);
        return _adder;
    }

    _adder.toString = function () {
        return args.reduce((total, cur) => {
            return total + cur;
        });
    };

    return _adder;
}

console.log('add 结果：' + add(1)(2)(3)(4)(5)());
console.log('add 结果：', add(1)(2)(3)(4)(5)().toString());

function createCurrying(fn, ...args) {
    if (fn.length <= args.length) {
        return fn.apply(this, args);
    } else {
        return function (...args2) {
            return createCurrying.call(this, fn, ...args, ...args2);
        };
    }
}
const curryingTest2 = createCurrying(test);
console.log('test.length----------->>>', test.length);
console.log('test------------------>>>', test(10, 20, 30, 40, 50));
console.log('curryingTest1--------->>>', curryingTest2(10, 20, 30, 40, 50));
console.log('curryingTest2--------->>>', curryingTest2(10, 20, 30, 40)(50));
console.log('curryingTest3--------->>>', curryingTest2(10, 20, 30)(40)(50));
console.log('curryingTest4--------->>>', curryingTest2(10, 20)(30, 40)(50));
console.log('curryingTest5--------->>>', curryingTest2(10)(20)(30)(40, 50));
console.log('curryingTest6--------->>>', curryingTest2(10)(20)(30)(40)(50));
