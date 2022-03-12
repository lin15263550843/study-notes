// @ts-nocheck
// function testPromise() {
//     const obj = { name: 'obj' };
//     const p0 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             // resolve('resolve ~~~');
//             // reject('reject ~~~');
//             throw new Error('Error ~~~');
//         }, 1000);
//     });
//     const p1 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(p0); // 状态移交
//             // reject(p0); // 直接返回 p0 对象
//             // reject(obj);
//         }, 1000);
//     });

//     p1.then(
//         res => {
//             console.log('p then res------>>>', res);
//             console.log('res === p0------>>>', res === p0);
//         },
//         err => {
//             console.log('p then err------>>>', err);
//             console.log('err === p0------>>>', err === p0);
//         },
//     );
// }

// testPromise();

// const p = new Promise((resolve, reject) => {
//     console.log('创建时立即执行了');

//     setTimeout(() => {
//         resolve('resolve');
//         // reject('reject');
//     }, 1000);
// });

// p.then(res => {
//     console.log('resovle 执行了，返回结果：', res);
//     return Promise.reject('p then res 抛出的异常');
// }).catch(err => {
//     console.log('reject 执行了，返回结果：', err); // 能捕获
// });

// p.then(
//     res => {
//         console.log('resovle 执行了，返回结果：', res);
//         return Promise.reject('p then res 抛出的异常');
//     },
//     err => {
//         console.log('reject 执行了，返回结果：', err); // 不能捕获到上边抛出的异常
//     },
// );

// ----------------------------------------------------------------------------------
/**
 * 面试题
 */
// Promise.resolve()
//     // then 1-1
//     .then(() => {
//         console.log(0);
//         // 1.直接 return 一个值，相当于直接 resolve(4)
//         // return 4;

//         // 2.return thenable 的值
//         // return {
//         //     // 本次的事件循环，不会执行  resolve(4)，会产生个新的微任务，添加到微任务队列里，放到下一次的微任务执行
//         //     // then 1-1-1
//         //     then: function (resolve) {
//         //         // 大量的计算
//         //         resolve(4);
//         //     },
//         // };

//         // 3.return Promise
//         // 不是普通的值, 多加一次微任务
//         // Promise.resolve(4), 多加一次微任务
//         // 一共多加两次微任务
//         return Promise.resolve(4);
//     })
//     // then 1-2
//     .then(res => {
//         console.log(res);
//     });

// Promise.resolve()
//     // then 2-1
//     .then(() => {
//         console.log(1);
//     })
//     // then 2-2
//     .then(() => {
//         console.log(2);
//     })
//     // then 2-3
//     .then(() => {
//         console.log(3);
//     })
//     // then 2-4
//     .then(() => {
//         console.log(5);
//     })
//     // then 2-5
//     .then(() => {
//         console.log(6);
//     });

// ----------------------------------------------------------------------------------

/**
 * 1. 直接return一个值
 */
// 0
// 1
// 4
// 2
// 3
// 5
// 6

// 微任务
// then 1-1 => log(0)   ; return 4 // 相当于直接 resolve(4)，即把下一个 then 加到微任务
// then 2-1 => log(1)   ; return undefined
// then 1-2 => log(res) ; return undefined // log(res) 即 log(4)
// then 2-2 => log(2)   ; return undefined // 后边没有链式调用(没有打印)可以不用考虑这个 返回值了
// then 2-3 => log(3)   ; return undefined
// then 2-4 => log(5)   ; return undefined
// then 2-5 => log(6)   ; return undefined // 后边没有链式调用(没有打印)可以不用考虑这个 返回值了

// ----------------------------------------------------------------------------------

/**
 * 2. return thenable 的值
 */
// 输出结果
// 0
// 1
// 2
// 4
// 3
// 5
// 6

// 微任务
// then 1-1 => log(0) ; return {then:()=>{ resolve(4) }}
// then 2-1 => log(1) ; return undefined
// then 1-2 =>        ;                  // 把 ()=>{ resolve(4) } 即 then 1-1-1 加入微任务 此时，resolve(并不会执行) 所以 log(res) 不会打印
// then 2-2 => log(2) ; return undefined
// then 1-1-1 =>log(4); 执行 resolve(4)  // 真正调用 resolve(4) 的时候，即执行 then 1-2 时，才会打印 log(res) 即 log(4)
// then 2-3 => log(3) ; return undefined
// then 2-4 => log(5) ; return undefined
// then 2-5 => log(6) ; return undefined

// ----------------------------------------------------------------------------------

/**
 * 2. return Promise 的值
 */
// 输出结果
// 0
// 1
// 2
// 3
// 4
// 5
// 6

// 微任务
// then 1-1 => log(0) ; return Promise.resolve(4); // Promise.resolve(4) 多加一次微任务
// then 2-1 => log(1) ; return undefined
// then 1-2 =>        ;                  // 把 Promise.resolve(4) 的 then:()=>{ resolve(4) } 加入微任务，标记为 then 1-1-1
// then 2-2 => log(2) ; return undefined
// then 1-1-1 =>      ;                  // ()=>{ resolve(4) } // 标记为 then 1-1-2
// then 2-3 => log(3) ; return undefined
// then 1-1-2 =>log(4); resolve(4)       // 真正调用 resolve(4) 的时候，即执行 then 1-2 时，才会打印 log(res) 即 log(4)
// then 2-4 => log(5) ; return undefined
// then 2-5 => log(6) ; return undefined

// ----------------------------------------------------------------------------------
/**
 * async await 相关面试题
 */
// async function asyncF2() {
//     console.log('asyncF2');
// }
// const asyncF1 = async () => {
//     console.log('asyncF1 start');
//     await asyncF2();
//     console.log('asyncF1 end');
// };
// console.log('script start');
// setTimeout(() => {
//     console.log('setTimeout');
// });
// asyncF1();
// new Promise(resolve => {
//     console.log('promise1');
//     resolve();
// })
//     .then(() => {
//         console.log('promise2');
//         return new Promise(resolve => {
//             resolve();
//         });
//     })
//     .then(result => {
//         console.log('promise3', result);
//     });
// console.log('scirpt end');

// 输出结果
// script start
// asyncF1 start
// asyncF2
// promise1
// script end
// asyncF1 end  !!! 注意 asyncF1 end 被加入到了微任务
// promise2
// promise3 undefined
// setTimeout

// ----------------------------------------------------------------------------------
/**
 * 直接输出 promise 对象会带这她的状态值和参数。
 */
// const promise1 = new Promise((resolve, reject) => {
//     console.log('promise1');
//     resolve('resolve1');
// });
// const promise2 = promise1.then(res => {
//     console.log(res);
// });
// console.log('1', promise1);
// console.log('2', promise2);
// setTimeout(() => {
//     console.log('2', promise2);
// }, 0);
// queueMicrotask(() => {
//     console.log('2', promise2);
// });
// 输出结果
// promise1
// 1 Promise{<resolved>: resolve1}
// 2 Promise{<pending>}
// resolve1;

// ----------------------------------------------------------------------------------
// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//         console.log('timerStart');
//         resolve('success');
//         console.log('timerEnd');
//     }, 0);
//     console.log(2);
// });
// promise.then(res => {
//     console.log(res);
// });
// console.log(4);
// 输出结果
// 1
// 2
// 4
// timerStart
// timerEnd
// success

// ----------------------------------------------------------------------------------
// Promise.resolve().then(() => {
//     console.log('promise1');
//     const timer2 = setTimeout(() => {
//         console.log('timer2');
//     }, 0);
// });
// const timer1 = setTimeout(() => {
//     console.log('timer1');
//     Promise.resolve().then(() => {
//         console.log('promise2');
//     });
// }, 0);
// console.log('start');
// 输出结果
// start
// promise1
// timer1
// promise2
// timer2

// ----------------------------------------------------------------------------------
// const promise = new Promise((resolve, reject) => {
//     resolve('success1');
//     reject('error');
//     resolve('success2');
// });
// promise
//     .then(res => {
//         console.log('then:', res);
//     })
//     .catch(err => {
//         console.log('catch:', err);
//     });
// 输出结果
// then: success1

// *****----------------------------------------------------------------------------------
// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 注意：then方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为then(null)，这就会导致前一个Promise的结果会传递下面。
// 输出结果
// 1

// ----------------------------------------------------------------------------------
// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('success');
//     }, 1000);
// });
// const promise2 = promise1.then(() => {
//     throw new Error('error!!!');
// });
// console.log('promise1', promise1);
// console.log('promise2', promise2);
// setTimeout(() => {
//     console.log('promise1', promise1);
//     console.log('promise2', promise2);
// }, 2000);
// 输出结果
// promise1 Promise{<padding>}
// promise2 Promise{<padding>}
// Uncaught (in promise) Error: error!!!
// promise1 Promise{<fulfilled>:success}
// promise2 Promise{<rejected>: Error: error!!!}

// ----------------------------------------------------------------------------------
// Promise.resolve(1)
//     .then(res => {
//         console.log(res);
//         return 2;
//     })
//     .catch(err => {
//         return 3;
//     })
//     .then(res => {
//         console.log(res);
//     });
// 输出结果
// 1
// 2

// ----------------------------------------------------------------------------------
// Promise.resolve()
//     .then(() => {
//         // 注意：这个地方是 Error 不是 throw ！！！！！
//         // throw new Error('error!!!');
//         return new Error('error!!!');
//     })
//     .then(res => {
//         console.log('then: ', res);
//     })
//     .catch(err => {
//         console.log('catch: ', err);
//     });
// 输出结果
// then: Error: error!!!

// ----------------------------------------------------------------------------------
// 这里其实是一个坑，.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
// const promise = Promise.resolve().then(() => {
//     return promise;
// });
// promise.catch(console.err);
// 输出结果
// Uncaught (in promise) TypeError: Chaining cycle detected for promise #<Promise>

// ----------------------------------------------------------------------------------
// 11
// Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 输出结果
// 1

// ----------------------------------------------------------------------------------
// Promise.reject('err!!!')
//     .then(
//         res => {
//             console.log('success', res);
//         },
//         err => {
//             console.log('error', err);
//         },
//     )
//     .catch(err => {
//         console.log('catch', err);
//     });
// 输出结果
// error err!!!

// ----------------------------------------------------------------------------------
// Promise.resolve('1')
//     .then(res => {
//         console.log(res);
//     })
//     .finally(() => {
//         console.log('finally');
//     });
// Promise.resolve('2')
//     .finally(() => {
//         console.log('finally2');
//         return '我是finally2返回的值';
//     })
//     .then(res => {
//         console.log('finally2后面的then函数', res);
//     });
// 输出结果
// 1
// finally2
// finally
// finally2后面的then函数 2

// ----------------------------------------------------------------------------------
// function runAsync(x) {
//     const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
//     return p;
// }
// Promise.all([runAsync(1), runAsync(2), runAsync(3)]).then(res => console.log(res));
// 输出结果
// 1
// 2
// 3
// [1,2,3]

// ----------------------------------------------------------------------------------
// function runAsync(x) {
//     const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
//     return p;
// }
// function runReject(x) {
//     const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x));
//     return p;
// }
// Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//     .then(res => console.log(res))
//     .catch(err => console.log('err: ' + err));
// 输出结果
// 1
// 3
// 2
// Error: 2
// 4

// ----------------------------------------------------------------------------------
// 注意：1 和 result：1 在一个微任务里，而 1、2、3 分别在三个宏任务里 ！！！！！
// function runAsync(x) {
//     const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
//     return p;
// }
// Promise.race([runAsync(1), runAsync(2), runAsync(3)])
//     .then(res => console.log('result: ', res))
//     .catch(err => console.log(err));
// 输出结果
// 1
// result: 1
// 2
// 3

// ----------------------------------------------------------------------------------
// function runAsync(x) {
//     const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
//     return p;
// }
// function runReject(x) {
//     const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x));
//     return p;
// }
// Promise.race([runReject(0), runAsync(1), runAsync(2), runAsync(3)])
//     .then(res => console.log('result: ', res))
//     .catch(err => console.log(err));
// 输出结果
// 0
// Error: 0
// 1
// 2
// 3

// ----------------------------------------------------------------------------------
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }
// async function async2() {
//     console.log('async2');
// }
// async1();
// console.log('start');
// 输出结果
// async1 start
// async2
// start
// async1 end

// ----------------------------------------------------------------------------------
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
//     setTimeout(() => {
//         console.log('timer1');
//     }, 0);
// }
// async function async2() {
//     setTimeout(() => {
//         console.log('timer2');
//     }, 0);
//     console.log('async2');
// }
// async1();
// setTimeout(() => {
//     console.log('timer3');
// }, 0);
// console.log('start');
// 输出结果
// async1 start
// async2
// start
// async1 end
// timer2
// timer3
// timer1

// ----------------------------------------------------------------------------------
// async function async1() {
//     console.log('async1 start');
//     await new Promise(resolve => {
//         console.log('promise1');
//     });
//     console.log('async1 success');
//     return 'async1 end';
// }
// console.log('srcipt start');
// async1().then(res => console.log(res));
// console.log('srcipt end');
// 输出结果
// script start
// async1 start
// promise1
// script end

// ----------------------------------------------------------------------------------
// async function async1() {
//     console.log('async1 start');
//     await new Promise(resolve => {
//         console.log('promise1');
//         resolve('promise1 resolve');
//     }).then(res => console.log(res));
//     console.log('async1 success');
//     return 'async1 end';
// }
// console.log('srcipt start');
// async1().then(res => console.log(res));
// console.log('srcipt end');
// 输出结果
// srcipt start
// async1 start
// promise1
// script end
// promise1 resolve
// async1 success
// async1 end

// ----------------------------------------------------------------------------------
// async function async1() {
//     console.log('async1 start');
//     await async2();
//     console.log('async1 end');
// }

// async function async2() {
//     console.log('async2');
// }

// console.log('script start');

// setTimeout(function () {
//     console.log('setTimeout');
// }, 0);

// async1();

// new Promise(resolve => {
//     console.log('promise1');
//     resolve();
// }).then(function () {
//     console.log('promise2');
// });
// console.log('script end');
// 输出结果
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// ----------------------------------------------------------------------------------
// 注意： reject 抛出异常后就不会往下执行了
// async function async1() {
//     await async2();
//     console.log('async1');
//     return 'async1 success';
// }
// async function async2() {
//     return new Promise((resolve, reject) => {
//         console.log('async2');
//         reject('error');
//     });
// }
// async1().then(res => console.log(res));
// 输出结果
// async2
// Error: error

// ----------------------------------------------------------------------------------
// 注意：await 后边是个微任务
// async function async1() {
//     await Promise.reject('error!!!').catch(e => console.log(e));
//     console.log('async1');
//     return Promise.resolve('async1 success');
// }
// async1().then(res => console.log(res));
// console.log('script start');
// 输出结果
// script start
// error!!!
// async1
// async1 success

// ----------------------------------------------------------------------------------
// const first = () =>
//     new Promise((resolve, reject) => {
//         console.log(3);
//         let p = new Promise((resolve, reject) => {
//             console.log(7);
//             setTimeout(() => {
//                 console.log(5);
//                 resolve(6);
//                 console.log(p);
//             }, 0);
//             resolve(1);
//         });
//         resolve(2);
//         p.then(arg => {
//             console.log(arg);
//         });
//     });
// first().then(arg => {
//     console.log(arg);
// });
// console.log(4);
// 输出结果
// 3
// 7
// 4
// 1
// 2
// 5
// resolved 1

// ----------------------------------------------------------------------------------
// 注意：两个宏任务的时间， 一个是 2000 一个是 1000
// const async1 = async () => {
//     console.log('async1');
//     setTimeout(() => {
//         console.log('timer1');
//     }, 2000);
//     await new Promise(resolve => {
//         console.log('promise1');
//     });
//     console.log('async1 end');
//     return 'async1 success';
// };
// console.log('script start');
// async1().then(res => console.log(res));
// console.log('script end');
// Promise.resolve(1)
//     .then(2)
//     .then(Promise.resolve(3))
//     .catch(4)
//     .then(res => console.log(res));
// setTimeout(() => {
//     console.log('timer2');
// }, 1000);
// 输出结果
// script start
// async1
// promise1
// script end
// 1
// timer2
// timer1

// ----------------------------------------------------------------------------------
// 注意：p1 返回值是 undefined
// const p1 = new Promise(resolve => {
//     setTimeout(() => {
//         resolve('resolve3');
//         console.log('timer1');
//     }, 0);
//     resolve('resovle1');
//     resolve('resolve2');
// })
//     .then(res => {
//         console.log(res); // resolve1
//         setTimeout(() => {
//             console.log(p1);
//         }, 1000);
//     })
//     .finally(res => {
//         console.log('finally', res);
//     });
// 输出结果
// resolve1
// finally undefined
// timer1
// <resolved>: undefined

// ----------------------------------------------------------------------------------
// console.log('1');

// setTimeout(function () {
//     console.log('2');
//     process.nextTick(function () {
//         console.log('3');
//     });
//     new Promise(function (resolve) {
//         console.log('4');
//         resolve();
//     }).then(function () {
//         console.log('5');
//     });
// });
// process.nextTick(function () {
//     console.log('6');
// });
// new Promise(function (resolve) {
//     console.log('7');
//     resolve();
// }).then(function () {
//     console.log('8');
// });

// setTimeout(function () {
//     console.log('9');
//     process.nextTick(function () {
//         console.log('10');
//     });
//     new Promise(function (resolve) {
//         console.log('11');
//         resolve();
//     }).then(function () {
//         console.log('12');
//     });
// });
// 输出结果
// 1
// 7
// 6
// 8
// 2
// 4
// 3
// 5
// 9
// 11
// 10
// 12

// ----------------------------------------------------------------------------------
// console.log(1);

// setTimeout(() => {
//     console.log(2);
// });

// new Promise(resolve => {
//     console.log(3);
//     resolve(4);
// }).then(d => console.log(d));

// setTimeout(() => {
//     console.log(5);
//     new Promise(resolve => {
//         resolve(6);
//     }).then(d => console.log(d));
// });

// setTimeout(() => {
//     console.log(7);
// });

// console.log(8);
// 输出结果
// 1, 3, 8, 4, 2, 5, 6, 7

// ----------------------------------------------------------------------------------
// console.log(1);

// setTimeout(() => {
//     console.log(2);
//     Promise.resolve().then(() => {
//         console.log(3);
//     });
// });

// new Promise((resolve, reject) => {
//     console.log(4);
//     resolve(5);
// }).then(data => {
//     console.log(data);
// });

// setTimeout(() => {
//     console.log(6);
// });

// console.log(7);
// 输出结果
// 1, 4, 7, 5, 2, 3, 6

// ----------------------------------------------------------------------------------
// Promise.resolve()
//     .then(() => {
//         console.log('1');
//         throw 'Error';
//     })
//     .then(() => {
//         console.log('2');
//     })
//     .catch(() => {
//         console.log('3');
//         throw 'Error';
//     })
//     .then(() => {
//         console.log('4');
//     })
//     .catch(() => {
//         console.log('5');
//     })
//     .then(() => {
//         console.log('6');
//     });
// 输出结果
// 1, 3, 5, 6

// ----------------------------------------------------------------------------------
// setTimeout(function () {
//     console.log(1);
// }, 100);

// new Promise(function (resolve) {
//     console.log(2);
//     resolve();
//     console.log(3);
// }).then(function () {
//     console.log(4);
//     new Promise((resove, reject) => {
//         console.log(5);
//         setTimeout(() => {
//             console.log(6);
//         }, 10);
//     });
// });
// console.log(7);
// console.log(8);
// 输出结果
// 2, 3, 7, 8, 4, 5, 6, 1
// ----------------------------------------------------------------------------------

// 输出结果

// ----------------------------------------------------------------------------------

// 输出结果

// ----------------------------------------------------------------------------------

// 输出结果
