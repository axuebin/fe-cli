const ora = require('ora');

const spinner = ora('Loading unicorns');

const loading = {};

loading.show = content => {
  spinner.text = content;
  spinner.start();
};

loading.hidden = () => {
  spinner.stop();
};

module.exports = loading;