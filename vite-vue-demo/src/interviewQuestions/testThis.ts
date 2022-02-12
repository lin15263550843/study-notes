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
            console.log(this?.name);
        }
        eat = () => {
            console.log(this.name);
        };
    }

    const n = new Animal();
    n.speck();
    n.eat();
    const a = n.speck;
    const b = n.eat;

    a();
    b();
}

testThis();
// 结果
// cat
// cat
// undefined // 注意：如果调用 a 环境的this 为 undefined 会报错
// cat
