import { ALBUM } from '@/store/types'


const data = [{
  id: '1',
  title: '2016年度电影TOP50',
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493392486834&di=7a83985763d60a7827e4d98c14002e83&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20141120%2Fzhnygl4v2ckjpg.jpg',
  create_time: '2017-03-23 15:23',
  num: 50,
  plays: '12312',
  checked: false
}, {
  id: '3',
  title: '电视节目',
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493392486834&di=7a83985763d60a7827e4d98c14002e83&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20141120%2Fzhnygl4v2ckjpg.jpg',
  create_time: '2017-04-23 15:23',
  num: 30,
  plays: '123312',
  checked: false
}, {
  id: '2',
  title: '其他',
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493392486834&di=7a83985763d60a7827e4d98c14002e83&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20141120%2Fzhnygl4v2ckjpg.jpg',
  create_time: '2017-03-23 15:23',
  num: 0,
  plays: '0',
  checked: false
}, {
  id: '4',
  title: '电视节目2',
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493392486834&di=7a83985763d60a7827e4d98c14002e83&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20141120%2Fzhnygl4v2ckjpg.jpg',
  create_time: '2017-03-23 15:23',
  num: 30,
  plays: '1322312',
  checked: false
}, {
  id: '5',
  title: '其他2',
  poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493392486834&di=7a83985763d60a7827e4d98c14002e83&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20141120%2Fzhnygl4v2ckjpg.jpg',
  create_time: '2017-03-27 15:23',
  num: 0,
  plays: '0',
  checked: false
}]

export default {
  [ALBUM.LIST] (dtd) {
    setTimeout(() => dtd.resolve({status:200, data:data}), 100)
  }
}