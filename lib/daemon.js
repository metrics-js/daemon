'use strict';

const stream = require('readable-stream');

const MetricsDaemon = class MetricsDaemon extends stream.Readable {
    constructor() {
        super({ objectMode: true, });
    }

    get [Symbol.toStringTag]() {
        return 'MetricsDaemon';
    }

    _read() {
        // nothiong to do, push happens in scheduler
    }
};

module.exports = MetricsDaemon;
