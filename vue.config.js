module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Tissue Blocks';
        return args;
      })
  }
}
  