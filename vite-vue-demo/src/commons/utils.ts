/**
 * 交换两个元素
 */
export function exch(list: any[], x: any, y: any) {
    const v = list[x];
    list[x] = list[y];
    list[y] = v;
    return list;
}
/**
 * 由上至下的堆有序化（下沉）
 */
export function sink(a: any[], k: number, N: number) {
    while (k <= N) {
        let c = (2 * k) >>> 0;
        // 超出 N 直接返回
        if (c > N) break;
        // 找到两个子节点中较大的一个
        if (c < N && a[c] > a[c - 1]) c++;
        // 如果 pq[k] 整好大于 pq[c] 则不需要交换，说明已经有序了
        if (a[k - 1] > a[c - 1]) break;
        exch(a, k - 1, c - 1);
        k = c;
    }
}
