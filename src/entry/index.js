import './sass/index.scss';

import case1 from './modules/case1.js';
import case2 from './modules/case2.js';
import case3 from './modules/case3.js';

document.body.innerHTML = `
<h2>${ document.title }</h2>
<h3>播放区域</h3>
<div class="player"></div>
<div class="mock-box">
    <div class="mock-display"></div>
    <div class="mock-option">
        <input type="text" value="30">
        <select>
            <option value="setTimeout" selected>setTimeout</option>
            <option value="requestAnimationFrame">requestAnimationFrame</option>
        </select>
    </div>
</div>
<button class="mock">计算</button>
<button class="download">点击下载资源</button>
<div class="download-progress"><i style="width:0%"></i></div>
<div class="download-time">下载用时:<span>NaN</span></div>
<button class="play">点击开始播放</button>
<div class="play-progress"><i style="width:0%"></i></div>
<div class="play-time">计算用时:<span>NaN</span></div>
`;

let $ = document.querySelector.bind(document);
(function () {
    this.on = this.addEventListener;
    this.off = this.removeEventListener;
    this.append = this.appendChild;
}).call(Element.prototype);

if (/case1/.test(document.title)) {
    case1($);
}
if (/case2/.test(document.title)) {
    case2($);
}
if (/case3/.test(document.title)) {
    case3($);
}

$('.mock').on('click', function () {
    this.off('click', arguments.callee, false);
    let interval = $('.mock-option input');
    let type = $('.mock-option select');
    let blank = $('.mock-display');
    let interval_value = interval.value;
    let type_value = type.value;
    function loop () {
        if (type_value == 'setTimeout') {
            setTimeout(loop, +interval_value);
        }
        if (type_value == 'requestAnimationFrame') {
            let start = new Date;
            requestAnimationFrame(function () {
                if (new Date - start >= interval_value) {
                    loop();
                } else {
                    requestAnimationFrame(arguments.callee);
                }
            });
        }
        // 复杂计算
        let random = (Math.random() * 100).toFixed(2);
        if (random.length < 5) {
            random = '0' + random;
        }
        blank.innerHTML = random;
    }
    loop();
    this.on('click', function () {
        interval_value = interval.value;
        type_value = type.value;
    }, false);
}, false);
