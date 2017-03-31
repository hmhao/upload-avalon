function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

export const mapGetters = function(getters) {
  const res = {}
  let store = this
  normalizeMap(getters).forEach(({ key, val }) => {
    res[key] = function mappedGetter () {
      if (!(val in this.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return store.$getters[val]
    }
  })
  return res
}

export const mapActions = function(actions) {
  const res = {}
  let store = this
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      return store.dispatch.apply(store, [val].concat(args))
    }
  })
  return res
}