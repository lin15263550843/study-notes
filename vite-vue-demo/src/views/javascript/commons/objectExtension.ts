//@ts-nocheck
/**
 * Object d的扩展  or 自定义实现
 */
/**
 * 手动实现 Object.freeze 方法
 * 冻结
 * 注意：
 *      1、不可扩展性（不能添加新属性）
 *      2、不可枚举的属性也要重新冻结
 *      3、注意 Symbol 类型的冻结
 *
 *      注意深度递归冻结（Object.freeze 本身也是浅冻结）
 *      注意访问器属性的设置
 *
 */
const _objectFreeze = object => {
    // 补全代码
    if (typeof object !== 'object' || object === null) {
        throw new TypeError(`the ${object} is not a object`);
    }

    const keys = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols(object);

    [...keys, ...symbols].forEach(key => {
        Object.defineProperty(object, key, {
            configurable: false,
            writable: false,
        });
    });

    Object.preventExtensions(object);
};

function test() {
    const symbol = Symbol('symbol');
    const o = { name: 'z', fn: function () {}, _age: 18, [symbol]: 'symbol' };
    let age = 18;
    Object.defineProperty(o, 'age', {
        configurable: true,
        enumerable: true,
        get() {
            // return this._age;
            return age;
        },
        set(val) {
            // this._age = val;
            age = val;
        },
    });
    Object.defineProperty(o, 'notEnumerable', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: '不可枚举的属性',
    });

    // o.__proto__ = { a: 123 };
    // for (const key in o) {
    //     // 会把 a 也遍历出来
    //     console.log('o[key]', key, o[key]);
    // }
    console.log('Reflect.ownKeys(o)', Reflect.ownKeys(o));

    // Object.freeze(o);
    _objectFreeze(o);

    try {
        o.age = 28;
        o.notEnumerable = '不可枚举的属性 new';
        o[symbol] = 'symbol new';
        o.__proto__ = { a: 123 };
        Object.setPrototypeOf(o, { a: 123 });
    } catch (error) {
        console.log(error);
    }

    console.log('o--------------------------------------------------', o);
    console.log('Object.keys(o)-------------------------------------', Object.keys(o));
    console.log('Object.getOwnPropertyNames(o)----------------------', Object.getOwnPropertyNames(o));
    console.log('Object.getOwnPropertySymbols(o)--------------------', Object.getOwnPropertySymbols(o));

    // _objectFreeze(o);
    // o.name = 'g';
    // o.fn = 1;
    // o.o = 1;
    // const result = o.name === 'z' && typeof o.fn === 'function' && o.o === undefined;
    // return result;
}
console.log('测试结果：', test());
