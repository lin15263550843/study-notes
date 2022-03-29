//@ts-nocheck
/**
 * 快排，三向切分快排
 */
export function quickSort(arr) {
    // 原地快排
    // if (!arr || !Array.isArray(arr)) return arr;
    // const exch = (a, x, y) => {
    //     const v = a[x];
    //     a[x] = a[y];
    //     a[y] = v;
    // };
    // const fn = (a, lo, hi) => {
    //     let v = a[lo],
    //         l = lo,
    //         r = hi + 1;
    //     while (true) {
    //         while (a[++l] < v) {
    //             if (l >= hi) break;
    //         }
    //         while (a[--r] > v) {
    //             // if (r <= lo) break;
    //         }
    //         if (l >= r) break;
    //         exch(a, l, r);
    //     }
    //     exch(a, lo, r);
    //     return r;
    // };
    // const sort = (a, lo, hi) => {
    //     if (hi <= lo) return;
    //     const k = fn(a, lo, hi);
    //     sort(a, lo, k - 1);
    //     sort(a, k + 1, hi);
    // };
    // sort(arr, 0, arr.length - 1);
    // return arr;
    // 三向切分快排
    if (!arr || !Array.isArray(arr)) return arr;
    const exch = (a, x, y) => {
        const v = a[x];
        a[x] = a[y];
        a[y] = v;
    };
    const sort = (a, lo, hi) => {
        if (hi <= lo) return;
        let v = a[lo],
            l = lo,
            r = hi,
            i = lo + 1;
        while (i <= r) {
            if (a[i] < v) {
                exch(a, l++, i++);
            } else if (a[i] > v) {
                exch(a, r--, i);
            } else {
                i++;
            }
        }
        sort(a, lo, l - 1);
        sort(a, r + 1, hi);
    };
    sort(arr, 0, arr.length - 1);
    return arr;
}
// console.log('快排：', quickSort([5, 7, 4, 3, 8, 5, 4, 9]));
// console.log('快排：', quickSort([58, 11, 5, 32, 21, 76, 8, 2, 23, 9, 3, 96, 7, 6, 12, 75, 43, 45, 23, 32, 99, 56, 78, 90]));
/**
 * 插入排序
 */
export function insterSort(arr) {
    if (!arr || !Array.isArray(arr)) return arr;
    const exch = (a, x, y) => {
        const v = a[x];
        a[x] = a[y];
        a[y] = v;
    };
    const len = arr.length;
    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
            exch(arr, j, j - 1);
        }
    }
    // for (let i = 1; i < len; i++) {
    //     const cur = arr[i];
    //     let j = i - 1;
    //     while (j >= 0) {
    //         if (cur < arr[j]) {
    //             arr[j + 1] = arr[j];
    //         } else {
    //             break;
    //         }
    //         j--;
    //     }
    //     arr[j + 1] = cur;
    // }
    return arr;
}
// console.log('插排：', insterSort([5, 7, 4, 3, 8, 5, 4, 9]));
/**
 * 冒泡排序
 */
export function bubbleSort(arr) {
    if (!arr || !Array.isArray(arr)) return arr;
    const exch = (a, x, y) => {
        const v = a[x];
        a[x] = a[y];
        a[y] = v;
    };
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j + 1] < arr[j]) {
                exch(arr, j, j + 1);
            }
        }
    }
    return arr;
}
// console.log('冒泡排序：', insterSort([5, 7, 4, 3, 8, 5, 4, 9]));
// console.log('冒泡排序：', quickSort([58, 11, 5, 32, 21, 76, 8, 2, 23, 9, 3, 96, 7, 6, 12, 75, 43, 45, 23, 32, 99, 56, 78, 90]));

/**
 * 美团第一个题
 */
// 求目标值的区间
//   给出一个有序数组，请在数组中找出目标值的起始位置和结束位置

//   你的算法的时间复杂度应该在O(log n)之内

//   如果数组中不存在目标，返回[-1, -1].

//   例如：

//   给出的数组是[50, 70, 70, 80, 80, 100]，目标值是80,

//   返回[3, 4].
// 示例1
// 输入： [50, 70, 70, 80, 80, 100],80
// 输出： [3,4]

/**
 * 美团第二个题
 */
// 寻找第K大
//   有一个整数数组，请你根据快速排序的思路，找出数组中第 k 大的数。

//   给定一个整数数组 a ,同时给定它的大小n和要找的 k ，请返回第 k 大的数(包括重复的元素，不用去重)，保证答案存在。

//   要求：时间复杂度 O(nlogn)O(nlogn)，空间复杂度 O(1)O(1)

//   数据范围：0\le  n \le 10000≤n≤1000， 1 \le K \le n1≤K≤n，数组中每个元素满足 0 \le val \le 100000000≤val≤10000000
// 示例1
// 输入： [1,3,5,2,2],5,3
// 输出： 2
// 示例2
// 输入： [10,10,9,9,8,7,5,6,4,3,4,2],12,3
// 输出： 9
// 说明： 去重后的第3大是8，但本题要求包含重复的元素，不用去重，所以输出9
