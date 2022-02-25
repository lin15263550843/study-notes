// import { isFunction } from '@/commons';
const isFunction = val => typeof val === 'function';
const STATUS = { pending: 'pending', resolved: 'resolved', rejected: 'rejected' };
/**
 * 手写 promise
 */
// export class MyPromise {}
function MyPromise(executor) {
    this.status = STATUS.pending; // 状态： 解决：resolved   拒绝：rejected  等待：pending
    this.value; // 状态为 resolved 的时候的返回值;
    this.reason; // 状态为 rejected 的时候的拒绝原因
    this.onResolvedArray = []; // 存放 then 方法的回调
    this.onRejectedArray = []; // 存放 then 方法的回调
    /**
     * 解决
     * @param {any} res 传递过来的值
     */
    const resolve = res => {
        // 保证状态不可逆
        if (this.status === STATUS.pending) {
            this.status = STATUS.resolved;
            this.value = res;
            this.onResolvedArray.forEach(onResolved => {
                //当状态从 pending 变为 resolved，就遍历执行里面的异步方法
                // this.value = onResolved(this.value);
                onResolved(this.value);
            });
        }
    };
    /**
     * 拒绝
     * @param {any} res 拒绝理由
     */
    const reject = res => {
        // 保证状态不可逆
        if (this.status === STATUS.pending) {
            this.status = STATUS.rejected;
            this.reason = res;
            this.onRejectedArray.forEach(onRejected => {
                //当状态从 pending 变为 rejected，就遍历执行里面的异步方法
                // this.reason = onRejected(this.reason);
                onRejected(this.reason);
            });
        }
    };
    try {
        // 立即执行
        executor(resolve, reject);
    } catch (e) {
        reject(e);
        console.log('这里可能会吞并一些内部错误：', e);
    }
    /**
     * then 方法
     * @param {any} onResolved 解决，完成
     * @param {any} onReject 拒绝
     */
}
//因为 then 方法是公共的，所以定义在 MyPromise 的原型中，不用每次 new 的时候都去创建该方法
MyPromise.prototype.then = function (onResolved, onRejected) {
    return new MyPromise((resolve, reject) => {
        if (!isFunction(onResolved)) onResolved = value => value; // 把值传递下去
        if (!isFunction(onRejected))
            onRejected = error => {
                // 解释：要区分 onRejected 回调函数是否传进了，如果传了说明是用户提供了捕获异常的回调，返回结果要使用 resolve，否则就要使用 reject
                // 用 throw 抛出来的目的是使用 reject，不然就会走 resolve
                throw error;
            };
        switch (this.status) {
            case STATUS.pending:
                // 如果没有传入回调函数或者不是函数就忽略
                // 否则就放入数组中等状态改变时用来执行相应的方法
                // isFunction(onResolved) && this.onResolvedArray.push(onResolved);
                // isFunction(onRejected) && this.onRejectedArray.push(onRejected);
                // if (isFunction(onResolved)) {
                this.onResolvedArray.push(() => {
                    queueMicrotask(() => {
                        // setTimeout(() => {
                        try {
                            const res = onResolved(this.value);
                            if (res instanceof MyPromise) {
                                res.then(res => {
                                    resolve(res);
                                });
                            } else {
                                resolve(res);
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
                    // }, 0);
                });
                // }
                // if (isFunction(onRejected)) {
                this.onRejectedArray.push(() => {
                    queueMicrotask(() => {
                        // setTimeout(() => {
                        try {
                            // 根据实际的效果，也应该调用 resolve，把上个错误的结果当做结果返回
                            const res = onRejected(this.reason);
                            resolve(res);
                        } catch (error) {
                            reject(error);
                        }
                    });
                    // }, 0);
                });
                // }
                break;
            case STATUS.resolved:
                // isFunction(onResolved) && (this.value = onResolved(this.value));
                // if (isFunction(onResolved)) {
                queueMicrotask(() => {
                    // setTimeout(() => {
                    try {
                        const res = onResolved(this.value);
                        // 将上次一then里面的方法传递进下一个 Promise 的状态
                        if (res instanceof MyPromise) {
                            res.then(res => {
                                resolve(res);
                            });
                        } else {
                            resolve(res);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });
                // }, 0);
                // }
                break;
            case STATUS.rejected:
                // isFunction(onRejected) && (this.reason = onRejected(this.reason));
                // if (isFunction(onRejected)) {
                queueMicrotask(() => {
                    // setTimeout(() => {
                    try {
                        // 根据实际的效果，也应该调用 resolve，把上个错误的结果当做结果返回
                        const res = onRejected(this.reason);
                        resolve(res);
                    } catch (error) {
                        reject(error);
                    }
                });
                // }, 0);
                // }
                break;
            default:
                break;
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
            return this.reason;
        },
    );
};

MyPromise.resolve = function (value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
};

MyPromise.reject = function (reason) {
    return new MyPromise((resolve, reject) => reject(reason));
};

function createOnResolve(len, resolve) {
    let i = 0;
    const result = [];

    return (index, value, status) => {
        result[index] = status ? { status, value } : value;
        i++;
        //所有then执行后, resolve 结果，返回结果集
        if (i === len) {
            resolve(result);
        }
    };
}

// MyPromise.all2 = function (promises) {
//     if (!(promises instanceof Array)) throw new Error('参数为非数组');
//     return new MyPromise((resolve, reject) => {
//         const result = [];
//         const len = promises.length;
//         let i = 0;
//         promises.forEach((promise, index) => {
//             MyPromise.resolve(promise).then(
//                 res => {
//                     result[index] = res;
//                     i++;
//                     if (i === len) {
//                         resolve(result);
//                     }
//                 },
//                 err => {
//                     reject(err);
//                 },
//             );
//         });
//     });
// };

MyPromise.all = function (promises) {
    if (!(promises instanceof Array)) throw new Error('参数为非数组');

    return new MyPromise((resolve, reject) => {
        const promisesLen = promises.length;
        const onResolve = createOnResolve(promisesLen, resolve);

        promises.forEach((promise, index) => {
            // Promise.resolve(p) 用于处理传入值不为 Promise 的情况
            MyPromise.resolve(promise).then(
                res => onResolve(index, res),
                //有一个 Promise 被 reject 时，MyPromise 的状态变为 reject
                err => reject(err),
            );
        });
    });
};

MyPromise.allSettled = function (promises) {
    if (!(promises instanceof Array)) throw new Error('参数为非数组');

    return new MyPromise(resolve => {
        const promisesLen = promises.length;
        const onResolve = createOnResolve(promisesLen, resolve);

        promises.forEach((promise, index) => {
            // Promise.resolve(p) 用于处理传入值不为 Promise 的情况
            MyPromise.resolve(promise).then(
                res => onResolve(index, res, STATUS.resolved),
                err => onResolve(index, err, STATUS.rejected),
            );
        });
    });
};

MyPromise.race = function (promises) {
    if (!(promises instanceof Array)) throw new Error('参数为非数组');

    return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
            // Promise.resolve(p) 用于处理传入值不为 Promise 的情况
            MyPromise.resolve(promise).then(resolve, reject);
        });
    });
};

MyPromise.any = function (promises) {
    if (!(promises instanceof Array)) throw new Error('参数为非数组');

    return new MyPromise((resolve, reject) => {
        const reasons = [];
        promises.forEach(promise => {
            // Promise.resolve(p) 用于处理传入值不为 Promise 的情况
            MyPromise.resolve(promise).then(resolve, err => {
                reasons.push(err);
                if (reasons.length === promises.length) {
                    reject(new AggregateError(reasons));
                }
            });
        });
    });
};

// Promise.prototype.finally = function (callback) {
//     return this.then(
//         value => MyPromise.resolve(callback()).then(() => value),
//         reason =>
//             MyPromise.resolve(callback()).then(() => {
//                 throw reason;
//             }),
//     );
// };

const myPromise = new MyPromise((resolve, reject) => {
    // resolve(123);
    // setTimeout(() => {
    // resolve(1);
    reject(1);
    // }, 1000);
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
