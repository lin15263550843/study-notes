/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
function Foo(this: any, name) {
    this.name = name;
}

Foo.prototype.runing = function () {
    return `${this.name} runing~`;
};

const foo = new Foo('foo');
console.log('foo.runing()------------------------------->>>', foo.runing());
console.log('Foo.prototype.runing()--------------------->>>', Foo.prototype.runing());
console.log('Foo.runing--------------------------------->>>', Foo.runing);

const Fn = new Function('a', 'b', 'this.a =a; this.b = b; return a+ b');

console.log('Fn', { Fn });
console.log('new Fn', new Fn(1, 2));
