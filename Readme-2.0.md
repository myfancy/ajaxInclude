# ajaxInclude方法
    模拟php的include功能，通过ajax load()实现。
    Created by 幻想家 on 2015/7/2.
    Current Version:v20160614
    云端备份唯一地址：github.com/myfancy
    本地备份唯一地址：MY_WEB_DEMO\MyFrontFrame\JS-Plugin
    
##需求介绍  
在写页面的时候，一个导航可能N个页面要用到，每一个页面都需要复制粘贴一份进去，一旦有改动html代码的需求就苦逼了，每个都得改一遍。如果这个前端demo页面很多，改动需求也很多，需要反复修改，那简直就是折磨人啊（虽然这种情况一般遇不到，但是偶老是遇到。）<br/>
（背景介绍：外包公司，主要接小型网站项目，但是非模板开发，而是走得面向客户的定制化路线。所以需要设计好了给客户看设计稿，为了安全起见，前端demo写好，也要给客户演示一遍。之后进入后端开发阶段就完全脱离客户直接奔向最终稿了。

##运行环境
因为使用的是ajax来实现的，而各大浏览器基于安全原因都不支持file\://的方式打开的页面调用ajax方法。所以必须通过http\://的方式来预览。

提示1：在iis中可以搭建本地站点，路径指向你的开发项目目录即可（不懂的请自行百度）。<br/>
提示2：使用webstorm这个前端专用IDE，打开项目自带服务器环境。直接在IDE里面右击RUN就行，不需要自行搭建服务器环境。<br/>
提示3：Firefox是个特例，它支持file\://方式打开的页面调用jquery的load()方法，咱们刚好这么写的。所以在非开发环境的电脑上预览项目的时候，可以右击选择火狐打开。（比如demo做好给客户演示的时候，或者给后端开发预览参考的时候）。

##开发提示
不建议用到正式项目中，因为我也是纯粹为了前端开发的方便而写的这个插件。建议在页面对接后台的时候，让后端程序员来替换引用。比如php中有原生的include（）方法，各类框架如thinkPHP框架中也有对应的引用方法。其他平台开发亦是如此。
```html
<script id="Nav" type="text/javascript">
    $('#Nav').ajaxInclude('Nav.html');
</script>
```
直接将上面的引用代码替换即可！
示例：
```php
<?php
include('top.php');
require('nav.php');
//……
php?>
```

# 使用方法：
```html
<script src="js/jquery.ajaxInclude.js"></script>

<script id="ieAlert" type="text/javascript">
$('#ieAlert').ajaxInclude('inc_ieAlert.html');
</script>
```

#使用说明：
把主动引用其他html的html称为母页面，被其他html文件引用的称为子页面
###1、母页面<<span>head</span>><<span>/head</span>>部分引入：【紧挨着jquery.js，处于所有js之前】
```html
<script src="js/jquery.ajaxInclude.js"></script>
```
 
###2、母页面<<span>body</span>><<span>/body</span>>部分对应的位置添加：【id用来定位的，一定不要重复】
```html
<script id="ieAlert" type="text/javascript">
    $('#ieAlert').ajaxInclude('inc_ieAlert.html');
</script>
```
###3、凡是需要操作子页面DOM的js，直接写到对应子页面DOM下面，或写到单独js中并在子页面DOM下面引入。
【千万不要写到母页面中或在母页面中引入，jQuery.ready方法会在子页面DOM加载之前执行，找不到对应dom当然会出问题】<br/>
【后端开发时，会把对应的js引用直接改成php，.net支持的Include()等，就不需要顾虑了，随意】
###4、子页面直接写需要引用的html代码即可，无需非得添加完整html结构：
```html
<!DOCTYPE html><html><head>……</head><body>……</body></html>
```
###5、【后期追加】不是什么神奇的东西，就是jquery提供的load方法。
    .load(url [, data] [, complete(responseText, textStatus, XMLHttpRequest)])
因为本人有精神洁癖，看不得f12时，有冗余的代码，尤其是遇到bug时，更是心烦。于是写了在请求结束时删除掉多余代码的功能，后来练习jquery的插件写法的时候（很早之前），拿她开刀改为插件形式，再后来无聊又添加了请求失败时的友好提示。实际就是个load方法。
如非必要，你每次这么写也行：(省的都得引入个多余js，后端开发还要删掉，做好注释就好)

```html
<!--引入公用页面------------------------------start-->
<div id="new-nav"></div>
<script type="text/javascript">
    $( "#new-nav" ).load("/ #jq-footerNavigation li"，function(responseTxt,statusTxt,xhr){
        //your code you need...
    });
</script>
<!--引入公用页面------------------------------end-->
```
这样会导致你的引入代码被那个div包裹，在css的理论上，不会有任何影响。实际情况可能会复杂一些。我上面说的遇到bug，也是指这些，样式莫名异常，找不到原因的时候就会怀疑是不是这里的问题。所以一次解决掉它了。看ajaxInclude-1.0.js了解更多。
