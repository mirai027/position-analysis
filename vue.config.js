// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin
module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  devServer: {
    proxy: {
      '/api': {
        target: 'bai',
        // target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.plugins.push(new BundleAnalyzerPlugin())
  //   }
  // }
}
