// @ts-nocheck
/**
 * 返回数组中每一项出现的次数
 * arr = [1,2,3,4,5,6,7,7,8,9,3,3,5,6,78,82]
 * [[1,1],[2,2]]
 */
function getFrequency(arr) {
    if (!Array.isArray(arr)) return [];
    const map = new Map();
    arr.forEach(cur => {
        if (map.has(cur)) {
            map.set(cur, map.get(cur) + 1);
        } else {
            map.set(cur, 1);
        }
    });
    console.log(map);

    return [...map];
    // const res = {};
    // map.forEach((val, key) => {
    //     res[key] = val;
    // });
    // return res;
}
// console.log(getFrequency([1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 3, 3, 5, 6, 78, 82]));
/**
 * 剑指 Offer 48. 最长不含重复字符的子字符串
 * 字符串出现的不重复最长子字符串长度
 */
// abcaaab
function lengthOfLongestSubstring(str) {
    if (typeof str !== 'string') return 0;
    const len = str.length;
    const map = new Map();
    let res = 0,
        l = -1,
        r = 0;
    while (r < len) {
        const cur = str[r];
        if (map.has(cur)) {
            l = Math.max(l, map.get(cur));
        }
        map.set(cur, r);
        res = Math.max(res, r - l);
        r++;
    }

    return res;
}
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abcabcbb'));
/**
 * 47. 全排列 II
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 */
const permuteUnique = function (nums) {
    if (!Array.isArray(nums)) return [];
    const len = nums.length;
    const flags = new Array(len).fill(false);
    const result = [];
    const rec = (arr, res) => {
        if (len === res.length) {
            result.push([...res]);
            return;
        }
        for (let i = 0; i < len; i++) {
            if (flags[i] || (i > 0 && arr[i] === arr[i - 1] && !flags[i - 1])) {
                continue;
            }
            res.push(arr[i]);
            flags[i] = true;
            rec(arr, res);
            res.pop();
            flags[i] = false;
        }
    };
    nums.sort((a, b) => a - b);
    rec(nums, []);
    return result;
};
/**
 * 剑指 Offer 38. 字符串的排列
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 */
const permutation = function (s) {
    if (typeof s !== 'string') return [];
    const arr = s.split('');
    const len = arr.length;
    const flags = new Array(len).fill(false);
    const result = [];
    const rec = (arr, res) => {
        if (res.length === len) {
            result.push(res.join(''));
            return;
        }
        for (let i = 0; i < len; i++) {
            if (flags[i] || (i > 0 && arr[i] === arr[i - 1] && !flags[i - 1])) {
                continue;
            }
            // if (flags[i]) {
            //     continue;
            // }
            res.push(arr[i]);
            flags[i] = true;
            rec(arr, res);
            res.pop();
            flags[i] = false;
        }
    };
    arr.sort((a, b) => a.charCodeAt() - b.charCodeAt());
    rec(arr, []);
    // return [...new Set(result)];
    return result;
};
// console.log('全排列结果：', permutation('abc'));
// console.log('全排列结果：', permutation('aab'));
console.log('全排列结果：', permutation('suvyls'));

/**
 * 全排列 这个是错误的！！！！！！！！！！！！！！！！！！！！
 */
// const _permute = string => {
//     // 补全代码 16:37 |
//     if (typeof string !== 'string') {
//         throw new Error(`the ${string} is not a string`);
//     }
//     const len = string.length;
//     const result = [];
//     const arr = string.split('');
//     const rec = (arr, l, res) => {
//         if (res.length === len) {
//             result.push(res);
//             return;
//         }
//         for (let i = l; i < len; i++) {
//             rec(arr, l + 1, (res += arr[i]));
//         }
//     };
//     rec(arr, 0, '');
//     return result;
// };
