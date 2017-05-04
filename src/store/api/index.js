import user from './user'

export default {
  ...user,
  get (url, dtd) {
    if(url && this[url]){
      return this[url](dtd)
    }else{
      return dtd.reject({status:404, data:{}})
    }
  }
}