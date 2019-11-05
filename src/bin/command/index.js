const app = require('commander');
const init = require('./init');
const pkg = require('../../../package.json');
// const app = new commander.Command();

app
  .version(pkg.version)
  .usage('<command> [options]');

app
  .command('init [projectName]')
  .alias('create')
  .description('创建一个项目')
  .action((projectName) => {
    init(projectName);
  });

app.parse(process.argv);