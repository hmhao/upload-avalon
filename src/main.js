require('es6-promise').polyfill()
require('avalon')
require('mmRouter')

avalon.config({
  debug: true
})

document.domain = 'kankan.com'

require('./router')
require('./store')
require('./App')
