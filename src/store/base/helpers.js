export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  normalizeMap(getters).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedGetter () {
      let store = avalon.store
      let state = store.getState()
      let getters = store.getters

      if (namespace) {
        const module = getModuleByNamespace(store, 'mapGetters', namespace)
        if (!module) {
          return avalon.error(`[Store] unknown getter: ${val}`)
        }
        state = module.context.getState()
        getters = module.context.getters
      }
      if (!(val in getters)) {
        return typeof val === 'function'
          ? val.call(this, state, getters)
          : state[val]
      }
      return getters[val]
    }
  })
  return res
})

export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  normalizeMap(mutations).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedMutation (...args) {
      if (namespace && !getModuleByNamespace(avalon.store, 'mapMutations', namespace)) {
        return
      }
      return avalon.store.commit.apply(avalon.store, [val].concat(args))
    }
  })
  return res
})

export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  normalizeMap(actions).forEach(({ key, val }) => {
    val = namespace + val
    res[key] = function mappedAction (...args) {
      if (namespace && !getModuleByNamespace(avalon.store, 'mapActions', namespace)) {
        return
      }
      return avalon.store.dispatch.apply(avalon.store, [val].concat(args))
    }
  })
  return res
})

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

function normalizeNamespace (fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (!module) {
    avalon.error(`[Store] module namespace not found in ${helper}(): ${namespace}`)
  }
  return module
}