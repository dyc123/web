<?php
session_start();
if($_POST["check"]){
if($_SESSION["name"]){
$rel=$_SESSION;
$rel["code"]=1;//�Ѿ���¼
}else
$rel["code"]=0;//�ο�
}else
$rel["code"]=-1;//�Ƿ�
//var_dump($_POST["check"]);
echo json_encode($rel);	
?>