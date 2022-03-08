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
async function asyncF2() {
    console.log('asyncF2');
}
const asyncF1 = async () => {
    console.log('asyncF1 start');
    await asyncF2();
    console.log('asyncF1 end');
};
console.log('script start');
setTimeout(() => {
    console.log('setTimeout');
});
asyncF1();
new Promise(resolve => {
    console.log('promise1');
    resolve();
})
    .then(() => {
        console.log('promise2');
        return new Promise(resolve => {
            resolve();
        });
    })
    .then(result => {
        console.log('promise3', result);
    });
console.log('scirpt end');

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
