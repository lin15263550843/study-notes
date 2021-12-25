/**
 * 选择排序
 * @param params 需要排序的数组
 */
// export function selectSort(list: number[]) {
//     let count = 0;
//     const copyList = [...list];
//     // function getMinValue(list: number[]) {
//     //     let minIndex = 0;
//     //     let minValue = list[minIndex];
//     //     list.forEach((value, index) => {
//     //         count++;
//     //         if (value < minValue) {
//     //             minValue = value;
//     //             minIndex = index;
//     //         }
//     //     });
//     //     return { minIndex, minValue };
//     // }
//     const newArr: number[] = [];
//     while (copyList.length > 0) {
//         let minIndex = 0;
//         let minValue = copyList[minIndex];
//         console.log('copyList.slice(1)', copyList.slice(1));
//         console.log('minIndex', minIndex);
//         console.log('minValue', minValue);
//         for (let index = 1; index < copyList.length; index++) {
//             const value = copyList[index];
//             if (value < minValue) {
//                 minValue = value;
//                 minIndex = index;
//             }
//             count++;
//         }
//         // copyList.forEach((value, index) => {
//         //     if (value < minValue) {
//         //         minValue = value;
//         //         minIndex = index;
//         //     }
//         //     count++;
//         // });
//         // const { minIndex, minValue } = getMinValue(copyList);
//         copyList.splice(minIndex, 1);
//         newArr.push(minValue);
//     }
//     console.log('选择排序执行次数：', count);
//     return newArr;
// }
/**
 * 选择排序
 * @param params 需要排序的数组
 */
export function selectSort(list: number[]): number[] {
    let count = 0;
    const copyList = [...list];
    const length = copyList.length;
    let x = 0;
    while (x < length) {
        let minIndex = x;
        let minValue = copyList[minIndex];
        let y = x + 1;
        while (y < length) {
            const value = copyList[y];
            if (value < minValue) {
                minValue = value;
                minIndex = y;
            }
            count++;
            y++;
        }
        copyList[minIndex] = copyList[x];
        copyList[x] = minValue;
        x++;
    }
    console.log('选择排序执行次数：', count);
    return copyList;
}
/**
 * 冒泡排序
 * @param params 需要排序的数组
 */
export function bubbleSort(list: number[]) {
    let count = 0;
    let length = list.length;

    // const newArr: number[] = [];
    while (length > 1) {
        let i = 0,
            j = 1;
        while (j < length) {
            const value1 = list[i],
                value2 = list[j];
            if (value1 > value2) {
                list[i] = value2;
                list[j] = value1;
            }
            i++;
            j++;
            count++; // 计数，与算法无关
        }
        length--;
    }

    // list.forEach((value, index) => {
    //     if (value < minValue) {
    //         minValue = value;
    //         minIndex = index;
    //     }
    // });
    // function compare(list: number[]) {
    //     let minIndex = 0;
    //     let minValue = list[minIndex];
    //     list.forEach((value, index) => {
    //         if (value < minValue) {
    //             minValue = value;
    //             minIndex = index;
    //         }
    //     });
    //     return { minIndex, minValue };
    // }
    // const newArr: number[] = [];
    // while (list.length > 0) {
    //     const { minIndex, minValue } = getMinValue(copyList);
    //     copyList.splice(minIndex, 1);
    //     newArr.push(minValue);
    // }
    console.log('冒泡排序执行次数：', count);
    return list;
}
