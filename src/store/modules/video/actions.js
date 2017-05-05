import { VIDEO } from '@/store/types'
import ajax from '@/ajax'

// 组件内部用来分发 mutations 事件
// 它们接收 store 作为第一个参数，这里是es6的析构
const actions = {
  getVideoList ({ state, commit }, params) {
    return ajax({
      url: VIDEO.LIST,
      dataType: 'jsonp',
      jsonp: 'callback',
      data: params
    })
    .done((result) => {
      if(result && result.status == 200){
        commit(VIDEO.LIST, result.data)
      }
    })
    .fail((e) => {
      avalon.log(e)
    })
  }
}

export default actions
