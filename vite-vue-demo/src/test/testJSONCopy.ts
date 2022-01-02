/**
 * 对象拷贝
 * #### 可以利用JSON 序列化进行对象的深拷贝

    - 有局限性，例如不能转换函数类型等等。

    - 对象中的
    undefined => 忽略
    function => 忽略
    Error() => {}
    new Error() => {}
    RegExp() => {}
    Symbol() => 忽略

    - 对象中的
    undefined => null
    function => null
    Error() => {}
    new Error() => {}
    RegExp() => {}
    Symbol() => null

    #### 总结
    
    - JSON 不存在的类型，能转成对象的先都转成 空对象；转不了的：对象中直接忽略，数组中转成 null。
 */
function testJSONCopy() {
    function fn() {
        return 'fn';
    }
    let e = new Error('错了');
    let reg = /d/g;

    const obj = {
        num: 123,
        str: 'string',
        boo: true,
        nul: null,
        und: undefined,
        obj: {
            num: 123,
            str: 'string',
            boolean: true,
            null: null,
            undefined: undefined,
            object: {},
            array: [],
            fn: fn,
            fnResult: fn(),
            e: e,
            Error: Error('我错了'),
            reg: reg,
            Symbol: Symbol(''),
        },
        arr: [
            123,
            'string',
            true,
            null,
            undefined,
            {},
            [],
            '-1-',
            fn,
            fn(),
            e,
            Error('我错了'),
            '-2-',
            ,
            reg,
            '-3-',
            Symbol(''),
        ],
        // JSON 序列化 实现深拷贝： {
        //     "num": 123,
        //     "str": "string",
        //     "boo": true,
        //     "nul": null,
        //     "obj": {
        //         "num": 123,
        //         "str": "string",
        //         "boolean": true,
        //         "null": null,
        //         "object": {},
        //         "array": [],
        //         "fnResult": "fn",
        //         "e": {},
        //         "Error": {},
        //         "reg": {}
        //     },
        //     "arr": [
        //         123,
        //         "string",
        //         true,
        //         null,
        //         null,
        //         {},
        //         [],
        //         "-1-",
        //         null,
        //         "fn",
        //         {},
        //         {},
        //         "-2-",
        //         null,
        //         {},
        //         "-3-",
        //         null
        //     ]
        // }
    };
    // 引用赋值
    const copyObj0 = obj;

    // 浅拷贝
    const copyObj1 = { ...obj };
    const copyObj2 = Object.assign(obj);

    // 深拷贝
    const objStr = JSON.stringify(obj, null, 4);
    const copyObj3 = JSON.parse(objStr);
    console.log('JSON 序列化 实现深拷贝：', objStr);
}

testJSONCopy();
