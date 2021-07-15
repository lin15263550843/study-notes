/**
 * 二分查找
 * @param params 需要查找的数组
 */
export function selectSort(list: number[]) {
    console.log('selectSort---list', list);
    const copyList = [...list];

    function getMinValue(list: number[]) {
        let minIndex = 0;
        let minValue = list[minIndex];
        list.forEach((value, index) => {
            if (value < minValue) {
                minValue = value;
                minIndex = index;
            }
        });
        return { minIndex, minValue };
    }
    const newArr: number[] = [];
    while (copyList.length > 0) {
        const { minIndex, minValue } = getMinValue(copyList);
        copyList.splice(minIndex, 1);
        newArr.push(minValue);
    }

    return newArr;
}
