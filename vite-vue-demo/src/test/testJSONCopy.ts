/**
 * 对象拷贝
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
