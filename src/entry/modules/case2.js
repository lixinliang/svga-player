import timer from './timer';

module.exports = function ( $ ) {
    // click download
    $('.download').on('click', function () {
        let url = './img/frame-animation/rose/$.png';
        let pic = 60;
        let current = 0;
        let progress = $('.download-progress i');
        // start download
        timer.start('download');
        for (let i = 0; i < pic; ) {
            let img = new Image;
            img.onload = onload;
            img.src = url.replace('$', ('0' + (++i)).slice(-2));
        }
        function onload () {
            current++;
            progress.style.width = (current/pic*100).toFixed(2) + '%';
            if (current == pic) {
                // end download
                let downloadTime = timer.end('download');
                $('.download-time span').innerHTML = downloadTime/1000 + 's';
                $('.play').on('click', function () {
                    this.off('click', arguments.callee, false);
                    // start play
                    timer.start('play');
                    // TODO: 生成关键帧
                    // TODO: 尝试采用压缩图
                    // end play
                    let playTime = timer.end('play');
                    $('.play-time span').innerHTML = playTime/1000 + 's';
                    $('.play-progress i').style.width = '100%';
                }, false);
            }
        }
    }, false);
};
