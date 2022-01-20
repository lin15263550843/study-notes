interface Clock {
    tick(): void;
}
interface ClockCtr {
    new (h: number, m: number): Clock;
}

class Digit implements Clock {
    constructor(h: number, m: number, z: number) {
        console.log(h, m, z);
    }
    tick(): void {
        console.log('digit');
    }
}

class Anal implements Clock {
    constructor(h: number, m: number) {
        console.log(h, m);
    }
    tick(): void {
        console.log('Anal');
    }
}

const digit = new Digit(1, 2, 3);
console.log('digit', digit);

const anal = new Anal(1, 2);
console.log('anal', anal);

function createClock(Ctr: ClockCtr, h: number, m: number): Clock {
    return new Ctr(h, m);
}

const anal2 = createClock(Anal, 1, 2);
console.log('anal2', anal2);

// 类型“typeof Digit”的参数不能赋给类型“ClockCtr”的参数。ts(2345)
// const digit2 = createClock(Digit, 1, 2);
// console.log('digit2', digit2);

class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() {}
}

class TextBox extends Control {
    select() {}
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//     select() {}
// }

// class Location {}
