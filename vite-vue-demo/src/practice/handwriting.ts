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
        if (timer) clearTimeout(timer);
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
    const len = arr.length;
    for (let i = 0; i < arr.length; i++) {
        const v = arr[i];
        const randomIndex = (Math.random() * (len - 1 - i) + i) >>> 0;
        arr[i] = arr[randomIndex];
        arr[randomIndex] = v;
    }
    return arr;
}
// console.log('randomArr --->>>', randomArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
