/**
 * Created by 幻想家 on 2015/7/2.
 * ajaxInclude方法。
 * 模拟php的include功能，通过ajax load()实现。
 * 注意：只能在网站环境下运行，在文件夹中直接双击运行是会报错的。
 * a:代表当前script节点的id
 * b:代表引入的文件，可以包括路径
 * 使用方法：
 * <head>中引入：
   <script src="js/jquery.ajaxInlcude.js"></script>
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
 * 在需要引入的地方，书写上面的代码。
 * 1、需要给script节点添加id，这方法时通过id来判断include到的页面位置的。
 * 2、一个页面多次应用，id一定不要重复。
 * 3、把被引入的html文件称为子页面，主动引入的称为母页面，母页面的css可以直接影响到子页面的dom，
 *    但是母页面的js是检测不到子页面的dom的，所以如果子页面上需要用js交互功能的话，把相应的js代码引入或写入的子页面的文件中。
 *    子页面可以直接写dom和js，不需要写css和网页的<html>和<head>等，只需要写<body>标签内部的代码即可
 *
 */

;

function ajaxInclude(a,b){
    //通过js创建外层div，位置是当前script节点前方，所以一个页面中多次引用时需要使用不同的id
    $("#"+a).before('<div id='+a+'-wrap'+'></div>');
    //在创建的div中，通过ajax load()引入指定html文件
    //添加回调函数，处理一些问题并捕捉异常
    $("#"+a+'-wrap').load(b,function(responseTxt,statusTxt,xhr){
        if(statusTxt=="success") {
            //可以在这里删除有碍观瞻的自身script节点，表担心，不影响函数执行
            $(this).next().remove();
            //没错，这就是传说中的去壳大法！
            $(this).children().unwrap();
        }else if(statusTxt=="error") {
            $(this).html("<h1 style='font-size: 50px'>此处组件加载失败！</h1>");
            alert("Error: " + xhr.status + ": " + xhr.statusText);
        }
    });
}
