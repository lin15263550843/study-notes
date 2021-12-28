/**
 * 创建一个迭代器对象，来访问数组
 */
const iterableObj = {
    arr: [111, 222, 333, 444, 555, 666],
    [Symbol.iterator]() {
        let index = 0;
        let len = this.arr.length;

        return {
            next: () => {
                if (index < len) {
                    return { done: false, value: this.arr[index++] };
                } else {
                    return { done: true, value: undefined };
                }
            },
        };
    },
};

for (const iterator of iterableObj) {
    console.log('iterableObj iterator ----->>>', iterator);
}

const iterator1 = iterableObj[Symbol.iterator]();

console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());
console.log('iterator1 next ----------->>>', iterator1.next());

const iterator2 = iterableObj[Symbol.iterator]();

console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());
console.log('iterator2 next ----------->>>', iterator2.next());

const list = ['a', 'b', 'c'];
const obj2 = { x: 'x', y: 'y' };
console.log('obj ... ----------------->>>', { ...obj2, ...iterableObj }); // 此处是 ES9 语法特性，用的不是迭代器语法
console.log('list ... ----------------->>>', [...list, ...iterableObj]); //  ['a', 'b', 'c', 111, 222, 333, 444, 555, 666]
/**
 * 迭代器函数
 * @param arr 要迭代的数据源
 */
function createArrayIterator(arr: any[]) {
    let index = 0;
    let len = arr.length;

    return {
        next: () => {
            if (index < len) {
                return { done: false, value: arr[index++] };
            } else {
                return { done: true, value: undefined };
            }
        },
    };
}
const iterator3 = createArrayIterator([111, 222, 333]);

console.log('iterator3 next ----------->>>', iterator3.next());
console.log('iterator3 next ----------->>>', iterator3.next());
console.log('iterator3 next ----------->>>', iterator3.next());
console.log('iterator3 next ----------->>>', iterator3.next());
console.log('iterator3 next ----------->>>', iterator3.next());
console.log('iterator3 next ----------->>>', iterator3.next());
