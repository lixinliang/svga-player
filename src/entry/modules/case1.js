import timer from './timer';

module.exports = function ( $ ) {
    // case1
    (function ( onload ) {
        this.onload = onload;
        this.charset = 'utf-8';
        this.src = './js/svgaplayer.min.js';
        document.head.append(this);
    }).call(document.createElement('script'), function () {
        // svga ready
        console.log('svga ready');
        // click download
        $('.download').on('click', function () {
            this.off('click', arguments.callee, false);
            // create canvas
            (function ( resolve ) {
                this.width = 500;
                this.height = 500;
                $('.player').append(this);
                resolve(this);
            }).call(document.createElement('canvas'), function ( canvas ) {
                // create player
                canvas.id = 'canvas';
                let player = new SVGAPlayer(canvas.id);
                // start download
                timer.start('download');
                player.load('./img/svga/rose.svga', function () {
                    // end download
                    let downloadTime = timer.end('download');
                    $('.download-time span').innerHTML = downloadTime/1000 + 's';
                    $('.download-progress i').style.width = '100%';
                    // debugger;
                    $('.play').on('click', function () {
                        this.off('click', arguments.callee, false);
                        // start play
                        timer.start('play');
                        // player.options.loops = 1;
                        player.play();
                        // end play
                        let playTime = timer.end('play');
                        $('.play-time span').innerHTML = playTime/1000 + 's';
                        $('.play-progress i').style.width = '100%';
                    }, false);
                });
            });
        }, false);
    });
};
