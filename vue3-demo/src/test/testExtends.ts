/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { inheritPrototype } from './testExtendsFactory';
/**
 * 寄生组合式继承
 */
function ParentClass(name, firends) {
    this.name = name;
    this.firends = firends || [];
}

ParentClass.parentStaticMethod = function () {
    return 'ParentClass parent static method~';
};

// ParentClass.prototype.runing = function () {
//     return `${this.name}在跑步~`;
// };
Object.defineProperty(ParentClass.prototype, 'runing', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function () {
        return `${this.name}在跑步~`;
    },
});

function SubClass(name, age, firends) {
    // 借用构造函数继承
    ParentClass.call(this, name, firends);
    this.age = age;
}

SubClass.staticMethod = function () {
    return 'SubClass static method~';
};

// 原型链继承
// SubClass.prototype = new ParentClass();

// 这样设置的话，再给 SubClass.prototype 添加方法时会影响父类！！！
// SubClass.prototype = ParentClass.prototype;

// 寄生组合式继承
// SubClass.prototype = Object.create(ParentClass.prototype);
// SubClass.prototype.constructor = SubClass;
inheritPrototype(ParentClass, SubClass);

// 警告：不能使用该方法，它会设置该对象的 __proto__ 属性，而不是函数的 prototype
// Object.setPrototypeOf(SubClass, Object.create(ParentClass.prototype));

// 静态方法的继承
Object.setPrototypeOf(SubClass, ParentClass);

// 必须写到继承后边后才有效，因为会重置 SubClass 的原型
// SubClass.prototype.eating = function () {
//     return `${this.name}在吃东西~`;
// };
Object.defineProperty(SubClass.prototype, 'eating', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: function () {
        return `${this.name}在吃东西~`;
    },
});

const sub1 = new SubClass('张三', 18, ['小丽', '小王']);
const sub2 = new SubClass('李四', 28, ['小吴', '小武']);

sub1.firends.push('小李子');

console.log('sub1--------------------------------->>>', sub1);
console.log('sub2--------------------------------->>>', sub2);

console.log('sub1.name---------------------------->>>', sub1.name);
console.log('sub2.name---------------------------->>>', sub2.name);

console.log('sub1.name---------------------------->>>', sub1.firends);
console.log('sub2.name---------------------------->>>', sub2.firends);

console.log('sub1.__proto__----------------------->>>', sub1.__proto__);
console.log('sub2.__proto__----------------------->>>', sub2.__proto__);
console.log('sub1.__proto__.conteructor----------->>>', sub1.__proto__.constructor);
console.log('sub2.__proto__.conteructor----------->>>', sub2.__proto__.constructor);

console.log('sub1.eating()------------------------>>>', sub1.eating());
console.log('sub2.eating()------------------------>>>', sub2.eating());

console.log('sub1.runing()------------------------>>>', sub1.runing());
console.log('sub2.runing()------------------------>>>', sub2.runing());

console.log('sub1 instanceof SubClass------------->>>', sub1 instanceof SubClass);
console.log('sub2 instanceof SubClass------------->>>', sub2 instanceof SubClass);
console.log('sub1 instanceof ParentClass---------->>>', sub1 instanceof ParentClass);
console.log('sub2 instanceof ParentClass---------->>>', sub2 instanceof ParentClass);
console.log('sub2 instanceof SubClass------------->>>', sub2 instanceof SubClass);
console.log('sub1 instanceof Object--------------->>>', sub1 instanceof Object);
console.log('sub2 instanceof Object--------------->>>', sub2 instanceof Object);

console.log('ParentClass.parentStaticMethod()----->>>', ParentClass.parentStaticMethod());
console.log('SubClass.staticMethod()-------------->>>', SubClass.staticMethod());
console.log('SubClass.parentStaticMethod()-------->>>', SubClass.parentStaticMethod());

// 原型式继承
function createPrototypeObject1(o) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const Fn = function () {};
    // const obj = new Fn();
    // obj.prototype = o;
    // return obj;
    Fn.prototype = o;
    return new Fn();
}
function createPrototypeObject2(o) {
    const obj = {};
    Object.setPrototypeOf(obj, o);
    return obj;
}
function createPrototypeObject3(o) {
    return Object.create(o);
}
const parentObj = { parentName: '父类' };
console.log('createPrototypeObject1(parentObj)', createPrototypeObject1(parentObj));
console.log('createPrototypeObject2(parentObj)', createPrototypeObject2(parentObj));
console.log('createPrototypeObject3(parentObj)', createPrototypeObject3(parentObj));

// 寄生式继承
function createPrototypeObject4(o, sex) {
    const obj = Object.create(o);
    obj.sex = sex;
    obj.eating = function () {
        return `${this.name}在吃东西~`;
    };
    return obj;
}
console.log('createPrototypeObject4(parentObj)', createPrototypeObject4(parentObj, '女'));

// ES6 类继承
class Pclass {
    constructor(name, firends) {
        this.name = name;
        this.firends = firends || [];
    }
    runing() {
        return `${this.name}在跑步~`;
    }
}
class Sclass extends Pclass {
    constructor(name, age, firends) {
        super(name, firends);
        this.age = age;
    }
    eating() {
        return `${this.name}在吃东西~`;
    }
}
console.log('new Sclass---1----------------------->>>', new Sclass('盲僧', 18, ['剑圣', '亚索']));
console.log('new Sclass---2----------------------->>>', new Sclass('盲僧', 18, ['剑圣', '亚索']));

for (const key in sub1) {
    // 会枚举原型中的属性
    // if (Object.prototype.hasOwnProperty.call(sub1, key)) {
    console.log(`sub1[[${key}]------------------------>>>`, sub1[key]);
    // }
}
