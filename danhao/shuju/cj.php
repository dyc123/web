<?php
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

if($_GET["cjid"]){
$rows_begin=$_GET["cjid"];
}
else{
$db_config["database"]    = "dh_main";
$db = new db(); 
$db->connect($db_config); 
$rows = $db->row_query_one( " SELECT cjid FROM `numbers` ORDER BY  `numbers`.`id` DESC LIMIT 0 , 1");
if($rows){
$rows_begin=$rows["cjid"]+1;
}else{
echo "系统初始化 请输入采集id ：<form action='cj.php' method='get'><p><input type='text' name='cjid' id='cjid' /><input type='submit' value='提交' /></form>";
exit;
}
}
//var_dump($rows_begin);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title> 采集数据 </title>
<script type="text/javascript" src="../js/jquery.js"></script>
<script type="text/javascript">
 function getdanhao () {
 $.ajax({url: 'getdanhao.php',type: 'POST',data:'id='+$('#cjid').val(),dataType: 'html',timeout: 10000,
 error: function(XMLHttpRequest, textStatus, errorThrown){
$("#mesg").html("出错:"+textStatus+"10秒后继续。。。");
setTimeout("getdanhao()",10000);//每10秒钟刷新一次
setTimeout("reload()",9000);//每10秒钟刷新一次
 },
 success: function(da){
 if(da){
	$("#mesg1").html(da);
	if(da.indexOf("成功")>=0){
		$("#text").html(parseInt($("#text").html())+1);
		$("#cjid").val(parseInt($("#cjid").val())+1);
		$("#mesg").html("正常采集中。。。");
		setTimeout("getdanhao()",20);//每10秒钟刷新一次
		if(parseInt($("#text").html())%200==0)
			reload();
	}else if(da.indexOf("小号被T了")>=0){
	reload();
	getdanhao();
	$("#errmsg").html($("#errmsg").html()+"小号被T了重试中。。。。<br>");
	$("#mesg").html("小号被T了重试中。。。");
	}else if(da.indexOf("数据库错误")>=0){
		
		$("#cjid").val(parseInt($("#cjid").val())+1);
		setTimeout("getdanhao()",5000);//每10秒钟刷新一次}
		if(da.indexOf("1062")>=0){
		$("#mesg").html("数据重复");
		}else{
		$("#mesg").html(da);
		$("#errmsg").html($("#errmsg").html()+"数据库错误5秒后重试。。。。<br>");
		}
	 }else if(da.indexOf("无单号")>=0){
		setTimeout("getdanhao()",500000);//每10秒钟刷新一次
		setTimeout("reload()",490000);
		$("#mesg").html("无单号:6分钟后继续。。。");
		$("#errmsg").html($("#errmsg").html()+"无单号:6分钟后继续。。。<br>");
	}else if(da.indexOf("网络错误")>=0){
		setTimeout("getdanhao()",10000);//每10秒钟刷新一次
		//setTimeout("reload()",9000);
		$("#mesg").html("网络错误10秒后重试。。。");
		$("#errmsg").html($("#errmsg").html()+"网络错误10秒后重试。。。<br>");
	}else{
		setTimeout("getdanhao()",10000);//每10秒钟刷新一次
		//setTimeout("reload()",9000);
		$("#mesg").html("未知错误10秒后重试。。。");
		$("#errmsg").html($("#errmsg").html()+"未知错误10秒后重试。。。<br>");
	}
	if($("#errmsg").html().length>10000)
		$("#errmsg").html()="";
 }else{
 $("#mesg").html("服务器返回数据："+da+"10秒后重试。。。");
 $("#errmsg").html($("#errmsg").html()+"服务器返回数据："+da+"10秒后重试。。。<br>");
setTimeout("getdanhao()",10000);//每10秒钟刷新一次
 }
 }});

}

function reload(){
$.ajax({
 url: 'reloadlogin.php',
 type: 'POST',
 data:null,
 dataType: 'html',
 timeout: 5000,
 error: function(XMLHttpRequest, textStatus, errorThrown){
$("#mesg").html("小号刷新出错:"+textStatus+"10秒后继续。。。");
//setTimeout("getdanhao()",10000);//每10秒钟刷新一次
setTimeout("reload()",9000);//每10秒钟刷新一次
 },

 success: function(da){
$("#rel").val(da);
 }

 });
 }
setTimeout("getdanhao()",1000);//每10秒钟刷新一次
setTimeout("reload()",5);//每10秒钟刷新一次
</script>

</head>



<body>
当前id :<input type="text" id="cjid" value="<?=$rows_begin?> ">
总共采集<span id="text">0</span>条数据
<br>
小号刷新：<textarea id="rel" style="width: 300px; height:30px">小号信息</textarea ><br>
错误信息：<textarea id="mesg" style="width: 300px;height:30px">无错误信息</textarea><br>
返回信息：<textarea id="mesg1" style="width: 300px;height:60px">无错误信息</textarea><br>
错误统计：<textarea id="errmsg" style="width: 300px;height:60px"></textarea>
</body>

</html>
