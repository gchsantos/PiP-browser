#!/usr/bin/env node node_modules/electron/cli

const yargs = require('yargs');
const pipBrowser = require("../lib/main.js").pipBrowser;

args = yargs.argv
pipBrowser({ url: args.url, file: args.file, frame: (args.frame === 'true') });
