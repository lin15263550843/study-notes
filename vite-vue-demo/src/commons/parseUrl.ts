import { isString } from './typeJudge';
/**
 * 把url 的拼接参数解析成对象
 * @param search url的参数字符串 
 * @returns url 参数对象
 * 
 * `
 * 示例代码
 * const urlSearch = '?name=盖伦&age=12&sex=male&girl=皇子&girl=蛮王&girl=赵信&code=&=what&=why';
=* console.log('parseUrl params', parseUrl(urlSearch));
 * 实际使用场景 parseUrl(location.search);
 * `
 */
export function parseUrl(search: string) {
    if (typeof search !== 'string' || !search) return {}; // 非 string，或者为空 直接返回 {}
    if (search.startsWith('http://') || search.startsWith('https://')) {
        search = search.split('?')[1];
    }
    if (!search) return {}; // 为空直接返回 {}
    const params: any = {}; //定义数组
    const list = search.slice(1).split('&'); // 去除 ? ，根据 & 切分参数
    list.forEach(item => {
        const [k, v] = item.split('='); // 根据 = 分割出 key 和 value
        // 根据实际使用情况看是否需要把值转成 undefined ！！！
        // const v2: any = v !== '' ? window.decodeURI(v) : undefined;
        const v2: any = window.decodeURI(v);
        // if (k === '') {
        //     // 不存在 key 的时候  存放到 __ 中
        //     params['__'] = params['__'] === undefined ? [v2] : [].concat(params['__'], v2);
        //     return;
        // }
        if (params[k] === undefined) {
            params[k] = v2;
        } else {
            // 多个同名参数处理到一个数组中
            params[k] = [].concat(params[k], v2);
        }
    });
    return params; //返回这个数组.
}
// parseUrl(location.search);

// function getUrlParam(sUrl, sKey) {
//     if(typeof sUrl !== 'string' || !sUrl) return sKey ? '' : {}
//     const s1 = sUrl.split('?')[1] || ''
//     const s2 = s1.split('#')[0]
//     const arr = s2.split('&')
//     const params = {}

//     arr.forEach(value => {
//         const [k, v] = value.split('=')
//         const v2 =  window.decodeURI(v || '')
//         if (params[k]) {
//             params[k] = [].concat(params[k], v2)
//         } else {
//             params[k] = v2
//         }
//     })

//     return sKey ? params[sKey] || '' : params
// }
