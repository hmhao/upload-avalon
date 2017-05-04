// 状态事件的回调函数
import { USER } from '@/store/types'
import { cookie } from 'cookie'

const mutations = {
  [USER.LOGIN] (state) {
    state.isLogin = true
    state.user = {
      sid: cookie.get('sessionid', 0),
      uid: cookie.get('userid', 0) ,
      nick: cookie.get('usernick', '')
    }
  },
  [USER.LOGOUT] (state) {
    state.isLogin = false
    state.user = null
  },
  [USER.DATA] (state, data) {
    let user = state.user
    delete data.uid
    avalon.mix(user, data)
  }
}

export default mutations