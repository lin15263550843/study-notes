// @ts-nocheck
/**
 * 手写系列
 */
/**
 * 防抖
 */
export function debounce(fn, delay) {
    let timer = null;

    return function (...args) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}
/**
 * 节流
 */
export function throttle(fn, interval) {
    let last = 0;

    return function (...args) {
        let now = new Date().getTime();
        if (now - last >= interval) {
            fn.apply(this, args);
            last = now;
        }
    };
}
/**
 * 节流 定时器版
 */
export function throttle2(fn, interval) {
    let timer;

    return function (...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, interval);
    };
}
/**
 * 柯里化
 */
export function currying(arg) {
    const args = [arg];
    function add(arg) {
        if (arg === undefined) return add;
        args.push(arg);
        return add;
    }

    add.toString = function () {
        return args.reduce((sum, cur) => {
            return sum + cur;
        });
    };

    return add;
}
// console.log('currying 结果：' + currying(1)(2)(3)(4)(5)()());
/**
 * 参数长度不固定
 */
function currying2(...args1) {
    const args = [...args1];
    const _add = (...args2) => {
        args.push(...args2);
        return _add;
    };
    _add.toString = () => {
        return args.reduce((sum, cur) => {
            return sum + cur;
        });
    };
    return _add;
}
// console.log('currying2 结果：' + currying2(1, 10000)(2, 20000)(3, 30000, 40000, 50000)(4)(5)()());
/**
 * 普通函数转成柯里化函数
 */
export function createCurrying(fn, ...args1) {
    if (args1.length >= fn.length) {
        return fn.apply(this, args1);
    } else {
        return function (...args2) {
            return createCurrying(fn, ...args1, ...args2);
        };
    }
    // return args1.length >= fn.length ? fn.apply(this, args1) : createCurrying.bind(this, fn, ...args1);
}
function testCreateCurrying(arg1, arg2, arg3) {
    return arg1 + arg2 + arg3;
}
const curryingTest = createCurrying(testCreateCurrying);
// console.log('createCurrying 结果：', curryingTest(1)(2)(3));
/**
 * 实现 Object.create
 */
export function objectCreate(proto) {
    function Fn() {}
    Fn.prototype = proto;
    return new Fn();
}
// console.log('objectCreate 结果：', objectCreate({ x: 123 }));
/**
 * 实现 instanceof
 */
export function myInstanceof(obj, constr) {
    if (obj === null || obj === undefined) return false;

    let proto = Object.getPrototypeOf(obj);
    const constrProto = constr?.prototype;

    while (proto !== null) {
        if (proto === constrProto) return true;
        proto = Object.getPrototypeOf(proto);
    }

    return false;
}
// console.log('myInstanceof 结果：', myInstanceof([], Object));
/**
 * 实现 new 操作符
 */
export function myNew(constr, ...args) {
    //注意要判断传进来的 constr 是不是函数
    if (typeof constr !== 'function') {
        throw new Error(`the ${constr} is not a function`);
    }
    const obj = Object.create(constr.prototype);
    const res = constr.apply(obj, args);
    // 注意：function 也是函数对象
    const flag = res !== null && (typeof res === 'object' || typeof res === 'function');
    return flag ? res : obj;
}
function ConstrMyNew(arg) {
    this.x = arg;
    // return function R() {};
}
// 箭头函数会报错
// console.log('myNew 结果：', myNew(ConstrMyNew, 123), 'new 结果：', new ConstrMyNew(123));
/**
 * 实现 Promise
 */
const STATE = { PENDING: 'pending', RESOLVED: 'resolved', REJECTED: 'rejected' };
export function MyPromise(exec) {
    this.state = STATE.PENDING;
    this.value = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    const resolve = res => {
        if (this.state === STATE.PENDING) {
            this.state = STATE.RESOLVED;
            this.value = res;
            this.resolvedCallbacks.forEach(callback => {
                callback(this.value);
            });
        }
    };
    const reject = res => {
        if (this.state === STATE.PENDING) {
            this.state = STATE.REJECTED;
            this.value = res;
            this.rejectedCallbacks.forEach(callback => {
                callback(this.value);
            });
        }
    };

    try {
        exec(resolve, reject);
    } catch (e) {
        reject(e);
        console.log('这里可能会吞并一些内部错误：', e);
    }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
    return new MyPromise((resolve, reject) => {
        if (typeof onResolved !== 'function') {
            onResolved = res => res;
        }
        if (typeof onRejected !== 'function') {
            onRejected = err => {
                throw err;
            };
        }
        if (this.state === STATE.RESOLVED) {
            queueMicrotask(() => {
                try {
                    const res = onResolved(this.value);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        } else if (this.state === STATE.REJECTED) {
            queueMicrotask(() => {
                try {
                    const res = onRejected(this.value);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            this.resolvedCallbacks.push(() => {
                queueMicrotask(() => {
                    try {
                        const res = onResolved(this.value);
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
            this.rejectedCallbacks.push(() => {
                queueMicrotask(() => {
                    try {
                        const res = onRejected(this.value);
                        resolve(res);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }
    });
};
MyPromise.prototype.catch = function (reject) {
    return this.then(undefined, reject);
};
MyPromise.prototype.finally = function (onFinally) {
    return this.then(
        () => {
            onFinally();
            return this.value;
        },
        () => {
            onFinally();
            return this.value;
        },
    );
};
MyPromise.resolve = function (value) {
    // 注意：如果传入的值是 MyPromise 对象则直接返回
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
};
MyPromise.reject = function (err) {
    return new MyPromise((resolve, reject) => reject(err));
};

MyPromise.all = function (promises) {
    if (!Array.isArray(promises)) throw new Error(`the ${promises} is not a array`);

    return new MyPromise((resolve, reject) => {
        const result = [];
        const len = promises.length;
        let i = 0;

        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(
                res => {
                    result[index] = res;
                    i++;
                    if (len === i) {
                        resolve(result);
                    }
                },
                err => {
                    reject(err);
                },
            );
        });
    });
};
MyPromise.allSettled = function (promises) {
    return new MyPromise(resolve => {
        const result = [];
        const len = promises.length;
        let i = 0;
        promises.forEach((promise, index) => {
            MyPromise.resolve(promise).then(
                res => {
                    result[index] = { status: 'resolved', value: res };
                    i++;
                    if (len === i) {
                        resolve(result);
                    }
                },
                err => {
                    result[index] = { status: 'rejected', value: err };
                    i++;
                    if (len === i) {
                        resolve(result);
                    }
                },
            );
        });
    });
};
MyPromise.race = function (promises) {
    if (!Array.isArray(promises)) throw new Error(`the ${promises} is not a array`);
    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            // MyPromise.resolve(promise).then(
            //     res => resolve(res),
            //     err => reject(err),
            // );
            MyPromise.resolve(promise).then(resolve, reject);
        });
    });
};
MyPromise.any = function (promises) {
    if (!Array.isArray(promises)) throw new Error(`the ${promises} is not a array`);
    return new MyPromise((resolve, reject) => {
        const errs = [];
        const len = promises.length;
        promises.forEach(promise => {
            MyPromise.resolve(promise).then(resolve, err => {
                errs.push(err);
                if (len === errs.length) {
                    reject(new AggregateError(err));
                }
            });
        });
    });
};
/**
 * 类型判断
 */
export function getType(value) {
    if (value === null) {
        return value + '';
    }
    if (typeof value === 'object') {
        return Object.prototype.toString
            .call(value)
            .slice(8, -1)
            .replace(/^(.)/, v1 => v1.toLowerCase());
    } else {
        return typeof value;
    }
}
// console.log('getType(null)：', getType(null));
// console.log('getType(123)：', getType(123));
// console.log('getType(str)：', getType('str'));
// console.log('getType(class)：', getType(class {}));
// console.log(
//     'getType(function)：',
//     getType(function () {}),
// );
// console.log('getType(object)：', getType({}));
// console.log('getType(date)：', getType(new Date()));
// console.log('getType(array)：', getType([]));
/**
 * 实现 call 函数
 */
Function.prototype.myCall = function (thisArg, ...args) {
    if (typeof this !== 'function') {
        throw new Error(`the ${this} is not a function`);
    }
    if (thisArg === null || thisArg === undefined) {
        // thisArg = window;
        const o = Object.create(null);
        const v = thisArg;
        o.valueOf = () => v;
        thisArg = o;
    } else {
        thisArg = Object(thisArg);
    }
    const fn = Symbol('fn');
    thisArg[fn] = this;
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
};
function testMyCall(...args) {
    console.log('args ---------->>>', args);
    return this;
}
// console.log('myCall 结果：', testMyCall.myCall({ x: 123 }, 1, 2, 3));
// console.log('myCall 结果：', testMyCall.myCall(null, 1, 2, 3) + 1);
// console.log('myCall 结果：', testMyCall.myCall(999, 1, 2, 3) + 1);
/**
 * 实现 apply 函数
 */
Function.prototype.myApply = function (thisArg, args = []) {
    if (typeof this !== 'function') {
        throw new Error(`the ${this} is not a function`);
    }

    if (thisArg === null || thisArg === undefined) {
        // thisArg = window;
        const o = Object.create(null);
        const v = thisArg;
        o.valueOf = () => v;
        thisArg = o;
    } else {
        thisArg = Object(thisArg);
    }
    const fn = Symbol('fn');
    thisArg[fn] = this;
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
};
// console.log('myCall 结果：', testMyCall.myApply({ x: 123 }, [1, 2, 3]));
// console.log('myCall 结果：', testMyCall.myApply(null, [1, 2, 3]) + 1);
// console.log('myCall 结果：', testMyCall.myApply(999, [1, 2, 3]) + 1);
/**
 * 实现 bind 函数
 */
Function.prototype.myBind = function (thisArg, ...args1) {
    if (typeof this !== 'function') {
        throw new Error(`the ${this} is not a function`);
    }
    const fn = this;
    return function (...args2) {
        return fn.call(thisArg, ...args1, ...args2);
    };
};
// console.log('myCall 结果：', testMyCall.myBind({ x: 123 }, 1, 2, 3)(4, 5, 6));
// console.log('myCall 结果：', testMyCall.myBind(null, 1, 2, 3)(4, 5, 6));
// console.log('myCall 结果：', testMyCall.myBind(999, 1, 2, 3)(4, 5, 6));

/**
 * ajax 请求
 */
// import data from '../assets/data.json';
export function sendAjax() {
    // console.log('data', data);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        console.log('onreadystatechange readyState：', xhr.readyState);
    };
    xhr.onload = function () {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
            console.log('onload statusText ------>>>', xhr.statusText);
            return;
        }
        console.log('onload response ------>>>', xhr.response);
    };
    xhr.onerror = function () {
        console.log('onerror ------>>>', xhr);
    };
    xhr.onprogress = function () {
        console.log('onprogress readyState：', xhr.readyState); // readyState 为 3
    };
    xhr.responseType = 'json';
    xhr.open('get', 'http://localhost:3000/src/assets/data.json');
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send(null);
}
// sendAjax();
/**
 * 使用 Promise 封装 ajax
 */
export function promiseAjax(config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log('onreadystatechange readyState：', xhr.readyState);
            if (xhr.readyState !== 4) return;
            if (xhr.status === 200) {
                resolve(xhr.response);
                console.log('onload response ------>>>', xhr.response);
            } else {
                console.log('onload statusText ------>>>', xhr.statusText);
            }
        };
        xhr.onerror = function () {
            console.log('onerror ------>>>', xhr);
        };
        xhr.onprogress = function () {
            console.log('onprogress readyState：', xhr.readyState); // readyState 为 3
        };
        xhr.responseType = 'json';
        xhr.open(config.method, config.url);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(config.params);
    });
}
// promiseAjax({ method: 'get', url: 'http://localhost:3000/src/assets/data.json' }).then(res => {
//     console.log('promiseAjax ------>>>', res);
// });
/**
 * 深拷贝
 */
const types = [Date, RegExp, Set, Map, WeakMap, WeakSet];
export function deepClone(obj, map = new WeakMap()) {
    // if (typeof obj === 'function') return obj;
    if (types.some(Type => obj instanceof Type)) {
        const Constr = obj.constructor;
        if (Constr && typeof Constr === 'function') {
            return new Constr(obj);
        }
    }
    if (obj instanceof Error) return obj;
    if (typeof obj === 'symbol') return Symbol(obj.description);
    if (typeof obj !== 'object' || obj === null) return obj;
    if (map.has(obj)) return map.get(obj);

    let newObj = Array.isArray(obj) ? [] : {};

    map.set(obj, newObj);

    Reflect.ownKeys(obj).forEach(key => {
        newObj[key] = deepClone(obj[key], map);
    });

    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj));

    return newObj;
}
/**
 * sleep 函数
 */
export async function asyncSleep(delay) {
    await new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
// asyncSleep(1000).then(() => {
//     console.log('我睡了 1s');
// });
/**
 * 日期格式化函数
 */
export function formatDate(date, format) {
    if (!(date instanceof Date)) {
        if (!date) return '';
        date = new Date(date);
    }
    if (Number.isNaN(date)) return '';
    const opt = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let key in opt) {
        const val = opt[key];
        const reg = new RegExp(key);
        console.log('reg', reg);
        format = format.replace(reg, String(val).padStart(2, '0'));
    }
    return format;
}
// console.log('formatDate 结果：', formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'));
/**
 * 交换 a b 的值，不用临时变量
 */
export function exch(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return { a, b };
}
// console.log('exch 结果:', exch(2, 6));
/**
 * 数组乱序
 */
export function randomArr(arr) {
    // 方法一：使用 sort 方法返回随机数
    // return arr.sort(() => (Math.random() > 0.5 ? -1 : 1));
    // for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    // 方法二：取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。
    // const len = arr.length;
    // for (let i = 0; i < arr.length; i++) {
    //     const v = arr[i];
    //     const randomIndex = (Math.random() * (len - 1 - i) + i) >>> 0;
    //     arr[i] = arr[randomIndex];
    //     arr[randomIndex] = v;
    // }
    // 方法三：倒倒序遍历
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        const v = arr[i];
        const index = (Math.random() * i) >>> 0;
        arr[i] = arr[index];
        arr[index] = v;
    }
    return arr;
}
// console.log('randomArr --->>>', randomArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
/**
 * 数组求和
 */
export function add(arr) {
    if (!Array.isArray(arr)) return 0;
    return arr.reduce((sum, cur) => {
        return sum + cur;
    });
}
// console.log('add 结果：', add([0, 1, 2, 3, 4, 5]));
export function add2(arr) {
    if (!Array.isArray(arr)) return 0;
    // return arr
    //     .toString()
    //     .split(',')
    //     .reduce((sum, cur) => {
    //         return sum + Number(cur);
    //     }, 0);
    return arr.flat(Infinity).reduce((sum, cur) => {
        return sum + cur;
    });
}
// console.log('add2 结果：', add2([1, 2, 3, [[4, 5], 6], 7, 8, 9]));
/**
 * 数组扁平化
 */
export function flatArray(arr) {
    // 1
    // return arr.flat(Infinity);

    // 2
    // return arr.reduce((res, cur) => {
    //     return res.concat(Array.isArray(cur) ? flatArray(cur) : cur);
    // }, []);

    // 3
    // let res = [];
    // for (const val of arr) {
    //     if (Array.isArray(val)) {
    //         res.push(...flatArray(val));
    //         // res = res.concat(flatArray(val));
    //     } else {
    //         res.push(val);
    //     }
    // }
    // return res;

    // 4
    return arr
        .toString()
        .split(',')
        .map(val => Number(val));
}
// console.log('flatArray 结果：', flatArray([1, [2, [3, 4, 5], [6, [7, [8], [9]]]]]));
/**
 * 数组去重
 */
export function unique(arr) {
    if (!Array.isArray(arr)) return arr;
    // 方法一
    // return Array.from(new Set(arr));
    // return [...new Set(arr)];

    // 方法二：
    // const set = new Set();
    // const res = [];
    // arr.forEach(val => {
    //     if (!set.has(val)) {
    //         set.add(val);
    //         res.push(val);
    //     }
    // });
    // return res;

    // 方法三：会把 {} 这种当成重复的去掉
    // const map = {};
    // const res = [];
    // arr.forEach(val => {
    //     if (!map[val]) {
    //         map[val] = true;
    //         res.push(val);
    //     }
    // });
    // return res;
}
// console.log('unique 结果：', unique([1, 1, 2, 3, 4, 5, 4, 3, 2, 1, 4, 5, 3, 2, 1, 2, 3, 4, 5, 2, 1, 3, 6, 3]));
// unique([1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}]);
/**
 * 数组的 flat 方法
 */
Array.prototype.myFlat = function (depth = 1) {
    if (!Array.isArray(this)) throw new Error(`the ${this} not is a array`);

    let dep = 0;
    const _flat = arr => {
        dep++;
        return arr.reduce((res, cur) => {
            return res.concat(Array.isArray(cur) && dep < depth ? _flat(cur) : cur);
        }, []);
    };

    return _flat(this);
};
// console.log('myFlat 结果：', [1, [2, [3, 4, 5], [6, [7, [8], [9]]]]].myFlat(7));
/**
 * 数组的 push 方法
 * 注意：
 *      push 方法返回数组的长度
 *      push 可以对类数组使用
 *      对对象使用时，Array.prototype.push.call({}, 1)会返回 {0: 1, length: 1}
 *      如果为 null 或者 undefined 则报错
 */
Array.prototype.myPush = function (...items) {
    if (!Array.isArray(this)) throw new Error(`the ${this} not is a array`);

    for (const item of items) {
        this[this.length] = item;
    }
    return this.length;
};
/**
 * 数组的 filter 方法
 */
Array.prototype.myFilter = function (callback, thisArg) {
    if (!Array.isArray(this)) {
        throw new Error(`the ${this} not is a array`);
    }
    if (typeof callback !== 'function') {
        throw new Error(`the ${callback} not is a function`);
    }

    const res = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
        const flag = callback.call(thisArg, this[i], i, this);
        if (flag) {
            res.push(this[i]);
        }
    }

    return res;
};
// console.log(
//     'myPush 结果：',
//     [1, 2, 3].myFilter(function (cur, index) {
//         console.log('this cur index::: ', this, cur, index);
//         return cur > 1;
//     }),
// );
/**
 * 数组的 map 方法
 */
Array.prototype.myMap = function (callback, thisArg) {
    if (!Array.isArray(this)) {
        throw new Error(`the ${this} not is a array`);
    }
    if (typeof callback !== 'function') {
        throw new Error(`the ${callback} not is a function`);
    }

    const res = [];
    const len = this.length;
    for (let i = 0; i < len; i++) {
        const newVal = callback.call(thisArg, this[i], i, this);
        res.push(newVal);
    }

    return res;
};
// console.log(
//     'myPush 结果：',
//     [1, 2, 3].myMap((cur, index) => {
//         console.log('this cur index::: ', this, cur, index);
//         return cur * 10;
//     }),
// );
export function repeat(str, n) {
    if (typeof str !== 'string') {
        throw new Error(`the ${str} not is a string`);
    }
    if (n < 1) return '';

    // let res = '';
    // while (n > 0) {
    //     console.log(str, n);
    //     res += str;
    //     n--;
    // }
    // return res;

    return new Array(n + 1).join(str);
}
// console.log('repeat 结果：', repeat('abc-', 3));
/**
 * 字符串翻转
 */
export function reverse(str) {
    if (typeof str !== 'string') return str;
    return str.split('').reverse().join('');
}
// console.log('reverse 结果：', reverse('abc-'));
/**
 * 将数字每千分位用逗号隔开
 * 注意：
 *      要考虑小数的情况
 *      要考虑负数的情况
 *      要考虑不足三位的情况
 */
export function comma(num) {
    if (typeof num !== 'number') return num;
    // 方法一：正则
    // return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 方法二：转成数组，添加豆号
    // const str = String(Math.abs(num));
    // const flag = num < 0;
    // const [a, b] = str.split('.');
    // const transform = val => {
    //     if (!val) return '';
    //     const nums = val.split('');
    //     const len = nums.length;
    //     for (let i = len; i > 3; i -= 3) {
    //         nums.splice(i - 3, 0, ',');
    //     }
    //     return nums.join('');
    // };
    // const res = `${flag ? '-' : ''}${transform(a)}`;
    // return b ? `${res}.${transform(b)}` : res;

    // 方法三：使用正则匹配出来
    const str = String(Math.abs(num));
    const flag = num > 0;
    const [a, b] = str.split('.');
    const transform = val => {
        if (!val) return '';
        const len = val.length;
        if (len < 3) return val;
        const n = len % 3;
        if (n > 0) {
            const arr = val.slice(n, len).match(/\d{3}/g);
            return `${val.slice(0, n)},${arr ? arr.join(',') : ''}`;
        } else {
            const arr = val.match(/\d{3}/g);
            return arr ? arr.join(',') : '';
        }
    };
    const res = `${flag ? '-' : ''}${transform(a)}`;
    return b ? `${res}.${transform(b)}` : res;
}

// console.log('comma 结果：', comma(12345678.12345678));
// console.log(comma(0));
// console.log(comma(123));
// console.log(comma(-123));
// console.log(comma(1234567));
// console.log(comma(-1234567));
// console.log(comma(1234567.12345678));
// console.log(comma(-1234567.12345678));
/**
 * 大数相加
 */
export function sumBigNumber(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return '';
    if (isNaN(a) || isNaN(b)) return '';

    a = a.split('');
    b = b.split('');

    let res = '';
    let r = 0;

    while (a.length > 0 || b.length > 0) {
        // r = (Number(a.pop()) || 0) + (Number(b.pop()) || 0) + r;
        r = ~~a.pop() + ~~b.pop() + r;
        res = (r % 10) + res;
        // r = Math.floor(r / 10);
        r = r > 9;
    }

    if (r > 0) {
        res = 1 + res;
    }

    return res.replace(/^0+/, '');
}
// console.log('sumBigNumber 结果：', sumBigNumber('012345678', '0123456'));
/**
 * 大数相乘
 */
export function multiplyBigNumber(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string') return '';
    if (isNaN(a) || isNaN(b)) return '';
    if (a === '0' || b === '0') return '0';

    const len1 = a.length;
    const len2 = b.length;
    const res = [];

    for (let i = len1 - 1; i >= 0; i--) {
        for (let j = len2 - 1; j >= 0; j--) {
            const i1 = i + j;
            const i2 = i + j + 1;
            const r = a[i] * b[j] + (res[i2] || 0);
            res[i1] = Math.floor(r / 10) + (res[i1] || 0);
            res[i2] = r % 10;
        }
    }

    return res.join('').replace(/^0+/, '');
}
// console.log('multiplyBigNumber 结果：', multiplyBigNumber('01234', '2'));
// console.log('multiplyBigNumber 结果：', multiplyBigNumber('012345678', '0123456'));
/**
 * 将对象转换为树形结构
 */
export function objToTree(arr) {
    if (!Array.isArray(arr)) return [];
    const tree = [];
    const map = new Map();
    for (let item of arr) {
        const { id, pid } = item;
        const children = map.get(id);
        if (children) {
            item.children = children;
        } else {
            item.children = [];
            map.set(id, item.children);
        }
        if (pid) {
            const children = map.get(pid);
            if (children) {
                children.push(item);
            } else {
                map.set(pid, [item]);
            }
        } else {
            tree.push(item);
        }
    }
    return tree;
}
// 转换前：
const source = [
    {
        id: 1,
        pid: 0,
        name: 'body',
    },
    {
        id: 2,
        pid: 1,
        name: 'title',
    },
    {
        id: 3,
        pid: 2,
        name: 'div',
    },
];
// 转换为:
// const tree = [{
//   id: 1,
//   pid: 0,
//   name: 'body',
//   children: [{
//     id: 2,
//     pid: 1,
//     name: 'title',
//     children: [{
//       id: 3,
//       pid: 1,
//       name: 'div'
//     }]
//   }
// }]
// console.log(' 结果：', objToTree(source));
/**
 * 使用ES5和ES6求函数参数的和
 */
export function funArgSum(...args) {
    return args.reduce((sum, cur) => sum + Number(cur), 0);
}
export function funArgSum2() {
    return Array.prototype.reduce.call(arguments, (sum, cur) => sum + Number(cur), 0);
}
// console.log('funArgSum 结果：', funArgSum(1, 2, 3, 4, 5));
// console.log('funArgSum2 结果：', funArgSum2(1, 2, 3, 4, 5));
/**
 * 解析 URL Params 为对象
 * let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
   parseParam(url)  结果
    { 
        user: 'anonymous',
        id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
        city: '北京', // 中文需解码
        enabled: true, // 未指定值得 key 约定为 true
    }
*/
export function parseParams(url) {
    if (typeof url !== 'string') return {};

    const [, search] = url.split('?');
    if (!search) return {};
    const arr = search.split('&');
    const result = {};
    arr.forEach(param => {
        if (param.includes('=')) {
            const [key, val] = param.split('=');
            const v = result[key];
            if (result.hasOwnProperty(key)) {
                result[key] = [].concat(v, val);
            } else {
                result[key] = window.decodeURI(val);
            }
        } else {
            result[param] = true;
        }
    });

    return result;
}
// console.log(
//     'parseParams 结果：',
//     parseParams('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'),
// );
/**
 *  二维数组斜向打印
 */
export function printMatrix(arr) {
    if (!Array.isArray(arr)) return [];

    const len1 = arr.length;
    const len2 = arr[0].length;
    const res = [];
    // 左上角，从0 到 n - 1 列进行打印
    for (let i = 0; i < len2; i++) {
        for (let x = 0, y = i; x < len1 && y >= 0; x++, y--) {
            res.push(arr[x][y]);
        }
    }
    // 右下角，从1 到 n - 1 行进行打印
    for (let i = 1; i < len1; i++) {
        for (let x = i, y = len2 - 1; x < len1 && y >= 0; x++, y--) {
            res.push(arr[x][y]);
        }
    }
    return res;
}

// console.log(
//     'printMatrix 结果；',
//     printMatrix([
//         [1, 2, 3],
//         [4, 5, 6],
//         [7, 8, 9],
//         [10, 11, 12],
//     ]),
// );
// [0,0]
// [0,1] [1,0]
// [0,2] [1,1] [2,0]
// [1,2] [2,1] [3,0]
// [2,2] [3,1]
// [3,2]
/**
 * 找出 Element 元素的全部 Input 子元素
 */
export function findAllInputElement(element) {
    if (!(element instanceof Element)) return [];
    const res = [];
    const recursion = element => {
        if (element.nodeName.toUpperCase() === 'DIV') {
            res.push(element);
        }
        const children = element.children;
        if (children.length > 0) {
            for (let item of element.children) {
                recursion(item);
            }
        }
    };
    recursion(element);
    return res;
}
// setTimeout(() => {
//     console.log('findAllInputElement 结果：', findAllInputElement(document.getElementById('app')));
// }, 1000);
/**
 * 将手机号中间四位变成 *
 */
export function hidePhoneNumber(str) {
    if (typeof str !== 'string') return '';
    // return str.slice(0, 3) + '****' + str.slice(-4);
    return str.replace(/^(\d{3})\d*(\d{4}$)/, '$1****$2');
}
// console.log('hidePhoneNumber 结果：', hidePhoneNumber('13612361236'));
/**
 * 循环打印红黄绿
 * 1. 循环打印红黄绿
 * 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：
 * 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
 */
export function loopPrint() {
    function red() {
        console.log('red');
    }
    function green() {
        console.log('green');
    }
    function yellow() {
        console.log('yellow');
    }

    function sleep(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    }
    async function task() {
        await sleep(3000);
        red();
        await sleep(1000);
        green();
        await sleep(2000);
        yellow();

        task();
    }
    task();

    // function sleep(delay, callback) {
    //     return new Promise(resolve => {
    //         setTimeout(() => {
    //             callback();
    //             resolve();
    //         }, delay);
    //     });
    // }
    // async function task() {
    //     sleep(3000, red)
    //         .then(() => sleep(1000, green))
    //         .then(() => sleep(2000, yellow))
    //         .then(task);
    // }
    // task();
}
// console.log('loopPrint 结果：', loopPrint());
/**
 * 实现每隔一秒打印 1,2,3,4
 */
export function printNumber(n) {
    for (let i = 1; i <= n; i++) {
        setTimeout(() => {
            console.log('i: ', i);
        }, 1000 * i);
    }
}
// console.log('loopPrint 结果：', printNumber(4));
/**
 * 小孩报数问题
 */
function childNum(num, count) {
    // 方法一
    const arr = new Array(num).fill(1).map((v, i) => i + 1);
    let curIndex = 0;
    let curNum = 1;
    while (arr.length > 1) {
        if (curNum === count) {
            curNum = 1;
            arr.splice(curIndex, 1);
        } else {
            curIndex++;
            curNum++;
        }

        if (curIndex === arr.length) {
            curIndex = 0;
        }
    }
    return arr[0];
    // 方法二
    // const arr = new Array(num).fill(1).map((v, i) => i + 1);
    // let execCount = 0;
    // let curIndex = 0;
    // let curNum = 0;
    // while (execCount < num - 1) {
    //     if (arr[curIndex] !== 0) curNum++;

    //     if (curNum === count) {
    //         curNum = 0;
    //         arr[curIndex] = 0;
    //         execCount++;
    //     }
    //     curIndex++;
    //     if (curIndex === num) {
    //         curIndex = 0;
    //     }
    //     console.log(execCount, arr);
    // }
    // return arr.find(n => n !== 0);
}
// console.log('childNum 结果：', childNum(30, 3));
/**
 * 用 Promise 实现图片的异步加载
 */
export function asyncLoadImage(url) {
    return new Promise((resolve, reject) => {
        if (!url || !String(url).match(/^https?:\/\//)) {
            reject('图片地址错误！');
        }

        const img = new Image();
        img.src = url;
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function (err) {
            reject(err);
        };
    });
}
// asyncLoadImage(
//     'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648885122&t=02370f63aa93f0f3526f0750589a2b3a',
// )
//     .then(img => {
//         console.log('加载成功：', img);
//     })
//     .catch(error => {
//         console.log('加载失败：', error);
//     });
/**
 * 查找文章中出现频率最高的单词
 */
export function findMostWord(str) {
    if (typeof str !== 'string') return [];
    str = str.trim().toLowerCase();
    const arr = str.match(/\w+/g);
    let max = 0;
    let res = '';
    const map = new Map();
    arr.forEach(val => {
        if (map.has(val)) {
            const v = map.get(val) + 1;
            map.set(val, v);
            if (v > max) {
                max = v;
                res = val;
            }
        } else {
            map.set(val, 1);
        }
    });
    return [res, map.get(res)];
}
// console.log(
//     findMostWord(
//         'Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;',
//     ),
// );
/**
 * 封装异步的fetch，使用async await方式来使用
 */
export class FetchHttpRequest {
    /**
     * get 请求
     */
    static async get(url, search) {
        const params = new URLSearchParams(search);
        const response = await fetch(params ? `${url}${params}` : url);
        const data = await response.json();
        return data;
    }
    /**
     * post 请求
     */
    static async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;
    }
}
// FetchHttpRequest.get('http://localhost:3000/src/assets/data.json').then(res => {
//     console.log('请求结果：', res);
// });
// FetchHttpRequest.post('http://localhost:3000/src/assets/data.json', { name: 'lhd', age: 18 }).then(res => {
//     console.log('请求结果：', res);
// });
/**
 * 实现 prototype 继承
 */
export function inheritPrototype(Super, Sub) {
    const proto = Object.create(Super.prototype);
    // proto.constructor = Sub;
    Object.defineProperty(proto, 'constructor', {
        configrable: true,
        enumerable: false,
        writable: true,
        value: Sub,
    });
    Sub.prototype = proto;
    Object.setPrototypeOf(Sub, Super);
}
// //父方法
// function SupperFunction(flag1) {
//     this.flag1 = flag1;
// }
// //子方法
// function SubFunction(flag2) {
//     SupperFunction.call(this, true);
//     this.flag2 = flag2;
// }
// inheritPrototype(SupperFunction, SubFunction);
// //子实例
// var subInstance = new SubFunction(false);
// //子调用自己和父的属性
// console.log('子类：', subInstance, subInstance);
/**
 * 实现双向数据绑定
 */
function twoWayDataBinding(params: type) {
    const dom = document.getElementById('app');
    const span = document.createElement('span');
    const input = document.createElement('input');
    dom.appendChild(input);
    dom.appendChild(span);
    const render = val => {
        input.value = val;
        span.innerHTML = val;
    };
    const obj = {};
    // const _obj = {};
    // Object.defineProperty(obj, 'text', {
    //     configurable: true,
    //     enumerable: true,
    //     get() {
    //         return _obj.text;
    //     },
    //     set(val) {
    //         _obj.text = val;
    //         render(val);
    //     },
    // });
    const proxyObj = new Proxy(obj, {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, val) {
            render(val);
            return Reflect.set(target, key, val);
        },
    });
    input.addEventListener('input', function (e) {
        proxyObj.text = e.target.value;
    });
}
// setTimeout(() => {
//     twoWayDataBinding();
// }, 1000);
/**
 * 实现简单路由
 */
export class Router {
    constructor() {
        this.routes = {};
        this.currentHash = '';
        this.freshRoute = this.freshRoute.bind(this);
        window.addEventListener('load', this.freshRoute, false);
        window.addEventListener('hashchange', this.freshRoute, false);
    }
    // 存储路由
    storeRoute(path, callback) {
        this.routes[path] = callback || function () {};
    }
    // 更新路由
    freshRoute() {
        this.currentHash = location.hash.slice(1) || '/';
        this.routes[this.currentHash]();
    }
}
// const router = new Router();
// router.storeRoute('/', () => console.log('//////'));
// router.storeRoute('test', () => console.log('哈哈哈'));
/**
 * 使用 setTimeout 实现 setInterval
 */
export function mySetInterval(callback, delay) {
    // let obj = { timer: null };
    // const fn = () => {
    //     obj.timer = setTimeout(() => {
    //         callback();
    //         fn.call(this);
    //     }, delay);
    // };
    // fn();
    // return obj;
    let obj = { timer: null };
    const interval = () => {
        callback();
        obj.timer = setTimeout(interval, delay);
    };
    setTimeout(interval, delay);
    return obj;
}
// const obj = mySetInterval(() => {
//     console.log(new Date().getTime());
// }, 1000);
// setTimeout(() => {
//     clearTimeout(obj.timer);
// }, 6000);
/**
 * F
 */
/**
 * 判断对象是否存在循环引用
//  */
function isObject(val) {
    return typeof val === 'object' && val !== null;
}
export function isLoopObject(obj, set = new WeakSet()) {
    if (!isObject(obj)) return false;
    let res = false;
    for (let key of Object.keys(obj)) {
        const val = obj[key];
        if (!isObject(val)) continue;
        if (set.has(val)) return true;
        set.add(val);
        res = isLoopObject(val, set);
    }
    return res;
}
// const o1 = { x: 1, y: { z: 3 } };
// console.log('判断对象是否存在循环引用：', isLoopObject(o1));
// const o2 = { x: 2, o1 };
// const obj = { o1, o2 };
// obj.o1.o2 = o2;
// console.log('判断对象是否存在循环引用：', isLoopObject(obj));
// var a = {
//     b: {
//         c: {},
//     },
// };
// a.b.c.d = a;
// console.log('判断对象是否存在循环引用：', isLoopObject(a));
