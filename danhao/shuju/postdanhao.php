<?php
session_start();
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
include_once("../include/http.curl.php");
include_once("checkdanhao.php");
date_default_timezone_set('Asia/Shanghai');

if($_POST["buyuser"]==$_SESSION["name"]){	
$uid=$_SESSION["uid"];
$seantime=$_POST["seantime"];
$id=$_POST["id"];
$company=$_POST["company"];
$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config);
$result =$db->row_query_one( "SELECT * FROM `sys_user` where status=1 LIMIT 0, 1 " );
$curl = new Curl_HTTP_Client();
$curl->set_cookie($result["cookie"]); 
$username=$result["name"] ;
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
$result=$db->row_query_one("select rmb,vip from user where id=".$uid);
$rmb=floatval($result["rmb"]);
$result=$db->row_query_one("select price from vipmode where vipname='快递单号' and vipid=".$result["vip"]);
$price=floatval($result["price"]);
if($rmb>=$price){
//var_dump($price);
$data=array("m"=>"member","c"=>"buy","a"=>"goumai2","unit"=>"0.3","pay_type"=>"1","usernote"=>"DYC成功购买单号ID".$id,"username"=>$username,"id"=>$id,"date1"=>$_POST["seantime"],"rand"=>"0.".rand(0,100000000000000));
//var_dump($data);
$resultnum=$db->row_query_one("select count(*) as num from sys_orders where cjid=".$id);
if($resultnum["num"]==0){
$db->row_insert("sys_orders",array("cjid"=>$id,"company"=>$company,"scantime"=>$seantime,"send"=>trim($_POST["send"]),"collect"=>trim($_POST["shou"])));
$chaid=$db->insert_id();
$db->row_insert("user_orders",array("uid"=>$uid,"oid"=>$chaid,"buyprice"=>$price,"buytime"=>time()));
}
checkdanhao($db,$curl);
$relnum=$db->row_select_one("sys_orders","cjid=".$id." and scantime=".$seantime);
//var_dump($relnum);
$html_date=$curl->send_post_data("http://www.jisudan.org/index.php",$data);
$re=json_decode($html_date,true);
//var_dump($re);
if($re["code"]==200){
	sleep(1);
	 $i=1;
	while(true){
	checkdanhao($db,$curl);
	$reldb=$db->row_select_one("sys_orders","id=".$chaid);
	//var_dump($reldb);
	if($reldb["number"]&&$reldb["number"]!="-1"){
		$rel["code"]=1;
		$rel["number"]=$reldb["number"];
		$rel["msg"]="成功";
		break;
		}else if($i>6){
		break;
		}
		$i++;
		sleep(3);
		}
		
		if(!$rel["code"]){
		//运行到这里说明单号已经买到了但是结算时候出了问题
		$rel["code"]=-5;//失败
		$rel["msg"]="购买成功!网络错误,无法显示,请到已购买的单号查询";
		}
		}else if($relnum["number"]&&$relnum["number"]!="-1"){
		$rel["code"]=1;
		$rel["number"]=$relnum["number"];
		$rel["msg"]="成功";
		}else if($rel["code"]=400){
		$rel["code"]=-400;//失败
		$rel["msg"]="亲下手晚了,单号已经被别人抢走了";
		}else{
		$rel["code"]=-2;//失败
		$rel["msg"]="服务器错误！请重试";
		}
		}else{
		$rel["code"]=0;//失败
		$rel["msg"]="余额不足，请充值！";
		}
		}else{
		$rel["code"]=-1;//非法提交
$rel["msg"]="请不要非法提交数据！";
}
echo json_encode($rel);
?>