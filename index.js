#!/usr/bin/env node

const program = require('commander')
const { getSPF } = require('./src/index.js');

program.version('0.1').description('SpoofMailCheck')
program.command('check').description('Check')
    .option('-d, --domain <domain>', 'domain name')
    .action(async (options) => {
        console.log(options.domain);

        getSPF(options.domain);
    });

program.parse(process.argv);