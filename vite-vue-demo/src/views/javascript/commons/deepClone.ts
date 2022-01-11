const isObject = (val: any) => val !== null && typeof val === 'object';
const isFunction = (val: any) => typeof val === 'function';
const isSymbol = (val: any) => typeof val === 'symbol';
const isArray = Array.isArray;
const isError = (val: any) => val instanceof Error;
const isRegExp = (val: any) => val instanceof RegExp;
const isSet = (val: any) => val instanceof Set;
const isMap = (val: any) => val instanceof Map;
/**
 * 深拷贝
 *
 * 缺陷 or 未实现：不能拷贝对象原型上的方法及属性
 *
 * WeakMap WeakSet 就先忽略了
 *
 * @param original
 * @returns
 */
export function deepClone(original: any, cacheMap = new WeakMap()) {
    // 判断如果是函数类型, 那么直接使用同一个函数
    // 更复杂点的话可以 new Function 比较麻烦，一般来说直接用同一个函数就可以，因为函数本来就是为了复用的
    if (isFunction(original)) return original;

    // Symbol 类型，需要重新创建一个 symbol
    if (isSymbol(original)) return Symbol(original.description);

    // Error 类型，直接返回，使用同一个
    if (isError(original)) return original;

    // RegExp 类型，直接返回，使用同一个
    if (isRegExp(original)) return new RegExp(original);

    // Set 类型，新创建个 set
    // 警告：更严格来说应该遍历 set 的值，如果是对象类型也要进行 deepClone，目前就先不实现了
    if (isSet(original)) return new Set(original);
    // Map 类型，新创建个 map
    // 警告：更严格来说应该遍历 set 的值，如果是对象类型也要进行 deepClone，目前就先不实现了
    if (isMap(original)) return new Map(original);

    // 如果不是 Object 类型，是原始类型，则直接返回
    if (!isObject(original)) return original;

    // 判断缓存中对象是否已存在，如果存在直接返回，说明是 循环引用 的对象
    if (cacheMap.has(original)) return cacheMap.get(original);

    const newObj: any = isArray(original) ? [] : {};

    // 缓存对象，用来处理循环引用的对象
    cacheMap.set(original, newObj);

    // // 遍历 original 的所有属性
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

    // 遍历 object 所有的属性，包含 symbol 类型的，注意：也会把 Array 的 length 遍历出来，不影响
    const keys = Reflect.ownKeys(original);
    for (const key of keys) {
        newObj[key] = deepClone(original[key], cacheMap);
    }

    return newObj;
}
function testDeepClone() {
    function fn() {
        return 'fn';
    }
    let e = new Error('错了');
    let reg = /d/g;
    const symbolkey = Symbol('作为 key 值');
    const obj = {
        num: 123,
        string: 'string',
        boolean: true,
        null: null,
        undefined: undefined,
        object: {},
        array: [],
        reg: reg,
        Symbol: Symbol(''),
        [symbolkey]: 'symbol 作为 key 值',
        set: new Set([123, 456, 789]),
        map: new Map([
            [123, 123],
            [456, 456],
            [789, 789],
        ]),
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
            'Symbol: ',
            Symbol(''),
            'symbolkey: ',
            symbolkey,
            'set: ',
            new Set([123, 456, 789]),
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
    console.log('obj ------------------>>>', obj);
    console.log('newObj --------------->>>', newObj);
    console.log('obj === newObj ------->>>', obj === newObj);
    console.log('---------------------->>>', obj.object === newObj.object);
    console.log('---------------------->>>', obj.array === newObj.array);
    console.log('---------------------->>>', obj.reg === newObj.reg);
    console.log('---------------------->>>', obj.Symbol === newObj.Symbol);
    // console.log('---------------------->>>', obj[symbolkey], newObj[symbolkey]);
    // console.log('---------------------->>>', obj[symbolkey] === newObj[symbolkey]); // 值相同
    console.log('---------------------->>>', obj.set === newObj.set);
    console.log('---------------------->>>', obj.map === newObj.map);
    newObj.set.add(110);
    newObj.map.set(110, 110);
    console.log('----------------------------------------------------------------------->>>');
    console.log('---------------------->>>', obj.fn === newObj.fn);
    console.log('---------------------->>>', obj.e === newObj.e);
    console.log('---------------------->>>', obj.error === newObj.error);

    // 循环引用
    let loopObj: any = { a: 123 };
    loopObj.loopObj = loopObj;
    const newLoopObj = deepClone(loopObj);
    console.log('循环引用 ------------->>>', newLoopObj);
    console.log('循环引用 ------------->>>', newLoopObj === newLoopObj.loopObj);
    console.log('循环引用 ------------->>>', newLoopObj.loopObj === newLoopObj.loopObj.loopObj);
    console.log('循环引用 ------------->>>', newLoopObj.loopObj.loopObj === newLoopObj.loopObj.loopObj.loopObj);
}
testDeepClone();
