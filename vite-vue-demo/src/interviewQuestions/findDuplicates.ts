// @ts-nocheck
/**
 * 查找重复元素
 */
function findDuplicates(arr) {
    if (!Array.isArray(arr)) return arr;

    // // 不使用额外的空间，但是因为有个排序 最快时间复杂度为 nlogn
    // const a = [...arr].sort((a, b) => a - b);
    // const len = a.length;
    // const res = [];

    // for (let i = 0; i < len; i++) {
    //     if (a[i] === a[i + 1] && a[i + 1] !== a[i + 2]) res.push(a[i]);
    // }

    // 只需要一次循环，时间复杂度为 n，但是需要使用额外空间为 n
    const cache = new Set();
    const res = new Set();

    arr.forEach(n => {
        if (cache.has(n)) {
            res.add(n);
        } else {
            cache.add(n);
        }
    });

    return Array.from(res);
}

console.log('检查结果：', findDuplicates([1, 2, 5, 6, 8, 3, 1, 2, 0, 2, 1, 3, 4, 2, 2, 2, 2]));

/**
 * 检查重复字符串
 */
function containsRepeatingLetter(str) {
    if (typeof str !== 'string') return false;

    // return /([a-zA-Z])\1/.test(str);

    const len = str.length;

    for (let i = 0; i < len; i++) {
        if (str[i] === str[i + 1] && /[a-zA-Z]/.test(str[i])) return true;
    }

    return false;
}

console.log('检查结果：', containsRepeatingLetter('rattler'));
console.log('检查结果：', containsRepeatingLetter('ratler'));
console.log('检查结果：', containsRepeatingLetter('l33t'));
