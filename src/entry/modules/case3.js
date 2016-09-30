// TODO: 

module.exports = function ( $ ) {
    // case3
    (function ( onload ) {
        this.onload = onload;
        this.charset = 'utf-8';
        this.src = './js/zip.js';
        document.head.append(this);
    }).call(document.createElement('script'), function () {
        // zip ready
        console.log('zip ready');
        (function ( onload ) {
            this.onload = onload;
            this.charset = 'utf-8';
            this.src = './js/zip-ext.js';
            document.head.append(this);
        }).call(document.createElement('script'), function () {
            // zip-ext ready
            console.log('zip-ext ready');
            // click download
            $('.download').on('click', function () {
                this.off('click', arguments.callee, false);
                // zip.HttpReader('./img/svga/rose.svga')
                // zip.init(function () {
                //     debugger;
                // }, function () {
                //     console.log('error', arguments);
                // });
            }, false);
        });
    });
};
