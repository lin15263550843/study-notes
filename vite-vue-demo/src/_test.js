// /**
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// var findKthLargest = function (nums, k) {
//     if (!Array.isArray(nums)) return;
//     if (k < 1 || k > nums.length) return;
//     if (nums.length < 2) return nums[k - 1];
//     const exch = (arr, a, b) => {
//         const temp = arr[a];
//         arr[a] = arr[b];
//         arr[b] = temp;
//     };
//     const sort = (arr, left, right) => {
//         if (left >= right) return;
//         let flag = arr[left];
//         let start = left + 1;
//         let end = right;
//         while (start < end) {
//             while (start < end && arr[start] >= flag) {
//                 start++;
//             }
//             while (start < end && arr[end] < flag) {
//                 end--;
//             }
//             exch(arr, start, end);
//         }
//         if (arr[end] < flag) {
//             end--;
//         }
//         exch(arr, left, end);
//         sort(arr, left, end - 1);
//         sort(arr, end + 1, right);
//     };
//     sort(nums, 0, nums.length - 1);
//     console.log(nums);
//     return nums[k - 1];
// };
// function quickSort(arr) {
//     // 三向切分快排
//     if (!arr || !Array.isArray(arr)) return arr;
//     const exch = (a, x, y) => {
//         const v = a[x];
//         a[x] = a[y];
//         a[y] = v;
//     };
//     const sort = (a, lo, hi) => {
//         if (hi <= lo) return;
//         let v = a[lo],
//             l = lo,
//             r = hi,
//             i = lo + 1;
//         while (i <= r) {
//             if (a[i] < v) {
//                 exch(a, l++, i++);
//             } else if (a[i] > v) {
//                 exch(a, r--, i);
//             } else {
//                 i++;
//             }
//         }
//         sort(a, lo, l - 1);
//         sort(a, r + 1, hi);
//     };
//     sort(arr, 0, arr.length - 1);
//     return arr;
// }
// // console.log(findKthLargest([3, 1, 5, 6, 2, 4], 2));
// // console.log(findKthLargest([21, 2, 1, 5, 5, 6, 3, 4], 2));
// console.log(findKthLargest([4, 5, 2, 7, 3, 1, 6, 2, 3, 1, 8], 2));

