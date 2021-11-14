/**
 * 时间格式化
 * @param date
 * @param format
 * @returns
 */
export function formatDate(date: any, format: string) {
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

    function add0(s: number) {
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

    for (const k in o) {
        const key = k as keyof typeof o;
        const flag = new RegExp(`(${k})`).test(format);
        if (flag) {
            format = format.replace(k, o[key]);
        }
    }
    return format;
}
