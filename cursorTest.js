




/**
 * 三向切分的快速排序
 * @param {number[]} nums
 * @return {number[]}
 */
function quickSort3Way(nums, lo = 0, hi = nums.length - 1) {
    if (hi <= lo) return;
    let lt = lo; // nums[lo..lt-1] 中的元素都小于 v
    let gt = hi; // nums[gt+1..hi] 中的元素都大于 v
    let v = nums[lo];
    let i = lo + 1; // nums[lt..i-1] 中的元素都等于 v，nums[i..gt] 中的元素都还未确定
    while (i <= gt) {
        if (nums[i] < v) {
            [nums[i], nums[lt]] = [nums[lt], nums[i]]; // 将小于 v 的元素交换到左边区域
            lt++;
            i++;
        } else if (nums[i] > v) {
            [nums[i], nums[gt]] = [nums[gt], nums[i]]; // 将大于 v 的元素交换到右边区域
            gt--;
        } else {
            i++;
        }
    }
    // 递归地将左边和右边的元素进行排序
    quickSort3Way(nums, lo, lt - 1);
    quickSort3Way(nums, gt + 1, hi);
    return nums;
}


function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = maxSum;
    for(let i = 1; i < nums.length; i++){
        currentSum = Math.max(nums[i] + currentSum, nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}
function maxSubArrayElements(nums) {
    let maxSum = nums[0];
    let currentSum = maxSum;
    let start = 0;
    let end = 0;
    for(let i = 1; i < nums.length; i++){
        if(currentSum < 0){
            start = i;
            currentSum = nums[i];
        }else{
            currentSum += nums[i];
        }
        if(currentSum > maxSum){
            maxSum = currentSum;
            end = i;
        }
    }
    return nums.slice(start, end + 1);
}
/**
 * 使用回溯法生成所有可能的全排列
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
    let res = [];
    let path = [];
    let used = new Array(nums.length).fill(false);
    // 回溯函数
    function backtrack(nums, used) {
        // 结束条件，路径长度等于数组长度
        if(path.length == nums.length) {
            res.push(Array.from(path));
            return;
        }
        for(let i = 0; i < nums.length; i++) {
            // 如果元素没有被使用过
            if(!used[i]) {
                // 添加到路径中
                path.push(nums[i]);
                // 标记为已使用
                used[i] = true;
                // 进入下一层决策树
                backtrack(nums, used);
                // 回溯，撤销选择
                used[i] = false;
                path.pop();
            }
        }
    }
    // 从第一个元素开始回溯
    backtrack(nums, used);
    return res;
}
/**
 * 三向切分的快速排序
 * @param {number[]} nums
 * @return {number[]}
 */
function quickSort3Way(nums, lo = 0, hi = nums.length - 1) {
    if (hi <= lo) return;
    let lt = lo; // nums[lo..lt-1] 中的元素都小于 v
    let gt = hi; // nums[gt+1..hi] 中的元素都大于 v
    let v = nums[lo];
    let i = lo + 1; // nums[lt..i-1] 中的元素都等于 v，nums[i..gt] 中的元素都还未确定
    while (i <= gt) {
        if (nums[i] < v) {
            [nums[i], nums[lt]] = [nums[lt], nums[i]]; // 将小于 v 的元素交换到左边区域
            lt++;
            i++;
        } else if (nums[i] > v) {
            [nums[i], nums[gt]] = [nums[gt], nums[i]]; // 将大于 v 的元素交换到右边区域
            gt--;
        } else {
            i++;
        }
    }
    // 递归地将左边和右边的元素进行排序
    quickSort3Way(nums, lo, lt - 1);
    quickSort3Way(nums, gt + 1, hi);
    return nums;
}
// 你现在是一个前端领域专家，请帮我用 JavaScript 语言写一函数，它需要实现：三相切分的快速排序




// 你现在是一个前端领域专家，请帮我用 JavaScript 语言写一函数，并给出代码注释，它需要实现：

/**
 * 找出一个数组中的最大和的子数组
 * @param {number[]} nums
 * @return {number[]} 返回最大和的子数组
 */
function maxSumSubArray(nums) {
    let maxSum = nums[0]; // 初始化最大和为数组的第一个元素
    let currentSum = maxSum; // 初始化当前和为数组的第一个元素
    let start = 0; // 初始化最大和子数组的起始位置
    let end = 0; // 初始化最大和子数组的结束位置

    for(let i = 1; i < nums.length; i++){
        // 如果当前和小于0，那么从下一个元素开始重新计算子数组和
        if(currentSum < 0){
            start = i;
            currentSum = nums[i];
        }else{
            // 否则，将当前元素加入到子数组和中
            currentSum += nums[i];
        }
        // 如果当前和大于最大和，那么更新最大和，并记录子数组的结束位置
        if(currentSum > maxSum){
            maxSum = currentSum;
            end = i;
        }
    }
    // 返回最大和的子数组
    return nums.slice(start, end + 1);
}


// 你现在是一个前端领域专家，请帮我用 JavaScript 语言写一函数，并给出代码注释，它需要实现：

// 你现在是一个前端领域专家，请帮我用 JavaScript 语言写一函数，并给出代码注释，它需要实现：找出一个数组中的最大和的子数组


