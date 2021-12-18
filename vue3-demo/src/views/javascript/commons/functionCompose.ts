// eslint-disable-next-line @typescript-eslint/ban-types
type Fn = Function;

/**
 * 通用的组合函数
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function compose(...fns: Function[]) {
    fns.forEach((fn: Fn) => {
        if (typeof fn !== 'function') {
            throw new Error('参数必须是函数');
        }
    });

    return function (this: any, ...args: any[]) {
        let index = fns.length;
        let result = args[0];
        while (--index >= 0) {
            result = fns[index].call(this, result);
        }
        return result;
    };
}

function add2(x: number) {
    return x + 2;
}

function double(x: number) {
    return x * 2;
}
function minus2(x: number) {
    return x - 2;
}

const test = compose(add2, double, minus2);
const test1 = compose(add2);
const test0 = compose();

console.log(' add2(double(minus2(2)))----------------->>>', add2(double(minus2(2))));
console.log('test------------------------------------->>>', test(2));
console.log('add2------------------------------------->>>', add2(2));
console.log('test1------------------------------------>>>', test1(2));
console.log('test0------------------------------------>>>', test0(2));
