// 组件内部用来分发 mutations 事件
// 它们接收 store 作为第一个参数，这里是es6的析构
const actions = {
  autoLogin ({ state, commit }) {
    $.ajax({
        url:'http://u.kankan.com/login/1.0.4.js',
        dataType: 'script',
        cache: true
      })
      .then(response => {
        xlQuickLogin.init({
          loginID:   '107',  // 字符串，登录类型，方便统计，请按照文档下面的登录类型来设置（必须设定）
          UIStyle: 'http://misc.web.kankan.com/kankan_login/css/style.css',
          loginFunc () {
            commit('LOGIN')
          },
          loginedFunc () {
            commit('LOGIN')
          },
          logoutFunc () {
            commit('LOGOUT')
          }
        }, [], false, 'utf-8');
      })
    },
  // 登录或登出
  login: ({ state, commit }) => {
    if (!state.isLogin) {
      xlQuickLogin.login()
    }else{
      xlQuickLogin.logout()
    }
  }
}

export default actions
