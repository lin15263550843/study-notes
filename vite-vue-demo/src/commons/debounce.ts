interface DebounceConfig {
    immediate?: boolean; // 是否阶段性立即执行
    resultCallback?: Function; // 拿到函数返回值
}
/**
 * 防抖
 * loadsh、underecore 等库已实现
 *
 * @param fn 触发函数
 * @param delay 触发间隔
 * @param config 参数配置
 * @returns 防抖函数
 */
export function debounce(fn: Function, delay: number, config?: DebounceConfig) {
    const { immediate, resultCallback } = config || {};
    let isInvoke = false; // 阶段性立即执行标识，当前阶段只执行一次
    // 定义一个定时器，保存上一次的定时器
    let timer: any = null;
    // 真正执行的函数
    function _debounce(this: any, ...args: any[]) {
        if (immediate && !isInvoke) {
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            isInvoke = true;
        }
        // 取消上一次的定时器
        if (timer !== null) {
            clearTimeout(timer);
        }
        // 延迟执行
        timer = setTimeout(() => {
            // 真正需要执行的函数
            const result = fn.apply(this, args);
            if (resultCallback) resultCallback(result);
            timer = null;
            isInvoke = false;
        }, delay);
    }
    // 取消
    _debounce.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        isInvoke = false;
    };
    return _debounce;
}
/**
 * 最简单版本
 */
// export function debounce(fn: Function, delay: number, config = {}) {
//     // 定义一个定时器，保存上一次的定时器
//     let timer: any = null;
//     // 真正执行的函数
//     return function (this: any, ...args: any[]) {
//         // 取消上一次的定时器
//         if (timer !== null) clearTimeout(timer);
//         // 延迟执行
//         timer = setTimeout(() => {
//             // 真正需要执行的函数
//             fn.apply(this, args);
//         }, delay);
//     };
// }

