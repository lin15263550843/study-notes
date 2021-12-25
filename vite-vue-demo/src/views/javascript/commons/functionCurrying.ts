/**
 * 函数柯里化
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function currying(fn: Function) {
    return function curried(this: any, ...args: any[]) {
        if (fn.length <= args.length) {
            return fn.apply(this as any, args);
        } else {
            return function (this: any, ...args2: any[]) {
                return curried.apply(this, [...args, ...args2]);
            };
        }
    };
}

// 如果使用 ... 语法，test.length 则会返回 0
// function test(...args: number[]) {
//     return args.toString();
// }

function test(arg1: number, arg2: number, arg3: number, arg4: number, arg5: number) {
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
