import Store from './base/Store'
import user from './modules/user'

const cart = {
  state: {
    added: [],
    checkoutStatus: ''
  },
  getters: {
    checkoutStatus: state => state.checkoutStatus
  }
}

const products = {
  state: {
    all: []
  },
  getters: {
    allProducts: state => state.all
  }
}

export default new Store({
  ...user,
  modules: {
    cart,
    products
  }
})
