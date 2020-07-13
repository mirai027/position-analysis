const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://localhost:8080/Hbase_3.0',
        target: 'https://coderush.top/Hbase_3.0',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }
}
