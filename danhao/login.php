<?php
session_start();
include_once("include/db_config.php");
include_once("include/db.php");
include_once("include/mysqli.php");
include_once("include/ip.php");
date_default_timezone_set('Asia/Shanghai');

 if($_POST["userlogin"]){
	if(strtolower($_POST["code"])==strtolower($_SESSION["code"])){
		$db_config["database"]    = "dh_user";
		$db = new db(); 
		$db->connect($db_config); 
		 $rel=$db->row_query_one("select * from user where name='".$_POST["name"]."' and pwd='".$_POST["pwd"]."'");
		 if($rel["id"]){
			$_SESSION["uid"]=$rel["id"];
			$_SESSION["name"]=$rel["name"];
			$_SESSION["rmb"]=$rel["rmb"];
			$_SESSION["status"]=$rel["status"];
			$db->row_update("user",array("ip"=>getIP(),"lastip"=>$rel["ip"]),"id=".$rel["id"]);
			$relmsg=$db->row_select_one("vip","id=".$rel["vip"]);
			$_SESSION["vip"]=$relmsg["name"];
			$relmsg=$db->row_select("vipmode","vipid=".$rel["vip"]);
			foreach($relmsg as $value){
			$price[$value["vipname"]]=$value["price"];
			}
			$_SESSION["vipprice"]=$price;
			$rel=$_SESSION;
			$rel["code"]=1;			
		 }else{
			$rel["code"]=0;
		 }
	}else{
		$rel["code"]=-2;
		}
}else{  
$rel["code"]=-1;//非法请求
}
echo json_encode($rel);	 
?> 
