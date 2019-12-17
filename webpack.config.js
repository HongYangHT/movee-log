/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: webpack 相关配置
 * @Date: 2019-12-11 17:14:42
 * @LastEditTime: 2019-12-17 18:06:01
 */
const pkg = require('./package.json')
const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const banner = `
${pkg.name}
${pkg.description}\n
@version v${pkg.version}
@homepage ${pkg.homepage}
@repository ${pkg.repository.url}\n
(c) 2019 sam.hongyang
Released under the MIT License.
hash: [hash]
`
const plugins = [
  new webpack.BannerPlugin(banner),
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ['**/*'],
    verbose: true,
    dry: false
  }),
  new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
    // NOTE: 设置生成`gzip`文件大小 100K
    threshold: 100 * 1024,
    minRatio: 0.8,
    cache: true
  })
]

const smp = new SpeedMeasurePlugin()

module.exports = smp.wrap({
  mode: 'production',
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: '[name].js',
    chunkFilename: '[name].js',
    umdNamedDefine: true
  },
  // context是webpack编译时的基础目录，entry会相对此目录查找
  // path.join连接路径，将几个路径拼接到一起
  // process.cwd()是当前执行node命令的地址  __dirname是当前模块的目录
  context: path.join(process.cwd(), 'src'),
  resolve: {
    modules: ['node_modules', path.resolve(process.cwd(), 'src')],
    alias: {},
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, 'src')],
        options: {
          fix: true
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    hints: false
  },
  // optimization: {
  //   // 根据不同的策略来分割打包出来的bundle
  //   splitChunks: {
  //     // 同时分割同步和异步代码
  //     chunks: 'all'
  //   },
  //   // 对于每个entry生成对应的runtime~${entrypoint.name}文件
  //   runtimeChunk: true
  // },
  plugins
})
