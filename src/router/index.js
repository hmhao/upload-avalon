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
  this.add = function (route) {
    if(route.redirect){
      avalon.router.when(route.path, route.redirect, function(info){
        let path = (info.path.charAt(0) === '/' ? info.path : '/' + info.path) + info.query
        avalon.router.navigate(path, 2)
      })
    }else{
      this.$routes[route.path] = route
      avalon.router.add(route.path, function() {
        let self = avalon.router.vm
        let routes = self.$routes
        let view = self.view(this.path)
        self.route = {
          path: view.path,// 路由路径
          html: view.html// 视图模板
        }
        avalon.title.text = view.title
      })
    }
  };
  this.view = function (path) {
    return this.$routes[path]
  };

  avalon.ready(()=>{
    (options.routes || []).forEach(route => {
      let html, vm
      if(route.component){
        avalon.registerComponent(route.component)
        route.html = `<xmp :widget="{is: '${route.component.name}'}"></xmp>`
      }
      this.add(route)
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
      title: '上传',
      component: KUploadPage
    },
    {
      path: '/video',
      title: '视频管理',
      component: KVideoList
    },
    {
      path: '/album',
      title: '节目管理',
      component: KAlbumList
    }
  ]
})
