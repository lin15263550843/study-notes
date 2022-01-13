// @ts-nocheck
/**
 * 高频数据类型
 */
const _findMostType = array => {
    // 补全代码
    if (!Array.isArray(array)) return [];

    const map = new Map();

    array.forEach(v => {
        let type = typeof v;

        if (type === 'function') {
            type = 'object';
        }

        if (map.has(type)) {
            map.set(type, map.get(type) + 1);
        } else {
            map.set(type, 1);
        }
    });

    const arr = Array.from(map);
    const num = arr[0][1];

    arr.sort((a, b) => b[1] - a[1]);

    const res = [];

    arr.forEach(([key, val], i) => {
        if (i === 0) {
            res.push(key);
        } else {
            if (val >= num) {
                console.log('val=---', key, val);

                res.push(key);
            }
        }
    });

    res.push(num);

    return res;
};

console.log('结果：', _findMostType([1, '1', {}, {}, 2, 3, 4, 3, 3, '', '', '', '', '']));
