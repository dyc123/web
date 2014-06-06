<?php
session_start();
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config);
check($db);//全部充值检查一次
if(!$_POST["name"]||$_POST["name"]!=$_SESSION["name"]){
	$rel["code"]=-1;
	$rel["msg"]="警告，不要非法提交";
}else{
$rowswcz=$db->row_select("czsq","status<>0 and readmode=0");
$db->row_update("czsq",array("readmode"=>1),"status<>0");
$rel["code"]=0;
foreach($rowswcz as $value){
	$rel["code"]=1;
	$rel["msg"].="<p>订单(交易号)：".$value["zfbjyh"]."<br/><br/>状态：".$value["msg"]."</p>";
	$rel["czjg"]=$value["czjg"];
}
//var_dump($rel);
if($rel["code"]==1){
$rowswcz=$db->row_select_one("user"," id=".$_SESSION["uid"]);
$rel["rmb"]=$rowswcz["rmb"];
$_SESSION["rmb"]=$rowswcz["rmb"];
}
}
echo json_encode($rel);

function check($db){
	$rowswcz=$db->row_select("czsq","status=0");//查询所有未处理充值申请
	foreach($rowswcz as $value){
	 $rowsnum=$db->row_select_one("chongzhi","trade='".$value["zfbjyh"]."'");
	 if($rowsnum["id"]){
	 //var_dump($rowsnum);
		if($rowsnum["status"]!=1){
			if($rowsnum["uid"]==$value["uid"])
			$db->row_update("czsq",array("status"=>-2,"msg"=>"此交易号已经充值"),"id=".$value["id"]);
			else
			$db->row_update("czsq",array("status"=>-3,"msg"=>"此交易号已经被别人充值"),"id=".$value["id"]);
			}
		else if(floatval($rowsnum["money"])!=floatval($value["czjg"])){
			$data1["status"]=-1;
			$data1["msg"]="充值价格填写错误！";
			$db->row_update("czsq",$data1,"id=".$value["id"]);
		}else{
			$rowsuser=$db->row_select_one("user","id=".$value["uid"]);
			$db->row_update("user",array("rmb"=>floatval($rowsuser["rmb"])+floatval($rowsnum["money"])),"id=".$rowsuser["id"]);
			$db->row_update("czsq",array("status"=>1,"msg"=>"充值成功"),"id=".$value["id"]);
			$db->row_update("chongzhi",array("status"=>0),"id=".$rowsnum["id"]);
		}
	 }else{
	 if(intval($value["sqtime"])<time()-86400){
		$data5["status"]=-1;
		$data5["msg"]="超过一天系统判为失败";
		$db->row_update("czsq",$data5,"id=".$value["id"]);
		}
	 }
	}
}
?>