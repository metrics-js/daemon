'use strict';

const EventEmitter = require('events');
const Metric = require('@metrics/client/lib/metric');
const dgram = require('dgram');

const MetricsDaemonUdpd = class MetricsDaemonUdpd extends EventEmitter {
    constructor() {
        super();

        Object.defineProperty(this, 'socket', {
            value: dgram.createSocket('udp4'),
        });

        this.socket.on('error', (error) => {
            console.log(`server error:\n${error.stack}`);
            this.socket.close();
        });

        this.socket.on('message', (data, rinfo) => {
            // console.log(`server got: ${message} from ${rinfo.address}:${rinfo.port}`);
            try {
                const obj = JSON.parse(data);
                const metric = new Metric(obj);
                this.emit('message', metric);
            } catch(err) {
                // do something??
            }
        });

        this.socket.on('listening', () => {
            const address = this.socket.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });
    }

    get [Symbol.toStringTag]() {
        return 'MetricsDaemonUdpd';
    }

    listen(port) {
        this.socket.bind(port, 'localhost');
    }

    destroy() {
        this.socket.close();
    }
};

module.exports = MetricsDaemonUdpd;
