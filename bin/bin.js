#!/usr/bin/env node

const Daemon = require('../');
const path = require('path');

const config = require(path.resolve(process.argv[2]));

const server = new Daemon();
server.listen();
