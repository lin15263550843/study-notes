/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/**
 * 原型式继承，工厂函数
 */
export function createProtoObject(o) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    if (Object.create) {
        return Object.create(o);
    } else if (Object.setPrototypeOf) {
        const obj = {};
        Object.setPrototypeOf(obj, o);
        return obj;
    } else {
        const Fn = function () {};
        Fn.prototype = o;
        return new Fn();
    }
}
/**
 * 寄生组合式继承，工厂函数
 * @param SuperType 父类
 * @param SubType 子类
 */
export function inheritPrototype(SuperType, SubType) {
    const proto = createProtoObject(SuperType.prototype);
    Object.defineProperty(proto, 'constructor', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubType,
    });
    SubType.prototype = proto;
}
// 寄生组合式继承，工厂函数
// function createProtoObject(parentClass, subClass) {
//     const proto = Object.create(parentClass.prototype);
//     proto.constructor = SubClass;
//     subClass.prototype = proto;

// }
