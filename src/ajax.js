let fixAjaxOptions = function (options) {
  if(options.type && options.type.toLocaleUpperCase() == 'POST' && options.data){
    let IEVer = WebUploader.Base.browser.ie
    if(IEVer && IEVer < 10){//由于ie<10跨域post请求无效，故引入crossdomain-transport实现
        options.initialIframeSrc = 'http://srv.ivideo.kankan.com/demo/cross_domain_iframe.html'
        options.dataType = 'crossdomain'
        options.id = 'crosIframe'
        window.document.domain = 'kankan.com'
    }
  }
  return options
}

export default function Ajax(options){
  return $.ajax(fixAjaxOptions(options))
    .always(function(){
      console.log(0)
    })
}