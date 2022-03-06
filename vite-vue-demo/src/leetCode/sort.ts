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
