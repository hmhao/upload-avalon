require('es6-promise').polyfill()
require('avalon')
require('mmRouter')

avalon.config({
  debug: true
})

avalon.registerComponent = function(component) {
  let data = component.defaults || {}
  if(component.methods){
    avalon.mix(data, component.methods)
    delete component.methods
  }
  if(component.filters){
    avalon.each(component.filters, (filter, fn) => {
      if(!avalon.filters[filter]){
        avalon.filters[filter] = fn
      }
    })
    delete component.filters
  }
  component.defaults = data
  avalon.component(component.name, component)
  avalon.each(component.components, (index, component) => {
    avalon.registerComponent(component)
  })
}
avalon.bootstrap = function(options) {
  if(!options.el || !options.component) {
    avalon.error('avalon.bootstrap需要提供el和component参数')
  }
  let el = options.el.replace(/^#/, '')
  let component = options.component
  avalon.registerComponent(component)
  let vm = avalon.define({
    $id: 'root'
  })
  let template = `<xmp :controller="${vm.$id}" :widget="{is: '${component.name}'}"></xmp>`
  let root = document.getElementById(el)
  avalon.innerHTML(root, template)
  avalon.ready(() => avalon.scan(root, vm))
}

require('./store')
require('./router')

avalon.bootstrap({
  el: '#app',
  component: require('./App').default
})