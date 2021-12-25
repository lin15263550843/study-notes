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
