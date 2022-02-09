// @ts-nocheck
/**
 * 删除无效的括号
 * 给一个字符窜括号：  ））（（）））（）（）（（  输出合格的括号： （（））（）（）
 */
// function test(str) {
//     if (typeof str !== 'string') return '';

//     const a = str.split('');
//     // const aLen = a.length;
//     const cache = [];
//     let res = [];
//     let len = cache.length;

//     // for (let i = 0; i < aLen - 1; i++) {
//     //     const cur = a[i];

//     //     if (cur === '（') {
//     //         cache.push(cur);
//     //     } else {
//     //         if (len > 0) {
//     //             res = [cache.pop(), ...res, cur];
//     //         } else {
//     //             if (cache.length > 0) {
//     //                 res.push(cache.pop());
//     //                 res.push(cur);
//     //             }
//     //         }
//     //         len = cache.length;
//     //     }
//     // }
//     console.log('-----------------------------------');
//     console.log('cache', cache);
//     console.log('res', res);

//     a.forEach(cur => {
//         if (cur === '（') {
//             cache.push(cur);
//         } else {
//             if (len > 0) {
//                 res = [cache.pop(), ...res, cur];
//             } else {
//                 if (cache.length > 0) {
//                     res.push(cache.pop());
//                     res.push(cur);
//                 }
//             }
//             len = cache.length;
//         }
//     });
//     return res.join('');
// }
// console.log('test --->>>', test('））（（）））（）（）（（'));
// console.log('test --->>>', test('））（（（）））（）（（））（（'));
var removeInvalidParentheses = function (s) {
    const ans = [];
    let currSet = new Set();

    currSet.add(s);
    while (true) {
        for (const str of currSet) {
            if (isValid(str)) {
                ans.push(str);
            }
        }
        if (ans.length > 0) {
            return ans;
        }
        const nextSet = new Set();
        for (const str of currSet) {
            for (let i = 0; i < str.length; i++) {
                if (i > 0 && str[i] === str[i - 1]) {
                    continue;
                }
                if (str[i] === '(' || str[i] === ')') {
                    nextSet.add(str.substring(0, i) + str.substring(i + 1));
                }
            }
        }
        currSet = nextSet;
    }
};

const isValid = str => {
    let count = 0;

    for (const c of str) {
        if (c === '(') {
            count++;
        } else if (c === ')') {
            count--;
            if (count < 0) {
                return false;
            }
        }
    }

    return count === 0;
};

// 作者：LeetCode-Solution
// 链接：https://leetcode-cn.com/problems/remove-invalid-parentheses/solution/shan-chu-wu-xiao-de-gua-hao-by-leetcode-9w8au/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
console.log('removeInvalidParentheses', removeInvalidParentheses('))(())))()()(('));
console.log('removeInvalidParentheses', removeInvalidParentheses('))((())))()()(('));
