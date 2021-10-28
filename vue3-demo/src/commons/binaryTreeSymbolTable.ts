/**
 * 基于二叉查找树的符号表
 */
export class BST {
    private root: Node | undefined;
    /**
     * x 结点的大小
     */
    private _size(x: Node | undefined) {
        return x ? x.N : 0;
    }
    /**
     * 二叉树中键值对的数量
     */
    public size() {
        return this._size(this.root);
    }
    /**
     * 获取键 key 对应的值（若键 key 不存在则返回空）
     */
    public get(key: number) {
        const _get = (x: Node | undefined, key: number): any => {
            // 在以 x 为根节点的子树中查找并返回 key 所对应的值
            // 如果找不到则返回 undefined
            if (!x) return undefined;
            if (key < x.key) {
                return _get(x.left, key);
            } else if (key > x.key) {
                return _get(x.ringt, key);
            } else {
                return x?.val;
            }
        };
        return _get(this.root, key);
    }
    /**
     * 将键值对存入表中（若值为空则将键 key 从表中删除）
     */
    public put(key: number, val: any) {
        const _put = (x: Node | undefined, key: number, val: any): Node => {
            // 如果 key 存在于以 x 为根节点的子树中则更新它的值；
            // 否则将以 key 和 val 为键值对的新结点插入到该子树种
            if (!x) return new Node(key, val, 1);
            if (key < x.key) {
                x.left = _put(x.left, key, val);
            } else if (key > x.key) {
                x.ringt = _put(x.ringt, key, val);
            } else {
                x.val = val; // 覆盖旧的值
            }
            x.N = this._size(x.left) + this._size(x.ringt) + 1;
            return x;
        };
        this.root = _put(this.root, key, val);
    }
    /**
     * 最小的键
     */
    public min() {
        if (!this.root) return undefined;
        const _min = (x: Node): Node => {
            if (!x.left) return x;
            return _min(x.left);
        };
        return _min(this.root).key;
    }
    /**
     * 最大的键
     */
    public max() {
        if (!this.root) return undefined;
        const _max = (x: Node): Node => {
            if (!x.ringt) return x;
            return _max(x.ringt);
        };
        return _max(this.root).key;
    }
    /**
     * 小于等于 key 的最大值
     */
    public floor(key: number) {
        if (!key) return undefined;
        const _floor = (x: Node | undefined, key: number): Node | undefined => {
            if (!x) return undefined;
            if (key === x.key) return x;
            if (key < x.key) {
                return _floor(x.left, key);
            }
            const t = _floor(x.ringt, key);
            return t ? t : x;
        };
        const x = _floor(this.root, key);
        return x ? x.key : undefined;
    }
    /**
     * 大于等于 key 的最小值
     */
    public ceiling() {
        //
    }
    /**
     * 表是否为空
     */
    public isEempty() {
        return !!this.root;
    }
    /**
     * 从表中删除键 key（机器对应的值）
     */
    public delete() {
        return !!this.root;
    }
    /**
     * 键 key 是否存在于表中
     */
    public contains() {
        //
    }
    /**
     * 小于 key 的键的数量
     */
    public rank() {
        //
    }
    /**
     * 排名为 k 的键
     */
    public select() {
        //
    }
    /**
     * 删除最小的值
     */
    public deleteMin() {
        //
    }
    /**
     * 删除最大的值
     */
    public deleteMax() {
        //
    }
    /**
     * [lo ... hi] 之间键的数量
     */
    public intervalSize(lo: number, hi: number) {
        console.log(lo, hi);
    }
    /**
     * [lo ... hi] 之间的所有键，已排序
     */
    public keys() {
        //
    }
    /**
     * 表中的所有键的集合，已排序
     */
    public allKeys() {
        //
    }
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
