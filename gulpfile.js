const { watch, series, parallel, src, dest, gulp } = require('gulp');
const connect = require('gulp-connect'); // Runs a local webserver
const open = require('gulp-open'); // Opens a URL in a web browser

// Launch Chrome web browser
// https://www.npmjs.com/package/gulp-open
function openBrowser(done) {
    var options = {
    uri: 'http://localhost:8080'
    };
    return src('./')
    .pipe(open(options));
    done();
}

// Gulp plugin to run a webserver (with LiveReload)
// https://www.npmjs.com/package/gulp-connect
function server(done) {
    return connect.server({
    root: './',
    port: 8080,
    debug: true,
    });
    done();
}

// Default Gulp command
exports.default = series(openBrowser, server);