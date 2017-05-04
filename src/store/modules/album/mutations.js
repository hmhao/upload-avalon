// 状态事件的回调函数
import { ALBUM } from '@/store/types'

const mutations = {
  [ALBUM.LIST] (state, data) {
    state.list = data
  }
}

export default mutations