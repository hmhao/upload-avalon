import KHeader from '@/components/KHeader'
import KFooter from '@/components/KFooter'

let template = 
`
<div :controller="app">
  <p><a href='#!/aa/first'>点我first</a>|<a href='#!/bb/second'>点我second</a>|<a href='#!/cc/third'>点我third</a>|<a href='#!/dd/four'>点我four</a></p>
  <xmp :widget="@$header"></xmp>
  <xmp :widget="{is: 'k-view'}"></xmp>
  <xmp :widget="@$footer"></xmp>
</div>
`

$('#app').append(template)

avalon.define({
  $id: 'app',
  $header: {
    is: 'k-header'
  },
  $footer: {
    is: 'k-footer'
  }
})

avalon.ready(() => avalon.scan(document.body))
