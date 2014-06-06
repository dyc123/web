<?php
session_start();
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
include_once("../include/http.curl.php");
include_once("checkdanhao.php");
date_default_timezone_set('Asia/Shanghai');
$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config); 
$curl = new Curl_HTTP_Client();
$result =$db->row_query_one("SELECT * FROM `sys_user` where status=1 LIMIT 0, 1 " );
$curl->set_cookie($result["cookie"]); 
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
checkdanhao($db,$curl);

if($_POST["name"]!=$_SESSION["name"]){
$rel["code"]=-1;//非法提交
$rel["msg"]="不要非法提交数据";
}else{
$result=$db->row_query("select u.buyprice,u.buytime,s.company,s.number,s.scantime,s.send,s.collect as shou,u.status from user_orders as u,sys_orders as s where u.oid=s.id and u.uid=".$_SESSION["uid"]." order by s.id desc limit ".(intval($_POST["page"])-1)*intval($_POST["pagesize"]).",".intval($_POST["pagesize"]));
//var_dump("select u.buyprice,u.buytime,s.company,s.number,s.scantime,s.send,s.collect as shou,u.status from user_orders as u,sys_orders as s where u.oid=s.id and u.uid=".$_SESSION["uid"]." order by s.id desc limit ".(intval($_POST["page"])-1)*intval($_POST["pagesize"]).",".intval($_POST["pagesize"]));
$rel["data"]=$result;
}
echo json_encode($rel);
?>