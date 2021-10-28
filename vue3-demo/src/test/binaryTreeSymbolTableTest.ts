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
console.log('bst-------------------------->>>', bst);
(window as any).bst = bst;
