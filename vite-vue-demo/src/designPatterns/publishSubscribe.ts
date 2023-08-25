// @ts-nocheck
/**
 * 发布订阅模式
 * @param name 名字
 */
class EventEmitter {
    constructor(name = '') {
        this.name = name;
        this.events = {};
    }
    on(type, event, thisArg, isOnce = false) {
        if (typeof event !== 'function') {
            throw new TypeError(`the ${event} is not a function`);
        }
        if (this.events[type]) {
            this.events[type].push({ event, thisArg, isOnce });
        } else {
            this.events[type] = [{ event, thisArg, isOnce }];
        }
        return this;
    }
    once(name, fn, thisArg) {
        this.on(name, fn, thisArg, true);
    }
    emit(type, ...args) {
        const events = this.events[type];
        if (!events) return;
        events.forEach(({ event, thisArg, isOnce }) => {
            event.apply(thisArg, args);
            if (isOnce) this.off(type, event);
        });
        return this;
    }
    off(type, event) {
        const events = this.events[type];
        if (!events) return;
        if (!event) {
            delete this.events[type]; // 如果只传入事件名，则删除所有的事件
        }
        for (let i = events.length - 1; i >= 0; i--) {
            const { event: e } = events[i];
            if (event === e) {
                events.splice(i, 1);
            }
        }
        return this;
    }
}
/**
 * 测试
 */
// main.js
const eventBus = new EventEmitter('使用发布订阅模式实现事件总线');

eventBus.once(
    'abc',
    function (...args) {
        console.log('监听abc1', args, this);
    },
    { name: 'lhd' },
);

const handleCallback = function (data) {
    console.log('监听abc2', data, this);
};
eventBus.once('abc', handleCallback, { name: 'lhd' });
eventBus.once('abc', handleCallback, { name: 'lhd' });

// utils.js
eventBus.emit('abc', 123);

// 移除监听
eventBus.off('abc', handleCallback);
eventBus.emit('abc', 456, 789);

console.log('====== 先发布后订阅 ======');

eventBus.emit('hhh', 666, 999);
eventBus.emit('hhh', 888);
eventBus.emit('hhh', 888);
eventBus.on('hhh', function (...args) {
    console.log('监听 hhh args 第一个: ', args);
});
eventBus.on('hhh', function (...args) {
    console.log('监听 hhh args 第二个: ', args);
});
const hhhCallback = function (...args) {
    console.log('监听 hhh args 第三个: ', args);
};
eventBus.on('hhh', hhhCallback);
// eventBus.off('hhh', hhhCallback);
eventBus.emit('hhh', 1024);
eventBus.on('hhh', function (...args) {
    console.log('监听 hhh args 第四个: ', args);
});

// class EventEmitter {
//     constructor(name = '') {
//         this.name = name;
//         this.events = {};
//     }
//     on(type, event, thisArg, isOnce = false) {
//         if (typeof event !== 'function') {
//             throw new TypeError(`the ${event} is not a function`);
//         }
//         if (this.events[type]) {
//             this.events[type].push({ event, thisArg });
//         } else {
//             this.events[type] = [{ event, thisArg }];
//         }
//         return this;
//     }
//     once(name, fn) {
//         let tem = (...args) => {
//             this.off(name, fn);
//             fn(...args);
//         };
//         fn.fn = tem;
//         this.on(name, tem);
//     }
//     emit(type, ...args) {
//         const events = this.events[type];
//         if (!events) return;
//         events.forEach(({ event, thisArg }) => {
//             console.log('events', events);
//             event.apply(thisArg, args);
//         });
//         return this;
//     }
//     off(type, event) {
//         const events = this.events[type];
//         if (!events) return;
//         if (!event) {
//             delete this.events[type]; // 如果只传入事件名，则删除所有的事件
//         }
//         for (let i = events.length - 1; i >= 0; i--) {
//             const { event: e } = events[i];
//             if (event === e || event.fn === e) {
//                 events.splice(i, 1);
//             }
//         }
//         return this;
//     }
// }

// class EventEmitter {
//     constructor(name = '') {
//         this.name = name;
//         this.events = {};
//         this.cached = {}; // 缓存事件，支持先发布后订阅  // 注意缓存之后，以后每次再订阅同一个事件是，都会读到历史的发布消息 ！！！
//     }
//     /**
//      * 订阅（监听）事件
//      * @param type 事件类型
//      * @param event 事件
//      * @param thisArg 绑定 this
//      */
//     on(type, event, thisArg) {
//         if (typeof event !== 'function') {
//             throw new TypeError(`the ${event} is not a function`);
//         }
//         if (this.events[type]) {
//             this.events[type].push({ event, thisArg });
//         } else {
//             this.events[type] = [{ event, thisArg }];
//         }
//         const cacheEvents = this.cached[type];
//         if (cacheEvents) {
//             cacheEvents.forEach(args => {
//                 event.apply(thisArg, args);
//             });
//             // delete this.cached[type];   // 如果说只需要消费一次，消费后就清空缓存，否则会执行
//         }
//         return this;
//     }
//     once(name, fn) {
//         let tem = (...args) => {
//             this.off(name, fn);
//             fn(...args);
//         };
//         fn.fn = tem;
//         this.on(name, tem);
//     }
//     /**
//      * 发布事件
//      * @param type 事件类型
//      * @param args 传递参数
//      */
//     emit(type, ...args) {
//         // 缓存发布的消息
//         const cacheEvents = this.cached[type];
//         if (cacheEvents) {
//             cacheEvents.push(args);
//         } else {
//             this.cached[type] = [args];
//         }
//         const events = this.events[type];
//         if (!events) return;
//         events.forEach(({ event, thisArg }) => {
//             event.apply(thisArg, args);
//         });
//         return this;
//     }
//     /**
//      * 移除订阅事件
//      * @param type 事件类型
//      * @param event 事件
//      */
//     off(type, event) {
//         const cachedEvents = this.cached[type];
//         if (cachedEvents) {
//             for (let i = cachedEvents.length - 1; i >= 0; i--) {
//                 const { event: e } = cachedEvents[i];
//                 if (event === e) {
//                     cachedEvents.splice(i, 1);
//                 }
//             }
//         }
//         const events = this.events[type];
//         if (!events) return;
//         if (!event) {
//             // 如果只传入事件名，则删除所有的事件
//             delete this.events[type];
//         }
//         for (let i = events.length - 1; i >= 0; i--) {
//             const { event: e } = events[i];
//             if (event === e) {
//                 events.splice(i, 1);
//             }
//         }
//         return this;
//     }
// }

