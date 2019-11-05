const path = require('path');
const os = require('os');
const fs = require('fs');
const fse = require('fs-extra');
const semver = require('semver');
const loading = require('./utils/loading');
const log = require('./utils/log');
const git = require('./utils/git');
const cache = require('./utils/cache');

const TEMPLATE_CACHE_TIME = 604800000; // 缓存时间7天

const templateConfigPath = path.resolve(os.homedir(), 'fe-cli', 'template_config.json');

const install = async (projectType, templateName) => {
  if (!templateName) {
    log.error('模板名称为空，请重新选择');
    process.exit(1);
  }

  // 是否需要从远程下载模板
  let needDownloadTemplate = true;

  // 读本地模板缓存数据
  const typeNameTemplate = `${projectType}-${templateName}-template`;
  let allTemplateConfigCache = {};
  let templateConfigCache = {};
  if (fse.existsSync(templateConfigPath)) {
    allTemplateConfigCache = require(templateConfigPath);
    templateConfigCache = allTemplateConfigCache[`${projectType}-${templateName}`];
  
    if (templateConfigCache) {
      const cacheVersion = templateConfigCache.version;
      const cacheUpdatedTime = templateConfigCache.version;

      // 获取远程版本号
      loading.show('检查模板是否更新...');
      const latestVersion = (await git.getRepoPackageJson(typeNameTemplate)).version;
      loading.hidden();

      // 本地版本号低于 Git 上的版本号或者每超过一段缓存时间，满足其一就更新模板
      if (semver.gt(latestVersion, cacheVersion) || (new Date()).getTime() - cacheUpdatedTime >= TEMPLATE_CACHE_TIME) {
        needDownloadTemplate = true;
      } else {
        needDownloadTemplate = false;
        log.info('模板不用更新，准备开始创建项目...');
      }
    }
  }
  const templatePath = path.resolve(os.homedir(), 'fe-cli', typeNameTemplate);

  if (needDownloadTemplate || !fse.existsSync(templatePath)) {
    loading.show(`开始${templateConfigCache ? '更新' : '下载'}模板...`);

    // 删除本地模板
    await fse.removeSync(templatePath);

    // 下载远程模板
    await git.downloadRepo(typeNameTemplate, templatePath).then(() => {
      loading.hidden();
      log.success(`${templateConfigCache ? '更新' : '下载'}模板成功，准备开始创建项目...`);
    }).catch((err) => {
      loading.hidden();
      if (/404/.test(err)) {
        log.error('模板不存在，请重试');
      } else {
        log.error('下载模板失败，请重试');
      }
      process.exit(1);
    });

    // 判断模板文件夹是否存在
    if (fse.existsSync(templatePath)) {
      const templatePkgPath = `${templatePath}/package.json`;

      // 读取 package.json 文件
      fs.readFile(templatePkgPath,'utf8', (err, data) => {
        if (err) {
          log.error(`：${err}`);
          process.exit(1);
        }
        const pkg = JSON.parse(data);
        const version = pkg.version;
        const templateConfig = {
          version,
          createdTime: templateConfigCache ? templateConfigCache.createdTime : new Date().getTime(),
          updatedTime: new Date().getTime(),
        };
        allTemplateConfigCache[`${projectType}-${templateName}`] = templateConfig;

        // 更新配置缓存
        cache.setTemplateConfigCach(allTemplateConfigCache);
      });
    }
  }
  return;
};

module.exports = install;