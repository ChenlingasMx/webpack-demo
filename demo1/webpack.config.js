const path = require('path');
// HTML模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理输出文件夹
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  //use inline-source-map for development:
  devtool: 'inline-source-map',

  //use source-map for production:
  // devtool: 'source-map',
  devServer: {
    contentBase: './distribution',
    hot: true
  },
  // 代码分隔
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  module: {
    // babel编译
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')],
        exclude: [resolve('node_modules')]
      },
      // 处理css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 开启热更新
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['distribution']),
    // HTML模板-通过为index.html创建HTML模板，webpack可以自动将打包好的js文件添加到index.html中。
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.html',
      filename: 'index.html' //relative to root of the application
    })
  ]
};