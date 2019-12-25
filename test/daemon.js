'use strict';

const tap = require('tap');
// const stream = require('readable-stream');
const Daemon = require('../');
/*
const destObjectStream = (done) => {
    const arr = [];

    const dStream = new stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            arr.push(chunk);
            callback();
        },
    });

    dStream.on('finish', () => {
        done(arr);
    });

    return dStream;
};
*/
/**
 * Constructor
 */

tap.test('Constructor() - object type - should be MetricsDaemon', (t) => {
    const daemon = new Daemon();
    t.equal(Object.prototype.toString.call(daemon), '[object MetricsDaemon]');
    t.end();
});
