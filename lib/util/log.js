const chalk = require('chalk')
const log = console.log

module.exports = {
  info (msg) {
    log('\n')
    log(chalk.bgBlue(' info ') + '  ' + chalk.blue(msg))
  },
  success (msg) {
    log('\n')
    log(chalk.bgGreen(' info ') + '  ' + chalk.green(msg))
  },
  error (msg) {
    log('\n')
    log(chalk.bgRed(' info ') + '  ' + chalk.red(msg))
  },
  warn (msg) {
    log('\n')
    log(chalk.bgYellow(' info ') + '  ' + chalk.yellow(msg))
  }
}