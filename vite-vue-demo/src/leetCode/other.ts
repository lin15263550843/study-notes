// @ts-nocheck
/**
 * 509. 斐波那契数 
 * （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：

    F(0) = 0，F(1) = 1
    F(n) = F(n - 1) + F(n - 2)，其中 n > 1
    给定 n ，请计算 F(n) 。

    输入：n = 4
    输出：3
    解释：F(4) = F(3) + F(2) = 2 + 1 = 3
 */
function fib(n) {
    // console.log(n);
    // 方法一：暴力递归
    // if (n < 2) return n;
    // return fib(n - 1) + fib(n - 2);

    // // 方法二：动态规划
    // const arr = new Array(n);
    // for (let i = 0; i <= n; i++) {
    //     if (i < 2) {
    //         arr[i] = i;
    //     } else {
    //         arr[i] = arr[i - 1] + arr[i - 2];
    //     }
    // }
    // return arr[arr.length - 1];

    // 方法三：优化后的动态规划
    if (n < 2) return n;
    let pre1 = 0,
        pre2 = 1,
        res = 0;
    for (let i = 2; i <= n; i++) {
        res = pre1 + pre2;
        pre1 = pre2;
        pre2 = res;
    }
    return res;
}
// console.log('斐波那契数:', fib(12));
/**
 * 剑指 Offer 48. 最长不含重复字符的子字符串
 * 字符串出现的不重复最长长度
 */
// abcaaab
function lengthOfLongestSubstring(str) {
    if (!str || typeof str !== 'string') return 0;
    const len = str.length;
    const map = new Map();
    let res = 0;
    let l = -1;
    let r = 0;
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
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('bbbbbbbbbb'));
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abcabcbb'));
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('pwwkew'));
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abba'));
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('au'));
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring(' '));
// console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring(''));
