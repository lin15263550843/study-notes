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
 * WeakMap WeakSet 就先忽略了
 * @param original
 * @returns
 */
export function deepClone(original: any) {
    // 判断如果是函数类型, 那么直接使用同一个函数
    // 更复杂点的话可以 new Function 比较麻烦，一般来说直接用同一个函数就可以，因为函数本来就是为了复用的
    if (isFunction(original)) return original;

    // Symbol 类型，需要重新创建一个 symbol
    if (isSymbol(original)) return Symbol(original.description);

    // 如果不是 Object 类型，是原始类型，则直接返回
    if (!isObject(original)) return original;

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

    const newObj: any = isArray(original) ? [] : {};
    // 遍历 object
    for (const key in original) {
        if (Object.prototype.hasOwnProperty.call(original, key)) {
            newObj[key] = deepClone(original[key]);
        }
    }

    const symbolKeys = Object.getOwnPropertySymbols(original);
    // key 为 Symbol 类型时，进行特殊处理
    for (const sKey of symbolKeys) {
        newObj[sKey] = deepClone(original[sKey]);
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
}
testDeepClone();
