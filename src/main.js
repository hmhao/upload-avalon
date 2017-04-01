require('es6-promise').polyfill()
require('avalon')
require('mmRouter')

avalon.config({
  debug: true
})

function readyHook(onReady, storeMappedGetter){
  return function(){
    avalon.each(storeMappedGetter, (i, getter) => {
      this[getter.key] = getter.fn()// onReady赋值一次,因为可能已触发过watch回调
      avalon.store.$watch('state.'+getter.key, (value) => {
        this[getter.key] = value
      })
    })
    onReady && onReady.call(this)
  }
}

avalon.registerComponent = function(component) {
  let data = component.defaults || {}
  if(component.computed){
    let storeMappedGetter = []
    data.$computed = data.$computed || {}
    avalon.each(component.computed, (key, fn) => {
      if(fn.fnName === 'mappedGetter'){
        storeMappedGetter.push({key, fn})// 留到onReady时添加监听
        data[key] = fn()
      }else{
        data.$computed[key] = fn
      }
    })
    delete component.computed
    data.onReady = readyHook(data.onReady, storeMappedGetter)
  }
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