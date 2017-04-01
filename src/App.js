import KHeader from '@/components/KHeader'
import KFooter from '@/components/KFooter'

let template = 
`
<div>
  <p><a href='#!/aa/first'>点我first</a>|<a href='#!/bb/second'>点我second</a>|<a href='#!/cc/third'>点我third</a>|<a href='#!/dd/four'>点我four</a></p>
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
