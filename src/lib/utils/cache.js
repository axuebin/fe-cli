const path = require('path');
const os = require('os');
const fs = require('fs');
const log = require('./log');

/**
 * 写配置缓存文件
 * @param {object} data 配置 
 */
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