import KHeader from '@/components/KHeader'
import KFooter from '@/components/KFooter'

let template = 
`
<div>
  <p><a href='#!/video'>视频管理</a>|<a href='#!/album'>节目管理</a></p>
  <xmp :widget="{is: 'k-header'}"></xmp>
  <xmp :widget="{is: 'k-view'}"></xmp>
  <xmp :widget="{is: 'k-footer'}"></xmp>
</div>
`

export default {
  name: 'app',
  template,
  defaults: {
    onReady () {
      avalon.store.dispatch('autoLogin')
    }
  },
  components: {
    KHeader,
    KFooter
  }
}
