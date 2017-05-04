import api from '@/store/api'

let fixAjaxOptions = function (options) {
  if(options.type && options.type.toLocaleUpperCase() == 'POST' && options.data){
    let IEVer = WebUploader.Base.browser.ie
    if(IEVer && IEVer < 10){//由于ie<10跨域post请求无效，故引入crossdomain-transport实现
        options.initialIframeSrc = './cross_domain_iframe.html'
        options.dataType = 'crossdomain'
        options.id = 'crosIframe'
        window.document.domain = 'test.com'
    }
  }
  return options
}

export default function Ajax(options){
  if(avalon.config.local){
    let dtd = $.Deferred()
    if(options){
      api.get(options.url, dtd)
    }else{
      dtd.reject()
    }
    return dtd
  }else{
    return options ? $.ajax(fixAjaxOptions(options)) : $.Deferred()
  }
}