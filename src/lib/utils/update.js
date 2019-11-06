const semver = require('semver');
const utils = require('./index');
const log = require('./log');
const loading = require('./loading');
const pkg = require('../../../package.json');

const { sleep } = utils;

/**
 * 检测脚手架版本
 */
const update = async () => {
  const needUpdate = false;
  if (needUpdate) {
    let latest = null;
    try {
      loading.show('正在检测最新版本...');
      // TODO: 调接口取最新版本
      await sleep();
      latest = {};
    } catch (e) {
      log.error('请检查网络状态');
      return;
    } finally {
      loading.hidden();
    }
    // TODO: 判断是否有新版本
    const { latestVersion = '1.0.0' } = latest;
    if (semver.gt(latestVersion, pkg.version)) {
      log.warn('您的脚手架版本过低，请使用以下命令进行更新：');
      log(`npm install ${pkg.name} -g`);
      process.exit(1);
    }
  }
};

module.exports = update;