function initTest(params) {
    // console.log('iinitTest===>>>', params)
    // test({})
    // f()
    // left()
    // equal()
    // logicalAnd()
    // test1()
    // date()
    // myPromise()
    // myPromise2()
    // myWindow()
    // getObject()
    // forCycle()
    // prototypeTest()
    // cteateObj()
    // objectCreate()
    // testAttributes()
    // defineProperty()
    // objConstructor()
    // getObjectType()
    // isObject()
    // serialization()
    // overwirteToString()
    // testArray()
    // forInOrder()
    // argumentsLength()
    // objToString()
    // prototypeConstuctor()
    // getBrowserVersion()
    // mySetTimeout()
    // windowLocation()
    // windowHistory()
    // windowScreen()
    // windowOpen()
    // forTest()
    // testString()
    // stringPrototype()
    arrayMaxLength()
}

/**
 * 声明提前了
 * @param {{}} o
 */
function test(o) {
    var i = o
    if (typeof o == 'object') {
        var j = 0
        for (var k = 0; k < 10; k++) {
            // console.log(k)
        }
        console.log('k==========', k)
    }
    console.log('j==========', j)
}

var scope = 'global'

/**
 * 局部变量遮盖了全局变量
 */
function f() {
    console.log('scope1=============', scope)
    var scope = 'local'
    console.log('scope2=============', scope)
    console.log('this=============', this)
    console.log('window=============', window)
}

function left() {
    var a = 1
    ++a
    var b = a++
    console.log('b=============', b)

    function fc() {
        return a
    }

    fc() = 123 // 函数不能返回左值
    console.log('b=============', fc)
}

function equal() {
    var a = null
    var b = null
    console.log('0 === -0:::', 0 === -0)
    console.log('a === b:::', a === b)
    console.log('true + true:::', true + true)
    console.log('null === null:::', null === null)
    console.log('NaN === NaN:::', NaN === NaN)
    console.log('undefined === undefined:::', undefined === undefined)

    console.log('true + true == 2:::', true + true == 2)
}

// 逻辑与 && 并不总是返回 布偶值
function logicalAnd() {
    var a = null
    var t = true
    var b = 123
    var d = 'd'
    var e = 99999

    var f = ''
    console.log('a && b', a && b)
    console.log('t && b', t && b)
    console.log('d && b', d && b)
    console.log('e && f', e && f)
    console.log('e && a', e && a)
}

function test1() {
    function cls() {
        this.a = 100
        return { getValue: () => this.a }
    }

    var o = new cls()
    // 100//a在外面永远无法访问到
    console.log('o===============', o.getValue())
}

function date() {
    console.log(typeof new Date()) // 1
    console.log(typeof Date())
}

// 异步
function myPromise() {
    var r = new Promise(function (resolve, reject) {
        console.log('a')
        resolve()
    })
    setTimeout(() => console.log('d'), 0)
    r.then(() => console.log('c'))
    console.log('b')
}

function myPromise2() {
    setTimeout(() => console.log('d'), 0)
    var r = new Promise(function (resolve, reject) {
        resolve()
    })
    r.then(() => {
        var begin = Date.now()
        while (Date.now() - begin < 1000) {
            console.log('white===', Date.now() - begin)
        }
        console.log('c1')
        new Promise(function (resolve, reject) {
            resolve()
        }).then(() => console.log('c2'))
    })
}

// window 对象
function myWindow() {
    // console.log('window:::', window)
    console.log('this:::', this)
    var w = function fw() {}
    var o = {}
    w.prototype.wc = '哈哈哈'
    console.log('o============', o)
    console.log('w============', new w())
}

function getObject() {
    var set = new Set()
    var objects = [
        eval,
        isFinite,
        isNaN,
        parseFloat,
        parseInt,
        decodeURI,
        decodeURIComponent,
        encodeURI,
        encodeURIComponent,
        Array,
        Date,
        RegExp,
        Promise,
        Proxy,
        Map,
        WeakMap,
        Set,
        WeakSet,
        Function,
        Boolean,
        String,
        Number,
        Symbol,
        Object,
        Error,
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        TypeError,
        URIError,
        ArrayBuffer,
        SharedArrayBuffer,
        DataView,
        Float32Array,
        Float64Array,
        Int8Array,
        Int16Array,
        Int32Array,
        Uint8Array,
        Uint16Array,
        Uint32Array,
        Uint8ClampedArray,
        Atomics,
        JSON,
        Math,
        Reflect
    ]
    objects.forEach(o => set.add(o))

    for (var i = 0; i < objects.length; i++) {
        var o = objects[i]
        for (var p of Object.getOwnPropertyNames(o)) {
            var d = Object.getOwnPropertyDescriptor(o, p)
            if ((d.value !== null && typeof d.value === 'object') || typeof d.value === 'function')
                if (!set.has(d.value)) set.add(d.value), objects.push(d.value)
            if (d.get) if (!set.has(d.get)) set.add(d.get), objects.push(d.get)
            if (d.set) if (!set.has(d.set)) set.add(d.set), objects.push(d.set)
        }
    }
    console.log('set:::', set)
}

// for 循环赋值
function forCycle() {
    var o = { x: 1, y: 2, z: 3 }
    var a = [],
        i = 0
    for (item in o /*empty*/);
    // for (item in o) {
    //     console.log(item)
    //     a[i++],
    // }
    console.log(a)
    console.log('o======', o)
    console.log('o.prototype======', o.prototype)
    for (const key in ['x', 'y', 'z']) {
        console.log(key)
    }
}

function prototypeTest() {
    var o = new Object()
    var f = new Function()
    console.log('o.constructor=============', o.constructor)
    console.log('f=============', f)
    console.log('f.constructor=============', f.constructor)
    console.log('f.prototype=============', f.prototype)
    console.log('====================================================')

    console.log('Object.prototype=============', Object.prototype)
}

function cteateObj() {
    var o = Object.create({ x: 1, y: 2 })
    console.log(o)
    console.log('o.x==========', o.x)
    console.log('o.prototype==========', o.prototype)
}

function objectCreate() {
    var a = { x: 1 }
    Object.defineProperty(a, 'x', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: '123'
    })
    a.x = 456 // 无效
    var b = Object.create(a)
    b.y = 2
    b.x = 111 // 无效
    console.log('a============', a)
    console.log('b===========', b)
    console.log('b.x===========', b.x)
}

function testAttributes() {
    var o = { x: 1 }
    console.log('x in o==========', 'x' in o)
    console.log('y in o==========', 'y' in o)
    console.log('toString in o==========', 'toString' in o)
}

// 配置属性特性
function defineProperty(params) {
    var a = Object.defineProperties(
        {},
        {
            x: { value: 111, configurable: true, writable: true, enumberable: true },
            y: { value: 222, configurable: false, writable: true, enumberable: true },
            z: { value: 333, configurable: true, writable: false, enumberable: true },
            w: { value: 444, configurable: true, writable: true, enumberable: false },
            e: { value: 444, configurable: false, writable: false, enumberable: false }
        }
    )
    a.e = 'eee' // 无效
    Object.defineProperty(a, 'w', {
        value: 'www'
    })
    a.y = 'yyy'
    Object.defineProperty(a, 'y', { writable: false })
    a.y = 'yyy false' // 无效
    a.z = 'zzz' // 无效
    Object.defineProperty(a, 'z', { value: 'zzz value' })
    // Object.defineProperty(a, 'e', {  writable: false, enumberable: fa    lse })
    console.log('a.e================', a)
}

function objConstructor() {
    var a = { a: 111 }
    var b = new Object()
    var c = Object.create(a)
    var f = function () {}
    var j = () => {}
    console.log('a===================', a)
    console.log('b===================', b)
    console.log('c===================', c)
    console.log('f===================', f)
    console.log('a.constructor===================', a.constructor)
    console.log('b.constructor===================', b.constructor)
    console.log('c.constructor===================', c.constructor)
    console.log('f.constructor===================', f.constructor)
    console.log('c.constructor.prototype===================', c.constructor.prototype)
    console.log('f.constructor.prototype===================', f.constructor.prototype)
    console.log('Object.getPrototypeOf(a)===================', Object.getPrototypeOf(a))
    console.log('Object.getPrototypeOf(c)===================', Object.getPrototypeOf(c))
    console.log('j.prototype===================', j.constructor)
}

function getObjectType() {
    function classof(o) {
        return Object.prototype.toString.call(o).slice(8, -1)
    }

    class C {}

    console.log('classof({})=========', classof({}))
    console.log('classof([])=========', classof([]))
    console.log('classof(undefined)=========', classof(undefined))
    console.log('classof(null)=========', classof(null))
    console.log('classof(123)=========', classof(123))
    console.log('classof(false)=========', classof(false))
    console.log("classof('')===", classof(''))
    console.log('classof(Date)=========', classof(Date))
    console.log('classof(window)=========', classof(window))
    console.log('classof(classof)=========', classof(classof))
    console.log('classof(new classof())=========', classof(new classof()))
    console.log('classof(C)=========', classof(C))
    console.log('classof(new C())=========', classof(new C()))
}

function isObject() {
    let a = { x: 111 }
    const b = { x: 222 }
    console.log('Object.isExtensible(a)=========before', Object.isExtensible(a))
    console.log('Object.preventExtensions(a)=========', Object.preventExtensions(a))
    console.log('Object.isExtensible(a)=========arfter', Object.isExtensible(a))

    console.log('Object.isExtensible(b)=========before', Object.isExtensible(b))
    console.log('Object.preventExtensions(b)=========', Object.seal(b))
    console.log('Object.isExtensible(b)=========arfter', Object.isExtensible(b))
}

function serialization(params) {
    function fn() {}

    let e = new Error('错了')
    let reg = /d/g
    let a = {
        x: 1,
        y: { z: [false, null, true, '', {}, [], '哈哈', { w: 'haha' }, e, Error('我错了'), reg, undefined, fn, fn(), , Symbol('')] }
    }
    let b = JSON.stringify(a)
    console.log('JSON.stringify(a)==============', b)
    // console.log('JSON.stringify(e)==============', e)
    console.log('JSON.parse(b)==============', JSON.parse(b))
}

function overwirteToString() {
    let o = {
        x: 'xxx',
        y: 123,
        toString: function () {
            console.log(this)
            return this.x + this.y
        }
    }
    let o2 = { x: 'qqq', y: 222 }
    let a = [111, '哈哈哈']
    let fn = function () {}
    console.log('o.toString()==========', o.toString())
    console.log('o2.toString()==========', o2.toString())
    console.log('a.toString()==========', a.toString())
    console.log('fn.toString()==========', fn.toString())

    // console.log('o.toJSON()==========', o.toJSON()) // 没有这个方法
    // console.log('o2.toJSON()==========', o2.toJSON())
    // console.log('Date.toJSON()==========', Date.toJSON())
    // console.log('Object.toJSON(o2)==========', Object.toJSON(o2))

    console.log('o.valueOf()==========', o.valueOf())
}

function testArray(params) {
    let a = new Array()
    let a5 = new Array(5)
    let b = [, , 1, 2, 3]

    console.log('a=============', a)
    console.log('a5=============', a5)
    console.log('b=============', b)
    b.length = 5
    console.log('b5=============', b)
    b[5] = 6
    b[6] = undefined
    console.log('b6=============', b)
    console.log('b.length=============', b.length)
    console.log('b[100]=============', b[100])
}

function forInOrder() {
    let a = [0, 1, 2]
    a[9] = 9
    a[5] = 5
    a[7] = 7
    a[0] = 0
    console.log('a=============', a)
    for (const index in a) {
        // if (a.hasOwnProperty(index)) {
        const value = a[index]
        console.log('value==============', value)
        // }
    }
    Math.max(1, 2)
}

function argumentsLength() {
    function check(args) {
        const al = args.length
        const acl = args.callee.length
        console.log('al================', al)
        console.log('acl================', acl)
        if (al !== acl) {
            console.log('不相等')
        }
    }
    function f(x, y, z) {
        check(arguments)
        return x + y + z
    }
    console.log('arguments================', f(1, 2, 3, 4, 5))
}

function objToString() {
    let o = {
        x: 'xxx',
        y: 123,
        toString: function () {
            console.log(this)
            return this.x + this.y
        }
    }
    let o2 = { x: '222', y: 222 }
    let o3 = { x: '333', toString: Object.prototype.toString }
    console.log('o3.toString()==========', o3.toString())
    o2.toString = Object.prototype.toString
    console.log('o2.toString()==========', o2.toString())
    let a = []
    let f = function () {}
    a.toString = Object.prototype.toString
    console.log('a.toString()==========', a.toString())
    f.toString = Object.prototype.toString
    console.log('f.toString()==========', f.toString())
}
function prototypeConstuctor() {
    let F = function () {
        this.x = 'xxxxxxxxxxxxx'
    }
    console.log('F==========================', F)
    console.log('F.prototype==========================', F.prototype)
    let p = F.prototype
    console.log('p==========================', p)
    let c = p.constructor
    console.log('c==========================', c)
    console.log('c === F==========================', c === F)
    let newF = new F()
    console.log('newF==========================', newF)
    console.log('newF.constructor==========================', newF.constructor)
    console.log('newF.prototype==========================', newF.prototype)

    newF.y = 'yyyyyyyyyyyyyy'
    console.log('F.x==========================', F.x)
    console.log('newF.x==========================', newF.x)
    console.log('newF.y==========================', newF.y)
}

function getBrowserVersion() {
    console.log('navigator', navigator)
    console.log('navigator.userAgent', navigator.userAgent)
}

function mySetTimeout() {
    console.log('aaaaaaaaaaaaaaaaaaaa')
    setTimeout(() => {
        console.log('bbbbbbbbbbbbbbbbbbbb')
    }, 0)
    console.log('cccccccccccccccccccc')
}

function windowLocation() {
    console.log('document.URL==========================', document.URL)
    console.log('windowLocation==========================', window.location)
    console.log('window.location.toString()==========================', window.location.toString())
}

function windowHistory() {
    console.log('History==========================', History)
    console.log('window.history==========================', window.history)
}

function windowScreen() {
    console.log('window.screen==========================', window.screen)
    console.log('window.top==========================', window.top)
    console.log('window.self==========================', window.self)
    console.log('window.window==========================', window.window)
    console.log('window.document==========================', window.document)
    console.log('window.parent==========================', window.parent)
}

function windowOpen() {
    window.open()
}

function getNode() {
    const dom = window.document.getElementsByTagName('html')
    console.log('html dom========================', dom)
    console.log('html[0]========================', dom[0])
    console.log('document.documentElement========================', document.documentElement)
}

function forTest() {
    const array = [1, 2, 3, 4, 5]
    // const index = 10
    let index = 10
    for (let index = 0; index < array.length; index++) {
        // const element = array[index]
        let index = 9
        // var index = 9
        console.log('for-index===============', index)
    }
    if (false) {
        // var index = 8 // 报错 Uncaught ReferenceError: initTest is not defined
    }
    console.log('index===============', index)
}

function testString() {
    let s = 'a☹b☺c'
    console.log('s====================', s)
    console.log('s.length====================', s.length)
    console.log('s.codePointAt(0)====================', s.codePointAt(0))
    console.log('s.codePointAt(1)====================', s.codePointAt(1))
    console.log('s.codePointAt(2)====================', s.codePointAt(2))
    console.log('s.codePointAt(3)====================', s.codePointAt(3))
    console.log('s.codePointAt(4)====================', s.codePointAt(4))
    console.log('String.fromCharCode(97, 128522, 98, 56842, 99)====================', String.fromCharCode(97, 128522, 98, 56842, 99))
    console.log('String.fromCharCode(0x1F60A)====================', String.fromCharCode(0x1f60a))
    console.log('0x1F60A====================', 0x1f60a)
    console.log(0x1f60a, '0x1F60A====================')
}

function stringPrototype() {
    console.log('String.prototype========================', String.prototype)
    const obj = Object.create(
        {},
        {
            x: { configurable: true, writable: true, enumerable: true, value: 'xx' },
            y: {
                configurable: false,
                writable: false,
                enumerable: false,
                value: 'yy'
            }
        }
    )
    const objNull = Object.create(null, {
        x: { configurable: true, writable: true, enumerable: true, value: 'xx' },
        y: {
            configurable: false,
            writable: false,
            enumerable: false,
            value: 'yy'
        }
    })
    console.log('obj========================', obj)
    console.log('objNull========================', objNull) // 没有 constructor
    console.log('Object.keys(obj)========================', Object.keys(obj))
    // 不会执行，都是不可遍历的方法
    for (const iterator in String.prototype) {
        // 不会执行，都是不可遍历的
        console.log('String.prototype for in========================', iterator)
    }
    console.log('Object.keys(String.prototype)========================', Object.keys(String.prototype))
}

function arrayMaxLength() {
    let l = 4294967295
    let al = new Array(4294967295)
    // al[4294967296] = '^_^'
    // al[4294967296112312321] = 'O(∩_∩)O哈！'
    console.log('l.toExponential(1)============', l.toExponential(1))
    // al.forEach(value => {
    //     console.log(value)
    // })
    // al.map(value => value) // 浏览器会崩溃 o(≧口≦)o
    console.log('============', al.length)
}
