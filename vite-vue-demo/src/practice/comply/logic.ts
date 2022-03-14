// @ts-nocheck
/**
 * 实现如下结果
 * let a = Foo() // a.id -> 1
 * let b = new Foo() // b.id -> 2
 * let c = new Foo() // c.id -> 3
 * let d = Foo() // d.id -> 4
 */
// function Foo() {}
const Foo = (() => {
    let id = 0;
    return function () {
        id++;
        // if (this instanceof Foo) {
        //     this.id = id;
        // } else {
        //     return { id };
        // }
        return { id };
    };
})();
let a = Foo(); // a.id -> 1
let b = new Foo(); // b.id -> 2
let c = new Foo(); // c.id -> 3
let d = Foo(); // d.id -> 4
console.log(a);
console.log(b);
console.log(c);
console.log(d);
