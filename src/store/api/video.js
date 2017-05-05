import { VIDEO } from '@/store/types'


const data = [{
  id: '1',
  title: '我的人生',
  poster: 'http://img.video.kanimg.kankan.com/section_480x270/9b/6d/9bca949056df5f6a41979130e85304d16e69ce6d_30.jpg',
  create_time: '2017-03-23 15:23',
  status: 1,
  plays: '12312',
  comments: '100',
  checked: false
}, {
  id: '2',
  title: '一条汪汪的故事',
  poster: 'http://img.video.kanimg.kankan.com/section_480x270/b2/df/b2d3946cfa159e1108a788cca8bd7173f00d68df_30.jpg',
  create_time: '2017-03-23 15:23',
  status: 2,
  plays: '1237772',
  comments: '353',
  checked: false
}, {
  id: '3',
  title: '时代复分',
  poster: 'http://img.video.kanimg.kankan.com/section_480x270/a0/bc/a0d2fe1a3af5be6779501d8639c6a816b2fd79bc_30.jpg',
  create_time: '2017-03-23 15:23',
  status: 3,
  plays: '1312',
  comments: '45',
  checked: false
}]

export default {
  [VIDEO.LIST] (dtd) {
    setTimeout(() => dtd.resolve({status:200, data:data}), 100)
  }
}