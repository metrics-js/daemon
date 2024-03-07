#!/usr/bin/env node

// const path = require('path');
const Daemon = require("../");

// const config = require(path.resolve(process.argv[2]));

const server = new Daemon();
server.listen();
