## movee-log
> 利用阿里云web-track记录前端日志，并支持微信小程序和web应用

![npm](https://img.shields.io/npm/dt/movee-log) ![npm](https://img.shields.io/npm/v/movee-log) ![npm](https://img.shields.io/npm/l/movee-log) ![GitHub stars](https://img.shields.io/github/stars/HongYangHT/movee-log?style=social) ![GitHub forks](https://img.shields.io/github/forks/HongYangHT/movee-log?style=social)

### 使用方法
> 查看[使用方法](./USEAGE.md)

### PR && Commit (提交代码)
- 使用 commitizen 来格式化 Git commit message
  - 安装 commitizen
  > npm install -g commitizen
  - 使用 angular 的 commit 规范 commitizen init cz-conventional-changelog --save-dev --save-exact
  - 重新安装 husky 与 lint-staged
  > npm i -D husky  
  > npm i -D lint-staged
  - 使用 `git cz` 代替 commit

- 提交规则
  - feat: 新功能
  - fix: 修复bug
  - docs: 文档更新
  - style: 格式更新（不影响代码运行的变动）
  - refactor: 重构（既不是新增功能，又不是bug修复）
  - test: 添加测试
  - chore: 构建过程或辅助工具的变动

- git 提交
  - 将 `git commit` 用 `git cz` 代替 

### 更新日志
> 查看更新[日志](./CHANGELOG.md)

- 生成更新日志
> npm install -g conventional-changelog-cli

- 推荐工作流
1. 提交修改的commit
2. 修改版本号
3. 执行build
4. 自动生成change log
5. 重新添加package.json 和 CHANGELOG.md
6. 打tag
7. push
