// @ts-nocheck
/**
 * 1. 两数之和
 * 
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]
 

提示：

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
只会存在一个有效答案
 

进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？
 */

/**
 * 题解 1 暴力循环
 */
const twoSum1 = function (nums, target) {
    if (!nums || !Array.isArray(nums)) return [];
    if (nums.length < 2) return [];
    let len = nums.length;
    const map = new Map();
    for (let i = 0; i < len; i++) {
        const cur = nums[i];
        if (map.has(cur)) {
            return [map.get(cur), i];
        } else {
            map.set(target - cur, i);
        }
    }
    return [];
};
/**
 * 题解 2 存储预期值的对应的索引
 */
const twoSum2 = function (nums, target) {
    const cache = {};
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        const j = cache[cur];
        console.log('cache', cur, j, nums[j]);
        if (nums[j] + cur === target) {
            return [j, i];
        } else {
            cache[target - cur] = i;
        }
    }
    return [];
};
console.log('两数之和：', twoSum2([2, 7, 11, 15], 9));

/**
 * 11. 盛最多水的容器
 * 
 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

说明：你不能倾斜容器。

示例 1：

输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
示例 2：

输入：height = [1,1]
输出：1
 

提示：

n == height.length
2 <= n <= 105
0 <= height[i] <= 104
 */

