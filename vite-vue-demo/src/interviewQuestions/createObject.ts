// @ts-nocheck
/**
 * 创建对象的方式有多少种
 */
function createObject() {
    // 函数本身也是一个特殊的对象
    function Foo(name) {
        this.name = name;
    }
    function Bar() {
        return obj1;
    }
    class Zoo {
        constructor(name) {
            this.name = name;
        }
    }

    // 字面量
    const obj1 = { name: 'lhd' };
    const obj2 = new Object(obj1);

    // 函数实例，函数返回值
    const obj3 = new Foo('lhd');
    const obj4 = new Bar();
    const obj5 = Bar();

    // Object.create 创建对象
    const obj6 = Object.create(obj1);

    const obj7 = new Zoo('lhd');

    console.log('obj1 --------------------------->>>', obj1);
    console.log('obj2 --------------------------->>>', obj2);
    console.log('obj3 --------------------------->>>', obj3);
    console.log('obj4 --------------------------->>>', obj4);
    console.log('obj5 --------------------------->>>', obj5);
    console.log('obj6 --------------------------->>>', obj6);
    console.log('obj7 --------------------------->>>', obj7);
    console.log('obj8 ---Error------------------->>>', Error('lhd') instanceof Object);
    console.log('obj0 ---Foo instanceof Object--->>>', Foo instanceof Object);
}

createObject();
