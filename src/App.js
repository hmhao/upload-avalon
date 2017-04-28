import KHeader from '@/components/layout/KHeader'
import KFooter from '@/components/layout/KFooter'
import KNav from '@/components/layout/KNav'

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
        <k-view :widget="{is: 'k-view'}"></k-view>
      </div>
    </div>
  </div>
  <k-footer :widget="{is: 'k-footer'}"></k-footer>
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
    KNav,
    KFooter
  }
}
