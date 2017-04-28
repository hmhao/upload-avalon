let template = 
`
<table class="table table-bordered"> 
  <thead>
    <tr class="text-center">
      <td><input type="checkbox" :attr="{checked: allChecked}" :click="checkAll"/></td>
      <td>视频</td>
      <td>视频数</td>
      <td>热度</td>
      <td>操作</td>
    </tr>
  </thead>
  <tbody>
    <tr :for="(i, v) in list">
      <td>
        <input type="checkbox" :attr="{checked: v.checked}" :click="checkOne($event, v)"/>
      </td>
      <td style="width: 60%">
        <div class="media">
          <div class="media-left">
            <a href="javascript:void(0)">
              <img style="width: 100px; height: 138px;" :attr="{src: v.poster}">
            </a>
          </div>
          <div class="media-body text-left">
            <dl>
              <dt :attr="{title: v.title}">{{v.title}}</dt>
              <dd>{{v.create_time}}</dd>
            </dl>
          </div>
        </div>
      </td>
      <td>
        <p>{{v.num}}</p>
      </td>
      <td>
        <p>
          <i class="icon icon_redio"></i>
          <span class="redtext">{{v.plays}}</span>
        </p>
        <p>
          <i class="icon icon_redio"></i>
          <span class="redtext">{{v.comments}}</span>
        </p>
      </td>
      <td>
        <p><a href="javascript:void(0)" :click="add">添加视频</a></p>
        <p><a href="javascript:void(0)" :click="manage">管理节目</a></p>
        <p><a href="javascript:void(0)" :click="remove">删除</a></p>
      </td>
    </tr>
  </tbody>
</table>
`

export default {
  name: 'k-album-list',
  template,
  data () {
    return {
      allChecked: false,
      list: [{
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
        create_time: '2017-03-23 15:23',
        num: 30,
        plays: '12312',
        checked: false
      }, {
        id: '2',
        title: '其他',
        poster: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493392486834&di=7a83985763d60a7827e4d98c14002e83&imgtype=0&src=http%3A%2F%2Fdynamic-image.yesky.com%2F600x-%2FuploadImages%2Fupload%2F20141120%2Fzhnygl4v2ckjpg.jpg',
        create_time: '2017-03-23 15:23',
        num: 0,
        plays: '12312',
        checked: false
      }]
    }
  },
  methods: {
    checkAll (evt) {
      let checked = this.allChecked = !this.allChecked
      this.list.forEach(function(v) {
        v.checked = checked
      })
    },
    checkOne (evt, video) {
      let checked = video.checked = !video.checked
      if (checked === false) {
        this.allChecked = false
      } else {//avalon已经为数组添加了ecma262v5的一些新方法
        this.allChecked = this.list.every(function (v) {
          return v.checked
        })
      }
    },
    add () {

    },
    manage () {

    },
    remove () {

    }
  }
}
