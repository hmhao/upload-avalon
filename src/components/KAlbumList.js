import KPanel from '@/components/base/KPanel'
import KPagination from '@/components/base/KPagination'
import KAlbum from '@/components/dialog/KAlbum'

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
              <option>视频数</option>
              <option>热度</option>
            </select>
          </div>
        </div>
      </div>
      <div class="col-xs-9">
        <div class="btn-group pull-right">
          <button type="button" class="btn btn-primary" :click="create">创建节目</button>
        </div>
      </div>
    </div>
  </div>
  <table class="table table-bordered" slot="panel-table"> 
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
      <tr :for="(i, a) in album.list">
        <td>
          <input type="checkbox" :attr="{checked: a.checked}" :click="checkOne($event, a)"/>
        </td>
        <td style="width: 60%">
          <div class="media">
            <div class="media-left">
              <a href="javascript:void(0)">
                <img style="width: 100px; height: 138px;" :attr="{src: a.poster}">
              </a>
            </div>
            <div class="media-body text-left">
              <dl>
                <dt :attr="{title: a.title}">{{a.title}}</dt>
                <dd>{{a.create_time}}</dd>
              </dl>
            </div>
          </div>
        </td>
        <td>
          <p>{{a.num}}</p>
        </td>
        <td>
          <p><i class="glyphicon glyphicon-expand"></i>{{a.plays}}</p>
        </td>
        <td>
          <p><a href="javascript:void(0)" :click="add">添加视频</a></p>
          <p><a href="javascript:void(0)" :click="manage">管理节目</a></p>
          <p><a href="javascript:void(0)" :click="remove">删除</a></p>
        </td>
      </tr>
    </tbody>
  </table>
  <k-pagination :widget="$$ref.pagination" slot="panel-footer"></k-pagination>
  <k-album :widget="$$ref.albumDialog" slot="panel-dialog"></k-album>
</k-panel>
`

export default {
  name: 'k-album-list',
  template,
  data () {
    return {
      allChecked: false
    }
  },
  computed: {
    ...avalon.store.mapGetters(['album']),
  },
  methods: {
    ...avalon.store.mapActions(['getAlbumList']),
    onReady () {
      this.getAlbumList().done((result) => {
        if(result && result.status == 200){
          this.$$ref.pagination.totalPages = result.data.length
        }
      })
    },
    checkAll (evt) {
      let checked = this.allChecked = !this.allChecked
      this.list.forEach(function(item) {
        item.checked = checked
      })
    },
    checkOne (evt, album) {
      let checked = album.checked = !album.checked
      if (checked === false) {
        this.allChecked = false
      } else {//avalon已经为数组添加了ecma262v5的一些新方法
        this.allChecked = this.list.every(function (item) {
          return item.checked
        })
      }
    },
    create () {
      this.$$ref.albumDialog.init()
    },
    add () {

    },
    manage () {

    },
    remove () {

    }
  },
  // 模板书写组件:widget的值必须与ref一致,当前组件可通过ref对应的值获取到子组件的vmodel
  components: [{
    component: KPanel,
    $$ref: 'panel',
    props: {
      title: '',
      style: 'info'
    }
  }, {
    component: KPagination,
    $$ref: 'pagination',
    events: ['onPageChange'] // 对依赖的组件关联事件,依赖组件分发事件时会自动调用
  }, {
    component: KAlbum,
    $$ref: 'albumDialog'
  }]
}
