const host = 'http://jservice.io'

module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: '80',
    proxy: {
      '/api': {
        target: host,
      },
    },
  },
}
