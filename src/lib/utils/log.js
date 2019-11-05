const chalk = require('chalk');

const log = console.log;

log.info = content => {
  log(chalk.blue(content));
};

log.success = content => {
  log(chalk.green(content));
};

log.error = content => {
  log(chalk.bold.red(content));
};

log.warn = content => {
  log(chalk.keyword('orange')(content));
};

module.exports = log;
