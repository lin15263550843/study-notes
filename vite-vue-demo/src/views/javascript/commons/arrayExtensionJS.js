/**
 * js 版本
 * 数组去重
 */
Array.prototype.uniq = function () {
    // const o = {};
    // const arr = [];
    // this.forEach(value => {
    //     if (typeof value === 'object' && value !== null) {
    //         arr.push(value);
    //     } else if (!o[value + typeof value]) {
    //         arr.push(value);
    //         o[value + typeof value] = true;
    //     }
    // });
    // return arr;
    return Array.from(new Set(this));
};
