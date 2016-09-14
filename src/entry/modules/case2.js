import timer from './timer';

// return src or image data
let getData = (function () {
    let canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    let context = canvas.getContext('2d');
    return function getData ( img ) {
        return img.src;
        // context.clearRect(0, 0, 500, 500);
        // context.drawImage(img, 0, 0, 500, 500);
        // return canvas.toDataURL();
    }
})();

module.exports = function ( $ ) {
    // case2
    // click download
    $('.download').on('click', function () {
        let url = './img/frame-animation/rose/$.png';
        let source = [];
        let pic = 60;
        let current = 0;
        let progress = $('.download-progress i');
        // start download
        timer.start('download');
        for (let i = 0; i < pic; ) {
            let img = source[i] = new Image;
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
                    // create keyframes
                    $('.player').innerHTML = `
                    <style>
                        .player {
                            animation: play 4s steps(${ pic }) infinite;
                            -webkit-animation: play 4s steps(${ pic }) infinite;
                        }
                        @keyframes play {
                            ${ $for(pic, ( index ) => `
                                ${ ((index + 1)*100/pic).toFixed(4) }% {
                                    background-image: url(${ getData(source[index]) })
                                }
                            `) }
                        }
                        @-webkit-keyframes play {
                            ${ $for(pic, ( index ) => `
                                ${ ((index + 1)*100/pic).toFixed(4) }% {
                                    background-image: url(${ getData(source[index]) })
                                }
                            `) }
                        }
                    </style>`;
                    // end play
                    let playTime = timer.end('play');
                    $('.play-time span').innerHTML = playTime/1000 + 's';
                    $('.play-progress i').style.width = '100%';
                }, false);
            }
        }
    }, false);
};

// iterator
function $for ( iterator, template ) {
    let result = [];
    for (let i = 0; i < iterator; i++) {
        result.push(template(i));
    }
    return result.join('');
}
