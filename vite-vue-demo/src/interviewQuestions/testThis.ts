// @ts-nocheck
/**
 * this 题目
 */
function testThis() {
    class Animal {
        constructor() {
            this.name = 'cat';
        }
        speck() {
            console.log(this.name);
        }
        eat = () => {
            console.log(this.name);
        };
        how = function () {
            console.log(this.name);
        };
    }

    const n = new Animal();

    n.speck(); // this 是 Animal 实例对象
    n.eat(); // this 是 Animal 实例对象
    n.how(); // this 是 Animal 实例对象

    const a = n.speck;
    const b = n.eat;
    const c = n.how;

    // 类中的方法局部默认开启了严格模式，虽然 a (speck) 方法是全局调用的，但是 this 不再指向 window，而是 undefined。
    // 严格模式下禁止this 关键字指向全局对象。
    a(); // this 是 undefined，所以和这个地方会报错不会往下执行
    b(); // this 是 Animal 实例对象
    c(); // this 是 undefined
}

try {
    testThis();
} catch (error) {
    console.log('error: ', error);
}
// 结果
// cat
// cat
// 报错 Uncaught TypeError: Cannot read properties of undefined (reading 'name')
// 因为默认类中的方法默认使用严格模式，所以全局调用 this 指向 undefined 会报错。
