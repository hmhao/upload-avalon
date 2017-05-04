import mutations from './mutations'
import actions from './actions'

export default {
  state: {
    isLogin: false,
    user: {
      uid: '',
      nick: '',
      avatar: '',
      follow: 0,
      focus: 0,
      uploads: 0
    }
  },
  mutations,
  actions
}