import {defaultsDeep} from 'lodash'

avalon.component('k-view', {
  template: '<div ms-html="@page" class="ms-view"></div>',
  defaults: {
    page: '&nbsp;',
    path: 'no',
    onReady: function(e) {
      let router = avalon.router.vm
      this.path = router.route.path
      this.page = router.route.html
      router.$watch('route', (route) => {
        this.path = route.path
        this.page = route.html
      })
    },
    onDispose: function(e) {
      /*var path = e.vmodel.path
      var state = avalon.store.states[path]
      var vm = state.vm
      var render = vm.render
      render && render.dispose()
      delete avalon.vmodels[vm.$id]*/
    }
  }
});

class Router {
  $id = ''
  $routes = {}
  route = {}
  constructor(options) {
    (options.routes || []).forEach(route => {
      let path = route.path
      let html = route.html || require('@/html' + path + '.html')
      let vm = route.vm || require('@/js' + path + '.js')
      this.add(path, vm, html)
    })
    this.$id = 'router'
    avalon.router.vm = avalon.define(this)
    avalon.router.vm = defaultsDeep(avalon.router.vm, this)
    avalon.history.start()
  }
  add (path, vm, html) {
    this.$routes[path] = {path, vm, html}
    avalon.router.add(path, function() {
      let vm = avalon.router.vm
      let routes = vm.$routes
      let view = vm.view(this.path)
      vm.route = {
        path: this.path,
        vm: view.vm,
        html: view.html
      }
    })
  }
  view (path) {
    return this.$routes[path]
  }
}

avalon.router.Router = Router
// avalon.router.navigate('/bb/second', 0);
// avalon.history.setHash('/bb/second');

export default new Router({
  routes: [
    {
      path: '/aa/first'
    },
    {
      path: '/bb/second'
    },
    {
      path: '/cc/third'
    },
    {
      path: '/dd/four'
    }
  ]
})
