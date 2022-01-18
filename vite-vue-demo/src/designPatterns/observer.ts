// @ts-nocheck
/**
 * 观察者模式
 */
/**
 * 观察者
 */
class Observer {
    // constructor(parameters) {}
    update({ name, state }) {
        console.log(`${name}正在${state}`);
    }
}
/**
 * 被观察者
 */
class Observed {
    constructor(name, state = '睡觉') {
        this.name = name;
        this.state = state;
        this.observers = [];
    }
    /**
     * 添加观察者
     * @param observer 观察者实例
     */
    setObserver(observer) {
        this.observers.push(observer);
    }

    setState(state) {
        this.state = state;
        this.observers.forEach(observer => {
            observer.update({ name: this.name, state });
        });
    }
}

const obd1 = new Observed('盖伦');
const obd2 = new Observed('狗熊');
const ob = new Observer();

obd1.setObserver(ob);
obd2.setObserver(ob);

obd1.setState('跑步');
obd2.setState('跑步');
obd2.setState('跳舞');
