// @ts-nocheck
/**
 * 58 面试题
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

function fn(arr) {
    if (!Array.isArray(arr)) {
        throw new Error(`the ${arr} is not a array`);
    }
    const res = [];
    const map = new Map();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const cur = arr[i];
        const { id, parent } = cur;
        const children = map.get(id);
        if (children) {
            cur.children = children;
        } else {
            cur.children = [];
            map.set(id, cur.children);
        }

        if (parent === 'root') {
            res.push(cur);
        } else {
            map.set(parent, [cur]);
        }
    }
    return res;
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

// 58 同城面试题
let workflows = [
    { id: 'a1', name: '初始人群', parent: 'root' },
    { id: 'a2', name: '动作', parent: 'a1' },
    { id: 'a3', name: '时间', parent: 'az' },
    { id: 'a4', name: '人群分叉', parent: 'a3' },
    { id: 'a5', name: '人群', parent: 'a4' },
    { id: 'ax', name: '是', parent: 'a5' },
    { id: 'ay', name: '否', parent: 'a5' },
    { id: 'a6', name: '人群', parent: 'a4' },
    { id: 'a7', name: '展示运营位', parent: 'a6' },
    { id: 'a9', name: '引入计划', parent: 'a7' },
    { id: 'a10', name: '触发分叉', parent: 'a9' },
    { id: 'a11', name: '动作', parent: 'a10' },
    { id: 'a12', name: '动作', parent: 'a10' },
    { id: 'a13', name: '时间', parent: 'a10' },
    { id: 'a14', name: '发券', parent: 'a11' },
    { id: 'a15', name: '发券', parent: 'a12' },
    { id: 'a16', name: '发消息', parent: 'a13' },
    { id: 'az', name: '插入节点', parent: 'a2' },
];
function fn(arr) {
    if (!Array.isArray(arr)) {
        throw new Error(`the ${arr} is not a array`);
    }
    const res = [];
    const map = new Map();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const cur = arr[i];
        const { id, parent } = cur;
        const children = map.get(id);
        if (children) {
            cur.children = children;
        } else {
            cur.children = [];
            map.set(id, cur.children);
        }

        if (parent === 'root') {
            res.push(cur);
        } else {
            map.set(parent, [cur]);
        }
    }
    return res;
}
