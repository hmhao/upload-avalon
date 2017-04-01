function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

export function mapGetters(getters) {
  const res = {}
  let store = this
  normalizeMap(getters).forEach(({ key, val }) => {
    if (!(val in store.state)) {
      console.error(`[vuex] unknown getter: ${val}`)
      return
    }
    res[key] = function mappedGetter () {
      return store.state[val]
    }
    res[key].fnName = 'mappedGetter'
  })
  return res
}

export function mapActions(actions) {
  const res = {}
  let store = this
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction (...args) {
      return store.dispatch.apply(store, [val].concat(args))
    }
  })
  return res
}