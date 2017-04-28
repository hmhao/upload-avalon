let template = 
`
<ul class="nav nav-tabs nav-stacked">
  <li :for="nav in navs" :class="{on: nav.active}">
    <a :attr="{href:'#!' + nav.path}">{{nav.title}}</a>
  </li>
</ul>
`

export default {
  name: 'k-nav',
  template,
  defaults: {
    navs: [{
      title: '视频管理',
      path: '/video',
      active: false
    },{
      title: '节目管理',
      path: '/album',
      active: false
    }],
    onReady () {
      let router = avalon.router.vm
      this.update(router.route)
      router.$watch('route', (route) => {
        this.update(router.route)
      })
    }
  },
  methods: {
    update (route){
      let path = route.path
      avalon.each(this.navs, (i, nav)=>{
        nav.active = path === nav.path
      })
    }
  }
}
