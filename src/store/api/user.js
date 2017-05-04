import { USER } from '@/store/types'


const data = {
  "uid": "123456",
  "nick": "厉害了",
  "avatar":"http:\/\/img.t.kankan.com\/avatar\/20\/150x150.jpg",
  "follow":12,
  "focus":42213,
  "uploads": 21
}

export default {
  [USER.DATA] (dtd) {
    setTimeout(() => dtd.resolve({status:200, data:data}), 100)
  }
}