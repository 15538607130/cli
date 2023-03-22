#!/usr/bin/env node

const program = require('commander')
const package = require('./package.json')
const helpOptions = require('./lib/core/help')
const createCommands = require('./lib/core/create')


program.version(package.version)

// 命令的options 配置
helpOptions()

// 创建 create 指令
createCommands()

// 解析指令
program.parse(process.argv)
