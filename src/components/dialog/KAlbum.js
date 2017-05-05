import KModal from '@/components/base/KModal'

var template =
`
<k-modal :widget="$$ref.modal">
  <span slot="modal-title">创建/修改节目</span>
  <div slot="modal-body" class="con">
    <div class="form form-horizontal text-left" :validate="validate">
      <div class="form-group">
        <label class="col-sm-2 control-label"><i class="glyphicon glyphicon-asterisk text-danger"></i>封面：</label>
        <div class="col-sm-4">
          <div id="pickerImg" class="thumbnail">
            <img style="height: 200px; width: 100%; display: block;" :attr="{src:album.poster}"/>
            <div class="upload">
              <i class="glyphicon glyphicon-plus"></i>
              <p>上传图片</p>
            </div>
          </div>
        </div>
        <p class="col-sm-6 thumbnail-desc">请上传210ｘ284分辨率，大小不超过１Ｍ的图片。</p>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label"><i class="glyphicon glyphicon-asterisk text-danger"></i>标题：</label>
        <div class="col-sm-9">
          <input type="text" class="form-control" placeholder="标题请控制在24个字内" :duplex="album.name" :rules="{required:true}">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">简介：</label>
        <div class="col-sm-9">
          <textarea type="text" class="form-control" placeholder="50字以内的节目介绍" rows="4" :duplex="album.comment"></textarea>
        </div>
      </div>
    </div>
  </div>
</k-modal>
`
let WebUploaderConfig = {
  auto: true,// 文件选择即开始上传
  resize: true,// 不压缩image
  fileSingleSizeLimit: 1 * 1024 * 1024,
  swf: './static/Uploader.swf',// swf文件路径
  //withCredentials: true,  // 支持CORS跨域带cookie
  accept: {// 只允许选择图片文件
    title: 'Images',
    extensions: 'gif,jpg,jpeg,bmp,png',
    mimeTypes: 'image/*'
  },
  disableWidgets: ['video']
}

let WebUploaderPicker = {
  // 选择文件的按钮。可选。
  // 内部根据当前运行是创建，可能是input元素，也可能是flash.
  id: '#pickerImg',
  style: '',//不使用默认样式
  multiple: false
}

let albumDefault = {
  id: '',
  name: '',
  poster: '',
  comment: ''
}

let validate = {//表单校验
  validateInBlur: false,
  onManual: avalon.noop,//占位,IE6-8必须指定,avalon会重写这方法
  onSuccess (reasons) {
    reasons.forEach(function (reason) {
      let elem = avalon(reason.element)
      let parent = elem.parent('.form-group')
      parent.removeClass('has-error')
    })
  },
  onError (reasons) {
    reasons.forEach(function (reason) {
      let elem = avalon(reason.element)
      let parent = elem.parent('.form-group')
      parent.addClass('has-error')
    })
  },
  onValidateAll (reasons) {
    let vm = this._ms_validate_.vm
    if(!vm.album.poster){
      reasons.push({
        element: document.getElementById('pickerImg'),
        data: {required: true},
        message: '必须上传',
        validateRule: 'required',
        getMessage: avalon.noop
      })
    }
    if (reasons.length) {
      this._ms_validate_.onError(reasons)
    } else {
      avalon.log('全部通过')
      vm.submit()
    }
  }
}

export default {
  name: 'k-album',
  template,
  data () {
    return {
      $uploader: null,
      album: avalon.mix({}, albumDefault),
      validate
    }
  },
  methods: {
    onReady () {
      this.$uploader = WebUploader.create(WebUploaderConfig)
      // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
      this.$uploader.on('uploadBeforeSend', this.uploadBeforeSend)
      // 文件上传过程中创建进度条实时显示。
      this.$uploader.on('uploadProgress', this.uploadProgress)
      this.$uploader.on('uploadSuccess', this.uploadSuccess)
      this.$uploader.on('uploadError', this.uploadError)
      this.$uploader.on('uploadComplete', this.uploadComplete)
      this.$uploader.on('uploadFinished', this.uploadFinished)
      this.$uploader.on('error', function(type){
        if(type === 'F_EXCEED_SIZE'){
          alert('已超出上传限制')
        }
      })
    },
    onDispose () {
      this.$uploader.destroy()
      this.$uploader = null
    },
    init (album) {
      avalon.mix(this.album, album)
      this.$$ref.modal.show()
      avalon.each(this.$uploader._widgets, (i, w) => {
        if(w.name == 'picker'){
          if(!w.pickers.length){
            this.$uploader.addButton(WebUploaderPicker)
          }
        }
      })
    },
    uploadBeforeSend (block, data, headers) {
    },
    uploadProgress (upfile, percentage) {
    },
    uploadSuccess (upfile, response) {
      if(response && response.data){
        let data = response.data
        this.album.poster = data.url
      }
    },
    uploadError (upfile, reason) {
      console.log('uploadError', reason)
    },
    submit () {
      this.$$ref.modal.close()
    },
    reset () {
      this.$uploader.reset()
      this.album = avalon.mix({}, albumDefault)
      $('.form-group').removeClass('has-error')
    },
    onConfirm (evt) {
      //由于avalon在validate中的上下文会改变,而validate没有指向当前vm的引用
      //因此需要想办法使validate可以拿到当前vm
      //validate上下文为定义validate指令的元素,可以从这个元素入手
      let $form = $(this.$element).find('.form').get(0)
      $form._ms_validate_.vm = this//将当前vm注入
      this.validate.onManual()
      return false
    },
    onClose (evt) {
      this.reset()
    },
  },
  components: [{
    component: KModal,
    $$ref: 'modal',// 模板书写组件:widget的值必须与ref一致,当前组件可通过ref对应的值获取到子组件的vmodel
    events: ['onConfirm', 'onClose']// 对依赖的组件关联事件,依赖组件分发事件时会自动调用
  }]
}
