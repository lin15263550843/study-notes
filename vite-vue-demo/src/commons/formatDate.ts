// @ts-nocheck
// import moment from 'moment';
/**
 * 时间格式化
 */
function formatDate(date, format) {
    if (typeof format !== 'string') return '';
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    if (isNaN(date.getTime())) return '';

    const m = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const mm = date.getMinutes();
    const s = date.getSeconds();
    const day = date.getDay();

    function add0(s) {
        return s < 10 ? '0' + s : s;
    }

    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const o = {
        yyyy: date.getFullYear(),
        yy: date.getFullYear().toString().slice(-2),
        MM: add0(m),
        M: m,
        dd: add0(d),
        d: d,
        HH: add0(h),
        H: h,
        hh: h > 12 ? add0(h - 12) : add0(h),
        h: h > 12 ? h - 12 : h,
        mm: add0(mm),
        m: mm,
        ss: add0(s),
        s: s,
        w: days[day],
    };

    for (let k in o) {
        const reg = new RegExp(`(${k}+)`).exec(format);

        if (reg) {
            format = format.replace(reg[1], o[k]);
        }
    }

    return format;
}

console.log(formatDate(new Date(), 'yyyy-MM-dd HH-mm-ss 星期w'));
console.log(formatDate(new Date(), 'yy-M-d H:m:s 星期w'));
console.log(formatDate(new Date(), 'yyy-M-d H:m:s 星期w'));
console.log(formatDate(new Date(), 'yyyyy-MM-dd HH-mm-ss 星期w'));
// console.log('moment --->>>', moment(new Date()).format('yyyy-MM-dd HH:mm:ss 星期w'));
// console.log('moment --->>>', moment(new Date()).format('y-M-d H:m:s 星期w'));
