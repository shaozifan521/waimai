/* 根据指定目录名得到根目录的绝对路径 */
function resolve (dir) {
  return require('path').join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // 以设计稿750为例， 750 / 10 = 75
            remUnit: 37.5
          }),
        ]
      }
    }
  },

  /* 编写webpack支持的配置 */
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
      }
    },
  },
};