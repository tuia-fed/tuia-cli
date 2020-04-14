const readline = require('readline')
const pkg = require('../../package.json')

module.exports = title => {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    } else {
      console.log(chalk.bold.black(`${pkg.name} ${pkg.version}`))
    }
  }
}