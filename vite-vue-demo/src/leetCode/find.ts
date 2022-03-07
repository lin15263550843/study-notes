// @ts-nocheck
/**
 * 剑指 Offer 04. 二维数组中的查找
 * 与 240 题相同
 *
 *  在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
    示例:
    现有矩阵 matrix 如下：
    [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
    ]
    给定 target = 5，返回 true。
    给定 target = 20，返回 false。
 */
function findNumberIn2DArray(matrix, target) {
    if (!Array.isArray(matrix) || matrix.length < 1) return false;

    const rowLen = matrix.length;
    let row = 0;
    let col = matrix[0].length - 1;

    while (row < rowLen && col >= 0) {
        const cur = matrix[row][col];
        if (cur === target) {
            return true;
        } else if (cur < target) {
            row++;
        } else {
            col--;
        }
    }

    return false;
}
// console.log(
//     'findNumberIn2DArray 结果：',
//     findNumberIn2DArray(
//         [
//             [1, 4, 7, 11, 15],
//             [2, 5, 8, 12, 19],
//             [3, 6, 9, 16, 22],
//             [10, 13, 14, 17, 24],
//             [18, 21, 23, 26, 30],
//         ],
//         20,
//     ),
// );
/**
 * 二分查找
 */
export function binarySearch(arr, target) {
    if (!arr || !Array.isArray(arr)) return -1;
    let l = 0,
        r = arr.length - 1;
    while (l <= r) {
        let mid = ((l + r) / 2) >>> 0;
        const val = arr[mid];
        if (val < target) {
            l = mid + 1;
        } else if (val > target) {
            r = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
// const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
// console.log('二分查找：', binarySearch(arr, 30));
/**
 * 300. 最长递增子序列
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
    子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。
    例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
    
    示例 1：
    输入：nums = [10,9,2,5,3,7,101,18]
    输出：4
    解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
    示例 2：
    输入：nums = [0,1,0,3,2,3]
    输出：4
    示例 3：
    输入：nums = [7,7,7,7,7,7,7]
    输出：1
 */
export function lengthOfLIS(arr) {
    if (!arr || !Array.isArray(arr)) return 0;
    const child = [arr[0]];
    const len = arr.length;
    const find = (a, target) => {
        let l = 0,
            r = a.length - 1,
            mid = 0;
        while (l <= r) {
            mid = ((l + r) / 2) >>> 0;
            const val = a[mid];
            if (val < target) {
                l = mid + 1;
            } else if (val > target) {
                r = mid - 1;
            } else {
                return mid;
            }
        }
        console.log(l, mid, r);

        return l;
    };
    for (let i = 1; i < len; i++) {
        const cur = arr[i];
        if (cur > child[child.length - 1]) {
            child.push(cur);
        } else {
            const index = find(child, cur);
            child[index] = cur;
        }
    }
    return child.length;
}
// console.log('最长不含重复字符的子字符串:', lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
/**
 * 215. 数组中的第K个最大元素
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
    请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
    示例 1:
    输入: [3,2,1,5,6,4] 和 k = 2
    输出: 5
    示例 2:
    输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
    输出: 4
 */
var findKthLargest = function (nums, k) {
    if (!nums || !Array.isArray(nums)) return -1;
    // 方法一
    // nums.sort((a, b) => b - a)
    // return nums[k - 1]

    // 方法二
    const exch = (a, x, y) => {
        const v = a[x];
        a[x] = a[y];
        a[y] = v;
    };
    const quickSort = (a, lo, hi, target) => {
        if (hi <= lo) return;
        let l = lo,
            r = hi,
            i = lo + 1,
            v = a[lo];
        while (i <= r) {
            if (a[i] > v) {
                exch(a, l++, i++);
            } else if (a[i] < v) {
                exch(a, r--, i);
            } else {
                i++;
            }
        }
        // quickSort(a, 0, l - 1);
        // quickSort(a, r + 1, hi);

        // 只排序 k 所在的区间，提升速度
        if (target > r) {
            quickSort(a, r + 1, hi, target);
        } else if (target < l) {
            quickSort(a, 0, l - 1, target);
        }
    };

    // quickSort(nums, 0, nums.length - 1);
    quickSort(nums, 0, nums.length - 1, k - 1);

    return nums[k - 1];
};
// console.log('数组中的第K个最大元素：', findKthLargest([3, 3, 3, 2, 1, 5, 6, 4], 2));
// console.log('数组中的第K个最大元素：', findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
// console.log('数组中的第K个最大元素：', findKthLargest([1], 1));
// console.log('数组中的第K个最大元素：', findKthLargest([-1, -1], 2));
// console.log('数组中的第K个最大元素：', findKthLargest([-1, 2, 0], 2));
