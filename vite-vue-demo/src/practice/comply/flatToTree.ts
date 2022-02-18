// @ts-nocheck
/**
 * 扁平化数据转成树形结构
 */
let areaArr = [
    { pid: 10000, id: 11000, name: '浙江省' },
    { id: 10000, name: '中国' },
    { pid: 11000, id: 11100, name: '杭州市' },
    { pid: 11100, id: 11101, name: '西湖区' },
    { pid: 11100, id: 11102, name: '萧山区' },
    { pid: 11000, id: 11200, name: '金华市' },
    { pid: 11200, id: 11201, name: '京东区' },
    { pid: 11200, id: 11202, name: '婺城区' },
    { pid: 10000, id: 12000, name: '湖南省' },
    { pid: 12000, id: 12100, name: '长沙市' },
    { pid: 12100, id: 12101, name: '长沙市区1' },
    { pid: 12100, id: 12102, name: '长沙市区2' },
    { pid: 12000, id: 12200, name: '岳阳市' },
    { pid: 12200, id: 12201, name: '岳阳市区1' },
    { pid: 12200, id: 12202, name: '岳阳市区2' },
];
// 算是最优解了
function createTree(arr) {
    if (!arr || arr.length === 0) return [];

    const result = [];
    const map = new Map();

    arr.forEach(item => {
        const { id, pid } = item;
        const children = map.get(id);
        if (children) {
            item.chidren = children;
        } else {
            item.chidren = [];
            map.set(id, item.chidren);
        }

        if (pid) {
            const a = map.get(pid);
            if (a) {
                a.push(item);
            } else {
                map.set(pid, [item]);
            }
        } else {
            result.push(item);
        }
    });
    // console.log(map)

    return result;
}

// function createTree(arr) {
//     if (!arr || arr.length === 0) return []

//     const map = new Map()

//     arr.forEach(item => {
//         const { id, pid } = item
//         const a = map.get(pid)
//         if (a) {
//             a.push(item)
//             map.set(pid, a)
//         } else {
//             map.set(pid, [item])
//         }
//     })

//     const result = []

//     arr.forEach(item => {
//         const { id, pid } = item

//         if (!pid) {
//             result.push(item)
//         }
//         item.children = map.get(id) || []
//     })

//     return result
// }

// function createTree(arr) {
//     if (!arr || arr.length === 0) return []

//     const result = []
//     const map = {}

//     arr.forEach(item => {
//         const { id, pid } = item
//         map[id] = item
//     })
//     arr.forEach(item => {
//         const { id, pid } = item
//         if (pid) {
//             const children = map[pid].children
//             if (children) {
//                 children.push(item)
//             } else {
//                 map[pid].children = [item]
//             }
//         } else {
//             result.push(item)
//         }
//     })

//     return result
// }
console.log(createTree(areaArr));
console.log('areaArr', areaArr);
