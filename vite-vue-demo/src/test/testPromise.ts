function testPromise() {
    const obj = { name: 'obj' };

    const p0 = new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve('resolve ~~~');
            // reject('reject ~~~');
            throw new Error('Error ~~~');
        }, 1000);
    });
    const p1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(p0); // 状态移交
            // reject(p0); // 直接返回 p0 对象
            // reject(obj);
        }, 1000);
    });

    p1.then(
        res => {
            console.log('p then res------>>>', res);
            console.log('res === p0------>>>', res === p0);
        },
        err => {
            console.log('p then err------>>>', err);
            console.log('err === p0------>>>', err === p0);
        },
    );
}

testPromise();

const p = new Promise((resolve, reject) => {
    console.log('创建时立即执行了');

    setTimeout(() => {
        resolve('resolve');
        // reject('reject');
    }, 1000);
});

p.then(res => {
    console.log('resovle 执行了，返回结果：', res);
    return Promise.reject('p then res 抛出的异常');
}).catch(err => {
    console.log('reject 执行了，返回结果：', err); // 能捕获
});

p.then(
    res => {
        console.log('resovle 执行了，返回结果：', res);
        return Promise.reject('p then res 抛出的异常');
    },
    err => {
        console.log('reject 执行了，返回结果：', err); // 不能捕获到上边抛出的异常
    },
);
