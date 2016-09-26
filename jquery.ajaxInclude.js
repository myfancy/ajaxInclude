/**
 * ajaxInclude方法
 * Created by 幻想家 on 2015/7/2.
 * Current Version:v20160614
 * 云端备份唯一地址：github.com/myfancy
 * 本地备份唯一地址：MY_WEB_DEMO\MyFrontFrame\JS-Plugin
 *
 * #使用说明：
 * 把主动引用其他html的html称为母页面，被其他html文件引用的称为子页面
 * 1、母页面<head></head>部分引入：【紧挨着jquery.js，处于所有js之前】
 <script src="js/jquery.ajaxInclude.js"></script>
 * 2、母页面<body></body>部分添加：【id用来定位的，一定不要重复】
 <script id="ieAlert" type="text/javascript">
    $('#ieAlert').ajaxInclude('inc_ieAlert.html');
 </script>
 * 3、凡是需要操作子页面DOM的js，直接写到子页面DOM下面，或写到单独js中并在子页面DOM下面引入。
 * 【千万不要写到母页面中或在母页面中引入，jQuery.ready方法会在子页面DOM加载之前执行，找不到对应dom当然会出问题】
 * 【后端开发时，会把对应的js引用直接改成php，.net支持的include()等，就不需要顾虑了，随意】
 *
 */

;

(function($) {
    $.fn.ajaxInclude = function(includeFile) {
        var scriptID = $(this).attr('id');
        //通过js创建外层div，位置是当前script节点前方，所以一个页面中多次引用时需要使用不同的id
        $(this).before('<div id='+scriptID+'-tempWrap'+'></div>');
        //在创建的div中，通过ajax load()引入指定html文件
        //添加回调函数，处理一些问题并捕捉异常
        $("#"+scriptID+'-tempWrap').load(includeFile,function(responseTxt,statusTxt,xhr){
            if(statusTxt=="success") {
                //可以在这里删除有碍观瞻的自身script节点，表担心，不影响函数执行
                $(this).next().remove();
                //没错，这就是传说中的去壳大法！
                $(this).children().unwrap();
            }else if(statusTxt=="error") {
                $(this).html("<div style='width: 100%;font-size: 25px;text-align: center'>" +
                    "<h1 style='font-size: 25px;font-weight: bold'>" + scriptID+ "组件加载失败！" +"</h1>"+
                    "<span style='font-size: 10px'>" + xhr.statusText+ "</span>"+
                    "</div>");
                console.log(scriptID+ "组件加载失败！——"+xhr.status + "：" + xhr.statusText);
            }
        });
    };
})(jQuery);
