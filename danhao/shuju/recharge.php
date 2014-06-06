<?php
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

$data=$_GET["data"];
if($data){
$data=str_replace(array("\\\\n","\\\\t","\\"),"",$data);
$data=str_replace("&quot;","\"",$data);
$data=json_decode($data,true);
$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config); 
$ret="OK";
foreach($data as $value){
if(!$value["status"]=="交易成功")
	continue;
$rows["tbtime"]=strtotime($value["time"]);
$rows["remark"]=trim($value["beizhu"]);
$rows["money"]=substr(str_replace("-",".",$value["memony"]),1);
if(strstr($value["bianhao"],";")){
$arr=explode(";",$value["bianhao"]);
$rows["orders"]=str_replace(":","",strstr($arr[0],":"));
$rows["trade"]=str_replace(":","",strstr($arr[1],":"));
}else{
$rows["trade"]=str_replace(":","",strstr($value["bianhao"],":"));
}
$rel=$db->row_query_one("select count(*) as n from chongzhi where trade='".$rows["trade"]."'");
//var_dump($rel);
if($rel["n"]==1){

	continue;
	}
	$dberr=$db->row_insert("chongzhi",$rows);
	//var_dump($dberr);
if(is_array($dberr)&&array_key_exists("sqlerr",$dberr))
	$ret="NO";
}
$db->close_db();
unset($db);
echo $ret;
}else{
echo "<script>alert('请不要非法访问！')</script>";
}
?>