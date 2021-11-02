import { BST, Node } from '@/commons/binaryTreeSymbolTable';

/**
 * JavaScript 从上到下按层打印二叉树，同一层结点从左至右输出。每一层输出一行
 */
export function printBinaryTree() {
    if (!bst.root) return;
    let nodes: Node[] = [];
    nodes = [bst.root];
    while (nodes.length > 0) {
        console.log(nodes.map(node => node.val).join('|'));
        const arr = nodes;
        nodes = [];
        arr.forEach(node => {
            if (node.left) {
                nodes.push(node.left);
            }
            if (node.ringt) {
                nodes.push(node.ringt);
            }
        });
    }
}

// export function printBinaryTree() {
//     if (!bst.root) return;
//     const arr: Node[][] = [];
//     let l = 0;
//     arr[l] = [bst.root];

//     function pushNode(node: Node) {
//         if (!arr[l]) {
//             arr[l] = [];
//         }
//         if (node.left) {
//             arr[l].push(node.left);
//         }
//         if (node.ringt) {
//             arr[l].push(node.ringt);
//         }
//     }
//     // eslint-disable-next-line no-constant-condition
//     while (true) {
//         const nodes = arr[l];
//         if (nodes.length < 1) break;
//         l++;
//         nodes.forEach(node => {
//             pushNode(node);
//         });
//     }
//     arr.pop();
//     console.log('arr-------------------------->>>', arr);
//     arr.forEach(item => {
//         console.log(item.map(node => node.val).join('|'));
//         // console.log('\n');
//     });
// }

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
console.log('bst-------------------------->>>', bst);
(window as any).bst = bst;

printBinaryTree();
