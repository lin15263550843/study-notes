/**
 * 生成器函数
 */
function* generatorFun(n0: number): any {
    console.log('函数开始执行~', n0);

    const v1 = 111 * n0;
    console.log('第一段代码:', n0, v1);
    const n1 = yield v1;

    const v2 = 222 * n1;
    console.log('第二段代码:', n1, v2);
    const n2 = yield v2;

    // return 123; // 终止执行

    const v3 = 333 * n2;
    console.log('第三段代码:', n2, v3);
    const n3 = yield v3;

    const v4 = 444 * n3;
    console.log('函数执行结束~', n3, v4);
    return v4;
}
// 调用生成器函数时, 会给我们返回一个生成器对象
const generator = generatorFun(1);

console.log('---------------------------------------');
// 开始执行第一段代码
console.log('返回值：', generator.next(55555)); // 此处传递没有意义
console.log('---------------------------------------');
// 开始执行第二段代码
console.log('返回值：', generator.next(2));
// console.log('返回值：', generator.return(123)); // 终止执行
// console.log('返回值：', generator.throw(123)); // 抛出异常，然后终止执行
console.log('---------------------------------------');
// 开始执行第三段代码
console.log('返回值：', generator.next(3));
console.log('---------------------------------------');
console.log('返回值：', generator.next(4));
console.log('---------------------------------------');

/**
 * 迭代器函数
 * @param arr 要迭代的数据源
 */
function* createArrayIterator2(arr: any[]) {
    // // 第一种写法
    // let index = 0;
    // yield arr[index++];
    // yield arr[index++];
    // yield arr[index++];

    // // 第二种写法
    // for (const iterator of arr) {
    //     yield iterator;
    // }

    // 第三种写法
    yield* arr;
}
const iterator4 = createArrayIterator2([111, 222, 333]);

console.log('iterator4 next ----------->>>', iterator4.next());
console.log('iterator4 next ----------->>>', iterator4.next());
console.log('iterator4 next ----------->>>', iterator4.next());
console.log('iterator4 next ----------->>>', iterator4.next());
console.log('iterator4 next ----------->>>', iterator4.next());

/**
 * 迭代器函数
 * @param arr 要迭代的范围
 */
function* createRangeIterator(start: number, end: number) {
    let index = start;
    while (index < end) {
        yield index++;
    }
}
const iterator5 = createRangeIterator(15, 18);

console.log('iterator5 next ----------->>>', iterator5.next());
console.log('iterator5 next ----------->>>', iterator5.next());
console.log('iterator5 next ----------->>>', iterator5.next());
console.log('iterator5 next ----------->>>', iterator5.next());
console.log('iterator5 next ----------->>>', iterator5.next());
/**
 * 生成器代替迭代器
 */
class Room {
    name: string | undefined = undefined;
    address: string | undefined = undefined;
    students: string[] = [];

    constructor(name: string, address: string, students: string[]) {
        this.name = name;
        this.address = address;
        this.students = students;
    }

    entry(student: string) {
        this.students.push(student);
    }

    foo = function () {
        console.log('foo');
    };

    bar = () => {
        console.log('bar');
    };

    // [Symbol.iterator] = function* (this: any) {
    //     yield* this.students;
    // };
    *[Symbol.iterator](this: any) {
        yield* this.students;
    }
}

const room = new Room('阶梯 405', '公教楼', ['A', 'V', 'B']);

for (const student of room) {
    console.log('room student:', student);
}
