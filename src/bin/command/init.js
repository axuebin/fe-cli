const fs = require('fs');
const fse = require('fs-extra');
const os = require('os');
const path = require('path');
const shell = require('shelljs');
const answer = require('../../lib/answer');
const log = require('../../lib/utils/log');
const validUtil = require('../../lib/utils/valid');
const install = require('../../lib/install');
const dep = require('../../lib/utils/dep');

const { validName } = validUtil;

const init = async (projectName) => {
  // 如果 init 后面有 projectName，则校验一下
  if (projectName && !validName(projectName)) {
    return log.error('项目名必须是由小写字母、数字或-_组成，且必须以字母开头');
  }

  if (!shell.which('git')) {
    log.error('抱歉，请先安装 Git 命令行工具');
    process.exit(1);
  }

  // 命令行交互确定项目信息
  const projectInfo = await answer(projectName);
  if (projectName) {
    projectInfo.project_name = projectName;
  }
  
  const { is_git, project_name, project_type, template_name } = projectInfo;

  const projectFolder = path.resolve(process.cwd(), project_name);

  // 判断当前目录是否有重名项目
  if (fs.existsSync(projectFolder)) {
    log.error('创建项目失败，当前目录已存在重名文件夹');
    process.exit(1);
  }

  // 如果是git项目，则判断git上是否有重名项目
  if (is_git) {
    // TODO: 查询 GitHub 上是否有某项目
    const gitHasSameProject = false;
    if (gitHasSameProject) {
      log.error('创建项目失败，GitHub 上已存在重名项目');
      process.exit(1);
    }
  }

  // 安装项目模板
  await install(project_type, template_name);

  // 复制模板创建本地项目文件夹
  const templatePath = path.resolve(os.homedir(), 'fe-cli', `${project_type}-${template_name}-template`);
  try {
    await fse.copy(templatePath, projectFolder);
    log.success('创建项目成功');
    // 安装项目依赖
    dep.installDep(projectFolder);
  } catch (err) {
    log.error('创建项目失败，请重试');
    process.exit(1);
  }

  // 如果是 git 项目，需要将本地项目推送到 GitHub 上
  if (is_git) {
    // TODO: 远程创建项目
    // TODO: 提交项目代码
  }
};

module.exports = init;