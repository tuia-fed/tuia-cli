const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('./util/download')
const clearClone = require('./util/clearConsole')
const pkg = require('../package.json')
const fs = require('fs')
const log = require('./util/log')
const { getPackages } = require('./util/service')

const src = process.cwd() + '/src'
const dest = src + '/package'

if (!fs.existsSync(src)) {
  fs.mkdirSync(src)
}
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest)
}

async function install (name) {
  log.info(`start install package ${name}`)
  
  const repository = `direct:http://gitlab2.dui88.com/tuia-cli/tuia-packages/${type}.git`
  await download(dir, repository) 
  
  log.success(`package ${name} is installed`)
}

module.exports = async (name, options) => {

  if (name) {
    install(name)
  } else {
    const data = await getPackages()
    if (data.length) {
      inquirer.prompt([
        {
          name: 'name',
          type: 'list',
          message: 'Pick package name',
          choices: data
        }
      ]).then(async ({ name }) => {
        install(name)
      })
    } else {
      log.warn('no package')
    }
  }
}