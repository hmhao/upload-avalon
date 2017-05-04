import user from './user'
import album from './album'

export default {
  ...user,
  ...album,
  get (url, dtd) {
    if(url && this[url]){
      return this[url](dtd)
    }else{
      return dtd.reject({status:404, data:{}})
    }
  }
}