/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: eslint 设置
 * @Date: 2019-12-17 14:37:38
 * @LastEditTime: 2019-12-17 15:33:23
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true
  },
  "extends": ["prettier"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": ["error",
    {
      printWidth: 100,
      singleQuote: true,
      trailingComma: 'none',
      bracketSpacing: true,
      semi: false,
      tabWidth: 2,
      useTabs: false,
      alwaysParens: 'avoid'
    }],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    camelcase: "off", // 强制驼峰法命名
    "no-new": "off", // 禁止在使用new构造一个实例后不赋值
    "space-before-function-paren": "off", // 函数定义时括号前面不要有空格
    "no-plusplus": "off", // 禁止使用 ++， ——
    "max-len": "off", // 字符串最大长度
    "func-names": "off", // 函数表达式必须有名字
    "no-param-reassign": "off" // 不准给函数入参赋值
  }
}
