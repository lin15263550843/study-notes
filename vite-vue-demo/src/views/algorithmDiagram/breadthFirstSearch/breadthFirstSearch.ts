/**
 * 广度优先搜索
 *
 * 第一类问题：存在不存要查找的
 */
export function breadthFirstSearch1(obj: any = {}, findValue: string) {
    const queue = []; // 创建一个队列，用于查询要寻找的值
    const searched: any = {}; // 存放已经检查过的，防止无限循环以及做无用功
    queue.push(...(obj.AA || []));
    while (queue.length > 0) {
        const outValue = queue.shift();
        if (searched[outValue]) continue; // 已经检查过的直接跳过该次循环
        if (findValue !== outValue) {
            searched[outValue] = true;
            queue.push(...(obj[outValue] || []));
        } else {
            return true;
        }
    }
    return false;
}
/**
 * 广度优先搜索
 *
 * 第二类问题：如果存在，最短路径是多少
 */
export function breadthFirstSearch2(obj: any = {}, findValue: string): number {
    const queue = []; // 创建一个队列，用于查询要寻找的值
    const searched: any = {}; // 存放已经检查过的，防止无限循环以及做无用功
    const count = 1;
    const qcl = queue.length;
    queue.push(...(obj.AA || []));
    while (queue.length > 0) {
        const outValue: string = queue.shift();
        if (searched[outValue]) continue; // 已经检查过的直接跳过该次循环
        if (findValue !== outValue) {
            searched[outValue] = true;
            const outs = obj[outValue] || [];
            queue.push(...outs);
        } else {
            return 222;
        }
    }
    return 333;
}
