interface ThrottleOptions {
    leading?: boolean; // 第一次是否执行
    trailing?: boolean; // 最后一次是否执行
}
/**
 * 节流
 * loadsh、underecore 等库已实现
 *
 * @param { Function } fn 触发函数
 * @param { number } delay 触发间隔
 * @param { boolean } leading 第一次是否执行
 * @param { boolean } trailing 最后一次是否执行
 * @returns 节流函数
 */
export function throttle(
    fn: Function,
    interval: number,
    options: ThrottleOptions = { leading: true, trailing: false },
) {
    const { leading, trailing } = options;

    // 记录上一次的开始时间
    let lastTime = 0;

    let timer: any = null;

    // 触发时，真正执行的函数
    function _throttle(this: any, ...args: any[]) {
        // 当前时间
        const nowTime = new Date().getTime();

        // 第一次是否触发
        if (!lastTime && !leading) lastTime = nowTime;

        // const remainTime = interval - (nowTime - lastTime);
        // 当前时间减去上一次开始的时间，是否大于等于间隔时间，大于等于间隔时间再去触发函数
        if (nowTime - lastTime >= interval) {
            // 真正触发函数
            fn.apply(this, args);
            // 保留上次触发的时间
            lastTime = nowTime;
        }
    }

    // 取消
    // _throttle.cancel = () => {
    //     if (timer) clearTimeout(timer);
    //     timer = null;
    // };

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

//     // 取消
//     // _throttle.cancel = () => {
//     //     if (timer) clearTimeout(timer);
//     //     timer = null;
//     // };

//     return _throttle;
// }
