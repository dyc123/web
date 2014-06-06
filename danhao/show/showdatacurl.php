<?php
include_once("../include/http.curl.php");
date_default_timezone_set('Asia/Shanghai');

foreach ($_POST as $key => $value) { 
$data.=$key."=".$value."&";
}//print_r($_POST);
$data.="dosubmit=%E6%9F%A5%E8%AF%A2&m=member&c=quest&a=init&t=1&get=1";
$curl = new Curl_HTTP_Client();
$curl->store_cookies("temp/danhaocookies.txt"); 
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
$html_date=$curl->fetch_url("http://www.jisudan.org/index.php?".$data,"",10);
//echo "http://www.jisudan.org/index.php?".$data;
//exit;
if($html_date){
if(strpos($html_date,"重新登录")){
	include "../shuju/reloadlogin.php";
}
preg_match_all( '/<a[^>]+>(.*)条<\/a>/', $html_date, $temp );
$senddata["totle"]=$temp[1];
$senddata["curPage"]=$_POST["p"];
preg_match_all( '/<table[^>]*([\s\S]*?)<\/table>/i', $html_date, $table );
preg_match_all( '/<tr[^>]*([\s\S]*?)<\/tr>/i', $table[0][0], $arr );
for($i=1;$i<count($arr[0]);$i++){
preg_match_all( '|<td[^>]+>(.*)<|U', $arr[0][$i], $arr1 );
preg_match( '|buy(.*)\"|U', $arr[0][$i], $arr2 );
$senddata["list"][]=array("company"=>$arr1[1][1],"scantime"=>$arr1[1][3],"send"=>$arr1[1][4],"shou"=>$arr1[1][5],"id"=>$arr2[1]);
}
}
echo json_encode($senddata);

?>