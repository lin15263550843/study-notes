interface Obj {
    [key: string]: string | number;
}

const obj: Obj = {};

Object.defineProperty(obj, 'name', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: 'obj',
});

Object.defineProperty(obj, 'age', {
    configurable: true,
    enumerable: true,
    writable: false,
    value: 18,
});

Object.defineProperty(obj, '_sex', {
    configurable: false,
    enumerable: false,
    writable: true,
    value: '女',
});

Object.defineProperty(obj, 'sex', {
    configurable: false,
    enumerable: false,
    get() {
        return this._sex;
    },
    set(val: string) {
        this._sex = val;
    },
});

// obj.age = 28; // Uncaught TypeError: Cannot assign to read only property 'age' of object '#<Object>'

console.log('obj------------------------------------------->>>', obj);
console.log('Object.keys(obj)------------------------------>>>', Object.keys(obj));
console.log('Object.getOwnPropertyNames(obj)--------------->>>', Object.getOwnPropertyNames(obj));
console.log('Object.getOwnPropertyDescriptors(obj)--------->>>', Object.getOwnPropertyDescriptors(obj));
Object.seal(obj);
// delete obj.name; // Uncaught TypeError: Cannot delete property 'name' of #<Object>
console.log('Object.getOwnPropertyDescriptors(obj)--------->>>', Object.getOwnPropertyDescriptors(obj));
Object.freeze(obj);
// obj.name = 'lhd'; // Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
console.log('Object.getOwnPropertyDescriptors(obj)--------->>>', Object.getOwnPropertyDescriptors(obj));
