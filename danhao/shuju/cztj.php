<?php
session_start();
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

if(!$_POST["name"]||$_POST["name"]!=$_SESSION["name"]){
	$rel["code"]=-2;//非法提交
	$rel["msg"]="请不要非法提交数据！";
}else{
$data["zfbjyh"]=$_POST["zfbjyh"];
$data["czjg"]=$_POST["czjg"];
$data["uid"]=$_SESSION["uid"];
$data["sqtime"]=time();
$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config); 
$relmsg=$db->row_insert("czsq",$data);//这里以后改
//var_dump($relmsg);
$rel["code"]=1;
$rel["msg"]="提交成功！";
}
echo json_encode($rel);
?>