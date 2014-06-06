<?php
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
include_once("../include/http.curl.php");
date_default_timezone_set('Asia/Shanghai');

$curl = new Curl_HTTP_Client();
$curl->store_cookies("temp/danhaocookies.txt"); 
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
$id=$_POST["id"];
$html_date=$curl->fetch_url("http://www.jisudan.org/index.php?m=pay&c=spend_list&a=chaid&id=".$id,"",10);
//var_dump($id);
if($html_date){
if(strstr($html_date,"单号不存在或已被删除")){
echo "无单号";
}
else if(strstr($html_date,"会话已过期")){
	echo "小号被T了";
}else{
$array_re=array("单号","&nbsp;","预计发货","发货地址","收货地址");
	$html_date=str_replace($array_re,"",$html_date);
	$array=explode("：",$html_date);
	$send=explode("|",$array[3]);
	$collect=explode("|",$array[4]);

	$rows=array("cjid"=>$id,"company"=>$array[0],"number"=>$array[1],"scantime"=>strtotime($array[2]),"sendprovince"=>$send[0],"sendcity"=>$send[1],"sendcounty"=>$send[2],"collectrovince"=>$collect[0],"collectcity"=>$collect[1],"collectcounty"=>$collect[2]);
	//$sql="insert into numbers (`cjid`,`company`,`number`,`scantime`,`sendprovince`,`sendcity`,`sendcounty`,`collectrovince`,`collectcity`,`collectcounty`) values($id,'$company',$number,'$scantime','$sendprovince','$sendcity','$sendcounty','$collectrovince','$collectcity','$collectcounty')";
	$db_config["database"]    = "dh_main";
	$db = new db(); 
    $db->connect($db_config); 
	if($db->row_insert("numbers",$rows)){
	echo $id." 成功";
	}else{echo $id." 失败";}
	$db->close_db();
	unset($db);
	}
}else{
echo "网络错误".$html_date.date('Y-m-d H:i:s',time());
}

?>