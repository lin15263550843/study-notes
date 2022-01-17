//@ts-nocheck
/**
 * 数组扩展  or 自定义实现
 */
Array.prototype.myReduce = function (callback: Function, initialValue: any) {
    if (typeof callback != 'function') {
        throw new Error(`${callback} is not a function`);
    }

    const len = this.length;
    let res = this[0];
    let i = 1;

    if (initialValue !== undefined) {
        res = initialValue;
        i = 0;
    }

    for (; i < len; i++) {
        res = callback(res, this[i], i, this);
    }

    return res;
};

const arr = [1, 2, 3];

const res1 = arr.myReduce((res, cur) => {
    console.log('res, cur', res, cur);
    return res + cur;
});
console.log('myReduce res1---------->>>', res1);

const res3 = arr.myReduce((res, cur) => {
    console.log('res, cur', res, cur);
    return res + cur;
}, 4);
console.log('myReduce res3---------->>>', res3);

const res2 = arr.reduce((res, cur) => {
    console.log('res, cur', res, cur);
    return res + cur;
});
console.log('reduce res2------------>>>', res2);

const res4 = arr.reduce((res, cur) => {
    console.log('res, cur', res, cur);
    return res + cur;
}, 4);
console.log('reduce res4------------>>>', res4);
