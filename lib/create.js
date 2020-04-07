const chalk = require('chalk')
const inquirer = require('inquirer')
const download = require('./util/download')
const clearClone = require('./util/clearConsole')
const pkg = require('../package.json')

module.exports = async (name, options) => {

  inquirer.prompt([
    {
      name: 'type',
      type: 'list',
      message: 'Pick project type',
      choices: ['tuia-h5', 'tuia-vue', 'tuia-sdk']
    }
  ]).then(async ({ type }) => {
    const dir =  `${process.cwd()}/${name}`
    clearClone(chalk.bold.black(`${pkg.name} ${pkg.version}`))
    console.log(`Create project in ${dir}`)

    const repository = `direct:http://gitlab2.dui88.com/tuia-frontend/tuia-activity-frontend/tuia-project-template/${type}.git`
    await download(dir, repository)

    console.log(chalk.green(` cd ${name} \n then npm install && npm run server`))
  })

}