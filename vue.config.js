module.exports = {
  
  publicPath: process.env.NODE_ENV === 'production'
    ? '/mall/'
    : '/',
  configureWebpack: {
   
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

