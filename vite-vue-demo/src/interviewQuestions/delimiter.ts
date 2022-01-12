// @ts-nocheck
/**
 * 分隔符
 * 请补全JavaScript代码，要求返回参数数字的千分位分隔符字符串。
 */
function _comma(number) {
    if (typeof number !== 'number') return number;

    // return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    const num = 3;
    const is = number < 0;
    const arrs = String(Math.abs(number)).split('.');
    function transform(arr) {
        if (!arr) return '';

        arr = arr.split('');

        const len = arr.length;

        for (let i = len - 1; i >= num; i -= num) {
            arr.splice(i - num + 1, 0, ',');
        }

        return arr.join('');
    }
    const res = `${is ? '-' : ''}${transform(arrs[0])}`;

    return arrs[1] ? `${res}.${transform(arrs[1])}` : res;
}

console.log(_comma(123));
console.log(_comma(-123));
console.log(_comma(1234567));
console.log(_comma(-1234567));
console.log(_comma(1234567.12345678));
console.log(_comma(-1234567.12345678));
