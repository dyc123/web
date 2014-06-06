<?php
session_start();
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
include_once("../include/ip.php");
date_default_timezone_set('Asia/Shanghai');

$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config);
$rows=$_POST; 
$rows["regtime"]=time();
$rows["regip"]=getIP();
$rel=$db->row_query_one("select count(*) as n from user where regip='".$rows["regip"]."'");
if($rel["n"]==0)
	$rows["rmb"]=5;
$dberr=$db->row_insert("user",$rows);
//var_dump(array_key_exists("sqlerr",$dberr));
if(is_array($dberr)&&array_key_exists("sqlerr",$dberr)){
	$senddata=false;
}else{
$senddata=true;
}
echo json_encode($senddata);
?>