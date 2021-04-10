module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // 按需引入mint-ui组件，减少项目打包体积
    ["component", {
      "libraryName": "mint-ui",
      "style": true
    }]
  ]
}
