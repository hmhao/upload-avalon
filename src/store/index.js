import Avalonx from 'avalonx'
import user from './modules/user'
import video from './modules/video'
import album from './modules/album'

export default new Avalonx.Store({
  ...user,
  modules: {
    album,
    video
  }
})
