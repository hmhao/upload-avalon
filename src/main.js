require('es6-promise').polyfill()
require('avalon')

avalon.config({
  debug: true
})

function readyHook(onReady, storeMappedGetter, watch, componentRef){
  return function(){
    avalon.each(componentRef, (i, comp) => {
      let ref = this['$$ref'][comp.$$ref]
      if(ref.id){
        ref = this['$$ref'][comp.$$ref] = avalon.vmodels[ref.id]
      }else{
        let dirs = this.$render.directives.concat()
        let dir
        while(dirs.length){//采用先序遍历
          dir = dirs.shift()
          if(dir.is){//是组件
            if(dir.is === comp.component.name){
              // 将组件定义的$$ref名指向对应的组件vm
              ref = this['$$ref'][comp.$$ref] = dir.comVm 
              break
            }
            // 如果不匹配组件则将其directives加入遍历队列
            dirs = dirs.concat(dir.innerRender.directives) 
          }
        }
      }
      if(ref){
        avalon.each(comp.events, (j, event) => {
          ref[event] = this[event]
        })
      }
    })
    onReady && onReady.call(this)
  }
}

avalon.registerComponent = function(component) {
  if(avalon.components[component.name]) return

  let data = component.data || component.defaults
  delete component.data
  data = avalon.isFunction(data) ? data() : data || {}
  if (!avalon.isPlainObject(data)) {
    data = {}
    avalon.warn(component.name + ' >> data functions should return an object')
  }

  let storeMappedGetter = []
  let watch = []
  let componentRef = []
  if(component.computed){
    data.$computed = avalon.mix(data.$computed || {}, component.computed)
    delete component.computed
  }
  if(component.props){
    avalon.mix(data, component.props)
    delete component.props
  }
  if(component.watch){
    avalon.each(component.watch, (key, fn) => {
      watch.push({key, fn})// 留到onReady时添加监听
    })
    delete component.watch
  }
  if(component.methods){
    avalon.mix(data, component.methods)
    delete component.methods
  }
  if(component.events && component.events.length){
    avalon.each(component.events, (i, event) => {
      data[event] = avalon.noop
    })
  }
  if(component.filters){
    avalon.each(component.filters, (filter, fn) => {
      if(!avalon.filters[filter]){
        avalon.filters[filter] = fn
      }
    })
    delete component.filters
  }
  data['$$ref'] = {}
  avalon.each(component.components, (key, component) => {
    let comp = component
    if (comp.$$ref) {
      let ref = avalon.mix(data[comp.$$ref] || {}, {
        is: comp.component.name
      }, comp.props)
      data['$$ref'][comp.$$ref] = ref
      componentRef.push(comp)// 留到onReady时添加监听
      comp = comp.component
    }
    avalon.registerComponent(comp)// 注册组件
  })
  data['$$unwatch'] = []
  if (storeMappedGetter.length || watch.length || componentRef.length) {
    data.onReady = readyHook(data.onReady, storeMappedGetter, watch, componentRef)
  }
  component.defaults = data
  avalon.component(component.name, component)
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
  let template = `<xmp :controller="${vm.$id}" :widget="{is: '${component.name}', id: '${component.name}'}"></xmp>`
  let root = document.getElementById(el)
  avalon.innerHTML(root, template)
}

require('./store')
require('./router')

avalon.bootstrap({
  el: '#app',
  component: require('./App').default
})