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
            <select class="form-control">
              <option>最新上传</option>
              <option>热度</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xs-3">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">过滤</div>
            <select class="form-control">
              <option>上传</option>
              <option>审核</option>
              <option>发行</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xs-6">
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-success">上传视频</button>
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
      list: [{
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
    edit () {

    },
    remove () {

    },
    onPageChange (evt, curPage) {

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
    props: {
      totalPages: 15
    },
    events: ['onPageChange'] // 对依赖的组件关联事件,依赖组件分发事件时会自动调用
  }]
}
