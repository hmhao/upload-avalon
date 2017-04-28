let template = 
`
<div class="tablist vediolist">
  <table><!--table里面显示5条视频信息-->
    <tbody><tr class="title">
      <td class="tb01">视频</td>
      <td class="tb02">视频数</td>
      <td class="tb02">视频</td>
      <td class="tb02">视频</td>
    </tr>
    <tr class="list">
      <td class="tb01">
        <label class="checkbox" for="checkbox2">
          <span class="icon-to-fade"></span>
                <input type="checkbox" value="" id="checkbox2">
            </label>
            <img src="img/videolist.png">
          <span class="listtitle" title="2016年度电影TOP50">2016年度电影TOP50</span>
          <span class="listdate">2017-03-2315:23</span>
      </td>
      <td class="tb02">
        3
      </td>
      <td class="tb02">
        <p class="mar_top60"><i class="icon icon_redio"></i><span class="redtext">36</span></p>
      </td>
      <td class="tb02">               
        <p class="mar_top40"><a href="">添加视频</a></p>
        <p><a href="">管理节目</a></p>
        <p><a href="" class="">删除</a></p>
      </td>
    </tr>
    <tr class="list">
      <td class="tb01">
        <label class="checkbox" for="checkbox2">
          <span class="icon-to-fade"></span>
                <input type="checkbox" value="" id="checkbox2">
            </label>
            <img src="img/videolist.png">
          <span class="listtitle" title="2016年度电影TOP50">2016年度电影TOP50</span>
          <span class="listdate">2017-03-2315:23</span>
      </td>
      <td class="tb02">
        3
      </td>
      <td class="tb02">
        <p class="mar_top60"><i class="icon icon_redio"></i><span class="redtext">36</span></p>
      </td>
      <td class="tb02">               
        <p class="mar_top40"><a href="">添加视频</a></p>
        <p><a href="">管理节目</a></p>
        <p><a href="" class="">删除</a></p>
      </td>
    </tr>                   
  </tbody></table>
</div>
`

export default {
  name: 'k-video-list',
  template,
  data () {
    return {}
  },
  computed: {
  }
}
