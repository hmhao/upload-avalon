import KUpload from './KUpload'

let template = 
`
<div>
  <xmp :css="{left:isLogin?'0px':'-10000px',position:isLogin?'relative':'absolute'}" :widget="{is: 'k-upload', $id: 'k-upload-video'}" cached="true"></xmp>
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
  },
  computed: {
    ...avalon.store.mapGetters(['isLogin'])
  },
  components: {
    KUpload
  }
}
