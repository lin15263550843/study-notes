/**
 * 基于二叉堆的优先队列
 */
export class MaxPQ {
    constructor(max = 0) {
        console.log('max', max);
        this.pq.length = max; // 意义不大
    }
    public pq: number[] = []; // 存放堆数据的数组
    public N = 0;
    /**
     * 比较两个元素的大小
     */
    private less(i: number, j: number) {
        return this.pq[i] > this.pq[j];
    }
    /**
     * 交换两个元素的位置
     */
    private exch(i: number, j: number) {
        const v = this.pq[i];
        this.pq[i] = this.pq[j];
        this.pq[j] = v;
    }
    /**
     * 由下至上的堆有序化（上浮）
     */
    private swim(k: number) {
        const pq = this.pq;
        let p;
        while ((p = (k / 2) >>> 0) && k > 1 && pq[k] > pq[p]) {
            this.exch(k, p);
            k = p;
        }
    }
    /**
     * 由上至下的堆有序化（下沉）
     */
    private sink(k: number) {
        const { N, pq } = this;
        while (k <= N) {
            let c = (2 * k) >>> 0;
            // 超出 N 直接返回
            if (c > N) break;
            // 找到两个子节点中较大的一个
            if (c < N && pq[c + 1] > pq[c]) c++;
            // 如果 pq[k] 整好大于 pq[c] 则不需要交换，说明已经有序了
            if (pq[k] > pq[c]) break;
            this.exch(k, c);
            k = c;
        }
    }
    /**
     * 优先队列大小
     */
    public size() {
        return this.N;
    }
    /**
     * 优先队列是否为空
     */
    public isEmpty() {
        return this.N === 0;
    }
    /**
     * 添加元素
     */
    public insert(v: number) {
        // if (this.N >= this.pq.length) {
        //     return console.log('超出最大值！！！');
        // }
        this.pq[++this.N] = v;
        this.swim(this.N);
        return true;
    }
    /**
     * 删除最大的元素
     */
    public delMax() {
        if (this.N === 0) return; // N 为 0 说明数组空了，直接返回，防止 N 成为负的
        const max = this.pq[1]; // 从根节点得到最大元素
        this.exch(1, this.N--); // 将其和最后一个元素交换，且使 N 的长度减 1
        this.pq.pop(); // 删除最后一个元素
        this.sink(1);
        return max;
    }
}
