import user from './user'
import video from './video'
import album from './album'

export default {
  ...user,
  ...video,
  ...album,
  get (url, dtd) {
    if(url && this[url]){
      return this[url](dtd)
    }else{
      return dtd.reject({status:404, data:{}})
    }
  }
}