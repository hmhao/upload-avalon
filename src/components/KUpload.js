let template = 
`
<div id="uploader">
  <!--这里我们只使用最基本的html结构：一个选择文件的按钮，一个开始上传文件的按钮(甚至该按钮也可以不要)-->
  <!--用来存放文件信息-->
  <div :if="file" class="uploader-list">
    <div :attr="{id:file.id}" class="item">
      <h4 class="info">{{file.name}}</h4>
      <p>文件大小：{{file.size | convertBytes}}</p>
      <p class="state">
        <span :visible="file.md5ing">分析文件中...<b>{{file.md5progress}}%</b></span>
        <span :visible="!file.md5ing">{{stateText}}<b>{{file.chunk}}/{{file.chunks}}</b></span>
      </p>
      <p class="state">
        <span>进度：<b>{{file.progress.toFixed(2)}}%</b></span>
        <span>速度：<b>{{file.speed | convertBytes}}/s</b></span>
        <span>剩余时间：<b>{{file.remaintime | convertTime}}</b></span>
      </p>
      <div class="progress progress-striped active">
        <div class="progress-bar" :css="{width: file.progress + '%'}"></div>
      </div>
    </div>
  </div>
  <div class="btns">
    <div id="picker" :css="{top:!file?'0px':'-1000px'}">选择文件</div><!--使用flash时不能用display隐藏-->
    <button type="button" class="btn btn-default" ms-click="start"
      :visible="state === 'pending' || state === 'stop' " :attr="{disabled:!canStart}">开始上传</button>
    <button type="button" class="btn btn-default" ms-click="pause"
      :visible="state === 'start'">暂停上传</button>
    <button type="button" class="btn btn-default" ms-click="stop"
      :visible="state !== 'success'">取消上传</button>
    <button type="button" class="btn btn-default" ms-click="next"
      :visible="state === 'success'">复原</button>
  </div>
</div>
`
import ajax from '@/ajax'

let defaultFile = {
  id: '',
  name: '',
  size: 0,
  md5ing: false,
  md5progress: 0,
  chunk: 0,
  chunks: 0,
  progress: 0,
  updata: 0,
  speed: 0,
  remaintime: 0
}

let WebUploaderConfig = {
  auto: false,// 文件选择即开始上传
  resize: false,// 不压缩image
  //threads: 1,// 上传并发数。允许同时最大上传进程数。
  chunked: true,// 分片处理大文件上传
  chunkSize: 1 * 1024 * 1024,// 分多大一片
  fileSingleSizeLimit: 2 * 1024 * 1024 * 1024,
  swf: '/static/Uploader.swf',// swf文件路径
  server: '<your upload server>',// 文件接收服务端
  withCredentials: true,  // 支持CORS跨域带cookie
  accept: {
    title: 'Videos',
    extensions: 'flv,mp4',
    mimeTypes: 'video/x-flv,.flv,flv,video/mp4,mp4,video/x-m4v,m4v'
  }
}

let WebUploaderPicker = {
  // 选择文件的按钮。可选。
  // 内部根据当前运行是创建，可能是input元素，也可能是flash.
  id: '#picker',
  multiple: false
}

export default {
  name: 'k-upload',
  template,
  data () {
    return {
      state: 'pending',
      canStart: false,
      file: 0,
      $hadAddButton: false,
      $tick: null,
      $uploadInfo: null,
      $uploader: null
    }
  },
  computed: {
    ...avalon.store.mapState(['isLogin', 'user']),
    stateText () {
      let text = ''
      switch (this.state){
        case 'start':
          text = '上传中'; break
        case 'stop':
          text = '暂停上传'; break
        case 'success':
          text = '已上传'; break
        default:
          text = '等待上传'; break
      }
      return text
    },
    upfile () {
      return (this.$uploader && this.file) ? this.$uploader.getFile(this.file.id) : null
    }
  },
  methods: {
    onReady () {
      WebUploader.Uploader.register({
        'name': 'video',
        'before-send-file': 'checkFile',
        'before-send': 'checkChunk'
      }, {
        checkFile: this.checkFile,
        checkChunk: this.checkChunk
      })
      this.$uploader = WebUploader.create(WebUploaderConfig)
      // 当有文件添加进来的时候
      this.$uploader.on('fileQueued', this.fileQueued)
      //文件开始上传前触发，一个文件只会触发一次。
      this.$uploader.on('uploadStart', this.uploadStart)
      // 当某个文件的分块在发送前触发，主要用来询问是否要添加附带参数，大文件在开起分片上传的前提下此事件可能会触发多次。
      this.$uploader.on('uploadBeforeSend', this.uploadBeforeSend)
      // 文件上传过程中创建进度条实时显示。
      this.$uploader.on('uploadProgress', this.uploadProgress)
      this.$uploader.on('uploadSuccess', this.uploadSuccess)
      this.$uploader.on('uploadError', this.uploadError)
      this.$uploader.on('uploadComplete', this.uploadComplete)
      this.$uploader.on('uploadFinished', this.uploadFinished)
      this.$uploader.on('stopUpload', this.stopUpload)
      this.$uploader.on('fileDequeued', this.fileDequeued)
      this.$uploader.on('all', function(type){
        if(['uploadProgress','uploadAccept', 'uploadBeforeSend'].indexOf(type) == -1){
          console.log(type)
        }
      })
      this.init()
    },
    init () {
      if(this.isLogin){
        if(!this.$hadAddButton){
          this.$hadAddButton = true
          setTimeout(()=>this.$uploader.addButton(WebUploaderPicker), 100)
        }
      }else{
        this.stop()
      }
    },
    start (evt) {
      if(this.upfile && this.state !== 'start') {
        this.$uploader.upload(this.upfile);
        this.state = 'start'
      }
    },
    pause (evt) {
      if(this.upfile && this.state === 'start') {
        this.$uploader.stop(this.upfile, true)
        this.state = 'stop'
      }
    },
    stop (evt) {
      if(this.upfile) {
        this.$uploader.removeFile(this.upfile, true)
      }
      if(this.$hadAddButton && !evt){
        avalon.each(this.$uploader._widgets, (i, w) => {
          if(w.name == 'picker'){
            while(w.pickers.length){
              let picker = w.pickers.pop()
              picker.getRuntime().getContainer().remove()
              picker.options.container.html(picker.options.button.html())
              picker.destroy()
            }
          }
        })
        this.$hadAddButton = false
      }
    },
    next (evt) {
      if(this.upfile) {
        this.$uploader.removeFile(this.upfile, true)
      }
    },
    registerFile (upfile) {
      let uploader = this.$uploader
      let formData = uploader.option('formData')
      formData = $.extend(formData, {
        type: 'ugc',
        buissess: 'ttkk',
        fid: upfile.fid,
        title: upfile.name,
        uid: this.user.uid
      })
      uploader.option('formData', formData)
      let self = this
      ajax({
          url: '<your upload server>',
          type: 'POST',
          data: formData,
          dataType: 'json'
        })
        .done(function(result){
          if(result && result.status == 200){
            uploader.options.server = result.data.upload_server || uploader.options.server;
            self.canStart = true
          }
        })
        .fail(function (e) {
          console.log(e)
        })
    },
    checkFile (upfile) {
      let deferred = WebUploader.Deferred()
      let uploader = this.$uploader
      let formData = uploader.option('formData')
      let self = this
      ajax({
        url: '<your upload server>',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data:{
          fid:formData.fid,
          rd: new Date().getTime()
        }
      })
      .done(function (result) {
        console.log('checkFile', result);
        if(result.status == 200){
          self.$uploadInfo = result.data[formData.fid]
          if(self.$uploadInfo){
            let chunks = parseInt(self.$uploadInfo.chunks)
            let chunk = parseInt(self.$uploadInfo.maxChunk)
            self.file.chunks = chunks
            self.file.chunk = chunk
            self.file.progress = chunk / chunks * 100
            if(!self.$uploadInfo.lackChunks.length){
              uploader.skipFile(upfile)
            }
          }
        }else{
          self.$uploadInfo = {}
        }
        self.$tick = new Date().getTime()
        return deferred.resolve()
      })
      return deferred.promise();
    },
    checkChunk (block) {
      let deferred = WebUploader.Deferred()
      if(this.$uploadInfo && this.$uploadInfo.lackChunks && 
        this.$uploadInfo.lackChunks.indexOf(block.chunk) == -1){
        deferred.reject()
      }else{
        this.$uploader.md5File(block.blob)
          .fail(function() {// 如果读取出错了，则通过reject告诉webuploader文件上传出错。
            deferred.reject()
          })           
          .then(function(md5) { // md5值计算完成
            console.log('block', block.chunk ,'md5 result:', md5, block.progress)
            block.chunk_md5 = md5
            deferred.resolve()
          });
      }
      return deferred.promise();
    },
    fileQueued (upfile) {
      let self = this
      let md5start = new Date().getTime()
      this.file = $.extend({}, defaultFile, {
        id: upfile.id,
        name: upfile.name,
        size: upfile.size,
        md5ing: true
      })
      // 根据文件生成md5,但时间过长
      /*this.$uploader.md5File(upfile)
        .progress(function(percentage) {// 及时显示进度
          self.file.md5progress = Math.round(percentage * 100)
        })
        .then(function(md5) {// 完成
          var md5end = new Date().getTime();
          console.log('md5 result:', md5, (md5end-md5start)/1000);
          self.file.md5ing = false
          upfile.fid = md5
          self.registerFile(upfile)
        });*/
      // 根据文件名字、文件大小和最后修改时间来生成md5
      upfile.fid = $.md5(upfile.name+'|'+upfile.size+'|'+upfile.lastModifiedDate.getTime())
      this.file.md5ing = false
      this.registerFile(upfile)
    },
    uploadStart (upfile) {
      let uploader = this.$uploader
      let formData = uploader.option('formData');
      formData = $.extend(formData, {
        type: 'chunk'
      });
      uploader.option('formData', formData);
    },
    uploadBeforeSend (block, data, headers) {
      console.log('开始传' + block.chunk)
      data.chunk_md5 = block.chunk_md5
    },
    uploadProgress (upfile, percentage) {
      let tick = new Date().getTime()
      let chunks = upfile.blocks.length
      let chunk = chunks - upfile.remaning + 1
      let progress = percentage * 100
      let file = this.file
      if(tick - this.$tick > 1000){
        let updata = Math.floor(upfile.size * percentage)
        file.speed = Math.max(updata - file.updata, 0)
        file.updata = updata
        this.$tick = tick
        if(file.speed){
          file.remaintime = Math.ceil((upfile.size - updata) / file.speed)
        }
      }
      if(file.chunks < chunks){
        file.chunks = chunks
      }
      if(file.chunk < chunk){
        file.chunk = chunk
      }
      if(file.progress < progress){
        file.progress = progress
      }
    },
    uploadSuccess (upfile, response) {
      this.state = 'success'
      this.file.progress = 100
      this.file.chunk = this.file.chunks
      this.file.remaintime = 0
    },
    uploadError (upfile, reason) {
      console.log('uploadError', reason)
    },
    uploadComplete (upfile) {
      
    },
    uploadFinished () {
    },
    stopUpload (upfile) {
      
    },
    fileDequeued (upfile) {
      this.state = 'pending'
      this.canStart = false
      this.file = 0
    }
  },
  watch: {
    isLogin () {
      this.init()
    }
  },
  filters: {
    convertBytes (bytes) {
      if (bytes === 0) return '0 B'
      let k = 1024,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k))
      return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
    },
    convertTime (time){
      let result  = ''
      let hour = parseInt(time/3600)
      let minutes = parseInt(time/60-hour*60)
      let second = time%60
      result += hour ? hour + ' 小时' : ''
      result += minutes ? minutes + ' 分钟' : ''
      result += second + ' 秒'
      return result
    }
  }
}
