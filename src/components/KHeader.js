let template = 
`
<header class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="/" :attr="{title:@title}">
        <img :visible="@logo" class="navbar-brand-img" :attr="{src:@logo}" />
        <span :visible="!@logo" class="navbar-brand-text" :text="@title"></span>
      </a>
      <div class="navbar-brand-action pull-right">
        <a class="label label-default" :if="@user">{{@user.nick}}</a>
        <a class="btn btn-lg btn-default" href="javascript:void(0)" :text="loginText" ms-click="@login"></a>
        <a class="btn btn-lg btn-success" href="#!/index">上传视频</a>
      </div>
    </div>
  </div><!-- /.container-fluid -->
</header>
`

export default {
  name: 'k-header',
  template,
  defaults: {
    title: 'ugc上传',
    logo: ''
  },
  computed: {
    ...avalon.store.mapGetters(['isLogin', 'user']),
    loginText () {
      return this.isLogin ? '退出' : '登录'
    }
  },
  methods: avalon.store.mapActions(['login'])
}
