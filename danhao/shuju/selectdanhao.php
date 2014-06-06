<?php
include_once("../include/http.curl.php");
//foreach ($_POST as $key => $value) { 
//$data.=$key."=".$value."&";
//}//print_r($_POST);
$data["order"]=$_POST["number"];
$leixin=array("中通"=>"zhongtong","韵达"=>"yunda","圆通"=>"yuantong","申通"=>"shentong");//动态修改该
$data["id"]=$leixin[$_POST["company"]];
//$data=array("order"=>762519039681,"id"=>"zhongtong");
$curl = new Curl_HTTP_Client();
//$curl->store_cookies("temp/danhaocookies.txt");
$curl->set_referrer("http://www.aikuaidi.cn/"); 
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
$html_date=$curl->send_post_data("http://www.aikuaidi.cn/query/",$data);
//var_dump($html_date);
echo $html_date;
?>