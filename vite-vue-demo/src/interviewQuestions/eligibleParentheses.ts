// @ts-nocheck
/**
 * 给一个字符窜括号：  ））（（）））（）（）（（  输出合格的括号： （（））（）（）
 */
function test(str) {
    if (typeof str !== 'string') return '';

    const a = str.split('');
    const res = [];
    const cache = [];
    const aLen = a.length;

    for (let i = 0; i < aLen - 1; i++) {
        const cur = a[i];
        const last = res[res.length - 1];

        if (cur === '（') {
            res.push(cur);
        } else {
            const cLen = cache.length;
            if (cLen > 0) {
                console.log('res[res.length - 1 - cLen]', cLen, res[res.length - 1 - cLen]);
                if (res[res.length - 1 - cLen] === '（') {
                    cache.push(cur);
                } else {
                    while (cache.length > 0) {
                        res.push(cache.pop());
                    }
                }
            } else {
                if (last === '（') {
                    cache.push(cur);
                }
            }
        }

        // if (cLen > 0) {
        //     if(res[c])
        // }
    }
    console.log(cache);
    console.log(res);

    // a.forEach(cur => {
    //     if (cur === '（') {
    //         res.push(cur);
    //     } else {
    //         const last = res[res.length - 1];

    //         if (last === '（') {
    //             let len = arr.length;

    //             if (len === 0) {
    //                 arr.push(cur);
    //                 arr.push(res.pop());
    //             } else {
    //                 if (arr.length > 0) {
    //                     while (arr.length > 0) {
    //                         res.push(arr.pop());
    //                     }
    //                 }

    //                 arr.push(cur);

    //                 while (len > 0) {
    //                     arr.push(res.pop());
    //                     len--;
    //                 }

    //                 console.log('arr', arr);
    //             }
    //         }
    //     }
    // });

    return res.join('');
}
console.log('test --->>>', test('））（（）））（）（）（（'));
