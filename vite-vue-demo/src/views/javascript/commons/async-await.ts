/**
 * 使用 generator + proimse 实现 async await 的演化过程
 */
/**
 * 模拟请求
 */
function requestData(url: string) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(url);
        }, 100);
    });
}
/**
 * 多个连续请求的场景
 */

/**
 * 1 > 第一种方案：多次回调
 * 回调地域
 */
requestData('aaa').then(res => {
    requestData(`${res}-bbb`).then(res => {
        requestData(`${res}-ccc`).then(res => {
            requestData(`${res}-ddd`).then(res => {
                requestData(`${res}-eee`).then(res => {
                    console.log('res------------>>>', res);
                });
            });
        });
    });
});

/**
 *  2 > 使用 Promise then 返回值解决
 */
requestData('aaa')
    .then(res => {
        return requestData(`${res}-bbb`);
    })
    .then(res => {
        return requestData(`${res}-ccc`);
    })
    .then(res => {
        return requestData(`${res}-ddd`);
    })
    .then(res => {
        return requestData(`${res}-eee`);
    })
    .then(res => {
        console.log('res------------>>>', res);
    });
/**
 * 3 > 使用生成器函数解决
 */
function* getData(): any {
    const res1 = yield requestData('aaa');
    const res2 = yield requestData(`${res1}-bbb`);
    const res3 = yield requestData(`${res2}-ccc`);
    const res4 = yield requestData(`${res3}-ddd`);
    const res5 = yield requestData(`${res4}-eee`);
    console.log('res5----------------->>>', res5);
}

// 手动执行生成器函数
// const generatorPromise = getData();
// generatorPromise.next().value.then((res: string) => {
//     generatorPromise.next(res).value.then((res: string) => {
//         generatorPromise.next(res).value.then((res: string) => {
//             generatorPromise.next(res).value.then((res: string) => {
//                 generatorPromise.next(res).value.then((res: string) => {
//                     console.log('generatorPromise res------------>>>', res);
//                     generatorPromise.next(res);
//                 });
//             });
//         });
//     });
// });

// 封装一个自动执行的生成器函数
function execGenerator(genFn: Function) {
    const gen = genFn();

    function exec(res?: any) {
        const { done, value } = gen.next(res);
        if (done) return value;

        value.then((res: string) => {
            exec(res);
        });
    }
    exec();
}
// 也可以使用第三方包 co 自动执行
// 作者是 TJ: co/n(nvm)/commander(coderwhy/vue cli)/express/koa(egg)
// const co = require('co')
// co(getData)
execGenerator(getData);

/**
 * 4 > 使用 async / await
 */
async function getData2() {
    const res1 = await requestData('aaa');
    const res2 = await requestData(`${res1}-bbb`);
    const res3 = await requestData(`${res2}-ccc`);
    const res4 = await requestData(`${res3}-ddd`);
    const res5 = await requestData(`${res4}-eee`);
    console.log('res5----------------->>>', res5);
}
getData2();

/**
 * async 和普通函数区别
 */

async function asyncFun() {
    const msg = 'async function';
    console.log('async function msg----------------->>>', msg);
    throw new Error('error message~~~');

    // return msg;
}
const asyncFunResult = asyncFun();
console.log('asyncFun asyncFunResult----------- --->>>', asyncFunResult);
console.log('***后继代码还会接着执行***');

