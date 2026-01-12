"use strict";

const { test } = require("node:test");
const assert = require("node:assert");
// const stream = require('readable-stream');
const Daemon = require("../");
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

test("Constructor() - object type - should be MetricsDaemon", () => {
	const daemon = new Daemon();
	assert.strictEqual(Object.prototype.toString.call(daemon), "[object MetricsDaemon]");
});
