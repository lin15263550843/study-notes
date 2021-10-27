/**
 * 基于二叉查找树的符号表
 */
export class BST {
    private root: Node | undefined;
    /**
     * 二叉树大小
     */
    public size() {
        if (this.root) {
            this.root?.N;
        } else {
            return 0;
        }
    }
    /**
     * 获取节点
     */
    public get(key: number) {
        console.log(key);
        const getVal = (x: Node | undefined, key: number): any => {
            if (!x) return undefined;
            if (key < x.key) {
                return getVal(x.left, key);
            } else if (key > x.key) {
                return getVal(x.ringt, key);
            } else {
                return x?.val;
            }
        };
        getVal(this.root, key);
    }
    /**
     * put
     */
}
/**
 * 节点
 */
class Node {
    public key; // 建
    public val; // 值
    public left?: Node; // 指向左子树的链接
    public ringt?: Node; // 指向右子树的链接
    public N; // 以该节点为根的子树中的节点总数
    constructor(key: number, val: any, N: number) {
        this.key = key;
        this.val = val;
        this.N = N;
    }
}

console.log(new Node(1, 'val', 1).key);
