#!/usr/bin/env node

const { program } = require('commander')
const pkg = require('../package.json')

// 基本设置
program
  .version('tuia-cli ' + pkg.version)
  .usage('<command> [options]')

// 创建项目
program
  .command('create <app-name>')
  .description('Create a new project powered by tuia-cli')
  .action((name, cmd) => {
    require('../lib/create')(name, cleanArgs(cmd))
  })

// 安装业务依赖
program
  .command('install [package-name]')
  .description('install a new package powered by tuia-cli')
  .action((name, cmd) => {
    require('../lib/install')(name, cleanArgs(cmd))
  })

// 安装cocos依赖
program
  .command('add [package-name]')
  .description('install a new package powered by tuia-cli')
  .action((name, cmd) => {
    require('../lib/add')(name, cleanArgs(cmd))
  })

// 执行参数解析
program
  .parse(process.argv)


function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

function cleanArgs (cmd) {
  const args = {}

  if (!cmd.options) {
    return args
  }

  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}