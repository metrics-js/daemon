'use strict';

const stream = require('readable-stream');
const Udpd = require('./udpd');

const MetricsDaemon = class MetricsDaemon extends stream.Readable {
    constructor() {
        super({ objectMode: true, });

        Object.defineProperty(this, 'server', {
            value: new Udpd(),
        });

        this.server.on('message', (metric) => {
            if (this._readableState.flowing) {
                this.push(metric);
                return;
            }
        });
    }

    get [Symbol.toStringTag]() {
        return 'MetricsDaemon';
    }

    _read() {
        // nothiong to do, push happens in on message
    }

    listen() {
        this.server.listen(6667);
    }
};

module.exports = MetricsDaemon;
