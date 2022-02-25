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
    if (fn.length === args1.length) {
        return fn.apply(this, args1);
    } else {
        return function (...args2) {
            return createCurrying(fn, ...args1, ...args2);
        };
    }
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
 * 手写 instanceof
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
 * new 操作符的实现
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
 * 手写 Promise
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
// const p1 = new MyPromise((resovle, reject) => {
//     setTimeout(() => {
//         resovle(1);
//         // reject(1);
//     }, 10);
// });
// console.log('p1----------->>>', p1);
// p1.then(
//     res => {
//         console.log('res111----------->>>', res);
//         return 2;
//     },
//     err => {
//         console.log('err----------->>>', err);
//         return 2;
//     },
// )
//     .then(undefined, res => {
//         console.log('res222----------->>>', res);
//         return 3;
//     })
//     .then(res => {
//         console.log('res333----------->>>', res);
//         // return 3;
//         throw new Error('333');
//     })
//     .catch(err => {
//         console.log('catch---err---------->>>', err);
//     });
const myPromise = new MyPromise((resolve, reject) => {
    // resolve(123);
    setTimeout(() => {
        resolve(1);
        // reject(1);
    }, 1000);
});
// const myPromise = new Promise((resolve, reject) => {
//     // resolve(123);
//     setTimeout(() => {
//         resolve(123);
//         // reject(123);
//     }, 1000);
// });
console.log('myPromise---------------------------------->>>', myPromise);

const mp1 = myPromise
    .then(
        res => {
            console.log('myPromise.then resolve--------------------------1>>>', res);
            return 2;
        },
        res => {
            console.log('myPromise.then reject---------------------------1>>>', res);
            return 2;
        },
    )
    .then(
        res => {
            console.log('myPromise.then resolve--------------------------2>>>', res);
            return 3.4;
        },
        // res => {
        //     console.log('myPromise.then reject---------------------------2>>>', res);
        //     return 2;
        // },
    )
    .catch(err => {
        console.log('myPromise.then resolve------------------catch>>>', err);
    })
    .finally(() => {
        console.log('myPromise.then resolve--------------------------------------------mp1---2---finally');
        // return 'return mp1---2---finally';
    });

const mp2 = mp1
    .then(res => {
        console.log('myPromise.then resolve--------------------------3>>>', res);
        return 5;
    })
    .then(res => {
        console.log('myPromise.then resolve--------------------------5>>>', res);
        return 7;
    });

const mp3 = mp1
    .then(res => {
        console.log('myPromise.then resolve--------------------------4>>>', res);
        // return 4;
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve(6);
            }, 1000);
        });
    })
    .then(res => {
        console.log('myPromise.then resolve--------------------------6>>>', res);
        return 8;
    });
setTimeout(() => {
    mp2.then(
        res => {
            console.log('myPromise.then resolve--------------------------7>>>', res);
            return 7;
        },
        // res => {
        //     console.log('myPromise.then reject---------------------------6>>>', res);
        // },
    );

    mp3.then(
        res => {
            console.log('myPromise.then resolve--------------------------8>>>', res);
            return 9;
        },
        // res => {
        //     console.log('myPromise.then reject---------------------------8>>>', res);
        // },
    ).finally(() => {
        console.log('myPromise.then resolve--------------------------------------------mp3---8---finally');
    });
}, 3000);

const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p1');
    }, 3500);
});
const p2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('p2');
    }, 3200);
});
const p3 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('p3');
    }, 3500);
});
const p4 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        reject('p4');
    }, 2500);
});
MyPromise.all([p1, p2]).then(res => {
    console.log('MyPromise.all [ p1 + p2 ]-------------------->>>', res);
});
MyPromise.allSettled([p1, p2, p3]).then(res => {
    console.log('MyPromise.allSettled [ p1 + p2 + p3 ]--------->>>', res);
});
MyPromise.race([p1, p2]).then(res => {
    console.log('MyPromise.race [ p1 + p2 ]-------------------->>>', res);
});
MyPromise.any([p3, p4])
    .then(res => {
        console.log('MyPromise.any [ p3 + p4 ]--------------------->>>', res);
    })
    .catch(err => {
        console.log('MyPromise.any [ p3 + p4 ]--------------------->>>', err.errors);
    });

// new MyPromise((resolve, reject) => {
//     // resolve('test finally');
//     reject('test finally');
// })
//     .then(res => {
//         console.log('test finally then------------------------>>>', res);
//     })
//     .catch(err => {
//         console.log('test finally catch----------------------->>>', err);
//     })
//     .finally(() => {
//         console.log('test finally finally---------------------------------------------->>>finally');
//     });
