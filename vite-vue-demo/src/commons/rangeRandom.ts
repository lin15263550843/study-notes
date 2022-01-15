/**
 * 生成范围内的随机数
 */
export function genrangeRandom(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

/**
 * 测试
 */
const n = 18;
const start = 2;
const end = 20;
const res: any = [];

while (res.length < n) {
    const v = genrangeRandom(start, end);
    if (v !== res[res.length - 1]) {
        res.push(v);
    }
}

console.log('随机结果：', res);
