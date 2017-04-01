import { mapGetters, mapActions } from './helpers'
import mutations from './mutations'
import actions from './actions'

function Store (options){
  this.$id = 'store'
  this.$_actions = options.actions || {}
  this.$_mutations = options.mutations || {}
  this.state = options.state || {}
  this.mapGetters = mapGetters
  this.mapActions = mapActions
  this.dispatch = function (action) {
    let actionFn = this.$_actions[action]
    if(actionFn){
      actionFn(this)
    }
  }
  this.commit = function (mutation, value) {
    let mutationFn = this.$_mutations[mutation]
    if(mutationFn){
      mutationFn(this.state, value)
    }
  }

  let vm = avalon.define(this)
  avalon.store = vm
  return vm
}

export default new Store({
  state: {
    isLogin: false,
    user: ''
  },
  mutations,
  actions
})
