const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('./util/download')
const clearClone = require('./util/clearConsole')
const pkg = require('../package.json')
const log = require('./util/log')
const { getProjects } = require('./util/service')

module.exports = async (name, options) => {
  const data = await getProjects()
  inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Pick project type',
      choices: data
    }
  ]).then(async ({ type }) => {
    const dir =  `${process.cwd()}/${name}`
    clearClone()
    log.info(`Create project in ${dir}`)

    const repository = `direct:http://gitlab2.dui88.com/tuia-cli/tuia-project-template/${type}.git`
    await download(dir, repository)

    log.success(`cd ${name} then npm install && npm run server`)
  })

}