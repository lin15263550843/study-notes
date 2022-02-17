/**
 * 测试 事件流 冒泡 捕获
 */
function testEvent() {
    /**
     * 捕获
     */
    window.addEventListener(
        'click',
        event => {
            console.log('捕获 window event.target --------------->>>', event.target);
            console.log('捕获 window event.currentTarget -------->>>', event.currentTarget);
        },
        true,
    );

    document.addEventListener(
        'click',
        event => {
            console.log('捕获 document event.target ------------->>>', event.target);
            console.log('捕获 document event.currentTarget ------>>>', event.currentTarget);
        },
        true,
    );

    document.documentElement.addEventListener(
        'click',
        event => {
            console.log('捕获 html event.target --------------------->>>', event.target);
            console.log('捕获 html event.currentTarget -------------->>>', event.currentTarget);
        },
        true,
    );
    document.body.addEventListener(
        'click',
        event => {
            console.log('捕获 body event.target --------------------->>>', event.target);
            console.log('捕获 body event.currentTarget -------------->>>', event.currentTarget);
        },
        true,
    );

    document.querySelector('#app')?.addEventListener(
        'click',
        event => {
            console.log('捕获 #app event.target --------------------->>>', event.target);
            console.log('捕获 #app event.currentTarget -------------->>>', event.currentTarget);
        },
        true,
    );

    /**
     * 冒泡
     */
    window.addEventListener('click', event => {
        console.log('冒泡 window event.target ------------------->>>', event.target);
        console.log('冒泡 window event.currentTarget ------------>>>', event.currentTarget);
    });

    document.addEventListener('click', event => {
        console.log('冒泡 document event.target ----------------->>>', event.target);
        console.log('冒泡 document event.currentTarget ---------->>>', event.currentTarget);
    });

    document.documentElement.addEventListener('click', event => {
        console.log('冒泡 html event.target --------------------->>>', event.target);
        console.log('冒泡 html event.currentTarget -------------->>>', event.currentTarget);
    });

    document.body.addEventListener('click', event => {
        console.log('冒泡 body event.target --------------------->>>', event.target);
        console.log('冒泡 body event.currentTarget -------------->>>', event.currentTarget);
    });

    document.querySelector('#app')?.addEventListener('click', event => {
        console.log('冒泡 #app event.target --------------------->>>', event.target);
        console.log('冒泡 #app event.currentTarget -------------->>>', event.currentTarget);
    });

    // console.log('document.documentElement', document.documentElement);

    /**
     * 自定义事件
     */
    const eve = new Event('myevent');
    document.body.addEventListener('myevent', event => {
        console.log('冒泡 body 自定义事件 event --------------------->>>', event);
    });
    document.body.dispatchEvent(eve);

    const cusEve = new CustomEvent('customevent', { detail: { x: 123, y: 456 } });
    document.body.addEventListener('customevent', event => {
        console.log('冒泡 body 自定义 customevent 事件 event -------------->>>', event);
        console.log('冒泡 body 自定义 customevent 事件 event.detail ------->>>', (event as CustomEvent).detail);
    });
    document.body.dispatchEvent(cusEve);
}

testEvent();
