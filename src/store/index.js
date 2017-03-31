import { mapGetters, mapActions } from './helpers'
import mutations from './mutations'
import actions from './actions'

class Store {
  $id = ''
  $_actions = null
  $_mutations = null
  constructor(options) {
    this.$id = 'store'
    this.$_actions = options.actions || {}
    this.$_mutations = options.mutations || {}
    this.state = options.state || {}
    let vm = avalon.define(this)
    //手动设置原型链上的方法
    vm.dispatch = this.dispatch.bind(vm)
    vm.commit = this.commit.bind(vm)
    vm.mapGetters = mapGetters
    vm.mapActions = mapActions
    avalon.store = vm
  }
  dispatch (action) {
    let actionFn = this.$_actions[action]
    if(actionFn){
      actionFn(this)
    }
  }
  commit (mutation, value) {
    let mutationFn = this.$_mutations[mutation]
    if(mutationFn){
      mutationFn(this.state, value)
    }
  }
}

export default new Store({
  state: {
    isLogin: false,
    user: ''
  },
  mutations,
  actions
})
