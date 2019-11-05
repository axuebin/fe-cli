const fse = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const loading = require('./loading');
const log = require('./log'); 

/**
 * 安装项目依赖
 * @param {string} projectFolder 项目路径 
 */
function installDep(projectFolder) {
  shell.cd(projectFolder);
  try {
    if (fse.existsSync(path.resolve(projectFolder, 'package.json'))) {
      loading.show('正在安装项目依赖，请稍等...');
      shell.exec('npm install');
      loading.hidden();
      log.success('项目依赖安装成功');
    }
  } catch(e) {
    loading.hidden();
    // fse.removeSync(projectFolder);
    log.error(e);
    log.error('项目依赖安装失败，请进入项目文件夹重试');
    process.exit(1);
  }
}

module.exports = {
  installDep,
};