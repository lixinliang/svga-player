import timer from './timer';

module.exports = function ( $ ) {
    // case3
    (function ( onload ) {
        this.onload = onload;
        this.charset = 'utf-8';
        this.src = './js/svga.min.js';
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
                // start download
                timer.start('download');
                canvas.id = 'canvas';
                let player = new Svga({
                    worker : 'js/svga-worker.min.js',
                    canvas : `#${ canvas.id }`,
                    assets : '/img/svga/rose.svga',
                    autoPlay : false,
                    loop : true,
                }, function () {
                    // end download
                    let downloadTime = timer.end('download');
                    $('.download-time span').innerHTML = downloadTime/1000 + 's';
                    $('.download-progress i').style.width = '100%';
                    $('.play').on('click', function () {
                        this.off('click', arguments.callee, false);
                        // start play
                        timer.start('play');
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
