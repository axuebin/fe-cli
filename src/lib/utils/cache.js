const path = require('path');
const os = require('os');
const fs = require('fs');
const log = require('./log');

const setTemplateConfigCach = (data) => {
  const templateConfigPath = path.resolve(os.homedir(), 'fe-cli', 'template_config.json');
  fs.writeFile(templateConfigPath, JSON.stringify(data, null, 2), err => {
    if (err) {
      return log.error(err);
    }
  });
};

module.exports = {
  setTemplateConfigCach,
};