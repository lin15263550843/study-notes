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
 * 字符串出现的不重复最长长度
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
