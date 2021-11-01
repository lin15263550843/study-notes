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
        switch (this.status) {
            case STATUS.pending:
                // 如果没有传入回调函数或者不是函数就忽略
                // 否则就放入数组中等状态改变时用来执行相应的方法
                // isFunction(onResolved) && this.onResolvedArray.push(onResolved);
                // isFunction(onRejected) && this.onRejectedArray.push(onRejected);
                if (isFunction(onResolved)) {
                    this.onResolvedArray.push(() => {
                        setTimeout(() => {
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
                        }, 0);
                    });
                }
                if (isFunction(onRejected)) {
                    this.onRejectedArray.push(() => {
                        setTimeout(() => {
                            try {
                                const err = onRejected(this.value);
                                resolve(err);
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });
                }
                break;
            case STATUS.resolved:
                // isFunction(onResolved) && (this.value = onResolved(this.value));
                if (isFunction(onResolved)) {
                    setTimeout(() => {
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
                    }, 0);
                }
                break;
            case STATUS.rejected:
                isFunction(onRejected) && (this.reason = onRejected(this.reason));
                if (isFunction(onRejected)) {
                    setTimeout(() => {
                        try {
                            const err = onRejected(this.reason);
                            reject(err);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                }
                break;
            default:
                break;
        }
    });
};

const myPromise = new MyPromise((resolve, reject) => {
    // resolve(123);
    setTimeout(() => {
        resolve(123);
        // reject(123);
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
            console.log('myPromise.then resolve----------------------1>>>', res);
            return 1;
        },
        res => {
            console.log('myPromise.then reject-----------------------1>>>', res);
            return 1;
        },
    )
    .then(res => {
        console.log('myPromise.then resolve--------------------------2>>>', res);
        return 2;
    });

const mp2 = mp1
    .then(res => {
        console.log('myPromise.then resolve--------------------------3>>>', res);
        return 3;
    })
    .then(res => {
        console.log('myPromise.then resolve--------------------------5>>>', res);
        return 5;
    });

const mp3 = mp1
    .then(res => {
        console.log('myPromise.then resolve--------------------------4>>>', res);
        // return 4;
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve(456);
            }, 1000);
        });
    })
    .then(res => {
        console.log('myPromise.then resolve--------------------------7>>>', res);
        return 6;
    });

mp2.then(
    res => {
        console.log('myPromise.then resolve--------------------------6>>>', res);
        return 7;
    },
    res => {
        console.log('myPromise.then reject---------------------------6>>>', res);
    },
);

mp3.then(
    res => {
        console.log('myPromise.then resolve--------------------------8>>>', res);
        return 8;
    },
    res => {
        console.log('myPromise.then reject---------------------------8>>>', res);
    },
);
