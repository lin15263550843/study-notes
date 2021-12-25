import { isFunction } from '@/commons';
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
 * 测试执行时间
 * @param callback 回调函数
 * @param length 元素数量
 */
export function testExecTime(callback: any, length: number, msg: string) {
    const arr = new Array(length).fill(undefined).map(() => (Math.random() * length) >>> 0);
    const s = `[${length}]大小，执行【${msg}】时间为：`;
    // console.log(arr);
    console.time(s);
    isFunction(callback) && callback(arr);
    console.timeEnd(s);
    return arr;
}
