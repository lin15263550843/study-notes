// @ts-nocheck
/**
 * promise 题目
 */
function testPromise1() {
    console.log(1);

    new Promise((resolve, reject) => {
        resolve();
        setTimeout(() => {
            new Promise((resolve, reject) => {
                console.log(2);
            }).then(() => {
                console.log(3);
            });
        });
    })
        .then(() => {
            console.log(4);
        })
        .then(() => {
            console.log(5);
        });

    setTimeout(() => {
        console.log(6);
    });

    new Promise((resolve, reject) => {
        console.log(7);
        resolve();
    })
        .then(() => {
            console.log(8);
        })
        .then(() => {
            console.log(9);
        });

    console.log(10);
}

testPromise1();
// 结果
// 1
// 7
// 10
// 4
// 8
// 5
// 9
// 2
// 6
