// @ts-nocheck
/**
 * 手写系列
 */
/**
 * 防抖
 */
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    };
}
function debouncePro(fn, delay, config) {
    const { immediate, resultCallback } = config || {};
    let timer = null;
    let isInvoke = false; // 是否激活了立即执行标识，当前阶段只执行一次
    function _debounce(...args) {
        if (immediate && !isInvoke) {
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            isInvoke = true; // 已经立即执行, 阻止下次触发的立即执行
        }
        if (timer) clearTimeout(timer); // 取消上一次的定时器
        timer = setTimeout(() => {
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            timer = null;
            isInvoke = false; // 重置 isInvoke
        }, delay);
    }
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
function throttle(fn, interval) {
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
function throttlePro(fn, interval, options) {
    const { leading = true, trailing = false, resultCallback } = options;
    let timer = null;
    let last = 0;
    let flag = false;
    return function (...args) {
        // if (timer) return; // 直接返回，会导致执行的时机不是很精确
        const now = new Date().getTime();
        if (!leading && last === 0) last = now; // last 为 0 时，把 last 置为 now ，第一次不执行
        const remain = interval - (now - last); // 计算出剩余多长时间去触发函数
        // 如果超过间隔时间，就可以触发方法（remaining <= 0）// remaining > interval, 表示客户端系统时间被调整过
        if (remain <= 0 || remain > interval) {
            const result = fn.apply(this, args); // 如果本次触发和上次触发的时间间隔超过设定的时间，则执行函数
            if (typeof resultCallback === 'function') resultCallback(result);
            last = now; // 然后将本次的触发时间，作为下次触发事件的参考时间
            if (timer) clearTimeout(timer); // 触发过了，就取消定时器
            return; // 已经执行过了，无需再次计时
        }
        // 最后触发一次，且只有计时器不存在时再触发，否则会触发多次
        if (trailing && !timer) {
            timer = setTimeout(() => {
                const result = fn.apply(this, args);
                if (typeof resultCallback === 'function') resultCallback(result);
                last = leading ? new Date().getTime() : 0; // 如果 leading 为 false 第一次不执行，lastTime 需要为 0，不然 leading 就无效了
                timer = null;
            }, remain); // 当 leading 为 false 时，此时使用 interval 和 remain 是等价的：remain = interval - (now - last) = interval - 0 = interval
        }
    };
}
const fn = throttle(
    () => {
        console.log('fn');
        return 'fn';
    },
    1000,
    {
        leading: true,
        trailing: true,
        resultCallback(result) {
            console.log('callback', result);
        },
    },
);
console.log(111);
fn();
setTimeout(() => {
    console.log(222);
    fn();
}, 900);
setTimeout(() => {
    console.log(333);
    fn();
    // fn.cancel();
}, 1800);
setTimeout(() => {
    console.log(444);
    fn();
    // fn.cancel();
}, 3600);
setTimeout(() => {
    console.log(555);
    fn();
    // fn.cancel();
}, 3700);
setTimeout(() => {
    console.log(666);
    fn();
}, 3800);
/**
 * 柯里化
 */
function currying(arg) {
    const args = [arg];
    const _fn = arg => {
        if (arg !== undefined) args.push(arg);
        return _fn;
    };
    _fn.toString = () => args.reduce((sum, cur) => sum + cur);
    return _fn;
}
console.log('currying 结果：' + currying(1)(2)(3)(4)(5)()());
/**
 * 参数长度不固定
 */
function currying(...args1) {
    const args = [...args1];
    const _fn = (...args2) => {
        args.push(...args2);
        return _fn;
    };
    _fn.toString = () => args.reduce((count, cur) => count + cur);
    return _fn;
}
console.log('currying2 结果：' + currying(1, 10000)(2, 20000)(3, 30000, 40000, 50000)(4)(5)()());
/**
 * 普通函数转成柯里化函数
 */
function createCurrying(fn, ...args1) {
    console.log(fn.length, args1);
    if (args1.length >= fn.length) {
        return fn.apply(this, args1);
    } else {
        // return function (...args) {
        //     return createCurrying(fn, ...args1, ...args);
        // };
        return createCurrying.bind(this, fn, ...args1);
    }
    // return args1.length >= fn.length ? fn.apply(this, args1) : createCurrying.bind(this, fn, ...args1);
}
function test(arg1, arg2, arg3) {
    return arg1 + arg2 + arg3;
}
const curryingTest = createCurrying(test);
console.log('createCurrying 结果：', curryingTest(1)(2)(3));
/**
 * compose 函数，注意参数的顺序，从右到左
 * compose 函数可以将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。
 */
const compose = (...args) => {
    return function (arg) {
        return args.reduceRight((res, cur) => cur(res), arg); // 从右侧开始
    };
};
// 我们的计算改为两个函数的嵌套计算，add函数的返回值作为multiply函数的参数
const add = x => x + 10;
const multiply = x => x * 10;
console.log(compose(multiply, add)(10), multiply(add(10))); // 结果还是 200
/**
 *
 * pipe 函数，注意参数的顺序，从左到右
 * 和 compose 函数类似，可以将需要嵌套执行的函数平铺，嵌套执行就是一个函数的返回值将作为另一个函数的参数。
 */
const pipe = (...args) => {
    return function (arg) {
        return args.reduce((res, cur) => cur(res), arg); // 从右侧开始
    };
};
// 我们的计算改为两个函数的嵌套计算，add函数的返回值作为multiply函数的参数
const add = x => x + 10;
const multiply = x => x * 10;
console.log(pipe(add, multiply)(10), multiply(add(10))); // 结果还是 200
/**
 * 实现 Object.create
 */
function objectCreate(obj) {
    // function Fn() {}
    // Fn.prototype = obj;
    // return new Fn();
    return Object.setPrototypeOf({}, obj);
}
const obj = { x: 123 };
console.log('objectCreate 结果：', Object.create(obj));
console.log('objectCreate 结果：', objectCreate(obj));
/**
 * 实现 Object.freeze
 */
// const _objectFreeze = object => {
//     if (typeof object !== 'object' || object == null) throw new TypeError(`${typeof object} is not a object`);
//     const keys = Object.getOwnPropertyNames(object);
//     const symbols = Object.getOwnPropertySymbols(object);
//     [...keys, ...symbols].forEach(key => {
//         Object.defineProperty(object, key, {
//             configurable: false,
//             writable: false,
//         });
//     });
//     Object.preventExtensions(object);
// };
const _objectFreeze = object => {
    if (typeof object !== 'object' || object == null) throw new TypeError(`${typeof object} is not a object`);
    Reflect.ownKeys(object).forEach(key => {
        console.log(key);
        Object.defineProperty(object, key, {
            configurable: false,
            writable: false,
        });
    });
    Object.preventExtensions(object);
};
const obj = { a: 1 };
_objectFreeze(obj);
obj.a = 11;
obj.b = 2;
// Object.defineProperty(obj, 'a', {
//     configurable: true,
// });
console.log(obj);
/**
 * 实现 instanceof
 */
function myInstanceof(obj, constr) {
    if (obj == null || constr == null) return false;
    let proto = Object.getPrototypeOf(obj);
    while (proto) {
        if (proto === constr.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
console.log('myInstanceof 结果：', myInstanceof([], Object));
/**
 * 实现 new 操作符
 */
function myNew(fn, ...args) {
    if (typeof fn !== 'function') throw new TypeError(`fn is not a function`);
    const newObj = Object.create(fn.prototype);
    const result = fn.apply(newObj, args);
    return result instanceof Object ? result : newObj; // 注意：function 也是函数对象
}
function ConstrMyNew(arg) {
    this.x = arg;
    // return function R() {};
}
// 箭头函数会报错
console.log('myNew 结果：', myNew(ConstrMyNew, 123), 'new 结果：', new ConstrMyNew(123));
/**
 * 实现 Promise
 */
// 三次优化版
const createTask = (resolve, reject, instance, getRes) => {
    // return getRes => {
    return () => {
        queueMicrotask(() => {
            try {
                const res = getRes(instance.value); // 把当前结果传递给 then 方法的回调函数
                if (res instanceof MyPromise) {
                    res.then(resolve); // 如果结果是 promise 则执行 then 方法展开结果
                } else {
                    resolve(res); // 将上次一 then 里面的结果传递进下一个新的 Promise 中
                }
            } catch (err) {
                reject(err);
            }
        });
    };
    // };
};
const STATES = { PENDING: 'PENDING', REJECTED: 'REJECTED', RESOLVED: 'RESOLVED' };
function MyPromise(exec) {
    this.state = STATES.PENDING;
    this.value = '';
    this.resolveCallbackArr = []; // 用于存储 resolve 回调函数
    this.rejectCallbackArr = []; // 用于存储 reject 回调函数
    const resolve = res => {
        if (this.state !== STATES.PENDING) return;
        this.state = STATES.RESOLVED;
        this.value = res; // 更新结果，更新状态，以及执行回调函数（此时回执行 then 方法的回调函数）
        this.resolveCallbackArr.forEach(callback => callback());
    };
    const reject = res => {
        if (this.state !== STATES.PENDING) return;
        this.state = STATES.REJECTED;
        this.value = res; // 更新结果，更新状态，以及执行回调函数（此时回执行 then 方法的回调函数）
        this.rejectCallbackArr.forEach(callback => callback());
    };
    try {
        exec(resolve, reject);
    } catch (error) {
        reject(error);
    }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
    return new MyPromise((resolve, reject) => {
        // const createTask = taskFactory(resolve, reject, this);
        if (typeof onResolved !== 'function') onResolved = res => res; // 为了把值传递下去
        if (typeof onRejected !== 'function')
            onRejected = err => {
                throw err; // 注意需要使用 throw 抛出，才能走下一个 reject 回调
            };
        if (this.state === STATES.RESOLVED) {
            createTask(resolve, reject, this, onResolved)(); // 非 panding 状态，立即执行
        }
        if (this.state === STATES.REJECTED) {
            createTask(resolve, reject, this, onRejected)(); // 非 panding 状态，立即执行
        }
        if (this.state === STATES.PENDING) {
            this.resolveCallbackArr.push(createTask(resolve, reject, this, onResolved));
            this.rejectCallbackArr.push(createTask(resolve, reject, this, onRejected));
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
Promise.myAll = function (values) {
    if (!values[Symbol.iterator]) throw new TypeError(`values is not iterate`);
    return new Promise((resolve, reject) => {
        const result = [];
        let count = 0;
        if (values.length < 1) resolve(result);
        for (let i = 0; i < values.length; i++) {
            Promise.resolve(values[i]).then(res => {
                result[i] = res;
                if (++count === values.length) {
                    resolve(result);
                }
            }, reject);
        }
    });
};
Promise.myAllSettled = function (values) {
    if (!values[Symbol.iterator]) throw new TypeError(`values is not iterate`);
    return new Promise((resolve, reject) => {
        const result = [];
        let count = 0;
        if (values.length < 1) resolve(result);
        for (let i = 0; i < values.length; i++) {
            Promise.resolve(values[i]).then(
                res => {
                    result[i] = { status: 'fulfilled', value: res };
                    if (++count === values.length) {
                        resolve(result);
                    }
                },
                err => {
                    result[i] = { status: 'rejected', reason: err };
                    if (++count === values.length) {
                        resolve(result);
                    }
                },
            );
        }
    });
};
Promise.myRace = function (values) {
    if (!values[Symbol.iterator]) throw TypeError(`values is not iterate`);
    return new Promise((resolve, reject) => {
        for (const value of values) {
            Promise.resolve(value).then(resolve, reject);
        }
    });
};
Promise.myAny = function (values) {
    if (!values[Symbol.iterator]) throw new TypeError(`values is not iterate`);
    return new Promise((resolve, reject) => {
        const errors = [];
        let count = 0;
        if (values.length < 1) reject(new AggregateError(errors, 'All promises were rejected'));
        for (let i = 0; i < values.length; i++) {
            Promise.resolve(values[i]).then(resolve, err => {
                errors[i] = err;
                if (++count === values.length) {
                    reject(new AggregateError(errors, 'All promises were rejected'));
                }
            });
        }
    });
};
Promise.myResolve = function (value) {
    if (value instanceof Promise) return value;
    return new Promise(resolve => resolve(value));
};
Promise.myReject = function (value) {
    return new Promise((resolve, reject) => reject(value));
};
// 串联执行
Promise.serialAll = function (values) {
    // if (!values[Symbol.iterator]) throw new TypeError(`values is not iterate`);
    if (!Array.isArray(values)) return;
    if (values.length < 1) return;
    return values.reduce((result, cur) => Promise.resolve(result).then(res => cur));
    // const exec = result => Promise.resolve(values.shift()).then(res => (values.length > 0 ? exec(res) : res));
    // return exec();
};
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p1');
        resolve('p1');
    }, 1500);
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p2');
        resolve('p2');
    }, 3200);
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p3');
        // reject('p3');
        resolve('p3');
    }, 1500);
});
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('p4');
        reject('p4');
    }, 500);
});
Promise.serialAll([p1, p2, p3, p4])
    .then(res => {
        console.log('MyPromise.all [ p1 + p2 ]-------------------->>>', res);
    })
    .catch(err => {
        console.log('err', err);
    });

/**
// 实现并发控制
 */
class Scheduler {
    constructor() {
        this.pending = []; // 记录promise的数组
        this.limit = 2; // 限制器
        this.count = 0; // 记录当前已被启动的promise
    }
    add(promiseCreator) {
        this.pending.push(promiseCreator); // 单纯存储promise
        this.run(); // 启动执行，至于能不能走run内部会控制
    }
    run() {
        if (!this.pending.length || this.count >= this.limit) {
            return; // 假设pending为空，或者调用大于限制直接返回
        }
        this.count++;
        this.pending
            .shift()()
            .finally(() => {
                this.count--;
                this.run(); // 轮询
            });
    }
}
const timeout = time =>
    new Promise(resolve => {
        setTimeout(resolve, time);
    });

const scheduler = new Scheduler();

const addTask = (time, order) => {
    scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, '1');
addTask(500, '2');
addTask(300, '3');
addTask(400, '4');
// output: 2 3 1 4

// 最多处理3个请求的调度器
function Scheduler(list = [], limit = 3) {
    let count = 0;
    // 用于统计成功的次数
    let resLength = 0;
    // 浅拷贝一份，原数据的length我们还有用
    const pending = [...list];
    const resList = [];

    // 一定得返回一个promise
    return new Promise((resolve, reject) => {
        const run = () => {
            if (!pending.length || count >= limit) return;
            count++;
            const index = list.length - pending.length;
            const params = pending.shift();

            request(params)
                .then(res => {
                    // 使用输出来验证限制器生效没
                    console.log('用于验证限制器:', res);
                    count--;
                    resLength++;
                    // 按index来保存结果
                    resList[index] = res;
                    // 全部成功了吗？没有就继续请求，否则resolve(resList)跳出递归;
                    resLength === list.length ? resolve(resList) : run();
                })
                .catch(reject); // 有一个失败就直接失败
        };

        // 遍历，模拟前两次依次调用的动作，然后在run内部控制如何执行
        list.forEach(() => run());
    });
}

Scheduler([1, 2, 3, 4, 5]).then(console.log); // 1 2 3 4 5

/**
 * 类型判断
 * 获取数据类型
 */
function getType(val) {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (typeof val === 'object')
        return Object.prototype.toString
            .call(val)
            .slice(8, -1)
            .replace(/(^.)/, v => v.toLowerCase());
    return typeof val;
}
console.log('getType(null)：', getType(null));
console.log('getType(123)：', getType(123));
console.log('getType(str)：', getType('str'));
console.log('getType(class)：', getType(class {}));
console.log(
    'getType(function)：',
    getType(function () {}),
);
console.log('getType(object)：', getType({}));
console.log('getType(date)：', getType(new Date()));
console.log('getType(array)：', getType([]));
console.log('getType(array)：', getType(new ArrayBuffer()));
/**
 * 实现 call 函数
 */
Function.prototype.myCall = function (thisArg, ...args) {
    if (typeof this !== 'function') throw new TypeError(`the ${this} is not a function`);
    if (thisArg == null) {
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
function testMyCall(...args) {
    // console.log('args ---------->>>', args);
    if (typeof this === 'object' && this !== null) {
        this.name = 'testMyCall';
    }
    return this;
}
console.log('myCall 结果：', testMyCall.myCall({ x: 123 }, 1, 2, 3));
console.log('myCall 结果：', testMyCall.myCall(null, 1, 2, 3) + 1);
console.log('myCall 结果：', testMyCall.myCall(999, 1, 2, 3) + 1);
console.log('----------------------------------------------------------');
console.log('myCall 结果：', testMyCall.call({ x: 123 }, 1, 2, 3));
console.log('myCall 结果：', testMyCall.call(null, 1, 2, 3) + 1);
console.log('myCall 结果：', testMyCall.call(999, 1, 2, 3) + 1);
/**
 * 实现 apply 函数
 */
Function.prototype.myApply = function (thisArg, args = []) {
    if (typeof this !== 'function') throw new TypeError(`the ${this} is not a function`);
    if (thisArg == null) {
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
function testMyCall(...args) {
    // console.log('args ---------->>>', args);
    if (typeof this === 'object' && this !== null) {
        this.name = 'testMyCall';
    }
    return this;
}
console.log('myCall 结果：', testMyCall.myApply({ x: 123 }, [1, 2, 3]));
console.log('myCall 结果：', testMyCall.myApply(null, [1, 2, 3]) + 1);
console.log('myCall 结果：', testMyCall.myApply(999, [1, 2, 3]) + 1);
/**
 * 实现 bind 函数
 */
Function.prototype.myBind = function (thisArg, ...args1) {
    if (typeof this !== 'function') throw new TypeError(`then ${this} is not a function`);
    const self = this;
    return function Fn(...args) {
        return self.call(this instanceof Fn ? this : thisArg, ...args1, ...args);
    };
    // let fname = null; // 为了 new 运算复调用时使函数的名字一致
    // eval(`fname = function ${self.name}(...args) {
    //         return self.call(this instanceof ${self.name} ? this : thisArg, ...args1, ...args);
    //     }`);
    // return fname;
};
function testMyCall(...args) {
    console.log('args ---------->>>', args);
    if (typeof this === 'object' && this !== null) {
        this.name = 'testMyCall';
    }
    return this;
}
console.log('myCall 结果：', testMyCall.myBind({ x: 123 }, 1, 2, 3)(4, 5, 6));
console.log('myCall 结果：', testMyCall.myBind(null, 1, 2, 3)(4, 5, 6));
console.log('myCall 结果：', testMyCall.myBind(999, 1, 2, 3)(4, 5, 6));
const bindTestMyCall = testMyCall.myBind({ x: 123 }, 1, 2, 3);
console.log('bindTestMyCall 结果：', new bindTestMyCall(4, 5, 6));
console.log('------------------------------------------------------------------------');
console.log('myCall 结果：', testMyCall.bind({ x: 123 }, 1, 2, 3)(4, 5, 6));
console.log('myCall 结果：', testMyCall.bind(null, 1, 2, 3)(4, 5, 6));
console.log('myCall 结果：', testMyCall.bind(999, 1, 2, 3)(4, 5, 6));
const bindTestMyCall2 = testMyCall.bind({ x: 123 }, 1, 2, 3);
console.log('bindTestMyCall 结果：', new bindTestMyCall2(4, 5, 6));
/**
 * ajax 请求
 */
// import data from '../assets/data.json';
function sendAjax() {
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
function promiseAjax(config) {
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

const types = [RegExp, Date, Map, Set, WeakMap, WeakSet];
function deepClone(target, cache = new WeakMap()) {
    if (target === null) return null;
    if (target === undefined) return null;
    if (typeof target === 'function') return target;
    if (typeof target === 'symbol') return Symbol(target.description);
    if (target instanceof Error) return target;
    if (typeof target !== 'object') return target;
    if (cache.has(target)) return cache.get(target);
    const Type = types.find(Constr => target instanceof Constr);
    if (Type) {
        const Constr = target.constructor;
        if (typeof Constr === 'function') return new Constr(target);
        return new Type(target); // 如果 constructor 属性被覆盖了，则直接使用 Type
    }
    const newObj = Array.isArray(target) ? [] : {};
    cache.set(target, newObj); // 缓存值，防止循环引用的问题
    Reflect.ownKeys(target).forEach(key => {
        newObj[key] = deepClone(target[key], cache);
    });
    // Object.getOwnPropertyNames(target).forEach(key => {
    //     newObj[key] = _completeDeepClone(target[key], map);
    // });
    // Object.getOwnPropertySymbols(target).forEach(key => {
    //     res[key] = _completeDeepClone(target[key]);
    // });
    return newObj;
}
/**
 * 测试
 */
function testDeepClone() {
    function fn() {
        return 'fn';
    }
    let e = new Error('错了');
    let reg = /d/g;
    const symbolkey = Symbol('作为 key 值');
    class MySet extends Set {
        mySet;
        constructor(...args) {
            super(...args);
            this.mySet = 'mySet';
        }
    }
    const prototpyeObj = {};
    Object.setPrototypeOf(prototpyeObj, { super: '原型上的值', fn() {} });
    const obj = {
        num: 123,
        string: 'string',
        boolean: true,
        null: null,
        undefined: undefined,
        object: {},
        array: [],
        reg: reg,
        date: new Date(),
        Symbol: Symbol(''),
        [symbolkey]: 'symbol 作为 key 值',
        set: new Set([123, 456, 789]),
        mySet: new MySet([111, 222, 333]),
        map: new Map([
            [123, 123],
            [456, 456],
            [789, 789],
        ]),
        prototpyeObj,
        arr: [
            'number: ',
            123,
            'string: ',
            'string',
            'boolean: ',
            true,
            'null: ',
            null,
            'undefined: ',
            undefined,
            'object: ',
            {},
            'array: ',
            [],
            'reg: ',
            reg,
            new Date(),
            'Symbol: ',
            Symbol(''),
            'symbolkey: ',
            symbolkey,
            'set: ',
            new Set([123, 456, 789]),
            new MySet([111, 222, 333]),
            'map: ',
            new Map([
                [123, 123],
                [456, 456],
                [789, 789],
            ]),
            'fn: ',
            fn,
            'e: ',
            e,
            'error: ',
            Error('我错了'),
        ],
        fn: fn,
        // fnResult: fn(),
        e: e,
        error: Error('我错了'),
    };

    const newObj = deepClone(obj);
    console.log('obj --------------------------->>>', obj);
    console.log('newObj ------------------------>>>', newObj);
    console.log('obj === newObj ---------------->>>', obj === newObj);
    console.log('obj.object === newObj.object--->>>', obj.object === newObj.object);
    console.log('obj.array === newObj.array----->>>', obj.array === newObj.array);
    console.log('obj.reg === newObj.reg--------->>>', obj.reg === newObj.reg);
    console.log('obj.Symbol === newObj.Symbol--->>>', obj.Symbol === newObj.Symbol);
    console.log('obj.set === newObj.set--------->>>', obj.set === newObj.set);
    console.log('obj.mySet === newObj.mySet----->>>', obj.mySet === newObj.mySet);
    console.log('obj.map === newObj.map--------->>>', obj.map === newObj.map);
    newObj.set.add(110);
    newObj.mySet.add(444);
    newObj.map.set(110, 110);
    console.log('Function 和 Error 直接使用同一个值-------------------------------');
    console.log('obj.fn === newObj.fn----------->>>', obj.fn === newObj.fn);
    console.log('obj.e === newObj.e------------->>>', obj.e === newObj.e);
    console.log('obj.error === newObj.error----->>>', obj.error === newObj.error);
    console.log('对象原型的属性和方法------------->>>', obj.prototype, newObj.super);
    // 循环引用
    let loopObj = { a: 123 };
    loopObj.loopObj = loopObj;
    const newLoopObj = deepClone(loopObj);
    console.log('循环引用 ------------->>>', newLoopObj);
    console.log('循环引用 ------------->>>', newLoopObj === newLoopObj.loopObj);
    console.log('循环引用 ------------->>>', newLoopObj.loopObj === newLoopObj.loopObj.loopObj);
    console.log('循环引用 ------------->>>', newLoopObj.loopObj.loopObj === newLoopObj.loopObj.loopObj.loopObj);
    // 修改原型
    let map = new Map([[1, 1]]);
    map.constructor = { a: 1 };
    const newMap = deepClone(map);
    console.log('newMap ------------->>>', map, newMap, map === newMap);
}
testDeepClone();
/**
 * JS76 判断是否符合 USD 格式
 */
function isUSD(str) {
    return /^\$\d{1,3}(,\d{3})*(\.\d{2})?$/.test(str);
}
console.log(isUSD('$123.45'));
console.log(isUSD('$123,000.45'));
console.log(isUSD('￥123.45'));
console.log(isUSD('$123.123'));
console.log(isUSD('$12345678'));
/**
 * 检查是否包含连续重复英文字符
 */
function containsRepeatingLetter(str) {
    if (typeof str !== 'string') return false;
    // return /([a-zA-Z])\1/.test(str); // \1 代表匹配第一个小括号的引用值
    const len = str.length;
    for (let i = 0; i < len; i++) {
        if (str[i] === str[i + 1] && /[a-zA-Z]/.test(str[i])) return true;
    }
    return false;
}
console.log(containsRepeatingLetter('abccdef'));
/**
 * 字符串转成对象
 */
function parseStrToObj(obj, str, val) {
    if (typeof obj !== 'object' || obj == null) return {};
    str = String(str);
    const keys = str.replace(/\[(.+)\]/g, '.$1').split('.');
    console.log(keys);
    // const keys = path.replace(/\[(\d)\]/g, '.$1').split('.');
    let curObj = obj;
    while (keys.length > 0) {
        const key = keys.shift();
        if (keys.length === 0) {
            curObj[key] = val;
            return obj; // 最后一层，直接赋值，并返回 原始的 obj
        }
        if (typeof curObj[key] !== 'object' || curObj[key] == null) {
            curObj[key] = {}; // 如果值非对象（不存在），直接覆盖
        }
        curObj = curObj[key]; // 循环处理下一层对象
    }
    return obj;
}
var obj = { a: { b: { c1: 31, c2: [], c3: null }, b1: 21 }, a1: 11, a2: 12 };
console.log(parseStrToObj(obj, 'a.b.c.d', 4)); // obj, 'a.b.c.d', 4 -> obj.a.b.c.d = 4
console.log(parseStrToObj(obj, 'a.b.c2[0].e2', 'c20e2')); // obj, 'a.b.c.d', 4 -> obj.a.b.c.d = 4
console.log(parseStrToObj(obj, 'a.b.c3[d3].e3', 'c30e3')); // obj, 'a.b.c.d', 4 -> obj.a.b.c.d = 4
console.log(obj.a.b.c.d); // obj, 'a.b.c.d', 4 -> obj.a.b.c.d = 4
/**
 * sleep 函数
 */
function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}
async function testSleep() {
    console.log('开始执行');
    await sleep(1000);
    console.log('延迟了 1000ms');
    await sleep(500);
    console.log('延迟了 500ms');
    await sleep(1000);
    console.log('延迟了 1000ms');
    await sleep(500);
    console.log('延迟了 500ms');
}
testSleep();
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
function formatDate(date, format) {
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
console.log('formatDate 结果：', formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'));
/**
 * 交换 a b 的值，不用临时变量
 */
function exch(a, b) {
    a = a + b;
    b = a - b;
    a = a - b;
    return { a, b };
}
console.log('exch 结果:', exch(2, 6));
/**
 * 数组乱序
 */
function randomArr(arr) {
    if (!Array.isArray(arr)) return arr;
    for (let i = arr.length - 1; i >= 0; i--) {
        const randomIndex = Math.round(Math.random() * i);
        console.log(i, randomIndex);
        [arr[randomIndex], arr[i]] = [arr[i], arr[randomIndex]];
    }
    return arr;
} // 随机取出一个元素，然后将该元素与最后一个元素交换位置，然后再从剩下的元素中随机取出一个元素，与倒数第二个元素交换位置，以此类推
console.log('randomArr --->>>', randomArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
/**
 * 数组求和
 */
function add(arr) {
    if (!Array.isArray(arr)) return;
    return arr.reduce((sum, cur) => sum + cur);
}
console.log('add 结果：', add([0, 1, 2, 3, 4, 5]));
function add2(arr) {
    if (!Array.isArray(arr)) return;
    return arr
        .toString()
        .split(',')
        .reduce((sum, cur) => sum + Number(cur), 0);
    return arr.flat(Infinity).reduce((sum, cur) => sum + cur);
}
console.log('add2 结果：', add2([1, 2, 3, [[4, 5], 6], 7, 8, 9]));
/**
 * 查找数组中的重复元素并返回
 */
function findDuplicates(arr) {
    if (!Array.isArray(arr)) return arr;
    // 只需要一次循环，时间复杂度为 n，但是需要使用额外空间为 n
    const cache = new Set();
    const res = new Set();
    arr.forEach(n => {
        if (cache.has(n)) {
            res.add(n);
        } else {
            cache.add(n);
        }
    });
    return Array.from(res);
}
function findDuplicates(arr) {
    if (!Array.isArray(arr)) return arr;
    // 不使用额外的空间，但是因为有个排序 最快时间复杂度为 nlogn
    const a = [...arr].sort((a, b) => a - b);
    const len = a.length;
    const res = [];
    for (let i = 0; i < len; i++) {
        if (a[i] === a[i + 1] && a[i + 1] !== a[i + 2]) res.push(a[i]);
    }
}
/**
 * 数组扁平化
 *
 */
function flat(arr, depth) {
    if (!Array.isArray(arr)) return;
    if (depth === 0) return arr;
    // return arr.reduce((result, cur) => result.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur), []);
    while (depth > 0) {
        arr = [].concat(...arr); // 非递归，利用 concat 一层层展开数组
        depth--;
    }
    return arr;
}
console.log('flat 结果：', flat([1, [2, [3, 4, 5], [6, [7, [8], [9]]]]], 0));
console.log('flat 结果：', flat([1, [2, [3, 4, 5], [6, [7, [8], [9]]]]], 1));
console.log('flat 结果：', flat([1, [2, [3, 4, 5], [6, [7, [8], [9]]]]], 2));
console.log('flat 结果：', flat([1, [2, [3, 4, 5], [6, [7, [8], [9]]]]], 3));
console.log('flat 结果：', [1, [2, [3, 4, 5], [6, [7, [8], [9]]]]].flat(3));
/**
 * 实现数组的 flat 方法
 */
// Array.prototype.myFlat = function (depth = 1) {
//     if (!Array.isArray(this)) throw new TypeError(`then ${this} is not a array`);
//     if (depth === 0) return this;
//     return this.reduce((res, cur) => res.concat(Array.isArray(cur) && depth > 1 ? cur.myFlat(depth - 1) : cur), []);
// };
Array.prototype.myFlat = function (depth = 1) {
    if (!Array.isArray(this)) throw new TypeError(`then ${this} is not a array`);
    if (depth === 0) return this;
    let result = [...this];
    while (depth > 0) {
        result = [].concat(...result);
        depth--;
    }
    return result;
};
console.log('myFlat 结果：', [1, [2, [3, 4, 5], [6, [7, [8], [9]]]]].myFlat(3));
// var flat = function (arr, n) {
//     if (!Array.isArray(arr)) return arr;
//     if (n === 0) return arr;
//     const _flat = (arr, dep = 0) => {
//         return arr.reduce((res, cur) => {
//             if (Array.isArray(cur) && dep < n) {
//                 res.push(..._flat(cur, dep + 1));
//             } else {
//                 res.push(cur);
//             }
//             return res;
//         }, []);
//     };
//     return _flat(arr);
// };
// // 递归，递归几次就碾平几次，这个写法不太好理解
// var flat = function (arr, n) {
//     if (n === 0) return arr;
//     const res = flat(arr, n - 1);
//     return [].concat(...res);
// };
// // 非递归写法
// var flat = function (arr, n) {
//     while (arr.some(item => Array.isArray(item)) && n > 0) {
//         arr = [].concat(...arr);
//         n--;
//     }
//     return arr;
// };
// var flat = function (arr, n) {
//     if (!Array.isArray(arr)) return arr;
//     return arr.reduce((res, cur) => {
//         return res.concat(Array.isArray(cur) && n > 0 ? flat(cur, n - 1) : cur);
//     }, []);
// };
// var flat = function (arr, n) {
//     if (!Array.isArray(arr)) return arr;
//     return arr.reduce((res, cur) => {
//         if (Array.isArray(cur) && n > 0) {
//             res.push(...flat(cur, n - 1));
//         } else {
//             res.push(cur);
//         }
//         return res;
//     }, []);
// };
// console.log('myFlat 结果：', flat([1, [2, [3, 4, 5], [6, [7, [8], [9]]]]], 2));
// console.log('myFlat 结果：', flat([55, { a: 1 }, [44], [66, [33], [[11], [22]]], 1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]], 2));
/**
 * 数组去重
 */
function unique(arr) {
    if (!Array.isArray(arr)) return arr;
    // 方法一
    return Array.from(new Set(arr));
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
console.log('unique 结果：', unique([1, 1, 2, 3, 4, 5, 4, 3, 2, 1, 4, 5, 3, 2, 1, 2, 3, 4, 5, 2, 1, 3, 6, 3]));
console.log(unique([1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}]));
/**
 * 返回数组中每一项出现的次数
 * arr = [1,2,3,4,5,6,7,7,8,9,3,3,5,6,78,82]
 * [[1,1],[2,2]]
 */
function getFrequency(arr) {
    if (!Array.isArray(arr)) return;
    const map = new Map();
    arr.forEach(val => {
        map.set(val, (map.get(val) || 0) + 1);
    });
    return [...map];
    // const result = [];
    // map.forEach((val, key) => {
    //     result.push([key, val]);
    // });
    // return result;
}
console.log(getFrequency([1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 3, 3, 5, 6, 78, 82]));
/**
 * 数组的 push 方法
 * 注意：
 *      push 方法返回数组的长度
 *      push 可以对类数组使用
 *      对对象使用时，Array.prototype.push.call({}, 1)会返回 {0: 1, length: 1}
 *      如果为 null 或者 undefined 则报错
 */
Array.prototype.myPush = function (...items) {
    if (typeof this.valueOf() === 'object' && this.valueOf() !== null && this.valueOf() !== window) {
        let length = this.length || 0; // 使用 call 调用的时候 object 不会报错，会添加对应值
        while (items.length > 0) {
            this[length] = items.shift();
            length++;
        }
        this.length = length;
        return this.length;
    }
    if (!Array.isArray(this)) throw new TypeError(`${this} not is a array`);
    while (items.length > 0) {
        this[this.length] = items.shift();
    }
    return this.length;
};
const arr = [];
arr.myPush(1, 2, 3);
console.log(arr);
const obj = { 1: 1, length: 1 };
Array.prototype.myPush.call(obj, 1, 2, 3); // {0: 1, 1: 2, 2: 3, length: 3}
// Array.prototype.push.call(obj, 1, 2, 3); // {0: 1, 1: 2, 2: 3, length: 3}
console.log(obj);
Array.prototype.myPush.call(null, 1, 2, 3); // {0: 1, 1: 2, 2: 3, length: 3}
const num = 123;
Array.prototype.myPush.call(num, 1, 2, 3); // {0: 1, 1: 2, 2: 3, length: 3}
console.log(num);
Array.prototype.myPush.call('str', 1, 2, 3); // {0: 1, 1: 2, 2: 3, length: 3}
// Array.prototype.myPush = function (...items) {
//     if (!Array.isArray(this)) throw new Error(`the ${this} not is a array`);

//     for (const item of items) {
//         this[this.length] = item;
//     }
//     return this.length;
// };
/**
 * 数组的 filter 方法
 */
Array.prototype.myFilter = function (callback, thisArg) {
    if (!Array.isArray(this)) throw new TypeError(`then ${this} is not a array`);
    if (typeof callback !== 'function') throw new TypeError(`then ${callback} is not a function`);
    const result = [];
    const len = this.length; // len 的长度要固定，遍历是如果动态插入元素，会影响索引值，但是 索引不变
    for (let i = 0; i < len; i++) {
        if (i in this && callback.call(thisArg, this[i], i, this)) result.push(this[i]);
    }
    return result;
};
console.log(
    'myFilter 结果：',
    [1, 2, 3].myFilter(function (cur, index) {
        console.log('this cur index::: ', cur, index);
        return cur > 1;
    }),
);

var a3 = new Array(3);
a3[1] = 1;
console.log(
    'myMap 结果：',
    a3.myFilter((cur, index) => {
        console.log('this cur index::: ', cur, index);
        return !cur;
    }),
);
console.log(
    'myMap 结果：',
    a3.filter((cur, index) => {
        console.log('this cur index::: ', cur, index);
        return !cur;
    }),
);
Array.prototype.myMap = function (callback, thisArg) {
    if (!Array.isArray(this)) throw new TypeError(`then ${this} is not a array`);
    if (typeof callback !== 'function') throw new TypeError(`then ${callback} is not a function`);
    const result = new Array(this.length);
    const len = this.length; // len 的长度要固定，遍历是如果动态插入元素，会影响索引值，但是 索引不变
    for (let i = 0; i < len; i++) {
        if (i in this) result[i] = callback.call(thisArg, this[i], i, this); // 为了防止 empty 被遍历
    }
    return result;
};
console.log(
    'myMap 结果：',
    [1, 2, 3].myMap((cur, index) => {
        console.log('this cur index::: ', cur, index);
        return cur * 10;
    }),
);
var a3 = new Array(3);
console.log(
    'myMap 结果：',
    a3.myMap((cur, index) => {
        console.log('this cur index::: ', cur, index);
        return cur * 10;
    }),
);
console.log(
    'myMap 结果：',
    a3.map((cur, index) => {
        console.log('this cur index::: ', cur, index);
        return cur * 10;
    }),
);
/**
 * 实现数组的 reduce 方法
 */
Array.prototype.myReduce = function (callback, ...rest) {
    console.log('arguments', rest, rest.length);
    if (typeof callback !== 'function') throw new TypeError(`callback is not a function`);
    const isInitialValue = rest.length !== 0; // 使用 rest 是为了判断有没有传递 initialValue 参数
    if (this.length === 0 && !isInitialValue) throw new TypeError(`when there is no initial value, the array cannot be empty.`);
    let result = isInitialValue ? rest[0] : this[0];
    const len = this.length;
    for (let i = isInitialValue ? 0 : 1; i < len; i++) {
        if (i in this) result = callback(result, this[i], i, this);
    }
    return result;
};
console.log(
    [1, , 2, 3].myReduce((sum, cur, index, arr) => {
        console.log('sum, cur, index', sum, cur, index, arr);
        return cur + sum;
    }, 0),
);
console.log(
    [].myReduce((sum, cur, index, arr) => {
        console.log('sum, cur, index', sum, cur, index, arr);
        return cur + sum;
    }, null),
);
// 如果数组为空且未提供 initialValue，则会抛出异常
// console.log(
//     [].myReduce((sum, cur, index, arr) => {
//         console.log('sum, cur, index', sum, cur, index, arr);
//         return cur + sum;
//     }),
// );
console.log(
    [1, , 2, 3].reduce((sum, cur, index, arr) => {
        console.log('sum, cur, index', sum, cur, index, arr);
        return cur + sum;
    }, 0),
);
// console.log(
//     [].reduce((sum, cur, index, arr) => {
//         console.log('sum, cur, index', sum, cur, index, arr);
//         return cur + sum;
//     }),
// );
/**
 * 实现 字符串的 repeat 方法
 */
function repeat(str, n) {
    if (typeof str !== 'string') return str;
    if (n < 0) throw new RangeError(`Invalid count value: ${n}`);
    if (n === 0) return '';
    return new Array(n + 1).join(str);
    // return new Array(n).fill(str).join('');
    // let result = '';
    // while (n > 0) {
    //     result += str;
    //     n--;
    // }
    // return result;
}
console.log(repeat('abc', 2));
console.log('repeat 结果：', repeat('abc-', 3));
/**
 * 实现字符串的 trim 方法
 */
String.prototype.myTrim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
/**
 * 对象扁平化
 */
function flatten(val) {
    if (typeof val !== 'object' || val === null) return val;
    const result = {};
    Object.keys(val).forEach(key => {
        const cur = flatten(val[key]);
        if (typeof cur !== 'object' || cur === null) {
            result[key] = cur;
        } else {
            Object.keys(cur).forEach(childKey => {
                result[`${key}.${childKey}`] = cur[childKey];
            });
        }
    });
    return result;
}
// 示例;
let obj = {
    name: 'Jack',
    address: {
        province: 'Shanghai',
        city: {
            district: 'Pudong',
            street: 'Century Avenue',
            nums: { a: 'a', arr: [1, 2, 3, { s: 4 }, { w: 5 }] },
        },
    },
};
console.log(flatten(obj));
/**
 * 将数字每千分位用逗号隔开
 * 注意：
 *      要考虑小数的情况
 *      要考虑负数的情况
 *      要考虑不足三位的情况
 */
function comma(num) {
    if (isNaN(num)) return '';
    const sign = num < 0;
    const [integer, decimal] = String(Math.abs(num)).split('.');
    if (integer.length <= 3) return String(num);
    const arr = integer.split('');
    let index = arr.length - 3;
    while (index > 0) {
        arr.splice(index, 0, ',');
        index -= 3;
    }
    return `${sign ? '-' : ''}${arr.join('')}${decimal ? '.' + decimal : ''}`;
    // 正则
    // const sign = num < 0;
    // const [integer, decimal] = String(Math.abs(num)).split('.');
    // if (integer.length <= 3) return String(num);
    // const index = integer.length % 3;
    // const arr = integer.slice(index).match(/\d{3}/g);
    // const res = `${index > 0 ? integer.slice(0, index) + ',' : ''}${arr.join(',')}`;
    // return `${sign ? '-' : ''}${res}${decimal ? '.' + decimal : ''}`;
    // 递归
    // if (!Number(num)) return num;
    // const sign = num < 0;
    // const decimal = String(num).split('.')[1];
    // const rec = (num, str = '') => {
    //     if (num < 1000) {
    //         return `${sign ? '-' : ''}${num}${str}${decimal ? '.' + decimal : ''}`;
    //     } else {
    //         return rec(parseInt(num / 1000), `,${num % 1000}${str}`);
    //     }
    //     return str;
    // };
    // return rec(Math.abs(parseInt(num)));
}
console.log('comma 结果：', comma(12345678.12345678));
console.log(comma(0));
console.log(comma(123));
console.log(comma(-123));
console.log(comma(1234567));
console.log(comma(-1234567));
console.log(comma(12345678));
console.log(comma(-12345678));
console.log(comma(123456789));
console.log(comma(-123456789));
console.log(comma(1234567.12345678));
console.log(comma(-1234567.12345678));
/**
 * 大数相加
 */
function sumBigNumber(a, b) {
    if (isNaN(a) || isNaN(b)) return '';
    let result = '';
    let temp = 0; // temp 为需要进位的值，只可能是 0 或 1
    const arr1 = String(a).split('');
    const arr2 = String(b).split('');
    while (arr1.length > 0 || arr2.length > 0) {
        const res = Number(arr1.pop() || 0) + Number(arr2.pop() || 0) + temp;
        result = (res % 10) + result;
        temp = Math.floor(res / 10);
    }
    if (temp > 0) result = temp + result; // 如果 temp 为 1 不为 0，说明最后一次进位了，需要追加上
    return result.replace(/^0+/, ''); // 去掉首位的 0
}
console.log('sumBigNumber 结果：', sumBigNumber('00012345678', '0123456')); // 12469134
console.log('sumBigNumber 结果：', sumBigNumber('92345678', '98768456')); // 191114134
/**
 * 精确计算浮点数，支持超大浮点数
 */
function accurateAdd(a, b) {
    if (isNaN(a) || isNaN(b)) return '';
    const [a1, a2 = ''] = String(a).split('.');
    const [b1, b2 = ''] = String(b).split('.');
    const max = Math.max(a2.length, b2.length);
    const str1 = (a1 + a2).padEnd(a1.length + max, '0');
    const str2 = (b1 + b2).padEnd(b1.length + max, '0');
    const arr1 = str1.split(''); // 把小数点去除，然后后边补 0，当作大整出处理
    const arr2 = str2.split('');
    let result = '';
    let temp = 0;
    while (arr1.length > 0 || arr2.length > 0) {
        const res = Number(arr1.pop() || 0) + Number(arr2.pop() || 0) + temp;
        result = (res % 10) + result;
        temp = Math.floor(res / 10);
    }
    if (temp > 0) result = temp + result; //  如果 temp 为 1 不为 0，说明最后一次进位了，需要追加上
    result = `${result.slice(0, result.length - max).replace(/^0+/g, '') || '0'}.${result.slice(result.length - max)}`;
    return result; // Number(result) 如果是超大数，如果转成数字类型还是会出现精度丢失问题
}
console.log('结果：', accurateAdd(123.123, 123.123), 123.123 + 123.123);
console.log('结果：', accurateAdd(0.1, 0.2), 0.1 + 0.2);
console.log('结果：', accurateAdd(5341.455, 40.3562), 5341.455 + 40.3562);
console.log('结果：', accurateAdd('005341.455', '0040.3562'), 5341.455 + 40.3562);
console.log('结果：', accurateAdd('534534534535341.455', '5454545454545440.3562'), 534534534535341.455 + 5454545454545440.3562);
/**
 * 43. 字符串相乘   大数相乘
 *  给定两个以字符串形式表示的非负整数 num1 和 num2，返回 num1 和 num2 的乘积，它们的乘积也表示为字符串形式。
 */
function multiplyBigNumber(a, b) {
    if (isNaN(a) || isNaN(b)) return '';
    if (typeof a !== 'string') a = String(a);
    if (typeof b !== 'string') b = String(b);
    // if (/^0+$/.test(a) || /^0+$/.test(b)) return '0'; // 如果 a 或 b 为 0 返回 0
    const arr = [];
    for (let i = a.length - 1; i >= 0; i--) {
        for (let j = b.length - 1; j >= 0; j--) {
            const res = Number(a[i]) * Number(b[j]) + (arr[i + j + 1] || 0); // 加上上次的值
            arr[i + j + 1] = res % 10;
            arr[i + j] = Math.floor(res / 10) + (arr[i + j] || 0); // 加上上次进位的值
        }
    }
    return arr.join('').replace(/^0+/g, '') || '0'; // 如果为空字符串说明计算结果全是 0 返回 0
}
console.log('multiplyBigNumber 结果：', multiplyBigNumber('1234', '2')); // 2468
console.log('multiplyBigNumber 结果：', multiplyBigNumber('01234', '2')); // 2468
console.log('multiplyBigNumber 结果：', multiplyBigNumber('88', '88')); // 7744
console.log('multiplyBigNumber 结果：', multiplyBigNumber('012345678', '0123456')); // 1524148023168
console.log('multiplyBigNumber 结果：', multiplyBigNumber('88', '0')); // 0
console.log('multiplyBigNumber 结果：', multiplyBigNumber('88', '000')); // 0
/**
 * 浮点数精确加法
 */
function add(a, b) {
    if (isNaN(a) || isNaN(b)) return;
    const len1 = (String(a).split('.')[1] || '').length;
    const len2 = (String(b).split('.')[1] || '').length;
    const max = Math.pow(10, Math.max(len1, len2));
    return (a * max + b * max) / max;
    // return (a * max - b * max) / max; // 减法
}
console.log('结果：', add(123.123, 123.123), 123.123 + 123.123);
console.log('结果：', add(0.1, 0.2), 0.1 + 0.2);
console.log('结果：', add(5341.455, 40.3562), 5341.455 + 40.3562);
/**
 * 浮点数精确乘法
 */
function multiplication(a, b) {
    if (isNaN(a) || isNaN(b)) return;
    const len1 = (String(a).split('.')[1] || '').length;
    const len2 = (String(b).split('.')[1] || '').length;
    const max = Math.pow(10, Math.max(len1, len2));
    return (a * max * (b * max)) / (max * max);
}
console.log('结果：', multiplication(123.123, 123.123), 123.123 * 123.123);
console.log('结果：', multiplication(0.1, 0.2), 0.1 * 0.2);
/**
 * 浮点数精确除法
 */
function division(a, b) {
    if (isNaN(a) || isNaN(b)) return;
    const len1 = (String(a).split('.')[1] || '').length;
    const len2 = (String(b).split('.')[1] || '').length;
    const max = Math.pow(10, Math.max(len1, len2));
    return (a * max) / (b * max);
}
console.log('结果：', division(123.1233, 123.123), 123.1233 / 123.123);
console.log('结果：', division(0.1, 0.2), 0.1 / 0.2);
/**
 * 将数组转换为树形结构
 */
function objToTree(arr) {
    if (!Array.isArray(arr)) return [];
    const map = new Map(); // 存储每个元素的 id 与其对应的子节点数组的映射关系
    const result = [];
    arr.forEach(item => {
        const { id, pid } = item;
        if (map.has(id)) {
            const children = map.get(id);
            item.children = children; // 将这个子节点数组赋值给 item 的 children 属性，表示这个元素是树的一个节点，拥有子节点
        } else {
            item.children = []; // 如果 map 中不存在当前元素的 id，那么为 item 的 children 属性赋一个空数组
            map.set(id, item.children); // 并将这个空数组存储到 map 中，以 id 为键
        }
        if (!pid) {
            result.push(item); //         // 则将根节点添加到 result 数组中
        } else {
            const children = map.get(pid);
            if (children) {
                children.push(item); // 如果 pid 在 map 中有对应的子节点数组，说明 pid 是存在的，那么将当前元素 item 添加到子节点数组中
            } else {
                map.set(pid, [item]); // 如果 pid 在 map 中没有对应的子节点数组，那么在 map 中以 pid 为键，存储一个包含当前元素 item 的数组
            }
        }
    });
    return result;
}
let areaArr = [
    { pid: 10000, id: 11000, name: '浙江省' },
    { id: 10000, name: '中国' },
    { pid: 11000, id: 11100, name: '杭州市' },
    { pid: 11100, id: 11101, name: '西湖区' },
    { pid: 11100, id: 11102, name: '萧山区' },
    { pid: 11000, id: 11200, name: '金华市' },
    { pid: 11200, id: 11201, name: '京东区' },
    { pid: 11200, id: 11202, name: '婺城区' },
    { pid: 10000, id: 12000, name: '湖南省' },
    { pid: 12000, id: 12100, name: '长沙市' },
    { pid: 12100, id: 12101, name: '长沙市区1' },
    { pid: 12100, id: 12102, name: '长沙市区2' },
    { pid: 12000, id: 12200, name: '岳阳市' },
    { pid: 12200, id: 12201, name: '岳阳市区1' },
    { pid: 12200, id: 12202, name: '岳阳市区2' },
];
console.log(' 结果：', JSON.stringify(objToTree(areaArr), null, 4));
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
function parseParams(url) {
    if (typeof url !== 'string') return {};
    const search = url.split('?')[1];
    if (!search) return {};
    const arr = search.split('&');
    const result = {};
    arr.forEach(cur => {
        const [key, val = ''] = cur.split('=');
        const value = window.decodeURI(val); // 值不存在时，默认为空字符串
        if (result[key]) {
            result[key] = [].concat(result[key], value); // result[key] 可能是 值，也可能是数组
        } else {
            result[key] = value;
        }
    });
    return result;
}
console.log('结果：', parseParams('http://www.domain.com'));
console.log('结果：', parseParams('http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled&noty=null&id=789'));
/**
 *  二维数组斜向打印
 */
function printMatrix(arr) {
    if (!Array.isArray(arr) || !Array.isArray(arr[0])) return [];
    let len1 = arr.length; // 行数，对应 x 范围
    let len2 = arr[0].length; // 列数，对应 y 范围
    const result = [];
    // 斜向遍历二维数组，左上部分的规律是，初始索引（1, 2, 3 的索引）行都为 0， 列的索引递增，所以可以对列进行循环
    // 左上部分，索引的规律是：行的索引从 0 开始，递增到最大值，列索引每次从当前循环最大值 j 递减到 0
    for (let j = 0; j < len2; j++) {
        let x = 0;
        let y = j;
        while (x < len1 && y >= 0) {
            result.push(arr[x][y]);
            x++;
            y--;
        }
    }
    // 斜向遍历二维数组，右下部分的规律是，初始索引（6, 9, 12 的索引）列都为列索引的最大值， 行的索引递增，所以可以对行进行循环
    // 右下部分，索引的规律是：行的索引从 1 开始，行索引递从当前循环的最小值 i 增到最大值，同时列的索引从最大值递减到 0
    for (let i = 1; i < len1; i++) {
        let x = i;
        let y = len2 - 1;
        while (x < len1 && y >= 0) {
            result.push(arr[x][y]);
            x++;
            y--;
        }
    }
    return result;
}
// function printMatrix(arr) {
//     if (!Array.isArray(arr)) return;
//     const len1 = arr.length;
//     const len2 = arr[0].length;
//     const result = [];
//     //   左上部分，索引的规律是：每次初始可以按照列进行循环，列索引每次从当前循环最大值递减到 0，同时行的索引从 0 开始，递增到最大值
//     for (let j = 0; j < len2; j++) {
//         for (let x = 0, y = j; x < len1 && y >= 0; x++, y--) {
//             result.push(arr[x][y]);
//         }
//     }
//     //  右下部分，索引的规律是：从 1 开始，每次初始可以按照行循环，行索引递增到最大值，同时列的索引递减到 0
//     for (let i = 1; i < len1; i++) {
//         for (let x = i, y = len2 - 1; x < len1 && y >= 0; x++, y--) {
//             result.push(arr[x][y]);
//         }
//     }
//     return result;
// }
console.log(
    'printMatrix 结果；',
    printMatrix([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
    ]),
);
// [0,0]
// [0,1] [1,0]
// [0,2] [1,1] [2,0]
// [1,2] [2,1] [3,0]
// [2,2] [3,1]
// [3,2]
/**
 * 找出 Element 元素的全部 Input 子元素
 */
function findAllInputElement(element) {
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
function hidePhoneNumber(str) {
    if (typeof str !== 'string') return '';
    // return str.slice(0, 3) + '****' + str.slice(-4);
    return str.replace(/^(\d{3})\d*(\d{4}$)/, '$1****$2');
}
console.log('hidePhoneNumber 结果：', hidePhoneNumber('13612361236'));
/**
 * 循环打印红黄绿
 * 1. 循环打印红黄绿
 * 下面来看一道比较典型的问题，通过这个问题来对比几种异步编程方法：
 * 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
 */
function loopPrint() {
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
function printNumber(n) {
    for (let i = 1; i <= n; i++) {
        setTimeout(() => {
            console.log('i: ', i);
        }, 1000 * i);
    }
}
// console.log('loopPrint 结果：', printNumber(4));
/**
 * 小孩报数问题
 * 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈， 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
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
function asyncLoadImage(url) {
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
asyncLoadImage('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648885122&t=02370f63aa93f0f3526f0750589a2b3a')
    .then(img => {
        console.log('加载成功：', img);
    })
    .catch(error => {
        console.log('加载失败：', error);
    });
/**
 * 查找文章中出现频率最高的单词
 */
function findMostWord(str) {
    if (typeof str !== 'string') return [];
    // str = str.trim().toLowerCase();
    const map = new Map();
    const arr = str.match(/[a-zA-Z0-9'-]+/g);
    let max = 0;
    let result = [];
    arr.forEach(cur => {
        const count = (map.get(cur) || 0) + 1;
        map.set(cur, count);
        if (count > max) {
            max = count;
            result = [cur];
        } else if (count === max) result.push(cur);
    });
    result.push(max);
    return result;
}
console.log(findMostWord("  666 Tom's a little boy. Age has reached the end of the beginning of a word. May be guilty in his seems to passing a lot of different life became the appearance of the same day;"));
console.log(findMostWord('hello word'));
/**
 * JS38 高频数据类型
请补全JavaScript代码，要求找到参数数组中出现频次最高的数据类型，并且计算出出现的次数，要求以数组的形式返回。
1. 基本数据类型之外的任何引用数据类型皆为"object"
2. 当多种数据类型出现频次相同时将结果拼接在返回数组中，出现次数必须在数组的最后
输入：__findMostType([0,0,'',''])   输出：['number','string',2]或['string','number',2]
 */
const _findMostType = array => {
    if (!Array.isArray(array)) return [];
    const map = new Map();
    let max = 0;
    let result = [];
    array.forEach(cur => {
        let type = typeof cur;
        if (cur === null) type = 'null';
        if (type === 'function') type = 'object';
        const count = (map.get(type) || 0) + 1;
        map.set(type, count);
        if (count > max) {
            max = count;
            result = [type];
        } else if (count === max) {
            result.push(type);
        }
    });
    result.push(max);
    return result;
};
console.log(_findMostType([0, 0, '', '']));
console.log(_findMostType([123, 'abc', {}, {}, true, false, true]));
console.log(_findMostType([null, {}, null, {}, () => {}]));
/**
 * 封装异步的fetch，使用async await方式来使用
 */
class FetchHttpRequest {
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
/**
 * 实现 prototype 继承
 */
function inheritPrototype(Super, Sub) {
    const proto = Object.create(Super.prototype);
    Object.defineProperty(proto, 'constructor', {
        value: Sub,
        enumerable: false,
    });
    Sub.prototype = proto; // 继承 Super 原型，会导致原有的原型方法丢失
    Object.setPrototypeOf(Sub, Super); // 继承静态方法，会导致原有的静态方法丢失
}
//父方法
function SuperFunction(flag1) {
    this.flag1 = flag1;
}
SuperFunction.prototype.method1 = function () {
    console.log('method1');
};
SuperFunction.methodStatic = function () {
    console.log('methodStatic');
};
//子方法
function SubFunction(flag1, flag2) {
    SuperFunction.call(this, flag1);
    this.flag2 = flag2;
}
SubFunction.prototype.method2 = function () {
    console.log('method2'); // 如果在实例化之前添加，method2 会丢失
};
inheritPrototype(SuperFunction, SubFunction);
const instance = new SubFunction(1, 2); // 子实例
console.log(instance);
console.log(SubFunction.methodStatic());
console.log(instance.method1());
console.log(instance.method2());
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
class Router {
    constructor() {
        this.routes = {};
        this.currentHash = '';
        this.freshRoute = this.freshRoute.bind(this);
        window.addEventListener('load', this.freshRoute);
        window.addEventListener('hashchange', this.freshRoute);
    }
    // 更新路由
    freshRoute() {
        this.currentHash = window.location.hash.slice(1);
        const callback = this.routes[this.currentHash];
        if (callback) callback();
    }
    // 存储路由
    setRoute(path, callback) {
        this.routes[path] = callback;
    }
    // 路由跳转
    push(path) {
        window.location.hash = `#${path}`;
    }
}
const router = new Router();
router.setRoute('/', () => console.log('//////'));
router.setRoute('/test', () => console.log('哈哈哈'));
setTimeout(() => {
    router.push('/test');
}, 1000);
/**
 * 实现简单路由 history 模式
 */
class Router {
    constructor() {
        this.routes = {};
        this.listerPopState();
        console.log(this);
    }
    listerPopState() {
        window.addEventListener('popstate', e => {
            console.log(history);
            const path = e.state && e.state.path;
            console.log(path, e);
            this.routers[path] && this.routers[path]();
        });
    }
    replace(path) {
        history.replaceState({ path: path }, null, path);
        this.routes[path] && this.routes[path]();
    }
    setRoute(path, callback) {
        this.routes[path] = callback;
    }
    push(path) {
        console.log(history.length);
        history.pushState({ path: path }, null, path);
        console.log(history.length);
        // 注意：调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。所以需要手动触发
        this.routes[path] && this.routes[path]();
    }
}
const router = new Router();
router.setRoute('/', () => console.log('//////'));
router.setRoute('/vite-vue-demo/test_index.html', () => console.log('哈哈哈'));
setTimeout(() => {
    router.push('/');
    setTimeout(() => {
        router.push('/vite-vue-demo/test_index.html');
    }, 1000);
}, 1000);
/**
 * 使用 setTimeout 实现 setInterval
 */
function mySetInterval(callback, delay) {
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
 * 判断对象是否存在循环引用
 */
// function isCycleObject(obj, parentObjArr) {
//     // if (typeof obj !== 'object' || obj == null) return false;
//     // try {
//     //     JSON.stringify(obj);
//     //     return false;
//     // } catch (error) {
//     //     return true;
//     // }
//     if (typeof obj !== 'object' || obj === null) return false;
//     if (!parentObjArr) parentObjArr = [obj]; // 首次为空时，添加根对象 obj
//     let result = false; // 用来存储是否存在循环引用的结果
//     for (let key of Object.keys(obj)) {
//         const cur = obj[key];
//         if (typeof cur !== 'object' || cur === null) continue; // 非对象，则跳过当前循环
//         if (parentObjArr.includes(cur)) return true; // 检查当前对象是否在父级对象列表中
//         result = isCycleObject(cur, [...parentObjArr, cur]); // 将 cur 添加到 parentObjArr 中。然后进行递归调用，检查是否存在更深层次的循环引用
//     }
//     return result;
// }
function isCycleObject(obj, parentArr = []) {
    if (obj == null || typeof obj !== 'object') return false;
    if (parentArr.includes(obj)) return true; // 检查当前对象是否在父级对象列表中
    for (const key of Object.keys(obj)) {
        if (isCycleObject(obj[key], [...parentArr, obj])) return true; // 将当前 obj 添加到 parentObjArr 中。然后进行递归调用，检查是否存在更深层次的循环引用
    }
    return false;
}
const o1 = { x: 1, y: { z: 3 } };
console.log('判断对象是否存在循环引用：', isCycleObject(o1));
const o2 = { x: 2, o1 };
const obj = { o1, o2 };
// obj.o1.o2 = o2;
obj.o1.o2 = obj;
// Object.defineProperty(obj, 'o1', {
//     value: o1,
//     enumerable: false,
// });

console.log(obj);
// console.log(JSON.stringify(obj));
console.log('判断对象是否存在循环引用：', isCycleObject(obj));
var a = {
    b: {
        c: {},
    },
};
a.b.c.d = a;
console.log('判断对象是否存在循环引用：', isCycleObject(a));
var x = {};
x.y = x;
console.log('判断对象是否存在循环引用：', isCycleObject(x));
var w1 = { name: 'w1' };
var w2 = { name: 'w2', w1 };
var w3 = { w1, w2 }; // 这种情况下，如果使用 map 会判断成 true 实际是 false
console.log('判断对象是否存在循环引用：', isCycleObject(w3), false);
console.log('判断对象是否存在循环引用：', isCycleObject(123));
console.log('判断对象是否存在循环引用：', isCycleObject(undefined));
/**
 * FED54 计时器 实现一个打点计时器，要求
 * 1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
 * 2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
 * 3、第一个数需要立即输出
 */
// function count(start, end) {
//     if (end < start) return;
//     let num = start;
//     let cancel = () => clearInterval(timer);
//     let timer = setInterval(() => {
//         console.log(num++);
//         if (num > end) cancel();
//     }, 100);
//     console.log(num++);
//     return { cancel };
// }
function count(start, end) {
    if (end < start) return;
    let num = start;
    let timer = null;
    let cancel = () => clearTimeout(timer);
    let fun = num => {
        console.log(num++);
        timer = setTimeout(() => {
            if (num <= end) fun(num);
        }, 1000);
    };
    fun(start);
    return { cancel };
}
console.log(count(1, 6));
/**
 * 流程控制
 * 实例链式调用：如let a = new Man(); a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi()；写出Man()构造函数
 */
function Man() {
    let delay = 0;
    this.sleep = time => {
        delay += time;
        return this;
    };
    this.sayHi = msg => {
        setTimeout(() => {
            console.log(msg || 'Hi');
        }, delay);
        return this;
    };
}
let a = new Man();
a.sleep(1000).sayHi().sleep(1000).sleep(2000).sayHi();
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
console.log(cssStyle2DomStyle('-webkit-border-image'));

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
 * 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal
 */
function mySetInterVal(fn, a, b) {
    if (typeof fn !== 'function') throw new TypeError(`fn is not a function`);
    let timer = null;
    let count = 1;
    const myClear = () => clearTimeout(timer);
    const interval = delay => {
        fn();
        timer = setTimeout(() => {
            interval(a + b * count++);
        }, delay);
    };
    interval(a);
}
var a = new mySetInterVal(() => console.log('123'), 1000, 1000);
// a.myClear();
/**
 * 实现 lodash 的_.get
 */
function get(source, path, defaultValue) {
    if (source == null) return arguments.length === 3 ? defaultValue : source;
    const keys = path.replace(/\[(.+)\]/g, '.$1').split('.');
    console.log(keys);
    let result = source;
    while (keys.length > 0) {
        result = Object(result)[keys.shift()];
        if (result === undefined || result === null) return defaultValue;
    }
    return result;
}
// 测试用例
console.log(get({ a: null }, 'a.b.c', 3)); // output: 3
console.log(get({ a: undefined }, 'a', 3)); // output: 3
console.log(get({ a: null }, 'a', 3)); // output: 3
console.log(get({ a: [{ b: 1 }] }, 'a[0].b', 3)); // output: 1
console.log(get({ a: [{ b: 1 }] }, '1')); // output: undefined
console.log(get(null, '', undefined)); // output: undefined
console.log(get('abc', 'length')); // output: 3

/**
 * 设计模式
 */
/**
 * 发布订阅模式
 */
class EventEmitter {
    constructor(options) {
        this.eventMap = new Map();
        this.onceOrginFun = Symbol(); // 标记 once 临时函数的原始函数，用来解绑的时候做判断
    }
    on(eventName, callback, thisArg) {
        if (typeof callback !== 'function') throw TypeError('callback is not a function');
        const eMap = this.eventMap;
        if (!eMap.has(eventName)) eMap.set(eventName, []); // 如果不存在则进行初始化
        const events = eMap.get(eventName);
        events.push({ callback, thisArg });
    }
    once(eventName, callback, thisArg) {
        if (typeof callback !== 'function') throw TypeError('callback is not a function');
        const tempFun = (...args) => {
            callback.apply(thisArg, args);
            this.off(eventName, tempFun);
        };
        tempFun[this.onceOrginFun] = callback;
        this.on(eventName, tempFun, thisArg);
    }
    emit(eventName, ...args) {
        const events = this.eventMap.get(eventName);
        if (!events) return;
        events.forEach(({ callback, thisArg }) => callback.apply(thisArg, args));
    }
    off(eventName, callback) {
        if (!callback) {
            this.eventMap.delete(eventName); // 如果只传入事件名，则删除所有的事件
            return;
        }
        if (typeof callback !== 'function') throw TypeError('callback is not a function');
        const events = this.eventMap.get(eventName);
        if (!events) return;
        for (let i = events.length - 1; i >= 0; i--) {
            if (callback === events[i].callback || callback === events[i].callback[this.onceOrginFun]) events.splice(i, 1); // 从后往前删
        }
    }
}
// class EventEmitter {
//     constructor(name) {
//         this.name = name;
//         this.eventMap = new Map();
//     }
//     on(eventName, callback, thisArg) {
//         if (typeof callback !== 'function') throw TypeError('callback is not a function');
//         const eMap = this.eventMap;
//         if (!eMap.has(eventName)) eMap.set(eventName, []); // 如果不存在则进行初始化
//         const events = eMap.get(eventName);
//         events.push({ callback, thisArg });
//     }
//     once(eventName, callback, thisArg) {
//         if (typeof callback !== 'function') throw TypeError('callback is not a function');
//         const cb = (...args) => {
//             callback.apply(thisArg, args); // 只绑定一次，执行完后直接取消监听
//             this.off(eventName, cb);
//         };
//         cb._callback = callback;
//         this.on(eventName, cb, thisArg);
//     }
//     emit(eventName, ...args) {
//         const events = this.eventMap.get(eventName);
//         if (!events) return;
//         events.forEach(({ callback, thisArg }) => callback.apply(thisArg, args));
//     }
//     off(eventName, callback) {
//         if (!callback) {
//             this.eventMap.delete(eventName); // 如果只传入事件名，则删除所有的事件
//             return;
//         }
//         if (typeof callback !== 'function') throw TypeError('callback is not a function');
//         const events = this.eventMap.get(eventName);
//         if (!events) return;
//         for (let i = events.length - 1; i >= 0; i--) {
//             if (events[i].callback === callback || events[i].callback._callback === callback) events.splice(i, 1); // 从后往前删
//         }
//     }
// }
const eventBus = new EventEmitter({ description: '使用发布订阅模式实现事件总线' });
console.log('eventBus', eventBus);
const fun = (...args) => console.log('fun', args);
function funThis(...args) {
    console.log('funThis', args, this);
}
eventBus.on('test1', fun);
eventBus.on('test1', funThis, { _this: 'test1' });
eventBus.emit('test1', 1);
console.log('====== 解绑 funThis 测试 ======');
eventBus.off('test1', funThis);
eventBus.emit('test1', 1);
console.log('====== once 测试 ======');
eventBus.once('test2', fun);
eventBus.emit('test2', 2);
eventBus.emit('test2', 2);
eventBus.emit('test2', 2);
console.log('====== 解绑 once 测试 ======');
eventBus.once('test3', fun);
eventBus.off('test3', fun);
eventBus.emit('test3', 3);

/**
 * 观察者模式
 */
// 观察者
class Observer {
    constructor(name) {
        this.name = name;
    }
    // 当被观察的数据发生了变化，触发该函数更新
    update(state) {
        if (!state) return;
        console.log(`${this.name},${state.name}正在${state.action}`);
    }
}
// 被观察者
class Observed {
    constructor(name, state) {
        this.name = name;
        this.observerSet = new Set(); // 观察者集合，不支持重复添加
    }
    // 添加观察者
    addObserver(observer) {
        if (!observer) return;
        this.observerSet.add(observer);
    }
    // 移除已添加的观察者
    removeObserver(observer) {
        if (!observer) return;
        this.observerSet.delete(observer);
    }
    // 发生变更后，通知观察者
    notify(action) {
        this.observerSet.forEach(observer => observer.update({ name: this.name, action }));
    }
}

const ob1 = new Observer('草丛里');
const ob2 = new Observer('召唤师峡谷');
const obd1 = new Observed('盖伦');
const obd2 = new Observed('狗熊');

obd1.addObserver(ob1);
obd2.addObserver(ob1);
obd2.addObserver(ob2);

obd1.notify('跑步');
obd1.notify('跳舞');
obd2.notify('跳舞');
obd2.removeObserver(ob2);
obd2.notify('倒立');
/**
 * 装饰器模式
 */
const plane = {
    fire() {
        console.log('发射普通的子弹');
    },
};
const orginFire = plane.fire; // 获取原始对象方法
plane.fire = function (...args) {
    console.log('before：安装导弹');
    orginFire.apply(this, args);
    console.log('after：发射导弹');
};
plane.fire();
/**
 * 单例模式
 */
const Dog = function (name) {
    this.name = name;
};
const SingleDog = (function () {
    let instance = null;
    return function (name) {
        if (!instance) instance = new Dog(name); // 不存在时创建
        return instance; // 已存在直接返回
    };
})();
const a = new SingleDog('小黑');
const b = new SingleDog('小白');
console.log(a === b, a, b);

/**
 * 判断一个数是否为质数/素数
 */
Number.prototype._isPrime = function () {
    const num = this.valueOf();
    if (typeof num !== 'number') throw new TypeError(`the ${num} is not a number`);
    if (num < 2) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true; // 质数是指在大于1的自然数中，除了1和它本身以外不再有其他因数的自然数。
};
console.log((1)._isPrime());
console.log((2)._isPrime());
console.log((3)._isPrime());
console.log((7)._isPrime());
console.log((4)._isPrime());
console.log((123)._isPrime());

/**
 * 1、校验邮箱格式；2、校验手机号格式
 */
// 校验邮箱格式
function isAvailableEmail(sEmail) {
    if (typeof sEmail !== 'string') return false;
    return /^[\w._-]+@[\w]+\.[\w.]+$/.test(sEmail);
}
// 校验手机号格式
function isAvailablePhone(phone) {
    return /^1[3-9][0-9]{9}/.test(phone);
}
/**
 * a 链接替换
 */
function link() {
    const dom = document.getElementById('jsContainer');
    const text = dom.innerHTML || '';
    const arr = text.split(' ');
    dom.innerHTML = arr
        .map(value => {
            if (!value) return '';
            return value.replace(/http:\/\/\S+|https:\/\/\S+|www\.\S+/, function (v1) {
                if (v1.slice(0, 4) === 'www.') {
                    return `<a href="http://${v1}" target="_blank">${v1}</a>`;
                } else {
                    return `<a href="${v1}" target="_blank">${v1}</a>`;
                }
            });
        })
        .join(' ');
}
/**
 * 生成范围内的随机数
 */
function genrangeRandom(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

