const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('./util/download')
const clearClone = require('./util/clearConsole')
const pkg = require('../package.json')
const fs = require('fs')
const log = require('./util/log')
const http = require('./util/http')

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
  
  // const repository = `direct:http://gitlab2.dui88.com/tuia-frontend/tuia-activity-frontend/tuia-packages/${type}.git`
  // await download(dir, repository) 
  
  log.success(`package ${name} is installed`)
}

module.exports = async (name, options) => {

  if (name) {
    install(name)
  } else {

    const data = await http.get('http://gitlab.dui88.com/api/v4/groups/659')
    console.log(data)
    // inquirer.prompt([
    //   {
    //     name: 'name',
    //     type: 'list',
    //     message: 'Pick package name',
    //     choices: ['tuia-h5', 'tuia-vue', 'tuia-sdk']
    //   }
    // ]).then(async ({ name }) => {
    //   install(name)
    // })
  }
}