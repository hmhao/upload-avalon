import KUpload from './KUpload'

let template = 
`
<div>
  <xmp :css="{top:isLogin?'0px':'-1000px'}" :widget="{is: 'k-upload'}"></xmp>
  <div :visible="!isLogin">
    <img src="/static/logo.png" />
    <div>
      上传视频，即代表您已同意
      <a href="javascript:void(0)" target="_blank">看看上传服务条款</a>
    </div>
  </div>
</div>
`

export default {
  name: 'k-upload-page',
  template,
  defaults: {
    ...avalon.store.mapGetters(['isLogin']),
    onReady () {
      avalon.store.$watch('state.isLogin', (value) => {
        this.isLogin = value
      })
    }
  },
  components: {
    KUpload
  }
}
