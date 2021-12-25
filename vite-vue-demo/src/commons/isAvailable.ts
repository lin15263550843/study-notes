/**
 * 校验邮箱格式
 * @param { string } sEmail 邮箱字符串
 * @returns { boolean } 校验结果
 */
export function isAvailableEmail(sEmail: string) {
    if (typeof sEmail !== 'string') return false;
    // 123@qq.com  abc.abc@qq.com.cn
    return /^[\w._-]+@[\w]+\.[\w.]+$/.test(sEmail);
}
/**
 * 校验邮箱格式
 * @param { string } sEmail 邮箱字符串
 * @returns { boolean } 校验结果
 */
export function isAvailablePhone(sEmail: string) {
    // if (typeof sEmail !== 'string') return false;
    return /^1[3-9][0-9]{9}/.test(sEmail);
}
