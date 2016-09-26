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
 <script id="CustomIDNotSame"> $(ajaxInclude('CustomIDNotSame','head.html')); </script>
 */

;

function ajaxInclude(scriptID,includeFile){
    //通过js创建外层div，位置是当前script节点前方，所以一个页面中多次引用时需要使用不同的id
    $("#"+scriptID).before('<div id='+scriptID+'-tempWrap'+'></div>');
    //在创建的div中，通过ajax load()引入指定html文件
    //添加回调函数，处理一些问题并捕捉异常
    $("#"+scriptID+'-tempWrap').load(includeFile,function(responseTxt,statusTxt,xhr){
        if(statusTxt=="success") {
            //可以在这里删除有碍观瞻的自身script节点，表担心，不影响函数执行
            $(this).next().remove();
            //没错，这就是传说中的去壳大法！
            $(this).children().unwrap();
        }else if(statusTxt=="error") {
            $(this).html("<h1 style='font-size: 25px'>此处组件加载失败！</h1>");
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
}
