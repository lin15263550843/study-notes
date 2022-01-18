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
    /**
     * 订阅（监听）事件
     * @param type 事件类型
     * @param event 事件
     * @param thisArg 绑定 this
     */
    on(type, event, thisArg) {
        if (typeof event !== 'function') {
            throw new TypeError(`the ${event} is not a function`);
        }
        if (this.events[type]) {
            this.events[type].push({ event, thisArg });
        } else {
            this.events[type] = [{ event, thisArg }];
        }

        return this;
    }
    /**
     * 发布事件
     * @param type 事件类型
     * @param args 传递参数
     */
    emit(type, ...args) {
        const events = this.events[type];

        if (!events) return;

        events.forEach(({ event, thisArg }) => {
            event.apply(thisArg, args);
        });

        return this;
    }
    /**
     * 移除订阅事件
     * @param type 事件类型
     * @param event 事件
     */
    off(type, event) {
        const events = this.events[type];

        if (!events) return;

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

eventBus.on(
    'abc',
    function (...args) {
        console.log('监听abc1', args, this);
    },
    { name: 'lhd' },
);

const handleCallback = function (data) {
    console.log('监听abc2', data, this);
};
eventBus.on('abc', handleCallback, { name: 'lhd' });
eventBus.on('abc', handleCallback, { name: 'lhd' });

// utils.js
eventBus.emit('abc', 123);

// 移除监听
eventBus.off('abc', handleCallback);
eventBus.emit('abc', 456, 789);
