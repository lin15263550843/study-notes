// @ts-nocheck
/**
 * Map 和 Object 的区别
 */
function testMapOrObject() {
    const map = new Map();
    const obj = {};
    Object.setPrototypeOf(obj, { x: 123 });

    console.log('map: ', map);
    console.log('obj: ', obj);
    console.log('obj.x: ', obj.x);
    console.log(`map.get('x'): `, map.get('x'));
}
testMapOrObject();
