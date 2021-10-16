/**
 * 辅助函数，找出最便宜的节点
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
/**
 * 初始化开销表
 */
function initCosts(graph: any, startKey: string) {
    const costs: any = {};
    const keys = Object.keys(graph);
    const startNeighborKeys = graph[startKey];
    const nKeys = Object.keys(startNeighborKeys);
    keys.filter(key => key !== startKey).forEach(key => {
        costs[key] = Infinity;
    });
    nKeys.forEach(key => {
        costs[key] = startNeighborKeys[key];
    });
    return costs;
}
/**
 * 初始化父节点
 */
function initParents(graph: any, startKey: string) {
    const parents: any = {};
    const keys = Object.keys(graph);
    keys.filter(key => key !== startKey).forEach(key => {
        parents[key] = null;
    });
    const startNeighborKeys = Object.keys(graph[startKey]);
    startNeighborKeys.forEach(key => {
        parents[key] = startKey;
    });
    return parents;
}
/**
 * 狄克斯特拉算法
 * @param graph 图
 * @param startKey 起点
 * @returns return { costs, parents, graph };
 */
export function dijkstrasAlgorithm2(graph: any, startKey: string): any {
    // 开销表
    const costs = initCosts(graph, startKey);
    // 存储父节点
    const parents = initParents(graph, startKey);
    // 记录处理过的节点
    const processed: string[] = [];
    // let node: any = Object.keys(graph.start);
    // 第一步，找出最便宜的节点
    let node: string | null = findLow(costs, processed);
    // 第二步，计算前往该节点的个个邻居的开销
    while (node) {
        const val = costs[node];
        const neighbors = graph[node];
        for (const key in neighbors) {
            if (Object.prototype.hasOwnProperty.call(neighbors, key)) {
                const newVal = val + neighbors[key];
                if (newVal < costs[key]) {
                    costs[key] = newVal;
                    parents[key] = node;
                }
            }
        }
        processed.push(node);
        node = findLow(costs, processed);
    }
    console.log('parents', parents);

    return { costs, parents, graph };
}
/**
 * 狄克斯特拉算法
 */
export function dijkstrasAlgorithm(graph: any) {
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
    let node: string | null = findLow(costs, processed);
    // 第二步，计算前往该节点的个个邻居的开销
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
    return { costs, parents, graph };
}
