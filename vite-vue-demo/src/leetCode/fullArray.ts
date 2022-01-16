// @ts-nocheck
const _permute = string => {
    // 补全代码
    if (typeof string !== 'string') return [];

    const arr = string.split('');
    const len = arr.length;
    const res = [];
    const val = [];
    const rec = () => {
        if (val.length === len) {
            res.push(val.join(''));
            return;
        }
        arr.forEach(v => {
            if (!val.includes(v)) {
                val.push(v);
                rec();
                val.pop();
            }
        });
    };

    rec();

    return res;
};

console.log('全排列结果：', _permute('rap'));

function test() {
    const o = _permute('rap');
    const judge =
        o.length === 6 &&
        o.includes('rap') &&
        o.includes('rpa') &&
        o.includes('arp') &&
        o.includes('apr') &&
        o.includes('pra') &&
        o.includes('par');
    return judge;
}
console.log('test()：', test());
