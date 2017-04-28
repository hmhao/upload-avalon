let template = 
`
<ul class="nav nav-pills nav-stacked">
  <li :for="nav in navs" :class="{active: nav.active}">
    <a :attr="{href:'#!' + nav.path}">{{nav.title}}</a>
  </li>
</ul>
`

export default {
  name: 'k-nav',
  template,
  data () {
    return {
      navs: [{
        title: '视频管理',
        path: '/video',
        active: false
      },{
        title: '节目管理',
        path: '/album',
        active: false
      }]
    }
  },
  methods: {
    onReady () {
      let router = avalon.router.vm
      this.update(router.route)
      router.$watch('route', (route) => {
        this.update(router.route)
      })
    },
    update (route){
      let path = route.path
      avalon.each(this.navs, (i, nav)=>{
        nav.active = path === nav.path
      })
    }
  }
}
