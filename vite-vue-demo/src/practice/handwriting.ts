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
        }
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}
function debouncePro(fn, delay, config) {
    const { immediate, resultCallback } = config || {};
    let isInvoke = false; // 阶段性立即执行标识，当前阶段只执行一次
    // 定义一个定时器，保存上一次的定时器
    let timer = null;
    // 真正执行的函数
    function _debounce(...args) {
        if (immediate && !isInvoke) {
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            isInvoke = true;
        }
        // 取消上一次的定时器
        if (timer !== null) {
            clearTimeout(timer);
        }
        // 延迟执行
        timer = setTimeout(() => {
            // 真正需要执行的函数
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            timer = null;
            isInvoke = false;
        }, delay);
    }
    // 取消
    _debounce.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        isInvoke = false;
    };
    return _debounce;
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
function throttlePro(fn, interval, options = { leading: true, trailing: false }) {
    // leading 第一次是否触发；trailing，最后是否触发一次；resultCallback 回调
    const { leading, trailing, resultCallback } = options;
    // 记录上一次的开始时间
    let lastTime = 0;
    let timer = null;
    // 触发时，真正执行的函数
    function _throttle(...args) {
        // 当前时间
        const nowTime = new Date().getTime();
        // 第一次是否触发
        if (!lastTime && !leading) lastTime = nowTime;
        // 计算出剩余多长时间去触发函数
        const remainTime = interval - (nowTime - lastTime);
        // 当前时间减去上一次开始的时间，是否大于等于间隔时间，大于等于间隔时间再去触发函数
        // if (nowTime - lastTime >= interval) {
        if (remainTime <= 0) {
            // 只有 leading 为 true 第一次需要触发时，才会在这里触发函数，其他时候触发的是 setTimeout 中的函数
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            // 保留上次触发的时间
            lastTime = nowTime;
            // 如果触发了，就取消定时器
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            // 已经触发了函数，无需再执行定时器
            return;
        }
        // 最后触发一次
        if (trailing && timer === null) {
            timer = setTimeout(() => {
                // 真正触发函数
                const result = fn.apply(this, args);
                if (resultCallback) resultCallback(result);
                // 如果 leading 为 false 第一次不执行，lastTime 需要为 0，不然 leading 就无效了
                // lastTime = new Date().getTime();
                lastTime = leading ? new Date().getTime() : 0;
                timer = null;
                // 使用 remainTime 会比较精确，
                // 当 leading 为 false 时，此时使用 interval 和 remainTime 是等价的：remainTime = interval - (nowTime - lastTime) = interval - 0 = interval
            }, remainTime);
        }
    }
    // 取消
    _throttle.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        lastTime = 0;
    };
    return _throttle;
}
/**
 * 柯里化
 */
export function currying(arg) {
    const args = [arg];
    const _add = arg => {
        if (arg !== undefined) {
            args.push(arg);
        }
        return _add;
    };
    _add.toString = function () {
        return args.reduce((sum, cur) => {
            return sum + cur;
        });
    };
    return _add;
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
    return res instanceof Object ? res : obj;
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
        res => {
            onFinally();
            return res;
        },
        err => {
            onFinally();
            throw err;
        },
    );
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
                    reject(errs);
                    // reject(new AggregateError(errs));
                }
            });
        });
    });
};
MyPromise.resolve = function (value) {
    // 注意：如果传入的值是 MyPromise 对象则直接返回
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
};
MyPromise.reject = function (err) {
    return new MyPromise((resolve, reject) => reject(err));
};

// const p3 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject('p3');
//     }, 200);
// });
// const p4 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         reject('p4');
//     }, 150);
// });
// MyPromise.any([p3, p4])
//     .then(res => {
//         console.log('MyPromise.any [ p3 + p4 ] res--------------------->>>', res);
//     })
//     .catch(err => {
//         console.log('MyPromise.any [ p3 + p4 ] err--------------------->>>', err);
//         // console.log('MyPromise.any [ p3 + p4 ] err--------------------->>>', err.errors);
//     });
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
        thisArg = window;
        // const o = Object.create(null);
        // const v = thisArg;
        // o.valueOf = () => v;
        // thisArg = o;
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
    if (typeof this === 'object' && this !== null) {
        this.name = 'testMyCall';
    }
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
        thisArg = window;
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
    return function Fn(...args2) {
        const bindThis = this instanceof Fn ? this : thisArg;
        return fn.call(bindThis, ...args1, ...args2);
    };
};
// console.log('myCall 结果：', testMyCall.myBind({ x: 123 }, 1, 2, 3)(4, 5, 6));
// console.log('myCall 结果：', testMyCall.myBind(null, 1, 2, 3)(4, 5, 6));
// console.log('myCall 结果：', testMyCall.myBind(999, 1, 2, 3)(4, 5, 6));
// const bindTestMyCall = testMyCall.myBind({ x: 123 }, 1, 2, 3);
// const bindTestMyCall = testMyCall.bind({ x: 123 }, 1, 2, 3);
// console.log('bindTestMyCall 结果：', new bindTestMyCall(4, 5, 6));

/**
 * ajax 请求
 */
// import data from '../assets/data.json';
export function sendAjax() {
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
export const _completeDeepClone = (target, map = new WeakMap()) => {
    if (target === null) return null;
    if (typeof target === 'function') return target;
    if (typeof target !== 'object') return target;
    if (typeof obj === 'symbol') return Symbol(obj.description);
    //  if (obj instanceof Error) return obj;
    if (map.has(target)) return map.get(target);
    const types = [RegExp, Date, Map, Set, WeakMap, WeakSet];
    for (let type of types) {
        const Constr = target.constructor;
        if (typeof Constr === 'function' && Constr instanceof type) {
            return new Constr(target);
        }
    }
    const newObj = Array.isArray(target) ? [] : {};
    map.set(target, newObj);
    Reflect.ownKeys(target).forEach(key => {
        newObj[key] = _completeDeepClone(target[key], map);
    });
    // Object.getOwnPropertyNames(target).forEach(key => {
    //     newObj[key] = _completeDeepClone(target[key], map);
    // });
    // Object.getOwnPropertySymbols(target).forEach(key => {
    //     res[key] = _completeDeepClone(target[key]);
    // });
    return newObj;
};
// export function deepClone(obj, map = new WeakMap()) {
//     if (obj instanceof Error) return obj;
//     if (typeof obj === 'function') return obj;
//     if (typeof obj === 'symbol') return Symbol(obj.description);
//     if (typeof obj !== 'object' || obj === null) return obj;
//     if (map.has(obj)) return map.get(obj);
//     const types = [Date, RegExp, Set, Map, WeakMap, WeakSet];
//     if (types.some(Type => obj instanceof Type)) {
//         const Constr = obj.constructor;
//         if (Constr && typeof Constr === 'function') {
//             return new Constr(obj);
//         }
//     }
//     let newObj = Array.isArray(obj) ? [] : {};
//     map.set(obj, newObj);
//     Reflect.ownKeys(obj).forEach(key => {
//         newObj[key] = deepClone(obj[key], map);
//     });
//     Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj));
//     return newObj;
// }
/**
 * sleep 函数
 */
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
// export async function asyncSleep(delay) {
//     await new Promise(resolve => {
//         setTimeout(resolve, delay);
//     });
// }
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
    for (let i = 0; i < this.length; i++) {
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
    for (let i = 0; i < this.length; i++) {
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
/**
 * 实现 字符串的 repeat 方法
 */
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
/**
 * 对象扁平化
 */
function flatten(obj) {
    let result = {};
    Object.keys(obj).forEach(key => {
        const cur = obj[key];
        if (typeof cur !== 'object') {
            result[key] = cur;
        } else {
            const tempObj = flatten(cur);
            Object.keys(tempObj).forEach(key2 => {
                result[`${key}.${key2}`] = tempObj[key2];
            });
        }
    });
    return result;
}
// 示例
// let obj = {
//     name: 'Jack',
//     address: {
//         province: 'Shanghai',
//         city: {
//             district: 'Pudong',
//             street: 'Century Avenue',
//         },
//     },
// };
// let result = flatten(obj);
// console.log(result);
// console.log('repeat 结果：', repeat('abc-', 3));

// console.log('reverse 结果：', reverse('abc-'));
/**
 * 将数字每千分位用逗号隔开
 * 注意：
 *      要考虑小数的情况
 *      要考虑负数的情况
 *      要考虑不足三位的情况
 */
export function comma(num) {
    // if (typeof num !== 'number') return num;
    // 方法一：正则
    // return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 方法二 - 1：转成数组，添加豆号
    if (typeof num !== 'number') return num;
    const str = String(Math.abs(num));
    const flag = num < 0;
    const [str1, str2] = str.split('.');
    const arr = str1.split('');
    let index = arr.length - 3;
    while (index > 0) {
        arr.splice(index, 0, ',');
        index -= 3;
    }
    return `${flag ? '-' : ''}${arr.join('')}${str2 ? '.' + str2.slice(0, 3) : ''}`;

    // 方法二 - 2：转成数组，添加豆号
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
    // const str = String(Math.abs(num));
    // const flag = num > 0;
    // const [a, b] = str.split('.');
    // const transform = val => {
    //     if (!val) return '';
    //     const len = val.length;
    //     if (len < 3) return val;
    //     const n = len % 3;
    //     if (n > 0) {
    //         const arr = val.slice(n, len).match(/\d{3}/g);
    //         return `${val.slice(0, n)},${arr ? arr.join(',') : ''}`;
    //     } else {
    //         const arr = val.match(/\d{3}/g);
    //         return arr ? arr.join(',') : '';
    //     }
    // };
    // const res = `${flag ? '-' : ''}${transform(a)}`;
    // return b ? `${res}.${transform(b)}` : res;
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
        r = (Number(a.pop()) || 0) + (Number(b.pop()) || 0) + r;
        // r = ~~a.pop() + ~~b.pop() + r;
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
 * 43. 字符串相乘   大数相乘
 *  给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
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
 * 将数组转换为树形结构
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
// const source = [
//     {
//         id: 1,
//         pid: 0,
//         name: 'body',
//     },
//     {
//         id: 2,
//         pid: 1,
//         name: 'title',
//     },
//     {
//         id: 3,
//         pid: 2,
//         name: 'div',
//     },
// ];
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
        if (element.nodeName.toUpperCase() === 'INPUT') {
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
 * 小孩报数问题
 */
function childNum(n, k) {
    // 创建一个数组，表示小孩的编号
    const kids = Array.from({ length: n }, (_, index) => index + 1);

    let currentIndex = 0;
    const result = [];

    while (kids.length > 0) {
        currentIndex = (currentIndex + k - 1) % kids.length; // 计算当前报数的小孩索引位置
        result.push(kids.splice(currentIndex, 1)[0]); // 将当前报数的小孩从数组中移除，并添加到结果数组中
    }

    return result;
}
childNum(30, 3);

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
    let res = [];
    const map = new Map();
    arr.forEach(val => {
        if (map.has(val)) {
            map.set(val, map.get(val) + 1);
        } else {
            map.set(val, 1);
        }
        const v = map.get(val) + 1;
        if (v === max) {
            res.push(key);
        }
        if (v > max) {
            max = v;
            res = [val];
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
 * 高频数据类型
 */
const _findMostType = array => {
    if (!Array.isArray(array)) {
        return [];
    }
    const types = { string: 'string', number: 'number', boolean: 'boolean', undefined: 'undefined' };
    const map = new Map();
    let res = [];
    let max = 0;
    array.forEach(val => {
        const key = val === null ? 'null' : types[typeof val] || 'object';
        if (map.has(key)) {
            map.set(key, map.get(key) + 1);
        } else {
            map.set(key, 1);
        }
        const v = map.get(key);
        if (v === max) {
            res.push(key);
        }
        if (v > max) {
            res = [key];
            max = v;
        }
    });
    res.push(max);
    return res;
};
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
 * 实现简单路由 hash 模式
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
 * 实现简单路由 history 模式
 */
class Router {
    constructor() {
        this.routes = {};
        this.listerPopState();
    }

    init(path) {
        history.replaceState({ path: path }, null, path);
        this.routes[path] && this.routes[path]();
    }

    route(path, callback) {
        this.routes[path] = callback;
    }

    push(path) {
        history.pushState({ path: path }, null, path);
        this.routes[path] && this.routes[path]();
    }

    listerPopState() {
        window.addEventListener('popstate', e => {
            const path = e.state && e.state.path;
            this.routers[path] && this.routers[path]();
        });
    }
}
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
 */
export function isLoopObject(obj, set = new WeakSet()) {
    if (typeof obj !== 'object' || obj === null) return false;
    const isObject = val => val !== null && typeof val === 'object';
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
/**
 * FED54 计时器 实现打点计时器
实现一个打点计时器，要求 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作 3、第一个数需要立即输出
*/
function count(start, end) {
    console.log(start);
    let timer = setInterval(() => {
        console.log(++start);
        if (start >= end) {
            clearInterval(timer);
        }
    }, 100);
    return {
        cancel() {
            clearInterval(timer);
        },
    };
}
function count2(start, end) {
    let timer = null;
    function _count(num) {
        console.log(num++);
        timer = setTimeout(() => {
            if (num <= end) {
                _count(num);
            }
        }, 100);
    }
    _count(start);
    return {
        cancel() {
            clearInterval(timer);
        },
    };
}
// console.log(count(1, 6))
/**
 * 流程控制
 * 实例链式调用：如let a = new Man(); a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi()；写出Man()构造函数
 */
function Man() {
    this.delay = 0;
    this.sleep = delay => {
        console.log(delay);

        this.delay += delay;
        return this;
    };
    this.sayHi = () => {
        setTimeout(() => {
            console.log('Hi');
        }, this.delay);
        return this;
    };
}
// let a = new Man();
// a.sleep(1000).sayHi().sleep(1000).sleep(2000).sayHi();
function Man2() {
    // setTimeout(() => {
    //     // 不需要调用 done 方法
    //     this.done();
    // }, 0);
    this.queue = [];
    this.sleep = time => {
        const fn = async () => {
            console.log(time);
            return new Promise(resolve => {
                setTimeout(resolve, time);
            });
        };
        this.queue.push(fn);
        return this;
    };
    this.sayHi = () => {
        const fn = () => {
            console.log('hi');
        };
        this.queue.push(fn);
        return this;
    };
    this.done = async () => {
        while (this.queue.length > 0) {
            await this.queue.shift()();
        }
    };
}
// 调用 done 方法启动
// function Man() {
//     this.queue = [];
//     this.next = () => {
//         const first = this.queue.shift();
//         if (first) {
//             first();
//         }
//         return this;
//     };
//     this.sleep = time => {
//         const fn = () => {
//             console.log(time);
//             setTimeout(() => {
//                 this.next();
//             }, time);
//         };
//         this.queue.push(fn);
//         return this;
//     };
//     this.sayHi = () => {
//         const fn = () => {
//             console.log('hi');
//             this.next();
//         };
//         this.queue.push(fn);
//         return this;
//     };
//     this.done = () => {
//         this.next();
//     };
// }
// let a = new Man();
// a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi().done();

/**
 * JS78 将字符串转换为驼峰格式
 * css 中经常有类似 background-image 这种通过 - 连接的字符，通过 javascript 设置样式的时候需要将这种样式转换成 backgroundImage 驼峰格式，请完成此转换功能
    1. 以 - 为分隔符，将第二个起的非空单词首字母转为大写
    2. -webkit-border-image 转换后的结果为 webkitBorderImage
    输入：'font-size'  输出：fontSize
 */
function cssStyle2DomStyle(sName) {
    if (typeof sName !== 'string') {
        return sName;
    }
    return sName.replace(/^-/, '').replace(/-(.)/g, (v1, v2) => v2.toUpperCase());
}
/**
 * 实现 generator 的自动执行器
 */
function run(gen) {
    let g = gen();
    function next(data) {
        let result = g.next(data);
        if (result.done) return result.value;
        if (result.value instanceof Promise) {
            result.value.then(data => next(data));
        } else {
            result.value(next);
        }
    }
    return next();
}
function func(data, cb) {
    console.log(data);
    cb();
}
function* gen() {
    let a = yield Promise.resolve(1);
    console.log(a);
    let b = yield Promise.resolve(2);
    console.log(b);
    yield func.bind(null, a + b);
}
run(gen);
/**
 * 手写 jsonp 的实现
 */
// foo 函数将会被调用 传入后台返回的数据
function foo(data) {
    console.log('通过jsonp获取后台数据:', data);
    document.getElementById('data').innerHTML = data;
}
(function jsonp() {
    let head = document.getElementsByTagName('head')[0]; // 获取head元素 把js放里面
    let js = document.createElement('script');
    js.src = 'http://domain:port/testJSONP?a=1&b=2&callback=foo'; // 设置请求地址
    head.appendChild(js); // 这一步会发送请求
})();
/**
 * 实现数组的 reduce 方法
 */
Array.prototype.myReduce = function (callback, initialValue) {
    const arr = this;
    if (!Array.isArray(arr)) throw new Error(`the ${arr} not is a array`);
    if (typeof callback !== 'function') throw new Error(`the ${arr} not is a function`);
    let res = initialValue === undefined ? arr[0] : initialValue;
    for (let i = 1; i < arr.length; i++) {
        res = callback(res, arr[i], i, arr);
    }
    return res;
};
/**
 * JS40 虚拟DOM
 */
var vnode = {
    tag: 'ul',
    props: {
        class: 'list',
    },
    text: '',
    children: [
        {
            tag: 'li',
            props: {
                class: 'item',
            },
            text: '',
            children: [
                {
                    tag: undefined,
                    props: {},
                    text: '牛客网',
                    children: [],
                },
            ],
        },
        {
            tag: 'li',
            props: {},
            text: '',
            children: [
                {
                    tag: undefined,
                    props: {},
                    text: 'nowcoder',
                    children: [],
                },
            ],
        },
    ],
};
const _createElm = vnode => {
    const { tag, props, text, children } = vnode;
    if (!tag) {
        return document.createTextNode(text);
    }
    const dom = document.createElement(tag);
    Object.keys(props).forEach(prop => {
        dom.setAttribute(prop, props[prop]);
    });
    if (children) {
        children.forEach(child => {
            const childDom = _createElm(child);
            dom.appendChild(childDom);
        });
    }
    return dom;
};
_createElm(vnode);
/**
 * JS76 判断是否符合 USD 格式
 */
function isUSD(str) {
    return /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/.test(str);
}
/**
 * 字符串转成对象
 */
function parseStrToObj(obj, str, val) {
    if (typeof obj !== 'object' || obj === null) {
        obj = {};
    }
    let temp = obj;
    const keys = str.split('.');
    while (keys.length > 0) {
        const curKey = keys.shift();
        const curObj = temp[curKey];
        if (keys.length === 0) {
            temp[curKey] = val;
            return obj;
        }
        if (typeof curObj !== 'object') {
            temp[curKey] = {};
        }
        temp = temp[curKey];
    }
    return obj;
}
var obj = { a: { b: { c1: 31 }, b1: 21 }, a1: 11, a2: 12 };
parseStrToObj(obj, 'a.b.c.d', 4); // obj, 'a.b.c.d', 4 -> obj.a.b.c.d = 4

