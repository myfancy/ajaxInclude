# ajaxInclude方法
<pre>
模拟php的include功能，通过ajax load()实现。
Created by 幻想家 on 2015/7/2.
Current Version:v20160614
云端备份唯一地址：github.com/myfancy
本地备份唯一地址：MY_WEB_DEMO\MyFrontFrame\JS-Plugin
</pre>
# 使用方法：
<pre>
<code>
<<span>script src="js/jquery.ajaxInclude.js"</span>><<span>/script</span>>

<<span>script id="ieAlert" type="text/javascript"</span>>
<span>$('#ieAlert').ajaxInclude('inc_ieAlert.html');</span>
<<span>/script</span>>
</code>
</pre>

#使用说明：
把主动引用其他html的html称为母页面，被其他html文件引用的称为子页面
###1、母页面<<span>head</span>><<span>/head</span>>部分引入：【紧挨着jquery.js，处于所有js之前】
<pre>
<<span>script src="js/jquery.ajaxInclude.js"</span>><<span>/script</span>>
</pre>
 
###2、母页面<<span>body</span>><<span>/body</span>>部分添加：【id用来定位的，一定不要重复】
<pre>
<<span>script id="ieAlert" type="text/javascript"</span>>
    $('#ieAlert').ajaxInclude('inc_ieAlert.html');
 <<span>/script</span>>
</pre>
###3、凡是需要操作子页面DOM的js，直接写到子页面DOM下面，或写到单独js中并在子页面DOM下面引入。
【千万不要写到母页面中或在母页面中引入，jQuery.ready方法会在子页面DOM加载之前执行，找不到对应dom当然会出问题】
【后端开发时就不需要顾虑了，随意】
