import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';

module.exports = function ( $ ) {
    // case3
    $('.download').on('click', function () {
        this.off('click', arguments.callee, false);
        JSZipUtils.getBinaryContent('./img/svga/rose.svga', function (err, data) {
            if (err) {
                throw err;
            }
            JSZip.loadAsync(data).then((zip) => {
                zip.file('movie.spec').async('string').then((spec) => {
                    let movieItem = JSON.parse(spec);
                    console.log(movieItem, zip);
                });
            });
        });
    }, false);
};
