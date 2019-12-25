'use strict';

const Emitter = require('@metrics/emitter');
const cluster = require('cluster');
const Client = require('@metrics/client');
const stream = require('readable-stream');
const os = require('os');
const Daemon = require('../');

const port = 60600;

const master = () => {
    const dest = new stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            console.log(chunk);
            callback();
        },
    });

    const daemon = new Daemon('udp', { port });
    daemon.pipe(dest);
    daemon.listen();
};

const worker = () => {
    const emitter = new Emitter('udp', { port });
    const client = new Client();

    client.pipe(emitter);

    const interval = Math.floor((Math.random() * 1000) + 1000);
    let counter = 0;
    setInterval(() => {
        client.metric({
            name: `worker_${cluster.worker.id}`,
            description: `Worker number: ${cluster.worker.id}`,
            value: counter,
        });

        counter += 1;
    }, interval);
};

const workers = [];

if (cluster.isMaster) {
    for (let i = 0; i < (os.cpus().length - 1); i++) {
        workers.push(cluster.fork());
    }
    master();
}

if (cluster.isWorker) {
    worker();
}
