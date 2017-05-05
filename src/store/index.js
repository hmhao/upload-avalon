import Store from './base/Store'
import user from './modules/user'
import video from './modules/video'
import album from './modules/album'

export default new Store({
  ...user,
  modules: {
    album,
    video
  }
})
