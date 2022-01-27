// @ts-nocheck
/**
 * 高频数据类型
 */
const _findMostType = array => {
    // 补全代码
    if (!Array.isArray(array)) return [];

    const map = new Map();
    let max = 0;

    array.forEach(val => {
        let type = typeof val;

        if (type === 'function') {
            type = 'object';
        }

        const value = map.get(type);
        if (map.has(type)) {
            map.set(type, value + 1);
        } else {
            map.set(type, 1);
        }

        if (value + 1 > max) {
            max = value + 1;
        }
    });

    const res = [];

    map.forEach((val, key) => {
        if (val === max) res.push(key);
    });
    res.push(max);

    return res;
};
console.log('结果：', _findMostType([1, '1', {}, {}, 2, 3, 4, 3, 3, '', '', '', '', '']));
