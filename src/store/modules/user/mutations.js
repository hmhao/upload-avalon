// 状态事件的回调函数
import { cookie } from 'cookie'

const mutations = {
  LOGIN (state) {
    state.isLogin = true
    state.user = {
      sid: cookie.get('sessionid', 0),
      uid: cookie.get('userid', 0) ,
      nick: cookie.get('usernick', '')
    }
  },
  LOGOUT (state) {
    state.isLogin = false
    state.user = null
  }
}

export default mutations