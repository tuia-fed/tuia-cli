const inquirer = require('inquirer')
const download = require('./util/download')
const clearClone = require('./util/clearConsole')
const fs = require('fs')
const log = require('./util/log')
const { getPackages, getBranchs } = require('./util/service')

const src = process.cwd() + '/src'
const dest = src + '/package'

if (!fs.existsSync(src)) {
  fs.mkdirSync(src)
}
if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest)
}

async function install (name, branch) {
  log.info(`start install package ${name}@${branch}`)
  
  const repository = `direct:http://gitlab2.dui88.com/tuia-cli/tuia-packages/${name}.git#${branch}`
  await download(dest + `/${name}@${branch}`, repository) 
  
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
        const data = await getBranchs(name)
        inquirer.prompt([
          {
            name: 'branch',
            type: 'list',
            message: 'Pick package branch',
            choices: data
          }
        ]).then(async ({ branch }) => {
          clearClone()
          const version = branch.split(' ')[0]
          install(name, version)
        })
      })
    } else {
      log.warn('no package')
    }
  }
}