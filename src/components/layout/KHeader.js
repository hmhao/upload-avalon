let template = 
`
<header class="navbar navbar-default">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <a class="navbar-brand" href="/" :attr="{title:@title}">
        <img :visible="@logo" class="navbar-brand-img" :attr="{src:@logo}" />
        <span :visible="!@logo" class="navbar-brand-text" :text="@title"></span>
      </a>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li><a class="label" :if="@user">{{@user.nick}}</a></li>
      <li><a class="btn btn-lg btn-default" href="javascript:void(0)" :text="loginText" :click="@login"></a></li>
      <li><a class="btn btn-lg btn-success" href="#!/index">上传视频</a></li>
    </ul>
  </div><!-- /.container -->
</header>
`

export default {
  name: 'k-header',
  template,
  data () {
    return {
      title: 'ugc上传',
      logo: ''
    }
  },
  computed: {
    ...avalon.store.mapState(['isLogin', 'user']),
    loginText () {
      return this.isLogin ? '退出' : '登录'
    }
  },
  methods: avalon.store.mapActions(['login'])
}
