// @ts-nocheck
import { BST } from '@/commons/binaryTreeSymbolTable';
const bst = new BST();
bst.put(100, 100);
bst.put(25, 25);
bst.put(55, 55);
bst.put(2, 2);
bst.put(5, 5);
bst.put(10, 10);
bst.put(3, 3);
bst.put(1, 1);
bst.put(250, 250);
bst.put(150, 150);
bst.put(200, 200);
bst.put(300, 300);
bst.put(180, 180);
bst.put(360, 360);
// console.log('bst-------------------------->>>', bst);
(window as any).bst = bst;
/**
 * 104. 二叉树的最大深度
 */
function maxDepth(root) {}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 102. 二叉树的层序遍历
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
 */
var levelOrder = function (root) {
    if (!root) return [];
    const res = [];
    const arr = [root];
    while (arr.length > 0) {
        const r = [];
        let len = arr.length;
        while (len > 0) {
            const { left, right, val } = arr.shift();
            if (left) arr.push(left);
            if (right) arr.push(right);
            r.push(val);
            len--;
        }
        res.push(r);
    }
    return res;
};
// console.log('二叉树的层序遍历：', levelOrder(bst.root));
