"use strict";

const EventEmitter = require("events");
const Metric = require("@metrics/metric");
const abslog = require("abslog");
const dgram = require("dgram");

const MetricsDaemonUdpd = class MetricsDaemonUdpd extends EventEmitter {
	constructor({ port = 40400, address, logger } = {}) {
		super();

		Object.defineProperty(this, "socket", {
			value: dgram.createSocket("udp4"),
		});

		Object.defineProperty(this, "address", {
			value: address,
		});

		Object.defineProperty(this, "port", {
			value: port,
		});

		Object.defineProperty(this, "log", {
			value: abslog(logger),
		});

		this.socket.on("error", (error) => {
			this.log.error(error);
			this.socket.close();
		});

		this.socket.on("message", (data, info) => {
			try {
				const obj = JSON.parse(data);
				const metric = new Metric(obj);
				this.emit("message", metric);
				// eslint-disable-next-line no-unused-vars
			} catch (err) {
				this.log.error(`Recieved non metric object from ${info.address}:${info.port}`);
			}
		});

		this.socket.on("listening", () => {
			const info = this.socket.address();
			this.log.info(`Daemon listening on UDP on ${info.address}:${info.port}`);
		});
	}

	get [Symbol.toStringTag]() {
		return "MetricsDaemonUdpd";
	}

	listen() {
		this.socket.bind(this.port, this.address);
	}

	destroy() {
		this.socket.close();
	}
};

module.exports = MetricsDaemonUdpd;
