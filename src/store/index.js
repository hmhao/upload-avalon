import Store from './base/Store'
import user from './modules/user'
import album from './modules/album'

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
    album,
    products
  }
})
