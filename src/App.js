import KHeader from '@/components/layout/KHeader'
import KFooter from '@/components/layout/KFooter'
import KNav from '@/components/layout/KNav'
import KAlert from '@/components/base/KAlert'
import KUploadPage from '@/components/KUploadPage'

let template = 
`
<div>
  <k-header :widget="{is: 'k-header'}"></k-header>
  <div class="container">
    <div class="row">
      <div class="col-xs-2">
        <k-nav :widget="{is: 'k-nav'}"></k-nav>
      </div>
      <div class="col-xs-10">
        <k-upload-page :widget="{is: 'k-upload-page'}" :css="{marginTop:showUpload?'0px':'-10000px',position:showUpload?'':'absolute'}"></k-upload-page>
        <k-view :widget="{is: 'k-view'}" :visible="!showUpload"></k-view>
      </div>
    </div>
  </div>
  <k-footer :widget="{is: 'k-footer'}"></k-footer>
  <k-alert :widget="{is: 'k-alert'}"></k-alert>
</div>
`

export default {
  name: 'app',
  template,
  data () {
    return {
      showUpload: true
    }
  },
  methods: {
    onReady () {
      avalon.store.dispatch('autoLogin')
      let router = avalon.router.vm
      this.update(router.route)
      router.$watch('route', (route) => {
        this.update(router.route)
      })
    },
    update: function(route){
      this.showUpload = route.path === '/index'
    }
  },
  components: {
    KHeader,
    KNav,
    KFooter,
    KUploadPage,
    KAlert
  }
}
