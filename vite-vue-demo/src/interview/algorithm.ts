// @ts-nocheck
/**
 * 3. 无重复字符的最长子串，返回最长子串
 */
function lengthOfLongestSubstring(str) {
    if (typeof str !== 'string') return;
    const map = new Map();
    let result = ''; // 无重复字符
    let max = 0; // 无重复字符长度
    let l = -1; // 左边界指针，需要从 -1 开始，初始时或当 l 没有变化时，可以使 r - l 返回正确的值
    let r = 0; // 右指针，右边界
    while (r < str.length) {
        const cur = str[r];
        if (map.has(cur)) {
            l = Math.max(l, map.get(cur)); // 存在重复值，更新左边界，更新 l 为当前字符上一次出现的位置的索引，更新的位置必须大于当前左边界索引
        }
        if (r - l > max) {
            max = r - l; // // 如果 r - l 大于最大值则更新最大值
            result = str.slice(l + 1, l + 1 + max); // 因为 l 是上一个重复索引位置，所以要 +1， l 的下一个才是起始边界值
        }
        map.set(cur, r);
        r++;
    }
    return result;
}
// function lengthOfLongestSubstring(str) {
//     if (typeof str !== 'string') return;
//     const map = new Map();
//     let result = ''; // 结果
//     let max = 0; // 最大长度
//     let l = 0; // 左指针，非重复起始左边界
//     let r = 0; // 右指针，右边界
//     while (r < str.length) {
//         const cur = str[r];
//         if (map.has(cur)) {
//             l = Math.max(l, map.get(cur) + 1); // 如果字符重复，则更新 l 为当前字符上一次出现的位置的索引
//         }
//         if (r - l + 1 > max) {
//             max = r - l + 1; // 因为 l 是代表上一个非重复起始位，r 是索引，所以还要 +1，如果当前无重复字符子字符串的长度大于 max，则更新
//             result = str.slice(l, l + max);
//         }
//         map.set(cur, r); // 缓存当前字符，以及对应索引位置
//         r++;
//     }
//     console.log('-----', max);
//     return result;
// }
console.log(lengthOfLongestSubstring(' '));
console.log(lengthOfLongestSubstring('ab'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abcabcbb'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abcaaab'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('aabcdefbgkd'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('dfdftwerjoeiwurhgnfdggjgdfjglflkg'));

// var lengthOfLongestSubstring = function (s) {
//     if (typeof s !== 'string') return 0;
//     const map = new Map(); // 创建一个 Map 来存储字符和它们的索引
//     let left = 0; // 定义左指针
//     let max = 0; // 定义无重复字符最大长度（定义无重复字符起始位置等于 left + 1）
//     for (let i = 0; i < s.length; i++) {
//         const cur = s[i]; // 如果当前字符已经在 Map 中，那么更新左指针的位置
//         if (map.has(cur)) {
//             left = Math.max(left, map.get(cur)); // 只能往右移，所以 left 应该大于 map 里边取出来的索引
//         }
//         map.set(cur, i); // 将当前字符和它的索引添加到 Map 中
//         max = Math.max(i - left, max); // 如果当前子串的长度大于最大长度，那么更新最大长度和开始位置
//     } // 在不断判断与左侧滑动+max最长值判断的多重约束下，最终得到理想值 max
//     // console.log(s.substring(left + 1, left + 1 + max));
//     return max;
// };
/**
 * 剑指 Offer 48. 最长不含重复字符的子字符串
 * 字符串出现的不重复最长子字符串长度
 * 3. 无重复字符的最长子串
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 */
function lengthOfLongestSubstring(str) {
    if (typeof str !== 'string') return 0;
    const map = new Map(); // 定义map方法，用以后续判断是否有重复字母、获取元素下标索引、存储索引
    let max = 0; // 无重复字符长度
    let l = -1; // 左边界指针，需要从 -1 开始，初始时或当 l 没有变化时，可以使 r - l 返回正确的值
    let r = 0; // 右指针
    while (r < str.length) {
        const cur = str[r];
        if (map.has(cur)) {
            l = Math.max(l, map.get(cur)); // 存在重复值，更新左边界，移动左指针到之前存储的重复位置，更新的位置必须大于当前左边界索引
        }
        max = Math.max(max, r - l); // 如果 r-l 大于最大值则更新最大值
        map.set(cur, r);
        r++;
    }
    return max;
}
console.log(lengthOfLongestSubstring(' '));
console.log(lengthOfLongestSubstring('ab'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abcabcbb'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('abcaaab'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('aabcdefbgkd'));
console.log('最长不含重复字符的子字符串:', lengthOfLongestSubstring('dfdftwerjoeiwurhgnfdggjgdfjglflkg'));
/**
 * 46. 全排列 I 不重复数组
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 */
var permute = function (nums) {
    if (!Array.isArray(nums)) return;
    if (nums.length === 0) return [];
    if (nums.length < 2) return [nums];
    const result = []; // 结果数组，用于存储所有的全排列结果
    const flags = new Array(nums.length).fill(false); // 用于标记哪些数字已经被选择过，初始值都为 false
    const rec = (nums, arr) => {
        if (arr.length === nums.length) {
            result.push([...arr]); // 当已选择的数字数量等于原始数组的长度时，说明已经完成了一种全排列
            return; // 结束当前递归
        }
        for (let i = 0; i < nums.length; i++) {
            if (flags[i]) continue; // 如果该数字已经被选择过，则跳过此次循环
            arr.push(nums[i]); // 将当前数字加入到已选择的数字中
            flags[i] = true; // 将当前数字标记为已选择
            rec(nums, arr); // 递归调用自身，继续选择下一个数字加入到 arr 中
            arr.pop(); // 回溯，将当前数字从已选择的数字中移除
            flags[i] = false; // 将当前元素恢复为未使用
        }
    };
    rec(nums, []); // 调用递归函数开始求解全排列。初始时，已选择的数字为空
    return result;
};
console.log(permute([1, 2, 3]));
/**
 * 47. 全排列 II 重复数字
 * 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
 */
var permuteUnique = function (nums) {
    if (!Array.isArray(nums)) return;
    if (nums.length === 0) return [];
    if (nums.length < 2) return [nums];
    const result = []; // 用于存放全排列结果
    const flags = new Array(nums.length).fill(false); // 辅助数组，用于标记当前位置是否被使用过
    const rec = (nums, arr) => {
        if (arr.length === nums.length) {
            result.push([...arr]); // 长度和 nums 相等说明已经完成了全排列，添加结果
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (flags[i]) continue; // 当前元素已经被使用过了，调过该轮循环
            if (i - 1 >= 0 && flags[i - 1] && nums[i] === nums[i - 1]) continue; // 去重，如果前一个元素已经被选中，并且与当前元素相同，跳过本次循环
            arr.push(nums[i]); // 将当前数字加入到 arr 中
            flags[i] = true; // 将当前元素标记为已使用
            rec(nums, arr); // 递归遍历 nums 添加下一个元素
            arr.pop(); // 回溯，将当前元素从 arr 中移除
            flags[i] = false; // 将当前元素恢复为未使用
        }
    };
    nums.sort((a, b) => a - b); // 排序，为了方便去重
    rec(nums, []);
    return result;
};
console.log(permuteUnique([1, 1, 2]));
console.log(permuteUnique([1, 2, 2, 3]));
console.log(permuteUnique([22, 22, 33]));
/**
 * 剑指 Offer 38. 字符串的排列
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 */
// const permutation = function (s) {
//     if (typeof s !== 'string') return [];
//     const sArr = s.split('');
//     const result = []; // 用于存放全排列结果
//     const flags = new Array(sArr.length).fill(false); // 辅助数组，用于标记当前位置是否被使用过
//     const rec = (sArr, arr) => {
//         if (arr.length === sArr.length) {
//             result.push(arr.join(',')); // 长度和 nums 相等说明已经完成了全排列，添加结果
//             return; // 递归终止条件
//         }
//         for (let i = 0; i < sArr.length; i++) {
//             if (flags[i]) continue; // 当前元素已经被使用过了，调过该轮循环
//             if (flags[i - 1] && sArr[i] === sArr[i - 1]) continue; // 去重，如果前一个元素已经被选中，并且与当前元素相同，跳过本次循环
//             arr.push(sArr[i]); // 将当前数字加入到 arr 中
//             flags[i] = true; // 将当前元素标记为已使用
//             rec(sArr, arr); // 递归遍历 nums 添加下一个元素
//             arr.pop(); // 回溯，将当前元素从 arr 中移除
//             flags[i] = false; // 将当前元素恢复为未使用
//         }
//     };
//     sArr.sort((a, b) => a - b); // 排序，为了方便去重
//     rec(sArr, []);
//     return result;
// };
const permutation = function (s) {
    if (typeof s !== 'string') return [];
    const flags = new Array(s.length).fill(false); // 辅助数组，用于标记当前位置是否被使用过
    const result = [];
    const rec = (s, res) => {
        if (res.length === s.length) {
            result.push(res); // 长度和 nums 相等说明已经完成了全排列，添加结果
            return; // 递归终止条件
        }
        for (let i = 0; i < s.length; i++) {
            if (flags[i]) continue; // 当前元素已经被使用过了，调过该轮循环
            if (i - 1 >= 0 && s[i] === s[i - 1] && flags[i - 1]) continue; // 去重，如果前一个元素已经被选中，并且与当前元素相同，跳过本次循环
            flags[i] = true; // 将当前元素标记为已使用
            rec(s, res + s[i]); // 递归遍历 nums 添加下一个元素
            flags[i] = false; // 回溯，将当前元素恢复为未使用
        }
    };
    rec(s, '');
    return result;
};
console.log('全排列结果：', permutation('abc')); // 6 个
console.log('全排列结果：', permutation('aab')); // 3 个
console.log('全排列结果：', permutation('suvyls')); // 720 个
console.log('全排列结果：', permutation('abc'));
console.log('全排列结果：', permutation('aab'));
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

/**
 * leetcode 49. 字母异位词分组
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。    字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
    输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]    输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
var groupAnagrams = function (strs) {
    if (!Array.isArray(strs)) return [];
    const map = new Map(); // 用来存放已经遍历过的字符串，key 为排序后的字符串，value 值为符合条件的字符串
    strs.forEach(cur => {
        // 将当前字符串进行排序（按照字符的 ASCII 码值进行排序）作为一组字母异位词的标识 key 值，sort 中可添加 (a, b) => (a > b ? 1 : -1)
        const key = cur.split('').sort().join('');
        const value = map.get(key) || []; // // 获取对应的 value（即已经遍历过的字符串集合），如果没有则初始化为一个空数组
        value.push(cur); // 将当前字符串添加到对应的 value 集合中
        map.set(key, value); // 更新 Map
    });
    return [...map.values()];
};
console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
console.log(groupAnagrams(['abc', 'acb', 'aacb', 'aabc', 'abca']));
/*
 * 14. 最长公共前缀
   编写一个函数来查找字符串数组中的最长公共前缀。    如果不存在公共前缀，返回空字符串 ""。
   输入：strs = ["flower","flow","flight"]    输出："fl"
 */
var longestCommonPrefix = function (strs) {
    if (!Array.isArray(strs) || typeof strs[0] !== 'string') return '';
    let prefix = '';
    const first = strs[0];
    for (let i = 0; i < first.length; i++) {
        prefix += first[i]; // 遍历第一个字符串的所有字符，并从第一个字符开始累加
        // 判断其他字符串是否都以当前前缀开始，如果不是，返回当前前缀去掉最后一个字符作为结果
        if (!strs.every(str => str.startsWith(prefix))) return prefix.slice(0, -1);
    }
    return prefix; // 全都符合时，prefix 等于 first
};
console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
console.log(longestCommonPrefix(['abcabc', 'abcabc', 'abcabc']));
/**
 * 20. 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
 * 输入：s = "()[]{}"   输出：true；输入：s = "(]"  输出：false
 */
var isValid = function (s) {
    if (typeof s !== 'string') return false;
    const opt = {
        ')': '(',
        ']': '[',
        '}': '{',
    }; // 用于映射每一个右括号对应的左括号，减少匹配判断
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        const cur = s[i];
        if (!opt[cur]) {
            stack.push(cur); // 如果 opt[cur] 为空说明 cur 是左括号（(、[、{ ），直接 push 到栈中
        } else {
            if (stack.pop() !== opt[cur]) return false; // 如果栈顶的元素和 left 不同说明不匹配，返回 false
        }
    }
    return stack.length === 0; // 如果栈为空说明正好匹配完，否则说明有剩余左括号，不匹配
};
console.log(isValid('()[]{}'));
console.log(isValid('([{}])'));
console.log(isValid('(]'));
console.log(isValid('{(})()[}]'));
/**
 * 1249. 移除无效的括号
 * 输入：s = "lee(t(c)o)de)"    输出："lee(t(c)o)de"    解释："lee(t(co)de)" , "lee(t(c)ode)" 也是一个可行答案。
 */
var minRemoveToMakeValid = function (s) {
    if (typeof s !== 'string') return '';
    const stack = [];
    const arr = s.split('');
    arr.forEach((cur, index) => {
        if (cur === '(') stack.push(index); // 左括号直接进栈
        if (cur === ')') {
            if (stack.length > 0) {
                stack.pop(); // 栈不为空，匹配一个右括号，出栈一个左括号
            } else {
                delete arr[index]; // 栈为空，则说明右括号是多余的，删除该括号
            }
        }
    });
    stack.forEach(index => delete arr[index]); // 左右括号匹配完成后，删除多余的左括号
    return arr.join('');
};
console.log(minRemoveToMakeValid('lee(t(c)o)de)'));
console.log(minRemoveToMakeValid('a(b((c)d(e)f'));
console.log(minRemoveToMakeValid('())()((('));
/**
 * 678. 有效的括号字符串
 * 给你一个只包含三种字符的字符串，支持的字符类型分别是 '('、')' 和 '*'。请你检验这个字符串是否为有效字符串，如果是有效字符串返回 true 。
    任何左括号 '(' 必须有相应的右括号 ')'。
    任何右括号 ')' 必须有相应的左括号 '(' 。
    左括号 '(' 必须在对应的右括号之前 ')'。
    '*' 可以被视为单个右括号 ')' ，或单个左括号 '(' ，或一个空字符串。
    一个空字符串也被视为有效字符串。
 */
var checkValidString = function (s) {
    if (typeof s !== 'string') return;
    const stack = []; // 用来存放 * 的栈，存放对应的索引
    const leftStack = []; // 用来存放左括号的栈，存放对应的索引
    for (let i = 0; i < s.length; i++) {
        const cur = s[i];
        if (cur === '(') leftStack.push(i); // 如果是左括号，索引直接进栈
        if (cur === '*') stack.push(i); // 如果是 * ，索引直接进栈
        if (cur === ')') {
            if (leftStack.length > 0) {
                leftStack.pop(); // 先匹配左括号
            } else if (stack.length > 0) {
                stack.pop(); // 若果左括号栈为空，用完了，再匹配 *
            } else {
                return false; // 如果两个栈都空了，说明没有对应左括号，返回无效结果
            }
        }
    }
    if (leftStack.length > stack.length) return false; // 如果剩余的左括号比 * （右括号）多，说明无效
    while (leftStack.length > 0) {
        if (leftStack.pop() > stack.pop()) return false; // 如果左括号对应的索引小于 *（右括号），说明无效
    }
    // if ((stack.length - leftStack.length) % 2 !== 0) return false; // 如果剩余的 * 不是 2 的倍数，说明无效
    return true; // 以上条件都满足了，说明有效
};
console.log(checkValidString('()'));
console.log(checkValidString('(())()'));
console.log(checkValidString('(*(*)))'));
console.log(checkValidString('(**(**'));
console.log(checkValidString('(*)'));
console.log(checkValidString('(**('));
console.log(checkValidString('(()))'));
/**
 * 有效的括号字符串
 * * 仅代表（ 或 ）
 */
var checkValidString = function (s) {
    if (typeof s !== 'string') return;
    const stack = []; // 用来存放 * 的栈，存放对应的索引
    const leftStack = []; // 用来存放左括号的栈，存放对应的索引
    for (let i = 0; i < s.length; i++) {
        const cur = s[i];
        if (cur === '(') leftStack.push(i); // 如果是左括号，索引直接进栈
        if (cur === '*') stack.push(i); // 如果是 * ，索引直接进栈
        if (cur === ')') {
            if (leftStack.length > 0) {
                leftStack.pop(); // 先匹配左括号
            } else if (stack.length > 0) {
                stack.pop(); // 若果左括号栈为空，用完了，再匹配 *
            } else {
                return false; // 如果两个栈都空了，说明没有对应左括号，返回无效结果
            }
        }
    }
    if (leftStack.length > stack.length) return false; // 如果剩余的左括号比 * （右括号）多，说明无效
    while (leftStack.length > 0) {
        if (leftStack.pop() > stack.pop()) return false; // 如果左括号对应的索引小于 *（右括号），说明无效
    }
    if ((stack.length - leftStack.length) % 2 !== 0) return false; // 如果剩余的 * 不是 2 的倍数，说明无效
    return true; // 以上条件都满足了，说明有效
};
console.log(checkValidString('()'));
console.log(checkValidString('(())()'));
console.log(checkValidString('(*))'));
console.log(checkValidString('(**('));
console.log(checkValidString('(**(**'));
console.log(checkValidString('(*)'));
console.log(checkValidString('(()))'));
/**
 * 151. 反转字符串中的单词
 * 输入：s = "the sky is blue"  输出："blue is sky the"
 */
var reverseWords = function (s) {
    if (typeof s !== 'string') return;
    if (typeof s !== 'string' || !s) return s;
    // return s.match(/(\S)+/g).reverse().join(' ');
    const arr = s.split(' '); // 使用 split 空格进行分割，就算有多个空格，join 的时候也能和之前保持一致
    let left = 0; //交换左右位置进行反转
    let right = arr.length - 1;
    while (right > left) {
        const temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    return arr.join(' ');
};
console.log(reverseWords('the sky is    blue'));
/**
 * 557. 反转字符串中的单词 III
 * 给定一个字符串 s ，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 */
var reverseWords = function (s) {
    if (typeof s !== 'string') return s;
    return s
        .split(' ') // 使用 split 空格进行分割，就算有多个空格，join 的时候也能和之前保持一致
        .map(cur => cur.split('').reverse().join(''))
        .join(' ');
};
// var reverseWords = function (s) {
//     if (typeof s !== 'string') return s;
//     return s
//         .split(' ') // 使用 split 空格进行分割，就算有多个空格，join 的时候也能和之前保持一致
//         .map(cur => {
//             const strs = cur.split('');
//             let start = 0;
//             let end = strs.length - 1;
//             while (start < end) {
//                 const temp = strs[start];
//                 strs[start] = strs[end];
//                 strs[end] = temp;
//                 start++;
//                 end--;
//             }
//             return strs.join('');
//         })
//         .join(' ');
// };
// var reverseWords = function (s) {
//     let arr = s.split('');
//     let l = 0,
//         r = l; // 双指针
//     while (l < arr.length) {
//         while (arr[r] && arr[r] !== ' ') {
//             r++; // 找到结尾的空格
//         }
//         for (let i = l, j = r - 1; i < j; i++, j--) {
//             [arr[i], arr[j]] = [arr[j], arr[i]]; //反转单词
//         }
//         l = r + 1; // 跳到下一个单词
//         r = l;
//     }
//     return arr.join('');
// };
console.log(reverseWords("Let's take LeetCode    contest"));
/**
 * 字符串反转 翻转
 */
function reverse(str) {
    if (typeof str !== 'string') return str;
    return str.split('').reverse().join('');
}
// 方法二：交换位置
function reverse2(str) {
    if (typeof str !== 'string') return str;
    const strs = str.split('');
    let start = 0;
    let end = strs.length - 1;
    while (start < end) {
        const val = strs[end];
        strs[end] = strs[start];
        strs[start] = val;
        start++;
        end--;
    }
    return strs.join('');
}
/**
 * 647. 回文子串
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
 * 回文字符串 是正着读和倒过来读一样的字符串。
 * 子字符串 是字符串中的由连续字符组成的一个序列。
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 *
 * 扩展：返回最长的回文子串
 */
var countSubstrings = function (s) {
    // 先使用双指针 i 和 j 枚举所有子串的起点和终点，同时分别按顺序和逆序累加所有遍历过的字符得到字符串 s1 和 s2，判断是否回文只需对 s1 和 s2 判等即可
    if (typeof s !== 'string') return;
    let count = 0; // 用于记录回文子串的数量
    for (let i = 0; i < s.length; i++) {
        let s1 = ''; // s1 用于临时存储从当前位置开始的子串
        let s2 = ''; // s2 用于存储反向的子串
        for (let j = i; j < s.length; j++) {
            s1 += s[j]; // 将当前位置的字符追加加到 s1 中，构成一个向右的子串
            s2 = s[j] + s2; // 将当前位置的字符添加到 s2 的开头，构成一个反向的子串
            // const str = s.slice(i, j + 1); // 获取所有子串，从 i 到 j
            // if (str === str.split('').reverse().join('')) count++;
            if (s1 === s2) count++; // 如果 s1 和 s2 相等，说明找到了一个回文子串
        }
    }
    return count;
};
// var countSubstrings = function (s) {
//     if (typeof s !== 'string') return -1;
//     let count = 0;
//     for (let i = 0; i < s.length; i++) {
//         for (let j = i; j < s.length; j++) {
//             const str = s.slice(i, j + 1); // 获取所有子串，从 i 到 j
//             if (str === str.split('').reverse().join('')) count++;
//         }
//     }
//     return count;
// };
console.log(countSubstrings('abc'));
console.log(countSubstrings('aaa'));
console.log(countSubstrings('aaabc'));
console.log(countSubstrings('abacbc'));
console.log(countSubstrings('aabaa'));
/**
 * 5. 最长回文子串
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
 * 扩展：返回最长的回文子串
 */
var longestPalindrome = function (s) {
    // 先使用双指针 i 和 j 枚举所有子串的起点和终点，同时分别按顺序和逆序累加所有遍历过的字符得到字符串 s1 和 s2，判断是否回文只需对 s1 和 s2 判等即可
    if (typeof s !== 'string') return;
    let max = ''; // 最大回文子串
    for (let i = 0; i < s.length; i++) {
        let s1 = ''; // s1 用于临时存储从当前位置开始的子串
        let s2 = ''; // s2 用于存储反向的子串
        for (let j = i; j < s.length; j++) {
            s1 += s[j]; // 将当前位置的字符追加加到 s1 中，构成一个向右的子串
            s2 = s[j] + s2; // 将当前位置的字符添加到 s2 的开头，构成一个反向的子串
            if (s1 === s2 && s1.length > max.length) max = s1; // 如果 s1 和 s2 相等，说明找到了一个回文子串
        }
    }
    return max;
};
console.log(longestPalindrome('abc'));
console.log(longestPalindrome('aaa'));
console.log(longestPalindrome('aaabc'));
console.log(longestPalindrome('abacbc'));
console.log(longestPalindrome('aabaa'));

/**
 * 516. 最长回文子序列
 * 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。    子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 */
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    const dp = new Array(n).fill(0).map(() => new Array(n).fill(0)); // 这个数组用于存储最长回文子序列的长度
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1; // 对于单个字符的子串，其长度就是 1，因此将 dp[i][i] 设置为 1
        const c1 = s[i];
        for (let j = i + 1; j < n; j++) {
            const c2 = s[j]; // 对于一个子序列而言，如果它是回文子序列，并且长度大于 2，那么将它首尾的两个字符去除之后，它仍然是个回文子序列。因此可以用动态规划的方法计算给定字符串的最长回文子序列。
            if (c1 === c2) {
                dp[i][j] = dp[i + 1][j - 1] + 2; // 如果 s[i]=s[j]s[i] = s[j]s[i]=s[j]，则首先得到 sss 的下标范围 [i+1,j−1][i+1, j-1][i+1,j−1] 内的最长回文子序列，然后在该子序列的首尾分别添加 s[i]s[i]s[i] 和 s[j]s[j]s[j]，即可得到 sss 的下标范围 [i,j][i, j][i,j] 内的最长回文子序列，因此 dp[i][j]=dp[i+1][j−1]+2\textit{dp}[i][j] = \textit{dp}[i+1][j-1] + 2dp[i][j]=dp[i+1][j−1]+2；
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]); // 如果 s[i]≠s[j]s[i] \ne s[j]s[i]=s[j]，则 s[i]s[i]s[i] 和 s[j]s[j]s[j] 不可能同时作为同一个回文子序列的首尾，因此 dp[i][j]=max⁡(dp[i+1][j],dp[i][j−1])\textit{dp}[i][j] = \max(\textit{dp}[i+1][j], \textit{dp}[i][j-1])dp[i][j]=max(dp[i+1][j],dp[i][j−1])。
            }
        }
    }
    return dp[0][n - 1]; // 由于状态转移方程都是从长度较短的子序列向长度较长的子序列转移，因此需要注意动态规划的循环顺序。
};
// var longestPalindrome = function (s) {
//     let max = '';
//     for (let i = 0; i < s.length; i++) {
//         // 分奇偶， 一次遍历，每个字符位置都可能存在奇数或偶数回文
//         helper(i, i);
//         helper(i, i + 1);
//     }
//     function helper(l, r) {
//         // 定义左右双指针
//         while (l >= 0 && r < s.length && s[l] === s[r]) {
//             l--;
//             r++;
//         }
//         // 拿到回文字符， 注意 上面while满足条件后多执行了一次，所以需要l+1, r+1-1
//         const maxStr = s.slice(l + 1, r + 1 - 1);
//         // 取最大长度的回文字符
//         if (maxStr.length > max.length) max = maxStr;
//     }
//     return max;
// };
/**
 * 53. 最大子数组和
 * 求数组最大和的子数组
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 */
var maxSubArray = function (nums) {
    if (!Array.isArray(nums)) return;
    let sum = nums[0]; // 用于记录当前子序和
    let max = sum; // 用于记录最大子序和
    for (let i = 1; i < nums.length; i++) {
        const cur = nums[i]; // 获取当前元素
        if (cur + sum < cur) {
            sum = cur; // 如果当前元素加上当前子序和小于当前元素，则舍掉之前的的子序和
        } else {
            sum += cur; // 否则将当前元素加到当前子序和上
        }
        if (sum > max) {
            max = sum; // 如果当前子序和大于最大子序和，更新最大值
        }
    }
    return max; //返回最大子序和F
};
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([5, 4, -1, 7, 8]));
console.log(maxSubArray([1, 2, 3, -1, 1]));
/**
 * 返回最大子序
 */
var maxSubArray = function (nums) {
    if (!Array.isArray(nums)) return;
    let sum = nums[0]; // 用于记录当前子序和
    let max = sum; // 用于记录最大子序和
    let start = 0;
    let end = 1;
    for (let i = 1; i < nums.length; i++) {
        const cur = nums[i]; // 获取当前元素
        if (cur + sum < cur) {
            sum = cur; // 如果当前元素加上当前子序和小于当前元素，则舍掉之前的的子序和
            start = i; // 更新起始索引
        } else {
            sum += cur; // 否则将当前元素加到当前子序和上
        }
        if (sum > max) {
            max = sum; // 如果当前子序和大于最大子序和，更新最大值
            end = i; // 更新结束索引
        }
    }
    return nums.slice(start, end + 1); //返回最大子序
};
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
console.log(maxSubArray([5, 4, -1, 7, 8]));
console.log(maxSubArray([1, 2, 3, -1, 1]));
/**
 * 56. 合并区间
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]    输出：[[1,6],[8,10],[15,18]]    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */
var merge = function (intervals) {
    if (!Array.isArray(intervals)) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]]; // 将第一个区间作为初始区间
    intervals.forEach(cur => {
        const last = result[result.length - 1];
        if (cur[0] > last[1]) {
            result.push(cur); // 如果当前区间的左端点大于上一个区间的右端点，则新加当前区间
        } else {
            last[1] = Math.max(last[1], cur[1]); // 否则更新上一个区间的右端点，注意要使用最大的值
        }
    });
    return result;
};
console.log(
    'merge',
    merge([
        [1, 3],
        [2, 6],
        [8, 12],
        [15, 18],
    ]),
);
console.log(
    merge([
        [1, 4],
        [2, 10],
        [8, 12],
        [15, 18],
    ]),
);
console.log(
    merge([
        [1, 12],
        [2, 6],
        [8, 10],
        [15, 18],
    ]),
);
/**
 * 162. 寻找峰值
 * 峰值元素是指其值严格大于左右相邻值的元素。
    给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
 */
var findPeakElement = function (nums) {
    if (!Array.isArray(nums)) return;
    let maxIndex = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > nums[maxIndex]) maxIndex = i;
    }
    return maxIndex;
};
console.log(findPeakElement([1, 2, 3, 1]));
console.log(findPeakElement([1, 2, 1, 3, 5, 6, 4]));
// 字符串表达式求值
// function calcExpression(str) {
//     const tempArr = str.split(' ');
//     const task = [];

//     tempArr.forEach(val => {
//         if (val === ')') {
//             const lastIndex = task.lastIndexOf('(');
//             const lastArr = task.slice(lastIndex);
//             lastArr.shift();
//             let lastRes = 0;
//             while (lastArr.length > 0) {
//                 const first = lastArr.shift();
//                 console.log('first', first);

//                 if (first === '-') {
//                     lastRes = lastRes - Number(lastArr.shift());
//                 } else if (first === '+') {
//                     lastRes = lastRes + Number(lastArr.shift());
//                 } else {
//                     lastRes = Number(first);
//                 }
//             }

//             console.log('lastArr', lastArr, lastRes);
//         } else {
//             task.push(val);
//         }
//     });
// }
// console.log(calcExpression('5 + 4 - ( 3 + ( 2 - 1 + 2) )'));
// console.log(calcExpression('5 + 4 - ( 3 + ( 2 - 1 ) )'));

// function calcExpression(str) {
//     // return new Function('return (' + str + ')')
// }
// console.log(calcExpression('5 + 4 - ( 3 + ( 2 - 1 ) )'));

/**
 * 224. 基本计算器
 * 字符串表达式求值，输入一个字符串只包含加减号和括号
 */
// function calcExpression(str) {
//     if (typeof str !== 'string') return str;
//     str = str.replace(/\s/g, '');
//     let stack = [];
//     const getNum = arr => {
//         let val = arr.shift();
//         if (isNaN(val)) return val;
//         while (!isNaN(arr[0])) {
//             val += arr.shift();
//         }
//         return Number(val) || 0;
//     };
//     const calc = arr => {
//         let res = 0; // 计算结果，该数组中不包含括号
//         while (arr.length > 0) {
//             let first = getNum(arr);
//             if (first === '+') {
//                 res += getNum(arr);
//             } else if (first === '-') {
//                 res -= getNum(arr);
//             } else {
//                 res += first;
//             }
//         }
//         return res;
//     };
//     for (let i = 0; i < str.length; i++) {
//         const cur = str[i];
//         if (cur === ')') {
//             const firstIndex = stack.lastIndexOf('('); // 获取最后一个左括号的索引
//             const res = calc(stack.slice(firstIndex + 1)); // 计算括号内的结果
//             stack = stack.slice(0, firstIndex).concat(res); // 将括号内的结果替换掉括号
//         } else {
//             stack.push(cur); // 如果不是右括号，直接进栈，遇到左括号会进行计算，展开，去除括号
//         }
//     }
//     return calc(stack);
// }
/**
 * 224. 基本计算器
 * 字符串表达式求值，输入一个字符串只包含加减号和括号
 */
var calculate = function (str) {
    if (typeof str !== 'string') return str;
    str = str.replace(/\s/g, '');
    let stack = [];
    const calc = arr => {
        console.log(arr);
        let res = 0;
        let curVal = arr.shift(); // 第一位无论是运算符还是数字，都无所谓，因为会把运算符当成符号位添加到数字前边
        while (arr.length > 0) {
            const first = arr.shift();
            if (isNaN(first)) {
                res += Number(curVal); // 遇到下一个运算符，计算结果
                curVal = first; // 重置下一个数组的符号位
            } else {
                if (first < 0) {
                    curVal = curVal === '-' ? Math.abs(first) : first; // 如果当前值为负数，前一位肯定是运算符，修复当前值的运算符，负负得正
                } else {
                    curVal += first; // 拼接成完整的数字（直接和运算符进行拼接）
                }
            }
        }
        return (res += Number(curVal));
    };
    for (let i = 0; i < str.length; i++) {
        const cur = str[i];
        if (cur === ')') {
            const firstIndex = stack.lastIndexOf('('); // 获取最后一个左括号的索引
            let res = calc(stack.slice(firstIndex + 1)); // 计算括号内的结果
            stack = stack.slice(0, firstIndex).concat(String(res)); // 将括号内的结果替换掉括号
        } else {
            stack.push(cur); // 如果不是右括号，直接进栈，遇到左括号会进行计算，展开，去除括号
        }
    }
    return calc(stack);
};
// function calcExpression(str) {
//     if (typeof str !== 'string') return str;
//     str = str.replace(/\s/g, '');
//     let stack = [];
//     const calc = arr => {
//         let res = 0;
//         let curVal = arr.shift(); // 第一位无论是运算符还是数字，都无所谓，因为会把运算符当成符号位添加到数字前边
//         while (arr.length > 0) {
//             const first = arr.shift();
//             if (isNaN(first)) {
//                 res += Number(curVal);
//                 curVal = first;
//             } else {
//                 if (first < 0) {
//                     curVal = curVal === '-' ? Math.abs(first) : first; // 如果当前值为负数，前一位肯定是运算符，修复当前值的运算符，负负得正
//                 } else {
//                     curVal += first; // 拼接成完成的数字（直接和运算符进行拼接）
//                 }
//             }
//         }
//         return (res += Number(curVal));
//     };
//     for (let i = 0; i < str.length; i++) {
//         const cur = str[i];
//         if (cur === ')') {
//             const firstIndex = stack.lastIndexOf('('); // 获取最后一个左括号的索引
//             let res = calc(stack.slice(firstIndex + 1)); // 计算括号内的结果
//             stack = stack.slice(0, firstIndex).concat(String(res)); // 将括号内的结果替换掉括号
//         } else {
//             stack.push(cur); // 如果不是右括号，直接进栈，遇到左括号会进行计算，展开，去除括号
//         }
//     }
//     return calc(stack);
// }
// function calcExpression(str) {
//     if (typeof str !== 'string') return str;
//     str = str.replace(/\s/g, '');
//     let stack = [];
//     const calc = arr => {
//         let res = 0;
//         let curVal = arr.shift();
//         while (arr.length > 0) {
//             if (isNaN(arr[0])) {
//                 res += Number(curVal);
//                 curVal = arr.shift();
//             } else {
//                 const val = arr.shift(); // 如果 val 带符号，则需要进行判断，得到最终的符号
//                 curVal += val;
//             }
//         }
//         return (res += Number(curVal));
//     };
//     for (let i = 0; i < str.length; i++) {
//         const cur = str[i];
//         if (cur === ')') {
//             const firstIndex = stack.lastIndexOf('('); // 获取最后一个左括号的索引
//             let res = calc(stack.slice(firstIndex + 1)); // 计算括号内的结果
//             stack = stack.slice(0, firstIndex); // 将括号内的结果替换掉括号
//             if (res < 0) {
//                 let lastSign = stack.pop() === '-' ? '+' : '-'; // 如果 res 是负数，则需要修正 stack 中最后的运算符，负负得正
//                 stack.push(lastSign, String(Math.abs(res))); // 去除 res 的符号，把修正后的 运算符 和 res 添加进去
//             } else {
//                 stack.push(String(res)); // 如果 res 无符号，直接添加进去
//             }
//         } else {
//             stack.push(cur); // 如果不是右括号，直接进栈，遇到左括号会进行计算，展开，去除括号
//         }
//     }
//     return calc(stack);
// }
// function calcExpression(str) {
//     if (typeof str !== 'string') return str;
//     str = str.replace(/\s/g, '');
//     let stack = [];

//     const calc = arr => {
//         let res = 0;
//         let flag = 1;
//         let curVal = arr.shift();
//         while (arr.length > 0) {
//             if (isNaN(arr[0])) {
//                 res += Number(curVal);
//                 curVal = arr.shift();
//             } else {
//                 const val = arr.shift(); // 如果 val 带符号，则需要进行判断，得到最终的符号
//                 // const first = String(val)[0];
//                 // if (isNaN(first)) {
//                 //     if (curVal === '-' && first === '-') {
//                 //         curVal = String(-val);
//                 //     } else {
//                 //         curVal = val; // curVal 为 + 时，可以省略
//                 //     }
//                 // } else {
//                 //     curVal += val;
//                 // }
//                 curVal += val;
//             }
//         }
//         return (res += Number(curVal));
//     };
//     for (let i = 0; i < str.length; i++) {
//         const cur = str[i];
//         if (cur === ')') {
//             const firstIndex = stack.lastIndexOf('('); // 获取最后一个左括号的索引
//             const res = calc(stack.slice(firstIndex + 1)); // 计算括号内的结果
//             stack = stack.slice(0, firstIndex); // 将括号内的结果替换掉括号
//             if (isNaN(String(res[0]))) {
//                 const last = stack.pop();
//                 let resStr = String(res);
//                 if (last === '-') {
//                     resStr = String(-res);
//                 }
//                 if (isNaN(resStr[0])) {
//                     stack.push(resStr[0], resStr.slice(1));
//                 } else {
//                     stack.push('+', resStr);
//                 }
//             }
//             // stack = stack.slice(0, firstIndex).concat(res); // 将括号内的结果替换掉括号
//         } else {
//             stack.push(cur); // 如果不是右括号，直接进栈，遇到左括号会进行计算，展开，去除括号
//         }
//     }
//     return calc(stack);
// }
var strn1 = '1+1+(4-(3+1))+ 6';
console.log(calcExpression(strn1)); // 8
console.log(calcExpression(strn1) === eval(strn1));

var strn = '(105  -400 - ( 3 + ( 22 - (-1+ 22) -(10+1) )))';
console.log(calcExpression(strn)); // -288
console.log(calcExpression(strn) === eval(strn));

console.log(calcExpression('-2+ 1')); // -1
console.log(calcExpression('- (3 + (4 + 5))')); // -12
console.log(calcExpression('-(3+4)+5')); // -2

var strn1 = '1+1+(4-(3+1))+6';
console.log(calcExpression('2147483647')); // 2147483647
console.log(calcExpression(strn1) === eval(strn1));
// /**
//  * leetcode 官方解法
//  */
// var calculate = function (s) {
//     // 创建一个数组ops，用于存储操作符，初始化为[1]
//     const ops = [1];
//     // 创建一个变量sign，用于存储当前的符号，初始化为1
//     let sign = 1;

//     // 创建一个变量ret，用于存储结果，初始化为0
//     let ret = 0;
//     // 获取字符串s的长度
//     const n = s.length;
//     // 创建一个变量i，用于遍历字符串s，初始化为0
//     let i = 0;
//     // 使用while循环遍历字符串s
//     while (i < n) {
//         // 如果当前字符是空格，则跳过
//         if (s[i] === ' ') {
//             i++;
//             // 如果当前字符是加号，则将sign设置为ops数组的最后一个元素
//         } else if (s[i] === '+') {
//             sign = ops[ops.length - 1];
//             i++;
//             // 如果当前字符是减号，则将sign设置为ops数组的最后一个元素的负数
//         } else if (s[i] === '-') {
//             sign = -ops[ops.length - 1];
//             i++;
//             // 如果当前字符是左括号，则将sign添加到ops数组的末尾
//         } else if (s[i] === '(') {
//             ops.push(sign);
//             i++;
//             // 如果当前字符是右括号，则从ops数组中移除最后一个元素
//         } else if (s[i] === ')') {
//             ops.pop();
//             i++;
//             // 如果当前字符是数字
//         } else {
//             // 创建一个变量num，用于存储当前的数字，初始化为0
//             let num = 0;
//             // 使用while循环获取完整的数字
//             while (i < n && !isNaN(Number(s[i])) && s[i] !== ' ') {
//                 // 将当前字符转换为数字，并添加到num上，或者直接 Number() 转换也行
//                 num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt();
//                 i++;
//             }
//             // 将num乘以sign，并添加到ret上
//             ret += sign * num;
//         }
//     }
//     // 返回结果
//     return ret;
// };
/**
 * 适用于部分场景，不满足 '-(3+4)+5' 这种情况，会计算错误
 */
// function calcExpression(str) {
//     if (typeof str !== 'string') return str;
//     str = str.replace(/\s/g, '');
//     console.log(str);
//     const calcMap = {
//         '+': (v1, v2) => Number(v1) + Number(v2),
//         '-': (v1, v2) => Number(v1) - Number(v2),
//     };
//     const calc = () => {
//         const ope = opeStack.pop();
//         console.log('calc ope ', ope);
//         if (!ope) return;
//         if (stack.length < 2) return opeStack.push(ope);
//         const right = stack.pop();
//         const left = stack.pop();
//         const res = calcMap[ope](left, right);
//         stack.push(res);
//     };
//     const stack = [];
//     const opeStack = [];
//     let result = 0;
//     for (let i = 0; i < str.length; i++) {
//         const cur = str[i];
//         if (cur === '+' || cur === '-') {
//             if (!/[0-9)]/.test(str[i - 1]) && /\d/.test(str[i + 1])) {
//                 stack.push(cur);
//             } else {
//                 calc();
//                 opeStack.push(cur);
//             }
//         } else if (cur === ')') {
//             calc();
//         } else if (cur === '(') {
//             opeStack.push('');
//         } else {
//             if (i > 0 && (/\d/.test(str[i - 1]) || !/\d/.test(stack[stack.length - 1]))) {
//                 const val = stack.pop() || '';
//                 stack.push(val + cur);
//             } else {
//                 stack.push(cur);
//             }
//         }
//         console.log('cur', i, cur, opeStack, stack);
//     }
//     if (opeStack > 0 && stack.length < 2) {
//         stack.unshift(0);
//     }

//     calc();
//     const ope = opeStack.pop();
//     return ope ? ope + stack[0] : stack[0];
// }
/**
 * 227. 基本计算器 II
 * 表达式求，输入一个字符串，只包含加减乘除，先不考虑括号，然后输出就是这个表达式的结果
 */
var calculate = function (str) {
    if (typeof str !== 'string') return str;
    str = str.replace(/\s/g, '');
    const stack = [];
    let i = 0;
    while (i < str.length) {
        let cur = str[i];
        if (cur === '*') {
            const left = stack.pop(); // 从栈顶弹出一个数字，作为左操作数
            let right = str[++i]; // 获取下一个字符，作为右操作数
            while (!isNaN(str[i + 1])) {
                right += str[++i]; // 如果下一个字符是数字，循环累加，获取完整的操作数
            }
            stack.push(left * right); // 计算乘法结果
        } else if (cur === '/') {
            const left = stack.pop();
            let right = str[++i];
            while (!isNaN(str[i + 1])) {
                right += str[++i]; // 如果下一个字符是数字，循环累加，获取完整的操作数
            }
            stack.push(left / right); // 计算除法结果
        } else {
            while (!isNaN(cur) && !isNaN(str[i + 1])) {
                cur += str[++i]; // 如果当前值是数字，并且下一个字符也是数字，则循环累加
            }
            stack.push(cur); // 把当前值加入到栈中，包含 +、-、和计算后的值
        }
        i++; // 增加 i 的值，指向下一个字符
    }
    let result = 0; // 计算结果
    let curVal = stack.shift(); // 下一个值，第一位无论是运算符还是数字，都无所谓，因为会把运算符当成符号位添加到数字前边
    while (stack.length > 0) {
        const first = stack.shift();
        if (isNaN(first)) {
            result += Number(curVal); // 如果当前值的下一个值是符号，则进行计算，累加到结果中
            curVal = first; // 重置下一个数组的符号位
        } else {
            curVal += first; // 多位数时，累加之后的数字，获取完整的多位数，包运算符
        }
    }
    result += Number(curVal); // 注意：要把最后的值加上
    return result;
};
// var str2 = '15-2*3+4/2'; // 1
// var str2 = ' 3/2 '; // 1.5
// var str2 = ' 42 '; // 1.5
var str2 = ' 14/3-2 '; // 1.5
console.log(calcExpression2(str2));
console.log(' eval(str2)', eval(str2));
console.log(calcExpression2(str2) === eval(str2));
/**
 * 227. 基本计算器 II
 * 表达式求，输入一个字符串，只包含加减乘除，先不考虑括号，然后输出就是这个表达式的结果
 */
var calculate = function (str) {
    str = str.replace(/\s/g, '');
    const opt = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };
    const stask = [];
    const opeStask = [];
    const calc = () => {
        const r = stask.pop();
        const l = stask.pop();
        const ope = opeStask.pop();
        switch (ope) {
            case '+':
                stask.push(l + r);
                break;
            case '-':
                stask.push(l - r);
                break;
            case '*':
                stask.push(l * r);
                break;
            case '/':
                stask.push(l / r);
                break;
        }
    };
    let i = 0;
    while (i < str.length) {
        const cur = str[i];
        if (!isNaN(parseInt(cur))) {
            let num = '';
            while (i < str.length && !isNaN(parseInt(str[i]))) {
                num += str[i];
                i++;
            }
            stask.push(parseInt(num));
            continue;
        }
        if (opt[cur]) {
            while (stask.length > 0 && opt[opeStask[opeStask.length - 1]] >= opt[cur]) {
                calc(); // 当stask数组中的元素数量大于0且opeStask数组中的最后一个元素优先级大于等于当前运算符cur时，即进行计算
            }
            opeStask.push(cur);
        }
        i++;
    }
    while (opeStask.length > 0) {
        calc();
    }
    return stask[0];
};
var str2 = '5-2*3+4/2';
console.log(calcExpression2(str2));
console.log(calcExpression2(str2) === eval(str2));
// function calcExpression2(str) {
//     const tempArr = str.split('').filter(val => val.trim());
//     const task = [];
//     while (tempArr.length > 0) {
//         const first = tempArr.shift();
//         if (first === '*') {
//             const left = task.pop();
//             const right = tempArr.shift();
//             const lastRes = left * right;
//             if (!isNaN(lastRes)) {
//                 task.push(lastRes);
//             }
//         } else if (first === '/') {
//             const left = task.pop();
//             const right = tempArr.shift();
//             const lastRes = left / right;
//             if (!isNaN(lastRes)) {
//                 task.push(lastRes);
//             }
//         } else {
//             task.push(first);
//         }
//     }
//     console.log('task', task);
//     console.log('tempArr', tempArr);

//     let res = 0;
//     while (task.length > 0) {
//         const first = task.shift();
//         if (first === '-') {
//             res = res - Number(task.shift());
//         } else if (first === '+') {
//             res = res + Number(task.shift());
//         } else {
//             res = Number(first);
//         }
//     }
//     return res;
// }
console.log(calcExpression2('5-2*3+4/8'));
// var strn = '105  -400 - ( 3 + ( 22 - (-1+ 22) -(10+1) ))'
var strn = '3+ 4-2*5';
console.log(calcExpression2(strn));
console.log(calcExpression2(strn) === eval(strn));
/**
 * 150. 逆波兰表达式求值    给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式。
 * 输入：tokens = ["2","1","+","3","*"]     输出：9     解释：该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
 */
var evalRPN = function (tokens) {
    var strategy = {
        '+': function (left, right) {
            return left + right;
        },
        '-': function (left, right) {
            return left - right;
        },
        '*': function (left, right) {
            return left * right;
        },
        '/': function (left, right) {
            return (left / right) | 0;
        },
    };
    var stack = [],
        i = 0,
        left,
        right,
        item,
        len = tokens.length;
    while (i < len) {
        item = tokens[i];
        if (/\d+/.test(item)) {
            stack.push(item);
        } else {
            right = stack.pop() | 0;
            left = stack.pop() | 0;
            stack.push(strategy[item](left, right));
        }
        i++;
    }
    return stack[0];
};
/**
 * 442. 数组中重复的数据    找到所有出现两次的元素
 * 10、找到所有出现两次的元素。你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？(限时5分钟)
 */
const appearTwice = function (nums) {
    if (!Array.isArray(nums)) return [];
    const result = [];
    const map = new Map();
    nums.forEach(cur => {
        map.set(cur, (map.get(cur) || 0) + 1);
    });
    map.forEach((val, key) => {
        if (val === 2) result.push(key);
    });
    return result;
};
// [4,3,2,7,8,2,3,1]
// 当i = 1时，此时n=3，把nums[3-1] *= -1 变成负数，结果 [4,3,-2,7,8,2,3,1]
// 当i = 6时，此时n=3，发现nums[3-1]这个位置已经为负数说明之前已经被改过，也就是n=3这个数字出现过，就把3数字添加到arr里
// 这里i=1改的是nums[2], i=6改的也是nums[2]，这里nums[2]只是用来记录状态
var findDuplicates = function (nums) {
    let arr = [];
    for (let i = 0; i < nums.length; i++) {
        let n = Math.abs(nums[i]);
        if (nums[n - 1] < 0) {
            arr.push(n);
        } else {
            nums[n - 1] *= -1;
        }
    }
    return arr;
};
const nums = [4, 3, 2, 7, 8, 2, 3, 1, 1, 1];
console.log(appearTwice(nums));
// /**
//  * 442. 数组中重复的数据    找到所有出现两次的元素
//  * 10、找到所有出现两次的元素。你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？(限时5分钟)
//  */

// const appearTwice = function (nums) {
//     const result = [];
//     for (let i = 0; i < nums.length; i++) {
//         const cur = nums[i];
//         if (nums[cur - 1] !== nums[i]) {
//             const temp = nums[i]; // 如果当前值与索引不对应，把每一项交换到对应的索引位置
//             nums[i] = nums[cur - 1];
//             nums[cur - 1] = temp;
//             i--; // 交换完后再回退一步，从当前位置开始，看交换后的是否满足
//         }
//     }
//     for (let i = 0; i < nums.length; i++) {
//         if (nums[i] - 1 !== i) {
//             result.push(nums[i]);
//         }
//     }
//     return result;
// };
// // const appearTwice = function (nums) {
// //     const result = [];
// //     nums.sort((a, b) => a - b);
// //     console.log(nums);
// //     for (let i = 0; i < nums.length; i++) {
// //         if (nums[i] === nums[i - 1]) {
// //             result.push(nums[i]);
// //         }
// //     }
// //     return result;
// // };
// const nums = [4, 3, 2, 7, 8, 2, 3, 1];
// console.log(appearTwice(nums));
/**
 * 459. 重复的子字符串
 * 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。
 */
var repeatedSubstringPattern = function (s) {
    let cur = '';
    const len = Math.floor(s.length / 2);
    for (let i = 0; i < len; i++) {
        cur += s[i]; // 子串必须是倍数关系，如果使用子串分割出来的数组为空，说明满足条件
        // if (s.length % cur.length === 0 && !s.split(cur).join('')) return true;
        if (cur.repeat(Math.floor(s.length / cur.length)) == s) return true;
    }
    return false;
};
// console.log(repeatedSubstringPattern('aba'));
// console.log(repeatedSubstringPattern('abcabcabcabc'));
console.log(repeatedSubstringPattern('abfcagfbcabcfgjabc'));
/**
 * 22. 括号生成 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 输入：n = 3      输出：["((()))","(()())","(())()","()(())","()()()"]
 */
var generateParenthesis = function (n) {
    const result = [];
    const gen = (l, r, res) => {
        if (res.length === 2 * n) {
            result.push(res); // 将满足条件的字符串加入结果
            return; // 结束当前递归（结束当前搜索分支，剪枝）
        }
        if (l < n) {
            gen(l + 1, r, res + '('); // 已添加左括号的数量，小于 n 时，添加左括号，r 增加 1 进入下一轮递归
        }
        if (r < l && r < n) {
            gen(l, r + 1, res + ')'); // 已添加右括号的数量小于左括号的数量，才能添加右括号
        }
    };
    gen(0, 0, ''); // 开始递归生成，初始值为 0
    return result;
};
console.log(generateParenthesis(3));
/**
 * 111. 二叉树的最小深度
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    if (!root) return 0;
    const { left, right } = root;
    if (!left) return minDepth(right) + 1;
    if (!right) return minDepth(left) + 1;
    return Math.min(minDepth(left), minDepth(right)) + 1;
};
/**
 * 104. 二叉树的最大深度
 */
var maxDepth = function (root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
/**
 * 704. 二分查找，如果目标值存在返回下标，否则返回 -1
 */
function binarySearch(nums, target) {
    if (!Array.isArray(nums)) return -1;
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
        const mid = ((left + right) / 2) >>> 0;
        // const mid = Math.floor((right - left) / 2 + left); // 防止left, right过大相加导致数值溢出
        if (target < nums[mid]) {
            right = mid - 1;
        } else if (target > nums[mid]) {
            left = mid + 1;
        } else {
            return mid;
        }
    }
    return -1;
}
console.log(binarySearch([-1, 0, 3, 5, 9, 12], 9)); // 4
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
console.log('二分查找：', binarySearch(nums, 16));
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
// 贪心 + 二分
var lengthOfLIS = function (nums) {
    if (!Array.isArray(nums)) return [];
    const result = [nums[0]]; // 存放最长上升子序列数组
    const find = (nums, target) => {
        let left = 0;
        let right = nums.length - 1;
        while (left <= right) {
            const mid = Math.floor((right - left) / 2 + left);
            if (target < nums[mid]) {
                right = mid - 1;
            } else if (target > nums[mid]) {
                left = mid + 1;
            } else {
                return mid;
            }
        }
        return left; // 返回目标值的左边界值
    };
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        if (cur > result[result.length - 1]) {
            result.push(cur); // 比 result 中的最后一个大时，直接添加进去
        } else {
            const index = find(result, cur);
            result[index] = cur; // 否则进行二分查找，更新到对应位置
        }
    } // 考虑一个简单的贪心，如果我们要使上升子序列尽可能的长，则我们需要让序列上升得尽可能慢，因此我们希望每次在上升子序列最后加上的那个数尽可能的小。
    return result.length;
};
// 动态规划
var lengthOfLIS = function (nums) {
    if (!Array.isArray(nums)) return [];
    const dp = new Array(nums.length).fill(1); // 最小应该是 1，只有当前值的情况
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1); // 如果 i 位置的值比 j 位置大，dp[i] = dp[j] + 1
            }
        }
    }
    return Math.max(...dp);
};
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
/**
 * 674. 最长连续递增序列
 * 输入：nums = [1,3,5,4,7]     输出：3     解释：最长连续递增序列是 [1,3,5], 长度为3。
 */
var findLengthOfLCIS = function (nums) {
    if (nums.length < 2) return nums;
    let left = 0; // 滑动窗口，找到最长连续字串
    let right = 1;
    let max = 0;
    // let result = [];
    while (right < nums.length) {
        if (nums[right] <= nums[right - 1]) {
            left = right; // 不是递增更新 left
        }
        if (right - left + 1 > max) {
            max = right - left + 1; // 如果从 left 到 right + 1 的长度大于 max，更新，因为 right 是索引所以需要加 1
            // result = nums.slice(left, max);
        }
        right++; // 将 right 向后移动一位，检查下一个元素
    }
    return max;
};
console.log(findLengthOfLCIS([1, 3, 5, 4, 7]));
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
    if (!Array.isArray(nums)) return;
    const exch = (arr, x, y) => {
        [arr[x], arr[y]] = [arr[y], arr[x]];
    };
    const newArr = [...nums];
    const sort = (arr, left, right, target) => {
        if (left >= right) return; // 递归终止条件
        let start = left; // 最左边未交换过的元素，起始索引标记
        let end = right; // 最右边未交换过的元素，结束索引标记
        let i = left + 1; // 循环索引从切分位后边开始，所以 +1
        let val = arr[start]; // 切分位值，该轮循环完成后排定的就是该值位置
        while (i <= end) {
            if (arr[i] < val) {
                exch(arr, i, end--); // 小于 切分值 的移到数组的右边，并将 end 向左移动一位
            } else if (arr[i] > val) {
                exch(arr, i++, start++); // 大于切分值，移到最左侧，并将 start 和 i 都向右移动一位
            } else {
                i++; // 如果等于 切分值，那么直接将 i 向右移动一位
            }
        }
        if (target < start) sort(arr, left, start - 1, target); // 只排 k 所在的区间，提升排序速度
        if (target > end) sort(arr, end + 1, right, target);
    };
    sort(newArr, 0, newArr.length - 1, k - 1);
    return newArr[k - 1];
};
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
console.log(findKthLargest([7, 6, 5, 4, 3, 2, 1], 5)); // 3

var findKthLargest = function (nums, k) {
    if (!Array.isArray(nums)) return nums;
    if (nums.length < 2) return nums[k - 1];
    const sort = arr => {
        if (arr.length < 2) {
            return arr;
        }
        const left = [];
        const right = [];
        const last = arr.pop();
        arr.forEach(cur => {
            if (cur < last) {
                right.push(cur);
            } else {
                left.push(cur);
            }
        });
        return [...sort(left), last, ...sort(right)];
    };
    const res = sort(nums);
    return res[k - 1];
};
var findKthLargest = function (nums, k) {
    if (!Array.isArray(nums)) return nums;
    if (nums.length < 2) return nums;
    const exch = (arr, a, b) => {
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    };
    const sort = (arr, left, right) => {
        if (left >= right) return;
        let start = left + 1;
        let end = right;
        let flag = arr[left];
        while (start < end) {
            // 如果小于切分位的值，则进行交换，放到最后一位，右指针 --，否则 左指针 ++
            if (arr[start] < flag) {
                exch(arr, start, end--);
            } else {
                start++;
            }
        }
        if (arr[end] < flag) {
            end--; // 交换完后，右指针值跟切分位进行比较，如果小于切分位，跟切分位前边的值进行交互，右指针左移，否则直接进行交互
        }
        exch(arr, left, end);
        sort(arr, left, end - 1);
        sort(arr, end + 1, right);
    };
    sort(nums, 0, nums.length - 1);
    console.log(nums);
    return nums[k - 1];
};
var findKthLargest = function (nums, k) {
    if (!Array.isArray(nums)) return nums;
    if (nums.length < 2) return nums;
    const exch = (arr, a, b) => {
        const temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    };
    const quickSort = (arr, left, right) => {
        if (left >= right) return; // 左指针大于等于右指针，结束排序
        let flag = arr[left]; // 切分位，取第一个元素，遍历数组进行交互，左边的元素都大于等于 flag，右边的元素都小于 flag
        let start = left + 1; // 遍历起始指针，从第二个元素开始
        let end = right; //  遍历的结束指针
        while (start < end) {
            while (start < end && arr[start] >= flag) {
                start++; // 如果当前元素，大于等于切分位，起始指针向右移动，找到需要交换的元素停下，注意不能越界
            }
            while (start < end && arr[end] < flag) {
                end--; // 如果当前元素小于切分位，右指针向左移动，找到需要交换的元素停下，注意不能越界
            }
            exch(arr, start, end); // 交互它们
        }
        if (arr[end] < flag) {
            end--; // 交换完后，右指针值跟切分位进行比较，如果小于切分位，跟切分位前边的值进行交互，右指针左移，否则直接进行交互
        }
        exch(arr, left, end);
        quickSort(arr, left, end - 1);
        quickSort(arr, end + 1, right);
    };
    quickSort(nums, 0, nums.length - 1);
    return nums[k - 1];
};
// console.log(findKthLargest([3, 1, 5, 6, 2, 4], 2));
// console.log(findKthLargest([21, 2, 1, 5, 6, 3, 4], 2));
// console.log(findKthLargest([21, 2, 1, 5, 5, 6, 3, 4], 2));
/**
 * 数组中的第 2 大的元素，返回值和索引，如果有重复的返回第一个值的索引
   输入: [3,2,1,5,6,4]     输出: [5, 3]
 */
var findKthLargest2 = function (nums, k = 2) {
    if (!Array.isArray(nums) || nums.length < 2) return [];
    const result = [];
    nums.forEach((cur, index) => {
        const idx = result.findIndex(item => item[0] <= cur);
        if (idx > -1) {
            if (result[idx][0] !== cur) {
                result.splice(idx, 0, [cur, index]);
            } else {
                result[idx].push(index);
            }
        } else {
            result.push([cur, index]);
        }
    });
    console.log(result);
    return result[k - 1] || [];
};
console.log(findKthLargest2([3, 2, 1, 5, 6, 4])); // [5, 3]
console.log(findKthLargest2([3, 2, 3, 1, 2, 4, 5, 5, 6])); // [5, 6, 7]
// /**
//  * 数组中的第 2 大的元素，返回值和索引，如果有重复的返回第一个值的索引
//    输入: [3,2,1,5,6,4]     输出: [5, 3]
//  */
// var findKthLargest2 = function (nums, k = 1) {
//     if (!nums || !Array.isArray(nums)) return [0, 0];
//     const result = [];
//     nums.forEach((val, index) => {
//         const temp = result.findIndex(item => item[0] <= val);
//         console.log(temp);
//         if (temp > -1) {
//             if (result[temp][0] === val) {
//                 result[temp].push(index);
//             } else {
//                 result.splice(temp, 0, [val, index]);
//             }
//         } else {
//             result.push([val, index]);
//         }
//     });
//     console.log(result);
//     const res = result[k];
//     return res ? res.slice(0, 2) : [0, 0];
// };
var findKthLargest3 = function (nums) {
    if (!nums || !Array.isArray(nums)) return [0, 0];
    let max1 = [nums[0], 0];
    let max2 = [nums[0], 0];
    nums.forEach((val, index) => {
        const _max2 = max2;
        if (val > _max2[0]) {
            max2 = [val, index];
        }
        if (val > max1[0]) {
            max2 = max1;
            max1 = [val, index];
        }
    });
    console.log(max1, max2);
    return max2;
};
// findKthLargest3([9, 11, 8, 9, 3, 2, 1, 5, 9, 6, 4]);
/**
 * 316. 去除重复字母
 * 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 */
var removeDuplicateLetters = function (s) {
    let res = []; // 1、将res作为栈存放字符
    for (let i = 0; i < s.length; i++) {
        if (res.includes(s[i])) continue; // 2、如果字符已经存在则直接跳过循环
        while (res[res.length - 1] > s[i] && s.indexOf(res[res.length - 1], i) > i) {
            res.pop(); // 4、所以直接将循环字符和栈顶元素比较,如果栈顶元素大于当前字符且后续还有其他字符可以作为替代时,栈顶元素出栈
        }
        // 5、当前元素入栈
        res.push(s[i]);
    }
    return res.join('');
};
/**
 * 1. 两数之和
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
 */
var twoSum = function (nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        if (map.has(cur)) {
            return [map.get(cur), i];
        }
        map.set(target - cur, i);
    }
};
console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
/**
 * 合并数组并排序去重
 * 有两个数组，把他们两个合并。然后并去重，去重的逻辑是哪儿边的重复次数更多，我就留下哪儿边的
 * 数组一： [1, 100, 0, 5, 1, 5]    数组二： [2, 5, 5, 5, 1, 3]     最终的结果： [0, 1, 1, 2, 3, 5, 5, 5, 100]
 */
function mergeAndSort(nums1, nums2) {
    if (!Array.isArray(nums1) || !Array.isArray(nums2)) return;
    const map = new Map();
    for (let val of nums1) {
        if (!map.has(val)) map.set(val, [0, 0]);
        const conuts = map.get(val);
        conuts[0]++; // 遍历 nums1 累计重复元素出现的次数
    }
    for (let val of nums2) {
        if (!map.has(val)) map.set(val, [0, 0]);
        const conuts = map.get(val);
        conuts[1]++; // 遍历 nums2 累计重复元素出现的次数
    }
    const result = [];
    map.forEach((val, key) => {
        let n = Math.max(...val); // 取出最多的重复次数
        while (n > 0) {
            result.push(key); // 按重复次数添加值
            n--;
        }
    });
    return result.sort((a, b) => a - b); // 最后别忘了排序
}
console.log(mergeAndSort([1, 100, 0, 5, 1, 5], [2, 5, 5, 5, 1, 3]));
// function mergeAndSort(nums1, nums2) {
//     const cache = {}; // 用来存放两个数组 值 和 值出现的次数 key -> [n1, n2]
//     nums1.forEach(n => {
//         let sumArr = cache[n];
//         if (sumArr) {
//             const sum = sumArr[0];
//             cache[n] = [(sum || 0) + 1, 0];
//         } else {
//             cache[n] = [1, 0]; // nums2 默认为 0
//         }
//     });
//     nums2.forEach(n => {
//         let sumArr = cache[n];
//         if (sumArr) {
//             const [sum1, sum2] = sumArr;
//             cache[n] = [sum1, (sum2 || 0) + 1];
//         } else {
//             cache[n] = [0, 1]; // nums1 默认为 0
//         }
//     });
//     console.log(cache);
//     const res = [];
//     Object.keys(cache).forEach(key => {
//         const [sum1, sum2] = cache[key];
//         const n = Math.max(sum1, sum2);
//         for (let i = 0; i < n; i++) {
//             res.push(Number(key));
//         }
//     });
//     return res.sort((a, b) => a - b);
// }
// function mergeAndSort(nums1, nums2) {
//     const cache1 = {};
//     const cache2 = {};
//     nums1.forEach(n => {
//         let sum = cache1[n];
//         cache1[n] = (sum || 0) + 1;
//     });
//     nums2.forEach(n => {
//         let sum = cache2[n];
//         cache2[n] = (sum || 0) + 1;
//     });
//     console.log(cache1, cache2);
//     const cache = {};
//     [...nums1, ...nums2].forEach(n => {
//         const sum1 = cache1[n];
//         const sum2 = cache2[n];
//         cache[n] = Math.max(sum1 || 0, sum2 || 0);
//     });
//     const res = [];
//     Object.keys(cache).forEach(key => {
//         const value = cache[key];
//         const n = Number(key);
//         for (let i = 0; i < value; i++) {
//             res.push(n);
//         }
//     });
//     return res.sort((a, b) => a - b);
// }
var ns1 = [1, 100, 0, 5, 1, 5];
var ns2 = [2, 5, 5, 5, 1, 3];
//  输出：[0, 1, 1, 2, 3, 5, 5, 5, 100]
mergeAndSort(ns1, ns2);
/**
 * 数组分组改成减法运算，并计算结果
 * 意思就是 [5, [[4, 3], 2, 1]] 变成 (5 - ((4 - 3) - 2 - 1)) 并执行
 */
function calc(arr) {
    if (!Array.isArray(arr)) return;
    return arr.reduce((sum, cur) => {
        const left = Array.isArray(sum) ? calc(sum) : sum; // 如果 sum 是数组，递归调用 calc 函数
        const right = Array.isArray(cur) ? calc(cur) : cur; // 如果 cur 是数组，递归调用 calc 函数
        return left - right; // 计算结果，left 和 right 肯定都是非数组
    });
}
console.log(calc([5, [[4, 3], 2, 1]]));
/**
 * 判断完全平方数
 * 判断一个数字能不能被开平方， 比如9的开平方是3 是对的。 5没法开平方就是错的
 */
// 方法一
var fn = function (num) {
    // 原理就是，开平方后判断是否是正整数就行了
    return num ** 0.5 % 1 == 0;
};
// 方法二
function canBeSquareRooted(num) {
    // 使用 Math.sqrt() 函数来计算一个数字的平方根，然后使用 Number.isInteger() 函数来判断结果是否为整数。
    let sqrt = Math.sqrt(num);
    return Number.isInteger(sqrt);
}
/**
 * 找到仅在两个数组中出现过一次的数据    两个数组中完全独立的数据
 * var a = [1, 2, 4], b = [1, 3, 8, 4]  输出
 */
// 方法一
function findUnique(a, b) {
    return a.concat(b).filter((item, _, arr) => {
        // 合并两个数组，然后查找数组的第一个出现的索引和最后一个出现的索引是否一致就可以判断是否是独立的数据了
        return arr.indexOf(item) === arr.lastIndexOf(item);
    });
}
// 方法二
function findUnique(a, b) {
    var a = [1, 2, 4],
        b = [1, 3, 8, 4];
    function _find(a, b) {
        const res = [];
        a.forEach(n1 => {
            if (b.every(n2 => n2 !== n1)) {
                res.push(n1);
            }
        });
        return res;
    }
    // 查找仅在 a 中出现一次的 b 中的数据，查找仅在 b 中出现一次的 a 中的数据，取并集
    return [..._find(a, b), ..._find(b, a)];
}
var a = [1, 2, 4],
    b = [1, 3, 8, 4];
findNum(a, b);
/**
 * 找到仅在两个数组中出现过一次的数据    两个数组中完全独立的数据
 * var a = [1, 2, 4], b = [1, 3, 8, 4]  输出
 */
function findUnique(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return;
    const set1 = new Set(a);
    const set2 = new Set(b);
    return [...a.filter(val => !set2.has(val)), ...b.filter(val => !set1.has(val))];
}
var a = [1, 2, 4],
    b = [1, 3, 8, 4];
console.log(findUnique(a, b));
// 方法四
function findUnique(a, b) {
    const map = new Map();
    a.forEach(val => {
        map.set(val, (map.get(val) || 0) + 1);
    });
    b.forEach(val => {
        map.set(val, (map.get(val) || 0) + 1);
    });
    const res = [];
    map.forEach((val, key) => {
        if (val === 1) {
            res.push(key);
        }
    });
    return res;
}
var a = [1, 2, 4],
    b = [1, 3, 8, 4];
// [2,3,8]
findUnique(a, b);
/**
 * 77. 组合
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 */
const combine = (n, k) => {
    if (isNaN(k) || isNaN(n)) return;
    const result = [];
    const rec = (arr, start) => {
        if (arr.length === k) {
            result.push([...arr]);
            return;
        }
        // start是枚举选择的起点，i = start 剪掉重复的元素，后边的条件也是为了剪枝，避免多余循环
        for (let i = start; i <= n && n - i + 1 >= k - arr.length; i++) {
            arr.push(i);
            rec(arr, i + 1); // 枚举出所有选择，递归选择下一个，直到 length 为 k 终止
            arr.pop(i);
        }
    };
    rec([], 1);
    return result;
};
console.log(combine(4, 2));
console.log(combine(4, 3));
console.log(combine(4, 4));
/**
        *  2624. 蜗牛排序
        * 请你编写一段代码为所有数组实现  snail(rowsCount，colsCount) 方法，该方法将 1D 数组转换为以蜗牛排序的模式的 2D 数组。
        * 无效的输入值应该输出一个空数组。当 rowsCount * colsCount !==nums.length 时。这个输入被认为是无效的。
        * 输入：
               nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
               rowsCount = 5
               colsCount = 4
               输出：
               [
               [19,17,16,15],
               [10,1,14,4],
               [3,2,12,20],
               [7,5,18,11],
               [9,8,6,13]
               ]
        */
Array.prototype.snail = function (rowsCount, colsCount) {
    if (rowsCount * colsCount !== this.length) return [];
    let row = 0; // 初始化行索引
    let col = 0; // 初始化列索引
    let direction = true; // 标识方向，true 为向下，false 为向上。
    const nums = this;
    const result = new Array(rowsCount).fill(0).map(() => new Array(colsCount));
    for (let i = 0; i < nums.length; i++) {
        result[row][col] = nums[i]; // 将原数组中的元素放到新数组的对应位置上
        if ((direction && row === rowsCount - 1) || (!direction && row === 0)) {
            col++; // 如果当前方向向下且行索引达到最大值，或者当前方向向上且行索引为0。则改变，并且行向右移动 +1。
            direction = !direction;
        } else {
            if (direction) {
                row++; // 方向向下时，行索引加 1
            } else {
                row--; //  方向向上时，行索引减 1
            }
        }
    }
};
var arr = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
console.log(arr.snail(5, 4));
/**
 * 给定一个由n个正整数组成数组，并指定一个结果m，求出将n个正整数通过相加或者相减的方式，得到结果m的组合方式有多少种?分别是什么？
 */
function fn(arr, m) {
    const result = [];
    const rec = (i, sum, res) => {
        if (i === arr.length) {
            if (sum === m) result.push(res.replace(/^\+/, '')); // 递归 n 次，如果结果等于 m 则添加到结果中
            return;
        }
        const cur = arr[i];
        rec(i + 1, sum + cur, `${res}+${cur}`); // 将当前的结果按加法累加，并递归
        rec(i + 1, sum - cur, `${res}-${cur}`); // 将当前的结果按加法累加，并递归
    };
    rec(0, 0, ''); // 当前递归索引，计算结果，计算字符串
    return result;
}
console.log(fn([1, 1, 1, 1], 2));
console.log(fn([1, 1, 1, 1], 2));
console.log(fn([1, 1, 1, 1, 1], 3));
console.log(fn([1], 1));
console.log(fn([], 1));
/**
 * 第 2 题：合并二维有序数组成一维有序数组，归并排序的思路
 */
function mergeSort(arr) {
    if (!Array.isArray(arr)) return [];
    const merge = (arr1, arr2) => {
        if (arr1[arr1.length - 1] < arr2[0]) return [...arr1, ...arr2];
        const result = [];
        while (arr1.length > 0 && arr2.length > 0) {
            if (arr1[0] < arr2[0]) {
                result.push(arr1.shift()); // 把 arr1 和 arr2 中较小的元素放到前边
            } else {
                result.push(arr2.shift());
            }
        }
        return result.concat(arr1, arr2);
    };
    return arr.reduce(merge);
}
let arr1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 2, 3],
    [4, 5, 6],
];
let arr2 = [
    [1, 4, 6],
    [7, 8, 10],
    [2, 6, 9],
    [3, 7, 13],
    [1, 5, 12],
];
console.log(mergeSort(arr1));
console.log(mergeSort(arr2));
// function mergeArr(arr) {
//     if (!Array.isArray(arr)) return [];
//     const merge = (arr1, arr2) => {
//         const res = [];
//         const len1 = arr1.length;
//         const len2 = arr2.length;
//         let index1 = 0;
//         let index2 = 0;
//         while (index1 < len1 && index2 < len2) {
//             if (arr1[index1] <= arr2[index2]) {
//                 res.push(arr1[index1]);
//                 index1++;
//             } else {
//                 res.push(arr2[index2]);
//                 index2++;
//             }
//         }
//         if (index1 < len1) {
//             return [...res, ...arr1.splice(index1)];
//         }
//         if (index2 < len2) {
//             return [...res, ...arr2.splice(index2)];
//         }
//         return res;
//     };
//     return arr.reduce((res, cur) => {
//         return merge(res, cur);
//     });
// }
// 方法三
function mergeArr3(arr) {
    if (!Array.isArray(arr)) return [];
    const merge = (arr1, arr2) => {
        const res = [];
        while (arr1.length > 0 && arr2.length > 0) {
            if (arr1[0] <= arr2[0]) {
                res.push(arr1.shift());
            } else {
                res.push(arr2.shift());
            }
        }
        return [...res, ...arr1, ...arr2];
    };
    return arr.reduce((res, cur) => {
        return merge(res, cur);
    });
}
// 方法二
function mergeArr2(arr) {
    if (!Array.isArray(arr)) return [];
    const result = [];
    arr.forEach(arr2 => {
        arr2.forEach(val => {
            const i = result.findIndex(n => n >= val);
            console.log(val, i);
            if (i > -1) {
                result.splice(i, 0, val);
            } else {
                result.push(val);
            }
        });
    });
    return result;
}
var arr = [
    [1, 2, 4],
    [2, 3, 7],
    [3, 5, 7],
    [4, 5, 8],
];
console.log(mergeArr(arr));
/**
 * 第 13 题：有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）
 */
// function fn(arr, count) {
//     if (!Array.isArray(arr) || arr.length < 3) {
//         return [];
//     }
//     const res = new Array(count).fill(0).map(() => []);
//     arr.sort((a, b) => b - a); // 数组从大到小排序
//     const avg = arr.reduce((a, b) => a + b) / count; // 计算平均值
//     console.log(avg);
//     let resArr = []; //从大到小求和，取最接近平均值的一组，放入二维数组
//     let current = 0;
//     for (let i = 0; i < count - 1; i++) {
//         if (current + arr[arr.length - 1] / 2 < avg && i) {
//             console.log(111, arr.length);
//             arr.pop();
//             console.log(222, arr.length);
//             resArr[i - 1].push(arr[arr.length - 1]);
//         }
//         current = 0;
//         resArr[i] = [];
//         arr.forEach((item, index) => {
//             current += item;
//             arr.splice(index, 1);
//             resArr[i].push(item);
//             if (current > avg) {
//                 current -= item;
//                 arr.splice(index, 0, item);
//                 resArr[i].pop();
//             }
//         });
//     }
//     resArr[count - 1] = arr;
//     return resArr;
// }
function fn(arr) {
    let AMOUNT = arr.length;
    if (!AMOUNT) return false;
    if (AMOUNT === 3) return arr;
    arr.sort((a, b) => a - b);
    let total = 0;
    let maxNumberTotal = 0;
    for (let i = 0; i < AMOUNT; i++) {
        total += arr[i];
    }
    maxNumberTotal = total / 3;
    let tempTotal = arr[AMOUNT - 1];

    let firstArr = [arr[AMOUNT - 1]];
    let delIndex = [AMOUNT - 1];
    let firstIndex = -1;

    // 获取第一份数组
    for (let i = AMOUNT - 2; i > 0; i--) {
        const el = arr[i];
        tempTotal += el; // 每次拿最大的;
        firstArr.push(el);
        delIndex.push(i);
        if (tempTotal === maxNumberTotal) {
            // 刚好等于最大值跳出循环
            break;
        } else if (tempTotal > maxNumberTotal) {
            // 发现超过最大值, 减回去
            tempTotal -= el;
            delIndex.pop();
            firstArr.pop();
        } else if (tempTotal < maxNumberTotal) {
            // 发现超过最小值, 处理边界问题
            let nextTotal = tempTotal + arr[i + 1];
            if (maxNumberTotal - tempTotal < Math.abs(maxNumberTotal - nextTotal)) {
                // 当前总值比上一个总值大; 这里是临界值, 说明上一个总值肯定是一个比最大值大, 所以这里需要和绝对值比较
                if (maxNumberTotal - tempTotal > arr[0]) {
                    // 如果下一个平局值和总值相减, 比数组第一个数还大, 说明还可以继续走下去;
                    continue;
                } else {
                    break;
                }
            }
        }
    }
    for (let i = 0; i < delIndex.length; i++) {
        arr.splice(delIndex[i], 1);
    }
    AMOUNT = arr.length; // 注意每次的arr都是不一样的
    let secondArr = [arr[AMOUNT - 1]];
    delIndex = [AMOUNT - 1];
    let secondIndex = -1;
    tempTotal = arr[AMOUNT - 1];
    // 获取第二份数组
    for (let i = AMOUNT - 2; i > 0; i--) {
        const el = arr[i];
        tempTotal += el; // 每次拿最大的;
        secondArr.push(el);
        delIndex.push(i);
        if (tempTotal === maxNumberTotal) {
            // 刚好等于最大值跳出循环
            break;
        } else if (tempTotal > maxNumberTotal) {
            // 发现超过最大值, 减回去
            tempTotal -= el;
            delIndex.pop();
            secondArr.pop();
        } else if (tempTotal < maxNumberTotal) {
            // 发现超过最小值, 处理边界问题
            let nextTotal = tempTotal + arr[i + 1];
            if (maxNumberTotal - tempTotal < Math.abs(maxNumberTotal - nextTotal)) {
                // 当前总值恒小于下一个总值; 这里是临界值
                if (maxNumberTotal - tempTotal > arr[0]) {
                    continue;
                } else {
                    break;
                }
            }
        }
    }
    for (let i = 0; i < delIndex.length; i++) {
        arr.splice(delIndex[i], 1);
    }
    // 公平处理, 当出现极差情况就需要做公平处理了, 这里暂时不考虑极差情况
    return [firstArr, secondArr, arr];
}
//测试，第一个参数为数组，第二个为份数
const res = fn([11, 42, 23, 4, 5, 6, 4, 5, 6, 11, 23, 42, 56, 78, 90], 3);
const res2 = fn([8, 2, 3, 4, 5, 6, 7, 1], 3);
console.log(
    res,
    res.map(arr => arr.reduce((sum, cur) => sum + cur)),
);
console.log(
    res2,
    res2.map(arr => arr.reduce((sum, cur) => sum + cur)),
);

