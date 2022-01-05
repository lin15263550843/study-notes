interface ThrottleOptions {
    leading?: boolean; // 第一次是否执行
    trailing?: boolean; // 最后一次是否执行
    resultCallback?: Function; // 拿到函数返回值
}
/**
 * 节流
 * loadsh、underecore 等库已实现
 *
 * @param { Function } fn 触发函数
 * @param { number } delay 触发间隔
 * @param { boolean } leading 第一次是否执行
 * @param { boolean } trailing 最后一次是否执行
 * @param { Function } resultCallback  拿到函数返回值
 * @returns 节流函数
 */
export function throttle(
    fn: Function,
    interval: number,
    options: ThrottleOptions = { leading: true, trailing: false },
) {
    const { leading, trailing, resultCallback } = options;

    // 记录上一次的开始时间
    let lastTime = 0;

    let timer: any = null;

    // 触发时，真正执行的函数
    function _throttle(this: any, ...args: any[]) {
        // 当前时间
        const nowTime = new Date().getTime();

        // 第一次是否触发
        if (!lastTime && !leading) lastTime = nowTime;

        // 计算出剩余多长时间去触发函数
        const remainTime = interval - (nowTime - lastTime);

        // 当前时间减去上一次开始的时间，是否大于等于间隔时间，大于等于间隔时间再去触发函数
        // if (nowTime - lastTime >= interval) {
        if (remainTime <= 0) {
            // 只有 leading 为 true 第一次需要触发时，才会在这里触发函数，其他时候触发的是 setTimeout 中的函数
            const result = fn.apply(this, args);

            if (resultCallback) resultCallback(result);
            // 保留上次触发的时间
            lastTime = nowTime;

            // 如果触发了，就取消定时器
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            // 已经触发了函数，无需再执行定时器
            return;
        }

        // 最后触发一次
        if (trailing && timer === null) {
            console.log('remainTime', remainTime);

            timer = setTimeout(() => {
                // 真正触发函数
                const result = fn.apply(this, args);
                if (resultCallback) resultCallback(result);

                // 如果 leading 为 false 第一次不执行，lastTime 需要为 0，不然 leading 就无效了
                // lastTime = new Date().getTime();
                lastTime = leading ? new Date().getTime() : 0;

                timer = null;
                // 使用 remainTime 会比较精确，
                // 当 leading 为 false 时，此时使用 interval 和 remainTime 是等价的：remainTime = interval - (nowTime - lastTime) = interval - 0 = interval
            }, remainTime);
        }
    }

    // 取消
    _throttle.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        lastTime = 0;
    };

    return _throttle;
}
/**
 * 最简单版本
 */
// export function throttle(fn: Function, interval: number, config?: ThrottleConfig) {
//     // const {} = config ?? {};

//     let lastTime = 0;

//     // 真正执行的函数
//     function _throttle(this: any, ...args: any[]) {
//         const nowTime = new Date().getTime();
//         // const remainTime = interval - (nowTime - lastTime);
//         // 当前时间大于间隔时间ze
//         if (nowTime - lastTime >= interval) {
//             fn.apply(this, args);
//             lastTime = nowTime;
//         }
//     }

//     return _throttle;
// }
