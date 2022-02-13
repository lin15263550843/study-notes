// @ts-nocheck
/**
 * promise 题目1
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

// testPromise1();
// 1
// 7
// 10
// 4
// 8
// 5
// 9
// 2
// 6

/**************************************************************************************
 * promise 题目2
 */
function testPromise2() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
        Promise.resolve().then(() => {
            console.log(3);
        });
    });

    new Promise((resolve, reject) => {
        console.log(4);
        resolve(5);
    })
        .then(data => {
            console.log(data);
        })
        .then(data => {
            console.log('another');
        });

    setTimeout(() => {
        console.log(6);
    });

    console.log(7);
}

// testPromise2();
// 1
// 4
// 7
// 5
// another
// 2
// 3
// 6

/**************************************************************************************
 * promise 题目3
 */
function testPromise3() {
    Promise.reject()
        .then(() => {
            console.log(1);
        })
        .catch(() => {
            console.log(2);
            return 2;
        })
        .then(
            res => {
                console.log(3, res);
            },
            // err => {
            //     console.log(32, err);
            // },
        )
        .catch(() => {
            console.log(4);
        })
        .then(() => {
            console.log(5);
        });
}
testPromise3();
// 2
// 3
// 5

Promise.reject()
.then(() => {
    console.log(1);
})
.catch(() => {
    console.log(2);
    return 2;
})
.then(
    () => {
        console.log(3);
    },
)
.catch(() => {
    console.log(4);
})
.then(() => {
    console.log(5);
});