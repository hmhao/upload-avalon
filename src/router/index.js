import mmRouter from './mmRouter'

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
  this.add = function (path, redirect, html, vm) {
    if(redirect){
      avalon.router.when(path, redirect, function(info){
        let path = (info.path.charAt(0) === '/' ? info.path : '/' + info.path) + info.query
        avalon.router.navigate(path, 2)
      })
    }else{
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
    }
  };
  this.view = function (path) {
    return this.$routes[path]
  };

  avalon.ready(()=>{
    (options.routes || []).forEach(route => {
      let path = route.path
      let redirect = route.redirect
      let html, vm
      if(route.component){
        avalon.registerComponent(route.component)
        html = `<xmp :widget="{is: '${route.component.name}'}"></xmp>`
        vm = true
      }
      this.add(path, redirect, html, vm)
    });
    let vm = avalon.define(this);
    avalon.router.vm = vm;
    avalon.history.start({
      hashPrefix: ''
    });
  })
}

import KUploadPage from '../components/KUploadPage'
import KVideoList from '../components/KVideoList'
import KAlbumList from '../components/KAlbumList'

export default new Router({
  routes: [
    {
      path: ['/', '/#'],
      redirect: '//index' //必须使用双斜杠,mmRouter的urlFormate过滤掉第一个斜杠
    },
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
