module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://39.106.60.145/Hbase_3.0',
        // target: 'https://coderush.top/Hadoop_Hbase',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
