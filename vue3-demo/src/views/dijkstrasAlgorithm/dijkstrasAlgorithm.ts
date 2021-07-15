/**
 * 二分查找
 * @param params 需要查找的数组
 */
export function dijkstrasAlgorithm() {
    // 图
    const graph: any = {
        start: {
            a: 6,
            b: 2,
        },
        a: { fin: 1 },
        b: { a: 3, fin: 5 },
        fin: {},
    };
    // 开销表
    const costs: any = {
        a: 6,
        b: 2,
        fin: Infinity,
    };
    // 存储父节点
    const parents: any = {
        a: 'start',
        b: 'start',
        fin: null,
    };
    // 记录处理过的节点
    const processed: string[] = [];
    // let node: any = Object.keys(graph.start);
    // 第一步，找出最便宜的节点

    // 第二步，计算前往该节点的个个邻居的开销
    let node: string | null = findLow(costs, processed);
    while (node) {
        const val = costs[node];
        const neighbors = graph[node];
        for (const key in neighbors) {
            const newVal = val + neighbors[key];
            if (newVal < costs[key]) {
                costs[key] = newVal;
                parents[key] = node;
            }
        }
        processed.push(node);
        node = findLow(costs, processed);
    }
    return { costs, parents };
}
/**
 * 辅助函数
 */
function findLow(costs: any = {}, processed: string[] = []) {
    let low = Infinity;
    let node = null;
    const keys = Object.keys(costs);
    const untreateds = keys.filter(key => !processed.find(k => k === key));
    untreateds.forEach(key => {
        const value = costs[key];
        if (value < low) {
            low = value;
            node = key;
        }
    });
    return node;
}
