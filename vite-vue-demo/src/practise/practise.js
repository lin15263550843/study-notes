/**
 * 文字输出
 * https://www.nowcoder.com/practice/b403d1051e5d4568912e6d265e1e2cde?tpId=2&&tqId=38374&rp=1&ru=/activity/oj&qru=/ta/front-end/question-ranking
    
    页面上存在id为jsBlink的下划线闪动节点，请按照如下需求实现 output 函数
    1、函数 output 接收一个字符串参数，每隔200毫秒在闪动节点之前逐个显示字符
    2、请新建span节点放置每个字符，其中span必须存在class "word"，并随机加上 color0 ~ color23 中的任一个class（请使用系统随机函数）
    3、每次输出指定字符串前，请将闪动节点之前的所有其他节点移除
    4、不要销毁或者重新创建闪动节点
    5、如果输出字符为空格、<、>，请分别对其进行HTML转义，如果是\n请直接输出<br />，其他字符不需要做处理
    6、请不要手动调用output函数
    7、当前界面为系统执行 output('hello world\n你好世界') 之后，最终的界面，过程请参考以下图片
    8、请不要手动修改html和css
    9、不要使用第三方插件
    10、请使用ES5语法
 */
function output(str) {
    if (!str || typeof str !== 'string') return;
    const arr = str.split('');
    const domBlink = document.getElementById('jsBlink');
    const newNode = document.createDocumentFragment();

    function update() {
        let value = arr.shift();
        const children = domBlink.parentNode.children;

        while (children.length > 1) {
            children[0].remove();
        }

        if (value === '\n') {
            newNode.appendChild(document.createElement('br'));
        } else {
            const span = document.createElement('span');
            // const rundom = Math.round(Math.random() * 23);
            const rundom = Math.floor(Math.random() * 24 + 1);

            span.className = 'word ' + 'color' + rundom;

            if (value === ' ') {
                span.innerHTML = '&nbsp;';
            } else if (value === '<') {
                span.innerHTML = '&lt;';
            } else if (value === '>') {
                span.innerHTML = '&gt;';
            } else {
                span.textContent = value;
            }

            newNode.appendChild(span);
        }

        const copyNode = newNode.cloneNode(true);
        domBlink.parentNode.insertBefore(copyNode, domBlink);
        if (arr.length > 0) {
            setTimeout(() => {
                update();
            }, 200);
        }
    }
    update();
}
// output('12345')
// output(' <>\n \n <> ')
// output('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890')
/**
 *测试用例
 */
function test() {
    let bResult = false;
    let fRandom = Math.random;
    Math.random = function () {
        bResult = true;
        return fRandom.apply(Math, arguments);
    };
    let Clock = fGetClock();
    let blink = document.getElementById('jsBlink');
    let dv = blink.parentNode;
    fOutput('1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890');
    let span = [].slice.call(dv.children, 0);
    if (bResult) {
        span.forEach(function (span) {
            if (span !== blink && bResult) {
                let sCls = span.className || '';
                let aCls = sCls.trim().split(/\s+/);
                bResult = bResult && aCls.length === 2 && aCls.indexOf('word') >= 0;
                if (bResult) {
                    let aRandom = /color(\d+)/.exec(sCls);
                    bResult = bResult && aRandom && aRandom.length === 2;
                    if (bResult) {
                        let nRandom = +aRandom[1];
                        bResult = bResult && nRandom >= 1 && nRandom <= 24; // 大坑！！！
                    }
                }
            }
        });
    }
    return bResult;
    function fOutput(str) {
        let count = (str || '').length;
        output(str || '');
        for (let i = 0; i < count; i++) {
            Clock.next();
        }
    }
    function fGetClock() {
        window.setTimeout = function (fCb, nDuration) {
            return Clock.create(fCb, nDuration);
        };
        window.setInterval = function (fCb, nDuration) {
            return Clock.create(fCb, nDuration, true);
        };
        window.clearTimeout = function (oClock) {
            Clock.remove(oClock);
        };
        window.clearInterval = function (oClock) {
            Clock.remove(oClock);
        };
        function Clock(fCb, nDuration, bIsInterval) {
            this.cb = fCb;
            this.duration = nDuration;
            this.isInterval = bIsInterval;
        }
        extend(Clock, {
            pool: {},
            curTimestamp: 0,
            loopTimes: 0,
            totalRunCount: 1000,
            create: fCreate,
            remove: fRemove,
            start: fStart,
            next: fNext,
            push: fPush,
        });
        return Clock;
        function fCreate(fCb, nDuration, bIsInterval) {
            nDuration = window.parseInt(nDuration) || 0;
            let oItem = new Clock(fCb, nDuration, bIsInterval);
            let nTmp = Clock.curTimestamp;
            Clock.push(Clock.curTimestamp + oItem.duration, oItem);
            return oItem;
        }
        function fRemove(oClock) {
            let oPool = Clock.pool;
            for (let sKey in oPool) {
                if (!oPool.hasOwnProperty(sKey)) {
                    continue;
                }
                let aVal = oPool[sKey];
                for (let i = aVal.length - 1; i >= 0; i--) {
                    if (aVal[i] === oClock) {
                        aVal.splice(i, 1);
                    }
                }
                if (aVal.length === 0) {
                    delete oPool[sKey];
                }
            }
        }
        function fStart() {
            if (Clock.loopTimes > Clock.totalRunCount) {
                return;
            }
            fNext();
            Clock.loopTimes++;
            Clock.start();
        }
        function fNext() {
            let aKeys = keys(Clock.pool);
            if (aKeys.length === 0) {
                return;
            }
            for (let i = 0, l = aKeys.length; i < l; i++) {
                aKeys[i] = +aKeys[i];
            }
            aKeys.sort();
            Clock.curTimestamp = aKeys[0];
            let sKey = aKeys[0] + '';
            let aVal = Clock.pool[sKey];
            delete Clock.pool[sKey];
            for (let i = 0, l = aVal.length; i < l; i++) {
                let oClock = aVal[i];
                if (oClock.isInterval) {
                    Clock.push(Clock.curTimestamp + oClock.duration, oClock);
                }
                oClock.cb();
            }
        }
        function fPush(nTimestamp, oItem) {
            let oPool = Clock.pool;
            let sKey = nTimestamp + '';
            if (!oPool[sKey]) {
                oPool[sKey] = [];
            }
            oPool[sKey].push(oItem);
        }
        function extend(o, oExtend) {
            for (let sKey in oExtend) {
                if (oExtend.hasOwnProperty(sKey)) {
                    o[sKey] = oExtend[sKey];
                }
            }
        }
        function keys(o) {
            let result = [];
            for (let sKey in o) {
                if (o.hasOwnProperty(sKey)) {
                    result.push(sKey);
                }
            }
            return result;
        }
    }
}
console.log('tset--result---------', test());
