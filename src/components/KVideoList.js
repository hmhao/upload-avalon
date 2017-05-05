import KPanel from '@/components/base/KPanel'
import KPagination from '@/components/base/KPagination'

let template = 
`
<k-panel :widget="$$ref.panel">
  <div slot="panel-bar">
    <div class="row">
      <div class="col-xs-3">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">排序</div>
            <select class="form-control" :duplex="video.sort">
              <option :for="sort in video.$sort" :attr="{value: sort.key}">{{sort.text}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">过滤</div>
            <select class="form-control" :duplex-number="video.filter">
              <option :for="filter in video.$filter" :attr="{value: filter.value}">{{filter.text}}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="btn-group pull-right">
          <a href="#!index" class="btn btn-success">上传视频</a>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-bordered" slot="panel-table">
    <thead>
      <tr class="text-center">
        <td><input type="checkbox" :attr="{checked: allChecked}" :click="checkAll"/></td>
        <td>视频</td>
        <td>状态</td>
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
                <img style="width: 138px; height: 78px;" :attr="{src: v.poster}">
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
          <p>{{v.status | statusMsg}}</p>
        </td>
        <td>
          <p><i class="glyphicon glyphicon-expand"></i>{{v.plays}}</p>
          <p><i class="glyphicon glyphicon-comment"></i>{{v.comments}}</p>
        </td>
        <td>
          <p><a href="javascript:void(0)" :click="edit">编辑</a></p>
          <p><a href="javascript:void(0)" :click="remove">删除</a></p>
        </td>
      </tr>
    </tbody>
  </table>
  <k-pagination :widget="$$ref.pagination" slot="panel-footer"></k-pagination>
</k-panel>
`

let uploadStatus = {
  1: '初始化',
  2: '审核通过',
  3: '发行失败'
}

export default {
  name: 'k-video-list',
  template,
  data () {
    return {
      allChecked: false,
      list: []
    }
  },
  computed: {
    ...avalon.store.mapGetters(['video']),
  },
  methods: {
    ...avalon.store.mapActions(['getVideoList']),
    onReady () {
      this.getVideoList().done((result) => {
        if(result && result.status == 200){
          this.video.page = 1
        }
      })
    },
    onDispose () {
      this.video.page = -1
    },
    checkAll (evt) {
      let checked = this.allChecked = !this.allChecked
      this.list.forEach(function(item) {
        item.checked = checked
      })
    },
    checkOne (evt, video) {
      let checked = video.checked = !video.checked
      if (checked === false) {
        this.allChecked = false
      } else {//avalon已经为数组添加了ecma262v5的一些新方法
        this.allChecked = this.list.every(function (item) {
          return item.checked
        })
      }
    },
    update () {
      let video = this.video
      let page = video.page
      let sort = video.sort
      let filter = video.filter
      let arr = []
      avalon.each(video.$list, (i, item) => {
        if(!filter || item.status == filter)
          arr.push(item)
      })
      arr.sort((a, b) => {
        if(sort == 'new'){
          return new Date(a.create_time) < new Date(b.create_time)
        }else if(sort == 'hot'){
          return parseInt(a.plays) < parseInt(b.plays)
        }else{
          return a.id < b.id
        }
      })
      let len = arr.length
      let limit = Math.min(len, video.$perNum)
      let begin = (page - 1) * video.$perNum
      let list = []
      for (let i = begin; i < len; i++) {
        if (list.length === limit) {
          break;
        }
        list.push(arr[i])
      }
      this.list = list
      this.$$ref.pagination.totalPages = Math.ceil(len / video.$perNum)
    },
    edit () {

    },
    remove () {

    },
    onPageChange (evt, curPage) {
      this.video.page = curPage
    }
  },
  watch: {
    'video.page' (value) {
      value && this.update()
    },
    'video.sort' (value) {
      this.update()
    },
    'video.filter' (value) {
      this.update()
    }
  },
  filters: {
    statusMsg (status) {
      return uploadStatus[status] || '未知错误'
    }
  },
  // 模板书写组件:widget的值必须与ref一致,当前组件可通过ref对应的值获取到子组件的vmodel
  components: [{
    component: KPanel,
    $$ref: 'panel',
    props: {
      title: ''
    }
  }, {
    component: KPagination,
    $$ref: 'pagination',
    events: ['onPageChange'] // 对依赖的组件关联事件,依赖组件分发事件时会自动调用
  }]
}
