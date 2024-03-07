"use strict";

const stream = require("readable-stream");
const Daemon = require("../");

const dest = new stream.Writable({
	objectMode: true,
	write(chunk, encoding, callback) {
		console.log(chunk);
		callback();
	},
});

const daemon = new Daemon("udp");
daemon.pipe(dest);
daemon.listen();
