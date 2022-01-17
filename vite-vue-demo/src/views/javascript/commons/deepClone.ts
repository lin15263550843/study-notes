// @ts-nocheck
const isObject = val => val !== null && typeof val === 'object';
const isFunction = val => typeof val === 'function';
const isSymbol = val => typeof val === 'symbol';
const isArray = Array.isArray;
const isError = val => val instanceof Error;
/**
 * 对象深拷贝
 * 注意
 *     1、Set/Map 中对象类型的值是浅拷贝
 *     2、函数类型的值未使用 new Function 去创建新的
 *     3、大家有兴趣可以自己去实现 ^_^
 */
export function deepClone(original, cacheMap = new WeakMap()) {
    // 判断如果是函数类型, 那么直接使用同一个函数
    // ！！！注意：更复杂点的话可以使用 new Function 创建一个新函数，使用正则去匹配参数进行处理
    // 一般来说直接用同一个函数就可以，因为函数本来就是为了复用的
    if (isFunction(original)) return original;

    // Symbol 类型，需要重新创建一个 symbol
    if (isSymbol(original)) return Symbol(original.description);

    // Error 类型，直接返回，使用同一个
    if (isError(original)) return original;

    // 如果不是 Object 类型，是原始类型，则直接返回
    if (!isObject(original)) return original;

    // !!!注意：更严格来说需要再遍历 set/map 的值，如果是对象类型也要进行 deepClone，目前就先不实现了
    const types = [RegExp, Date, Map, WeakMap, Set, WeakSet];
    // 类型检测，如果是 types 中的类型则调用 相应的构造函数创建一个新对象
    if (types.some(type => original instanceof type)) {
        const constr = original.constructor;
        // const reg = /^(RegExp|Date|Map|WeakMap|Set|WeakSet)$/;
        // 使用 reg 匹配 constr.name 的话无法应对有继承的情况，例如：Myset extends Set
        if (constr && typeof constr === 'function') {
            return new constr(original);
        }
    }

    // 判断缓存中对象是否已存在，如果存在直接返回，说明是 循环引用 的对象
    if (cacheMap.has(original)) return cacheMap.get(original);

    const newObj = isArray(original) ? [] : {};

    // 缓存对象，用来处理循环引用的对象
    cacheMap.set(original, newObj);

    // // 遍历 original 的所有 普通 属性
    // for (const key in original) {
    //     if (Object.prototype.hasOwnProperty.call(original, key)) {
    //         newObj[key] = deepClone(original[key], cacheMap);
    //     }
    // }
    // 遍历 original 中 为 Symbol 类型的 key 进行特殊处理
    // const symbolKeys = Object.getOwnPropertySymbols(original);
    // for (const sKey of symbolKeys) {
    //     newObj[sKey] = deepClone(original[sKey], cacheMap);
    // }

    // 遍历 object 所有的属性，赋值到新对象，包含 symbol 类型的，注意：也会把 Array 的 length 遍历出来，不影响
    const keys = Reflect.ownKeys(original);
    for (const key of keys) {
        newObj[key] = deepClone(original[key], cacheMap);
    }
    // 重置新对象的原型
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(original));

    return newObj;
}
/**
 * 测试
 */
function testDeepClone() {
    function fn() {
        return 'fn';
    }
    let e = new Error('错了');
    let reg = /d/g;
    const symbolkey = Symbol('作为 key 值');
    class MySet extends Set {
        mySet: string;
        constructor(...args) {
            super(...args);
            this.mySet = 'mySet';
        }
    }
    const prototpyeObj = {};
    Object.setPrototypeOf(prototpyeObj, { super: '原型上的值', fn() {} });
    const obj = {
        num: 123,
        string: 'string',
        boolean: true,
        null: null,
        undefined: undefined,
        object: {},
        array: [],
        reg: reg,
        date: new Date(),
        Symbol: Symbol(''),
        [symbolkey]: 'symbol 作为 key 值',
        set: new Set([123, 456, 789]),
        mySet: new MySet([111, 222, 333]),
        map: new Map([
            [123, 123],
            [456, 456],
            [789, 789],
        ]),
        prototpyeObj,
        arr: [
            'number: ',
            123,
            'string: ',
            'string',
            'boolean: ',
            true,
            'null: ',
            null,
            'undefined: ',
            undefined,
            'object: ',
            {},
            'array: ',
            [],
            'reg: ',
            reg,
            new Date(),
            'Symbol: ',
            Symbol(''),
            'symbolkey: ',
            symbolkey,
            'set: ',
            new Set([123, 456, 789]),
            new MySet([111, 222, 333]),
            'map: ',
            new Map([
                [123, 123],
                [456, 456],
                [789, 789],
            ]),
            'fn: ',
            fn,
            'e: ',
            e,
            'error: ',
            Error('我错了'),
        ],
        fn: fn,
        // fnResult: fn(),
        e: e,
        error: Error('我错了'),
    };

    const newObj = deepClone(obj);
    console.log('obj --------------------------->>>', obj);
    console.log('newObj ------------------------>>>', newObj);
    console.log('obj === newObj ---------------->>>', obj === newObj);
    console.log('obj.object === newObj.object--->>>', obj.object === newObj.object);
    console.log('obj.array === newObj.array----->>>', obj.array === newObj.array);
    console.log('obj.reg === newObj.reg--------->>>', obj.reg === newObj.reg);
    console.log('obj.Symbol === newObj.Symbol--->>>', obj.Symbol === newObj.Symbol);
    console.log('obj.set === newObj.set--------->>>', obj.set === newObj.set);
    console.log('obj.mySet === newObj.mySet----->>>', obj.mySet === newObj.mySet);
    console.log('obj.map === newObj.map--------->>>', obj.map === newObj.map);
    newObj.set.add(110);
    newObj.mySet.add(444);
    newObj.map.set(110, 110);
    console.log('Function 和 Error 直接使用同一个值-------------------------------');
    console.log('obj.fn === newObj.fn----------->>>', obj.fn === newObj.fn);
    console.log('obj.e === newObj.e------------->>>', obj.e === newObj.e);
    console.log('obj.error === newObj.error----->>>', obj.error === newObj.error);
    console.log('对象原型的属性和方法------------->>>', obj.prototpyeObj.super);
    // 循环引用
    let loopObj = { a: 123 };
    loopObj.loopObj = loopObj;
    const newLoopObj = deepClone(loopObj);
    console.log('循环引用 ------------->>>', newLoopObj);
    console.log('循环引用 ------------->>>', newLoopObj === newLoopObj.loopObj);
    console.log('循环引用 ------------->>>', newLoopObj.loopObj === newLoopObj.loopObj.loopObj);
    console.log('循环引用 ------------->>>', newLoopObj.loopObj.loopObj === newLoopObj.loopObj.loopObj.loopObj);
}
testDeepClone();
/**
 * 测试继承的 set 对象
 */
function testExtendObj() {
    console.log('测试继承的 set 对象------------------------------------------------------------>>>');
    class MySet extends Set {
        mySet: string;
        constructor(...args) {
            super(...args);
            this.mySet = 'mySet';
        }
    }
    const sets = { set: new Set([123, 456]), mySet: new MySet([789, 101]) };
    const newSets = deepClone(sets);
    console.log('newObj ---------------->>>', sets);
    console.log('newSets --------------->>>', newSets);
    console.log('----------------------->>>', newSets.set === sets.set);
    console.log('----------------------->>>', newSets.mySet === sets.mySet);
}
// testExtendObj();
