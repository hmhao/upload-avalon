import router from './router'

avalon.component('k-view', {
  template: '<div ms-html="@page" class="kview"></div>',
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
      let router = avalon.router.vm
      let vm = router.route.vm //视图vm
      let render = vm.render
      render && render.dispose()
      delete avalon.vmodels[vm.$id]
    }
  }
})

function Router (options) {
  this.$id = 'router';
  this.$routes = {};
  this.route = {};
  this.add = function (path, vm, html) {
    this.$routes[path] = {path, vm, html}
    avalon.router.add(path, function() {
      let self = avalon.router.vm
      let routes = self.$routes
      let view = self.view(this.path)
      self.route = {
        path: this.path,// 路由路径
        vm: view.vm,// 视图vm
        html: view.html// 视图模板
      }
    })
  };
  this.view = function (path) {
    return this.$routes[path]
  };

  (options.routes || []).forEach(route => {
    let path = route.path
    let html, vm
    if(route.component){
      avalon.registerComponent(route.component)
      html = `<xmp :widget="{is: '${route.component.name}'}"></xmp>`
      vm = true
    }
    this.add(path, vm, html)
  });
  let vm = avalon.define(this);
  avalon.router.vm = vm;
  avalon.history.start();
  avalon.router.navigate('/index', 0);
}

import KUploadPage from '../components/KUploadPage'
import KVideoList from '../components/KVideoList'
import KAlbumList from '../components/KAlbumList'

export default new Router({
  routes: [
    {
      path: '/index',
      component: KUploadPage
    },
    {
      path: '/video',
      component: KVideoList
    },
    {
      path: '/album',
      component: KAlbumList
    }
  ]
})
