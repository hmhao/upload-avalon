import mutations from './mutations'
import actions from './actions'

export default {
  state: {
    $sort: [{
      key: 'new',
      text: '最新'
    }, {
      key: 'hot',
      text: '最热'
    }, {
      key: 'videos',
      text: '视频数'
    }],
    sort: 'new',
    $perNum: 3,
    page: -1,
    $list: []
  },
  mutations,
  actions
}
