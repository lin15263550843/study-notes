function link() {
    const dom = document.getElementById('jsContainer');
    const text = dom.innerHTML || '';
    const arr = text.split(' ');
    dom.innerHTML = arr
        .map(value => {
            if (!value) return '';
            return value.replace(/http:\/\/\S+|https:\/\/\S+|www\.\S+/, function (v1) {
                if (v1.slice(0, 4) === 'www.') {
                    return `<a href="http://${v1}" target="_blank">${v1}</a>`;
                } else {
                    return `<a href="${v1}" target="_blank">${v1}</a>`;
                }
            });
        })
        .join(' ');
}
/**
 * 测试用例
 */
function test() {
    var content = ' www.testhaha.com ';
    var div = document.getElementById('jsContainer');
    div.innerHTML = content;
    link();
    var aLink = div.getElementsByTagName('a') || [];
    var result =
        aLink.length === 1 &&
        aLink[0].getAttribute('href') === 'http://www.testhaha.com' &&
        aLink[0].getAttribute('target') === '_blank' &&
        aLink[0].innerHTML === 'www.testhaha.com';
    return result;
}
console.log('test----->>>', test());

function test2() {
    var content = 'test http://www.testhaha.com test  test ';
    var div = document.getElementById('jsContainer');
    div.innerHTML = content;
    link();
    var aLink = div.getElementsByTagName('a') || [];
    var result =
        aLink.length === 1 &&
        aLink[0].getAttribute('href') === 'http://www.testhaha.com' &&
        aLink[0].getAttribute('target') === '_blank' &&
        aLink[0].innerHTML === 'http://www.testhaha.com';
    return result;
}
console.log('test2----->>>', test2());

function test3() {
    var content = 'test https://www.testhaha.com www.testhaha.com.cn?from=nowcoder test  test ';
    var div = document.getElementById('jsContainer');
    div.innerHTML = content;
    link();
    var aLink = div.getElementsByTagName('a') || [];
    var a0 = aLink[0];
    var a1 = aLink[1];
    var result = aLink.length === 2;
    result =
        result &&
        a0.getAttribute('href') === 'https://www.testhaha.com' &&
        a0.getAttribute('target') === '_blank' &&
        a0.innerHTML === 'https://www.testhaha.com';
    result =
        result &&
        a1.getAttribute('href') === 'http://www.testhaha.com.cn?from=nowcoder' &&
        a1.getAttribute('target') === '_blank' &&
        a1.innerHTML === 'www.testhaha.com.cn?from=nowcoder';
    return result;
}
console.log('test3----->>>', test3());
