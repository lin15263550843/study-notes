/**
 * 获取模板
 */
export function getTemplate(val) {
    return typeof val === 'string' ? document.querySelector(val) : val
}
