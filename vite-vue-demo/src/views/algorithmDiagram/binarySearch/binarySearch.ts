/**
 * 二分查找
 * @param params 需要查找的数组
 */
export function binarySearch(list: number[], condition: number | undefined) {
    const notText = '没有查找到';
    condition = Number(condition);
    if (isNaN(condition)) return '请输入要查询的数字';
    let low = 0; // 头部
    let high = list.length - 1; // 尾部
    if (condition > list[high]) return notText;
    while (low < high) {
        const middle = Math.floor((low + high) / 2);
        if (condition === list[middle]) {
            return middle;
        }
        if (condition < list[middle]) {
            high = middle;
        } else {
            low = middle + 1;
        }
    }
    return notText;
}
