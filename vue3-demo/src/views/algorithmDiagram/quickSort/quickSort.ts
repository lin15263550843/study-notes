/**
 * 递归求和
 * @param list 需要求和的数组
 * @returns 结果
 */
export function sum(list: number[] = [], value = 0): number {
    // let total = 0; // 每次递归前都会重新生明为 0 应该放在函数外边，重新调用时设置为 0
    const copyList = [...list];
    const lastValue = copyList.pop();
    console.log('lastValue', lastValue);
    // -----start---最开始的版本----------------------
    // if (lastValue !== undefined) {
    //     total = lastValue + sum(copyList);
    // }
    // return total;
    // -----end---最开始的版本------------------------

    // -----start---优化的版本---去掉中间变量 total---------------------
    // if (lastValue === undefined) return 0;
    // return lastValue + sum(copyList);
    // -----end---优化的版本--------------------------

    // -----start---再次优化的版本---尾递归优化---------------------
    if (lastValue === undefined) return value;
    return sum(copyList, value + lastValue);
    // -----end---再次优化的版本--------------------------
}
/**
 * 分而治之-递归
 */
export function recursion(width = 0, height = 0): number {
    const remainder = width % height;
    // let x = height;
    // if (remainder !== 0) {
    //     x = recursion(x, remainder);
    // }
    // return x;

    // 优化如下
    if (remainder === 0) return height;
    return recursion(height, remainder);
}
/**
 * 快速排序
 */
export function descendingSort(list: number[]): number[] {
    if (list.length < 2) return list;
    if (list.length === 2) {
        const [v1, v2] = list;
        return v1 > v2 ? [v2, v1] : list;
    }
    const copyList = [...list];
    const firstValue = copyList.shift() || list[0];
    const smalls: number[] = [];
    const bigs: number[] = [];
    copyList.forEach(value => {
        if (value > firstValue) {
            bigs.push(value);
        } else {
            smalls.push(value);
        }
    });
    const arr1 = descendingSort(smalls);
    const arr2 = descendingSort(bigs);
    // console.log('[...arr1, firstValue, ...arr2]---', [...arr1, firstValue, ...arr2]);
    return [...arr1, firstValue, ...arr2];
}
