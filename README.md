# fe-cli

fe-cli 是一个通用前端脚手架（基础版），通过配置可以自定义多个模板，并且通过缓存机制进行模板版本控制，只需进行简单的修改即可使用。

目前只具备基础功能，其它功能正在开发中...

## 功能

- [x] 支持多个模板创建
- [x] 配置缓存
- [x] 命令行交互式
- [x] 模板通过缓存进行版本控制
- [x] 创建本地项目
- [x] 安装依赖
- [ ] 项目上传 GitHub
- [ ] 检测脚手架是否更新

## 使用

### 配置

在 `project_template_config` 这个配置文件完成相应配置。

- `projectTypes` 表示模板类别，`value` 是英文字符串
- `${value}Templates` 表示某个类别的具体模板，`value` 是 `projectTypes` 里的 `value`
- `GitHub` 上的模板仓库名应该是 `${projectTypeValue}-${templateValue}-template`

比如，配置了一个 `value` 为 `pc` 的 `projectTypes`，则需新增一项 `pcTemplates`，表示 `pc` 下的具体模板。

`pcTemplates` 里的每一项表示一个具体模板，比如 `react`，此时 `GitHub` 上对应的模板仓库名为：`pc-react-template`。

目前脚手架里的配置文件如下：

```javascript
// lib/configs/project_template_config.json
module.exports = {
  projectTypes: [
    {
      name: 'PC 端项目',
      value: 'pc',
    },
    {
      name: '移动端项目',
      value: 'mobile',
    },
    {
      name: 'Node 项目',
      value: 'node',
    },
  ],
  pcTemplates: [
    {
      name: 'React + Antd',
      value: 'react',
    },
    {
      name: 'Vue + Element',
      value: 'vue',
    },
  ],
  mobileTemplates: [
    {
      name: '普通 React 项目',
      value: 'react',
    },
    {
      name: 'React + TypeScript',
      value: 'react-typescript',
    },
    {
      name: '普通 Vue 项目',
      value: 'vue',
    },
    {
      name: 'Vue + TypeScript',
      value: 'vue-typescript',
    },
  ],
  nodeTemplates: [
    {
      name: '普通 Node 项目',
      value: 'node',
    },
  ],
};
```

### GitHub 相关配置

目前 `GitHub` 配置暂时没抽出来，在 `lib/utils/git.js` 里：

- 获取远程仓库版本号
- 下载远程仓库

### 运行

```
fe-cli init <project_name>
```