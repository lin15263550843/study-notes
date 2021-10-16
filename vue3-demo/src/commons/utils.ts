/**
 * 执行次数计数器
 */
export const executionCounter = {
    sum: 0,
    start(sum = 0) {
        this.sum = sum;
    },
    counter() {
        this.sum++;
    },
    end(msg: string) {
        console.log(msg, '--->>>', this.sum);
    },
};
/**
 * 交换两个元素
 */
export function exch(list: any[], x: any, y: any) {
    const v = list[x];
    list[x] = list[y];
    list[y] = v;
    return list;
}
