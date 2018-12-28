'use strict';

const stream = require('readable-stream');
const Udpd = require('./udpd');

const MetricsDaemon = class MetricsDaemon extends stream.Readable {
    constructor(type = 'udp', options = {}) {
        super({ objectMode: true, });

        let transport;
        if (type === 'udp') {
            transport = new Udpd(options);
        } else {
            throw new Error(`Transport type "${type || 'undefined'}" is not supported.`);
        }

        Object.defineProperty(this, 'server', {
            value: transport,
        });

        this.server.on('message', (metric) => {
            if (this.readableFlowing) {
                this.push(metric);
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
        this.server.listen();
    }
};

module.exports = MetricsDaemon;
