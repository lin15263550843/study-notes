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
//---------------------------------
function ff() {
    let state = '';
    window.console.log = function (event) {
        state = event;
    };
    const obd = new Observerd('g');
    const ob = new Observer();
    obd.setObserver(ob);
    obd.setState('跑步');
    const judge = state === 'g正在跑步';
    return judge;
}

/**
 * https://www.nowcoder.com/practice/d86defce50ea45dd92c7a4fbde17d64b?tpId=2&tqId=38370&rp=1&ru=/exam/oj&qru=/exam/oj&sourceUrl=%2Fexam%2Foj%3Ftab%3D%25E5%2589%258D%25E7%25AB%25AF%25E7%25AF%2587%26topicId%3D2%26page%3D1&difficulty=undefined&judgeStatus=undefined&tags=&title=
 * 倒计时
 */
// function second(second) {
//     const result = { day: 0, hour: '00', min: '00', second: '00' };
//     if (typeof second !== 'number') return result;

//     const n = 24 * 60 * 60;
//     const h = 60 * 60;
//     const m = 60;

//     const day = Math.floor(second / n);
//     const hour = Math.floor((second % n) / h);
//     const min = Math.floor(((second % n) % h) / m);
//     const s = Math.floor(((second % n) % h) % m);

//     return { day, hour, min, second: s };
// }

// function render(data) {
//     const div = document.getElementById('jsCountdown');
//     const children = div.children;

//     function patch(n) {
//         return n < 10 ? '0' + n : n;
//     }
//     if (data.day <= 0) children[0].className += ' hide';

//     children[0].innerHTML = patch(data.day) + '天';
//     children[1].innerHTML = patch(data.hour) + ':';
//     children[2].innerHTML = patch(data.min) + ':';
//     children[3].innerHTML = patch(data.second);
// }
/**
 * 58 二面面试题
 */
let workflows = [
    { id: 'a1', name: '初始人群', parent: 'root' },
    { id: 'a2', name: '动作', parent: 'a1' },
    { id: 'a3', name: '时间', parent: 'az' },
    { id: 'a4', name: '人群分叉', parent: 'a3' },
    { id: 'a5', name: '人群', parent: 'a4' },
    { id: 'ax', name: '是', parent: 'a5' },
    { id: 'ay', name: '否', parent: 'a5' },
    { id: 'a6', name: '人群', parent: 'a4' },
    { id: 'a7', name: '展示运营位', parent: 'a6' },
    { id: 'a9', name: '引入计划', parent: 'a7' },
    { id: 'a10', name: '触发分叉', parent: 'a9' },
    { id: 'a11', name: '动作', parent: 'a10' },
    { id: 'a12', name: '动作', parent: 'a10' },
    { id: 'a13', name: '时间', parent: 'a10' },
    { id: 'a14', name: '发券', parent: 'a11' },
    { id: 'a15', name: '发券', parent: 'a12' },
    { id: 'a16', name: '发消息', parent: 'a13' },
    { id: 'az', name: '插入节点', parent: 'a2' },
];

function fn(arr) {
    if (!Array.isArray(arr)) {
        throw new Error(`the ${arr} is not a array`);
    }
    const res = [];
    const map = new Map();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const cur = arr[i];
        const { id, parent } = cur;
        const children = map.get(id);
        if (children) {
            chidren.push(cur);
        } else {
            cur.children = [];
            map.set(id, cur.children);
        }

        if (parent === 'root') {
            res.push(cur);
        } else {
            map.set(parent, [cur]);
        }
    }
    return res;
}

