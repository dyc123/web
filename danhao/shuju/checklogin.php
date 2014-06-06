<?php
session_start();
if($_POST["check"]){
if($_SESSION["name"]){
$rel=$_SESSION;
$rel["code"]=1;//已经登录
}else
$rel["code"]=0;//游客
}else
$rel["code"]=-1;//非法
//var_dump($_POST["check"]);
echo json_encode($rel);	
?>