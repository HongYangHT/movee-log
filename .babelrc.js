/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: babel 配置
 * @Date: 2019-12-17 14:17:20
 * @LastEditTime: 2019-12-17 15:41:20
 */
//webpack的配置文件也是这种写法
module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'Firefox ESR', 'not dead']
                },
                // plugin-transform-runtime处理工具函数，babel-polyfill处理兼容
                useBuiltIns: 'usage', // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill
                corejs: 2  // 2-corejs@2  3-corejs@3
            }
        ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 2
        }
      ]
  ]
};
