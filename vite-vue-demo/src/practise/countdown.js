function second(second) {
    const result = { day: 0, hour: '00', min: '00', second: '00' };
    if (typeof second !== 'number') return result;

    const n = 24 * 60 * 60;
    const h = 60 * 60;
    const m = 60;

    const day = Math.floor(second / n);
    const hour = Math.floor((second % n) / h);
    const min = Math.floor(((second % n) % h) / m);
    const s = Math.floor(((second % n) % h) % m);

    return { day, hour, min, second: s };
}

function render(data) {
    const div = document.getElementById('jsCountdown');
    const children = div.children;

    function patch(n) {
        return n < 10 ? '0' + n : n;
    }

    function renderDom() {
        if (data.day <= 0) children[0].className += ' hide';

        children[0].innerHTML = patch(data.day) + '天';
        children[1].innerHTML = patch(data.hour) + ':';
        children[2].innerHTML = patch(data.min) + ':';
        children[3].innerHTML = patch(data.second);

        // for (let child of children) {
        //     div.appendChild(child);
        // }
    }

    function countdown() {
        if (data.second <= 0) {
            if (data.min <= 0) {
                if (data.hour <= 0) {
                    data.day = --data.day;
                    data.hour = 23;
                    data.min = 59;
                    data.second = 59;
                } else {
                    data.hour = --data.hour;
                    data.min = 59;
                    data.second = 59;
                }
            } else {
                data.min = --data.min;
                data.second = 59;
            }
        } else {
            data.second = --data.second;
        }

        return data;
    }

    const id = setInterval(() => {
        countdown();
        if (data.day === 0 && data.hour === 0 && data.min === 0 && data.second === 0) {
            clearInterval(id);
        }
        renderDom();
    }, 1000);

    renderDom();
}

function test() {
    render(second(3601));
    var span = document.getElementById('jsCountdown').getElementsByTagName('span');
    var result =
        span[0].classList.contains('hide') &&
        span[1].innerHTML === '01:' &&
        span[2].innerHTML === '00:' &&
        span['3'].innerHTML === '01';
    return result;
}

console.log('test()----->>>', test());
