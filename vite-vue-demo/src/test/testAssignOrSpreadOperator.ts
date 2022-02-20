// @ts-nocheck
/**
 * 测试 浅拷贝
 */
function testAssingOrSpreadOperator() {
    const origin = {
        x: 123,
        y: function () {},
        z: { z: 'z' },
        symbol: Symbol('symbol'),
    };

    Object.setPrototypeOf(origin, {
        parent: 'parent',
        set setVal(v) {
            console.log('setVal: ', v);
        },
    });

    Object.defineProperty(origin, 'm', {
        configurable: true,
        writable: true,
        value: 'm',
        enumerable: false,
    });
    let gVal = 'g';

    Object.defineProperty(origin, 'g', {
        configurable: true,
        enumerable: true,
        get() {
            console.log('get gVal: ', gVal);
            return gVal;
        },
        set(val) {
            console.log('set gVal: ', val);
            gVal = val;
            // return val;
        },
    });

    const o1 = Object.assign({}, origin, { g: 456, setVal: 789 });
    const o2 = { ...origin, ...{ g: 456, setVal: 789 } };

    console.log('origin -------------------->>>', origin);
    console.log('Object.assign o1 ---------->>>', o1);
    console.log('... o2 -------------------->>>', o2);

    class G {
        set val(v) {
            console.log('G set v: ', v);
            return v;
        }
    }
    const gg = new G();
    const g1 = Object.assign(gg, { val: 123 }); // 会触发 setter
    const g2 = { ...gg, ...{ val: 123 } }; // 不会触发 setter
    console.log('gg ------------------->>>', gg);
    console.log('g1 ------------------->>>', g1);
    console.log('g2 ------------------->>>', g2);
}
testAssingOrSpreadOperator();
