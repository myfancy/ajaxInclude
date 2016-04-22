/**
 * ajaxInclude方法
 * Created by 幻想家 on 2015/7/2.
 * 云端备份唯一地址：github.com/myfancy
 * 本地备份唯一地址：MY_WEB_DEMO\MyFrontFrame\JS-Plugin
 *
 * ===========
 * 其他项目使用的时候都从这里拷贝（删除===以下注释，可适当保留版本号和使用方法），在项目中有用的更改请手动同步到这里
 * 目前使用该js的项目：
 * 恒会快销，恒会官网，苏格婚纱官网，禾柏生物官网，唐山鑫昊钢结构彩钢官网
 *
 * 版本更新：2016.4.22（优化错误显示 if(statusTxt=="error") {……}//这里）
 *
 * 版本更新：201509230909（采用jquery插件的方式写）
 * 使用方法：
 <script src="js/jquery.ajaxInclude.js"></script>
 <script id="ieAlert" type="text/javascript">
 $('#ieAlert').ajaxInclude('inc_ieAlert.html');
 </script>
 * 更新备注：
 * 之前的版本会导致页面因为load方法，多次触发页面中$(document).ready();导致其内部的方法被多次触发。
 * 那个“恒会快销移动版项目”中带按钮的计算价格的“输入框组件”就是例证。
 * 这次的更新不知道能不能解决该问题，有待验证！（猜测还是解决不了）2015.9.23.9:23
 * add：问题已解决，不知道是这个方法插件化，还是那个计算价格组件的方法插件化搞好的。
 * add：【2016.4.22】隐隐约约知道为什么了，因为那个时候页面引用的本文件的js是在下面的
 <script type="text/javascript" src="js/jquery.min.js"></script>
 <script type="text/javascript" src="js/common.js"></script> <!/--计算组件在这里-->

 <script type="text/javascript" src="js/ajaxInclude.js"></script>
 *页面加载后先实现计算的方法，再执行下面的方法，所以以后必须反过来。保证jquery.ajaxInclude.js紧跟在jquery方法后面
 *
 *
 * 说明：
 * 在需要引入的地方，书写上面的代码。
 * 1、需要给script节点添加id，这方法时通过id来判断include到的页面位置的。
 * 2、一个页面多次应用，id一定不要重复。
 * 3、把被引入的html文件称为子页面，主动引入的称为母页面。
 * 母页面的css可以直接影响到子页面的dom，但是母页面的js是检测子页面dom有问题（需要判断页面加载和ajax加载比较复杂）。
 * 所以，如果子页面上需要用js交互功能的话，把相应的js代码引入或写入的子页面的文件中。（这样js就成了异步加载了）
 * 子页面可以直接写dom和js，不需要写css和网页的<html>和<head>等，只需要写<body>标签内部的代码即可
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
        ////不用load方法，直接用ajax方法
        //var $wrap = $("#"+scriptID+'-tempWrap');
        //$.ajax({
        //    type: "post",
        //    url: includeFile,
        //    success: function(data, textStatus){
        //        $wrap.html(data);
        //    },
        //    complete: function(XMLHttpRequest, textStatus){
        //        //可以在这里删除有碍观瞻的自身script节点，表担心，不影响函数执行
        //        $wrap.next().remove();
        //        //没错，这就是传说中的去壳大法！
        //        $wrap.children().unwrap();
        //    },
        //    error: function(){
        //        //请求出错处理
        //        $wrap.html("<h1 style='width: 100%;font-size: 25px;text-align: center'>" +
        //                    "此处组件加载失败！</h1>");
        //        //console.log("ajaxInclude.js执行错误————"+xhr.status + "：" + xhr.statusText);
        //    },
        //    async:true
        //});
    };
})(jQuery);


/**
 * ajaxInclude方法 【非jq插件形式】[已弃用]
 *
 * 使用方法：
 * <head>中引入：
 <script type="text/javascript" src="js/jquery.ajaxInlcude.js"></script>
 * 需要的位置写它：(id可以自定义，但不能重复哦)
 <script id="CustomIDNotSame" type="text/javascript">
 $(document).ready(
 ajaxInclude('CustomIDNotSame','head.html')
 );
 </script>
 * 代码可以更简单一点：
 <script id="CustomIDNotSame" type="text/javascript">
 $(ajaxInclude('CustomIDNotSame','head.html'));
 </script>
*/

//;
//
//function ajaxInclude(scriptID,includeFile){
//    //通过js创建外层div，位置是当前script节点前方，所以一个页面中多次引用时需要使用不同的id
//    $("#"+scriptID).before('<div id='+scriptID+'-tempWrap'+'></div>');
//    //在创建的div中，通过ajax load()引入指定html文件
//    //添加回调函数，处理一些问题并捕捉异常
//    $("#"+scriptID+'-tempWrap').load(includeFile,function(responseTxt,statusTxt,xhr){
//        if(statusTxt=="success") {
//            //可以在这里删除有碍观瞻的自身script节点，表担心，不影响函数执行
//            $(this).next().remove();
//            //没错，这就是传说中的去壳大法！
//            $(this).children().unwrap();
//        }else if(statusTxt=="error") {
//            $(this).html("<h1 style='font-size: 25px'>此处组件加载失败！</h1>");
//            alert("Error: " + xhr.status + ": " + xhr.statusText);
//        }
//    });
//}
