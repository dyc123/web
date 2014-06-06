<?php 
include_once("../include/http.curl.php");
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

$curl = new Curl_HTTP_Client();
$curl->store_cookies("temp/danhaocookies.txt"); 
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
//$html_date=$curl->fetch_url("http://www.jisudan.org/index.php?m=member&a=login","",10);
//echo "".$site_tw."/app/member/";exit;
//print @htmlspecialchars($html_date);exit;
//var_dump($html_date);
$db_config["database"]    = "dh_main";
$db = new db(); 
$db->connect($db_config); 
//随即驱除来一个小好
$offset_result = $db->row_query_one( " SELECT FLOOR(RAND() * COUNT(*)) AS `offset` FROM `cjuser` where status=0 ");
//$offset_row = mysql_fetch_object( $offset_result );
$offset = $offset_result["offset"];
$result =$db->row_query_one( " SELECT * FROM `cjuser` LIMIT $offset, 1 " );
$db->close_db();
$login=array();
$login["username"]=$result["username"];
$login["password"]=$result["userpwd"];
$login["dosubmit"]="登陆";
$login["forward"]="";
$html_date=$curl->send_post_data("http://www.jisudan.org/index.php?m=member&a=login",$login,"",10);
if(strstr($html_date,"登录成功"))
//echo $login["username"].":".$login["password"]." 登录成功";
else{
echo $login["username"]."登陆失败了";
//echo $html_date;
}
?>