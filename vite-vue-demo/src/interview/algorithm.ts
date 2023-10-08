// @ts-nocheck
/**
 * 返回数组中每一项出现的次数
 * arr = [1,2,3,4,5,6,7,7,8,9,3,3,5,6,78,82]
 * [[1,1],[2,2]]
 */
function getFrequency(arr) {
    if (!Array.isArray(arr)) return;
    const map = new Map();
    arr.forEach(val => {
        map.set(val, (map.get(val) || 0) + 1);
    });
    return [...map];
    // const result = [];
    // map.forEach((val, key) => {
    //     result.push([key, val]);
    // });
    // return result;
}
console.log(getFrequency([1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 3, 3, 5, 6, 78, 82]));
/**
 * 3. 无重复字符的最长子串，返回最长子串
 */
function lengthOfLongestSubstring(str) {
    if (typeof str !== 'string') return 0;
    const map = new Map();
    let result = 0;
    let max = 0;
    let l = -1;
    let r = 0;
    while (r < str.length) {
        const cur = str[r];
        if (map.has(cur)) {
            l = Math.max(l, map.get(cur));
        }
        if (r - l > max) {
            max = r - l;
            result = str.slice(l + 1, l + 1 + max);
        }
        map.set(cur, r);
        r++;
    }
    return result;
}
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
 * 全排列 I 不重复数组
 * 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
 */
var permute = function (nums) {
    if (!Array.isArray(nums)) return;
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
            if (i - 1 > 0 && flags[i - 1] && nums[i] === nums[i - 1]) continue; // 去重，如果前一个元素已经被选中，并且与当前元素相同，跳过本次循环
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
console.log(permuteUnique([1, 2, 2, 3]));
console.log(permuteUnique([22, 22, 33]));
/**
 * 剑指 Offer 38. 字符串的排列
 * 输入一个字符串，打印出该字符串中字符的所有排列。
 */
const permutation = function (s) {
    if (typeof s !== 'string') return [];
    const sArr = s.split('');
    const result = []; // 用于存放全排列结果
    const flags = new Array(sArr.length).fill(false); // 辅助数组，用于标记当前位置是否被使用过
    const rec = (sArr, arr) => {
        if (arr.length === sArr.length) {
            result.push(arr.join(',')); // 长度和 nums 相等说明已经完成了全排列，添加结果
            return; // 递归终止条件
        }
        for (let i = 0; i < sArr.length; i++) {
            if (flags[i]) continue; // 当前元素已经被使用过了，调过该轮循环
            if (flags[i - 1] && sArr[i] === sArr[i - 1]) continue; // 去重，如果前一个元素已经被选中，并且与当前元素相同，跳过本次循环
            arr.push(sArr[i]); // 将当前数字加入到 arr 中
            flags[i] = true; // 将当前元素标记为已使用
            rec(sArr, arr); // 递归遍历 nums 添加下一个元素
            arr.pop(); // 回溯，将当前元素从 arr 中移除
            flags[i] = false; // 将当前元素恢复为未使用
        }
    };
    sArr.sort((a, b) => a - b); // 排序，为了方便去重
    rec(sArr, []);
    return result;
};
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
 * JS38 高频数据类型
请补全JavaScript代码，要求找到参数数组中出现频次最高的数据类型，并且计算出出现的次数，要求以数组的形式返回。
1. 基本数据类型之外的任何引用数据类型皆为"object"
2. 当多种数据类型出现频次相同时将结果拼接在返回数组中，出现次数必须在数组的最后
输入：__findMostType([0,0,'',''])   输出：['number','string',2]或['string','number',2]
 */
const _findMostType = array => {
    if (!Array.isArray(array)) return [];
    const map = new Map();
    let max = 0;
    let result = [];
    array.forEach(cur => {
        let type = typeof cur;
        if (cur === null) type = 'null';
        if (type === 'function') type = 'object';
        const count = (map.get(type) || 0) + 1;
        map.set(type, count);
        if (count > max) {
            max = count;
            result = [type];
        } else if (count === max) {
            result.push(type);
        }
    });
    result.push(max);
    return result;
};
console.log(_findMostType([0, 0, '', '']));
console.log(_findMostType([123, 'abc', {}, {}, true, false, true]));
console.log(_findMostType([null, {}, null, {}, () => {}]));
/**
 * leetcode 49. 字母异位词分组
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。    字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
    输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]    输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 */
var groupAnagrams = function (strs) {
    if (!Array.isArray(strs)) return [];
    const map = new Map(); // 用来存放已经遍历过的字符串，key 为排序后的字符串，value 值为符合条件的字符串
    strs.forEach(cur => {
        const key = cur.split('').sort().join(''); // 将当前字符串进行排序（按照字符的 ASCII 码值进行排序）作为一组字母异位词的标识 key 值，sort 中可添加 (a, b) => (a > b ? 1 : -1)
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
    if (!Array.isArray(strs)) return '';
    if (typeof strs[0] !== 'string') return '';
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
    const stack = [];
    const opt = {
        ')': '(',
        ']': '[',
        '}': '{',
    }; // 用于映射每一个右括号对应的左括号，减少匹配判断
    for (let i = 0; i < s.length; i++) {
        const cur = s[i];
        const left = opt[cur];
        if (!left) {
            stack.push(cur); // 如果 left 为空说明 cur 是左括号（(、[、{ ），直接 push 到栈中
        } else {
            if (left !== stack.pop()) return false; // 如果栈顶的元素和 left 不同说明不匹配，返回 false
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
        .map(cur => {
            const strs = cur.split('');
            let start = 0;
            let end = strs.length - 1;
            while (start < end) {
                const temp = strs[start];
                strs[start] = strs[end];
                strs[end] = temp;
                start++;
                end--;
            }
            return strs.join('');
        })
        .join(' ');
};
console.log(reverseWords("Let's take LeetCode    contest"));
/**
 * 字符串反转 翻转
 */
export function reverse(str) {
    if (typeof str !== 'string') return str;
    return str.split('').reverse().join('');
}
// 方法二：交换位置
export function reverse2(str) {
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
// var reverseWords = function (s) {
//     // 双指针
//     let arr = s.split("");
//     let l = 0, r = l;
//     while (l < arr.length) {
//         //找到结尾的空格
//         while (arr[r] && arr[r] !== " ") {
//             r++;
//         }
//         //反转单词
//         for (let i = l, j = r - 1; i < j; i++, j--) {
//             [arr[i], arr[j]] = [arr[j], arr[i]];
//         }
//         //跳到下一个单词
//         l = r + 1;
//         r = l;
//     }
//     return arr.join("");
// };
/**
 * 647. 回文子串
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
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
            // s2 = s1.split('').reverse().join(''); // 反转 s1
            if (s1 === s2) count++; // 如果 s1 和 s2 相等，说明找到了一个回文子串
        }
    }
    return count;
};
console.log(countSubstrings('abc'));
console.log(countSubstrings('aaa'));
console.log(countSubstrings('aaabc'));
console.log(countSubstrings('abacbc'));
console.log(countSubstrings('aabaa'));
/**

 */
/**
 * 最长回文子串
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
 * 给你一个字符串 s ，请你统计并返回这个字符串中 回文子串 的数目。
 * 扩展：返回最长的回文子串
 */
var countSubstrings = function (s) {
    // 先使用双指针 i 和 j 枚举所有子串的起点和终点，同时分别按顺序和逆序累加所有遍历过的字符得到字符串 s1 和 s2，判断是否回文只需对 s1 和 s2 判等即可
    if (typeof s !== 'string') return;
    let max = ''; // 最大回文子串
    for (let i = 0; i < s.length; i++) {
        let s1 = ''; // s1 用于临时存储从当前位置开始的子串
        let s2 = ''; // s2 用于存储反向的子串
        for (let j = i; j < s.length; j++) {
            s1 += s[j]; // 将当前位置的字符追加加到 s1 中，构成一个向右的子串
            s2 = s[j] + s2; // 将当前位置的字符添加到 s2 的开头，构成一个反向的子串
            // s2 = s1.split('').reverse().join(''); // 反转 s1
            if (s1 === s2 && s1.length > max.length) max = s1; // 如果 s1 和 s2 相等，说明找到了一个回文子串
        }
    }
    return max;
};
console.log(countSubstrings('abc'));
console.log(countSubstrings('aaa'));
console.log(countSubstrings('aaabc'));
console.log(countSubstrings('abacbc'));
console.log(countSubstrings('aabaa'));

/**
 * 516. 最长回文子序列
 * 给你一个字符串 s ，找出其中最长的回文子序列，并返回该序列的长度。    子序列定义为：不改变剩余字符顺序的情况下，删除某些字符或者不删除任何字符形成的一个序列。
 */
var longestPalindromeSubseq = function (s) {
    const n = s.length;
    const dp = new Array(n).fill(0).map(() => new Array(n).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        dp[i][i] = 1;
        const c1 = s[i];
        for (let j = i + 1; j < n; j++) {
            const c2 = s[j];
            if (c1 === c2) {
                dp[i][j] = dp[i + 1][j - 1] + 2;
            } else {
                dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[0][n - 1];
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
    let sum = nums[0];
    let max = sum;
    let start = 0;
    let end = 0;
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        // if (sum < 0) {
        if (sum + num < num) {
            sum = num;
            start = i;
        } else {
            sum += num;
        }
        if (sum > max) {
            max = sum;
            end = i;
        }
    }
    return nums.slice(start, end + 1);
    // return max
};
/**
 * 56. 合并区间
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]    输出：[[1,6],[8,10],[15,18]]    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */
var merge = function (intervals) {
    if (!intervals.length) return;
    const res = [];
    intervals.sort((a, b) => a[0] - b[0]);
    let arr = intervals[0];
    for (let i = 0; i < intervals.length; i++) {
        const cur = intervals[i];
        if (arr[1] >= cur[0]) {
            arr[1] = Math.max(arr[1], cur[1]);
        } else {
            res.push(arr);
            arr = cur;
        }
    }
    res.push(arr);
    return res;
};
/**
 * 162. 寻找峰值
 * 峰值元素是指其值严格大于左右相邻值的元素。
    给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。
 */
var findPeakElement = function (nums) {
    let max = 0;
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        if (cur > nums[max]) {
            max = i;
        }
    }
    // max 是峰值的索引地址
    return max;
};
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
 * 字符串表达式求值
 * 输入一个字符串只包含加减号和括号
 */
function calcExpression(str) {
    str = str.replace(/\s/g, '');
    let stask = [];
    const getNum = (arr, val) => {
        let n = val || '';
        while (!isNaN(arr[0])) {
            n += arr.shift();
        }
        return Number(n);
    };
    const calc = arr => {
        let res = 0;
        while (arr.length > 0) {
            first = arr.shift();
            if (first === '-') {
                res -= getNum(arr);
            } else if (first === '+') {
                res += getNum(arr);
            } else {
                res = getNum(arr, first);
            }
        }
        return res;
    };
    for (let i = 0; i < str.length; i++) {
        const cur = str[i];
        if (cur === ')') {
            const leftIndex = stask.lastIndexOf('(');
            const lastArr = stask.slice(leftIndex);
            lastArr.shift();
            const res = calc(lastArr);
            stask = stask.slice(0, leftIndex);
            stask.push(res);
        } else {
            stask.push(cur);
        }
    }
    return calc(stask);
}
var strn = '105  -400 - ( 3 + ( 22 - (-1+ 22) -(10+1) ))';
console.log(calcExpression(strn));
console.log(calcExpression(strn) === eval(strn));

/**
 * 表达式求，输入一个字符串，只包含加减乘除，先不考虑括号，然后输出就是这个表达式的结果
 */
function calcExpression2(str) {
    str = str.replace(/\s/g, '');
    const opt = { '+': 1, '-': 1, '*': 2, '/': 2 };
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
                calc();
            }
            opeStask.push(cur);
        }
        i++;
    }
    while (opeStask.length > 0) {
        calc();
    }
    return stask[0];
}
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
const appearTwice = function (ary) {
    const aryLen = ary.length;
    for (let i = 0; i < aryLen; ++i) {
        const item = ary[i];
        // 把每一项交换到对应的索引位置
        if (ary[item - 1] !== ary[i]) {
            [ary[item - 1], ary[i]] = [ary[i], ary[item - 1]];
            i--; // 交换完后再回退一步，从当前位置开始，看交换后的是否满足
        }
    }
    for (let i = 0; i < aryLen; ++i) {
        const item = ary[i];
        if (item - 1 !== i) {
            ary.push(item); // 数字和索引不匹配的说明是重复的
        }
    }
    return ary.slice(aryLen);
};
const ary = [4, 3, 2, 7, 8, 2, 3, 1];
console.log(appearTwice(ary));

/**
 * 459. 重复的子字符串
 * 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。
 */
var repeatedSubstringPattern = function (s) {
    let str = '';
    const len = Math.floor(s.length / 2);
    for (let i = 0; i < len; i++) {
        str += s[i];
        const arr = s.split(str);
        // 分割出来的 arr 如果全部为空字符串，说明满足条件
        if (arr.every(val => !val)) {
            return true;
        }
        // const temp = str.repeat(Math.floor(s.length / str.length))
        // if (temp === s) {
        //     return true
        // }
    }
    return false;
};

/**
 * 22. 括号生成 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * 输入：n = 3      输出：["((()))","(()())","(())()","()(())","()()()"]
 */
var generateParenthesis = function (n) {
    const res = []; // 输出的结果数组
    const generate = (str, left, right) => {
        if (str.length == 2 * n) {
            // 字符串构建完成
            res.push(str); // 将字符串加入res
            return; // 结束当前递归（结束当前搜索分支）
        }
        if (left > 0) {
            // 只要左括号有剩，可以选它，继续递归做选择
            generate(str + '(', left - 1, right);
        }
        if (right > left) {
            // 右括号的保有数量大于左括号的保有数量，才能选右括号
            generate(str + ')', left, right - 1);
        }
    };

    generate('', n, n); // 递归的入口，初始字符串是空字符串，初始括号数量都是n
    return res;
};
/**
 * 111. 二叉树的最小深度
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
 * 二分查找
 */
export function binarySearch(arr, target) {
    if (!arr || !Array.isArray(arr)) return -1;
    let l = 0,
        r = arr.length - 1;
    while (l <= r) {
        // let mid = ((l + r) / 2) >>> 0;
        let mid = Math.floor(l + (r - l) / 2); // 防止left, right过大相加导致数值溢出
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
// console.log('最长递增子序列:', lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
/**
 * 674. 最长连续递增序列
 * 输入：nums = [1,3,5,4,7]     输出：3     解释：最长连续递增序列是 [1,3,5], 长度为3。
 */
var findLengthOfLCIS = function (nums) {
    // 1.检测边界条件
    if (nums.length < 2) return nums.length;
    // 2.滑动窗口，找到最长连续字串
    let left = 0,
        current = 0,
        right = 1,
        len = 1;
    while (right < nums.length) {
        // 不是递增，移动 left 指向
        if (nums[right] <= nums[current]) {
            left = right;
        }
        // 计算当前的最大字串长度
        len = Math.max(len, right - left + 1);
        current++;
        right++;
    }
    return len;
};
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
/**
 * 数组中的第 2 大的元素，返回值和索引，如果有重复的返回第一个值的索引
   输入: [3,2,1,5,6,4]     输出: [5, 3]
 */
var findKthLargest2 = function (nums, k = 1) {
    if (!nums || !Array.isArray(nums)) return [0, 0];
    const result = [];
    nums.forEach((val, index) => {
        const temp = result.findIndex(item => item[0] <= val);
        console.log(temp);
        if (temp > -1) {
            if (result[temp][0] === val) {
                result[temp].push(index);
            } else {
                result.splice(temp, 0, [val, index]);
            }
        } else {
            result.push([val, index]);
        }
    });
    console.log(result);
    const res = result[k];
    return res ? res.slice(0, 2) : [0, 0];
};
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
        arr[b] = temp;
    };

    quickSort(nums, 0, nums.length - 1);
    return nums[k - 1];
};
// console.log(findKthLargest([3, 1, 5, 6, 2, 4], 2));
// console.log(findKthLargest([21, 2, 1, 5, 6, 3, 4], 2));
// console.log(findKthLargest([21, 2, 1, 5, 5, 6, 3, 4], 2));
/**
 * 316. 去除重复字母
 * 给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 */
var removeDuplicateLetters = function (s) {
    // 1、将res作为栈存放字符
    let res = [];
    for (let i = 0; i < s.length; i++) {
        // 2、如果字符已经存在则直接跳过循环
        if (res.includes(s[i])) continue;
        // 3、由于两个字符直接比较大小会根据字典序输出true/false
        // 4、所以直接将循环字符和栈顶元素比较,如果栈顶元素大于当前字符且后续还有其他字符可以作为替代时,栈顶元素出栈
        while (res[res.length - 1] > s[i] && s.indexOf(res[res.length - 1], i) > i) {
            res.pop();
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
    const cache = {};
    for (let i = 0; i < nums.length; i++) {
        const cur = nums[i];
        const index = cache[cur];
        if (index >= 0) {
            return [index, i];
        } else {
            cache[target - cur] = i;
        }
    }
    return [];
};
/**
 * 合并数组并排序去重
 * 有两个数组，把他们两个合并。然后并去重，去重的逻辑是哪儿边的重复次数更多，我就留下哪儿边的
 * 数组一： [1, 100, 0, 5, 1, 5]    数组二： [2, 5, 5, 5, 1, 3]     最终的结果： [0, 1, 1, 2, 3, 5, 5, 5, 100]
 */
function mergeAndSort(nums1, nums2) {
    const map = new Map();
    nums1.forEach(val => {
        if (!map.has(val)) map.set(val, [0, 0]);
        const arr = map.get(val);
        arr[0] = arr[0] + 1;
    });
    nums2.forEach(val => {
        if (!map.has(val)) map.set(val, [0, 0]);
        const arr = map.get(val);
        arr[1] = arr[1] + 1;
    });
    const res = [];
    map.forEach((val, key) => {
        const sum = Math.max(val[0], val[1]);
        for (let i = 0; i < sum; i++) {
            res.push(key);
        }
    });
    return res.sort((a, b) => a - b);
}
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
    // 通过 reduce 进行一个递归调用。
    // 如果左边不是数组就可以减去右边的，但如果右边是数组的话，就要把右边的数组先进行减法运算。也是就减法括号运算的的优先级.
    return arr.reduce((pre, cur) => {
        let first = Array.isArray(pre) ? calc(pre) : pre;
        let last = Array.isArray(cur) ? calc(cur) : cur;
        return first - last;
    });
}
calc([5, [[4, 3], 2, 1]]);
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
// 方法三
function findUnique(nums1, nums2) {
    let set1 = new Set(nums1);
    let set2 = new Set(nums2);
    // 先转成 set 再查找仅在 a 中出现一次的 b 中的数据，查找仅在 b 中出现一次的 a 中的数据，取并集
    return [...nums1.filter(x => !set2.has(x)), ...nums2.filter(x => !set1.has(x))];
}
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
    const res = [];
    const rec = (start, path) => {
        // start是枚举选择的起点 path是当前构建的路径（组合）
        if (path.length == k) {
            res.push(path.slice()); // 拷贝一份path，推入res
            return; // 结束当前递归
        }
        for (let i = start; i <= n; i++) {
            // 枚举出所有选择
            path.push(i); // 选择
            rec(i + 1, path); // 向下继续选择
            path.pop(); // 撤销选择
        }
    };
    rec(1, []); // 递归的入口，从数字1开始选
    return res;
};

/**
 *  2624. 蜗牛排序
 * 请你编写一段代码为所有数组实现  snail(rowsCount，colsCount) 方法，该方法将 1D 数组转换为以蜗牛排序的模式的 2D 数组。无效的输入值应该输出一个空数组。当 rowsCount * colsCount !==nums.length 时。这个输入被认为是无效的。
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
    if (rowsCount * colsCount !== this.length) {
        return [];
    }
    const result = new Array(rowsCount).fill(1).map(() => new Array(colsCount));
    let row = 0;
    let col = 0;
    let flag = true;
    for (let i = 0; i < this.length; i++) {
        result[row][col] = this[i];
        if ((flag && row === rowsCount - 1) || (!flag && row === 0)) {
            flag = !flag;
            col++;
        } else {
            if (flag) {
                row++;
            } else {
                row--;
            }
        }
    }
    return result;
};
var arr = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
console.log(arr.snail(5, 4));
/**
 * 给定一个由n个正整数组成数组，并指定一个结果m，求出将n个正整数通过相加或者相减的方式，得到结果m的组合方式有多少种?分别是什么？
 */
function fn(arr, m) {
    if (!Array.isArray(arr) || arr.length < 1) return [];
    const result = [];
    const rec = (i, sum, res) => {
        const cur = arr[i];
        if (i === arr.length) {
            if (sum === m) {
                result.push(res);
            }
            return;
        }
        rec(i + 1, sum + cur, `${res}${res ? '+' : ''}${cur}`);
        rec(i + 1, sum - cur, `${res}-${cur}`);
    };
    rec(0, 0, ''); // 当前递归索引 curIndex,当前合 count,结果字符串 res
    return result;
}
console.log(fn([1, 1, 1, 1], 2));
console.log(fn([1, 1, 1, 1, 1], 3));
console.log(fn([1], 1));
console.log(fn([], 1));
/**
 * 第 2 题：合并二维有序数组成一维有序数组，归并排序的思路
 */
function mergeArr(arr) {
    if (!Array.isArray(arr)) return [];
    const merge = (arr1, arr2) => {
        const res = [];
        const len1 = arr1.length;
        const len2 = arr2.length;
        let index1 = 0;
        let index2 = 0;
        while (index1 < len1 && index2 < len2) {
            if (arr1[index1] <= arr2[index2]) {
                res.push(arr1[index1]);
                index1++;
            } else {
                res.push(arr2[index2]);
                index2++;
            }
        }
        if (index1 < len1) {
            return [...res, ...arr1.splice(index1)];
        }
        if (index2 < len2) {
            return [...res, ...arr2.splice(index2)];
        }
        return res;
    };
    return arr.reduce((res, cur) => {
        return merge(res, cur);
    });
}
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

