<?php 
include_once("../include/http.curl.php");
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

//$html_date=$curl->fetch_url("http://www.jisudan.org/index.php?m=member&a=login","",10);
//echo "".$site_tw."/app/member/";exit;
//print @htmlspecialchars($html_date);exit;
//var_dump($html_date);
$db_config["database"]    = "dh_user";
$db = new db(); 
$db->connect($db_config); 
$result =$db->row_query_one( " SELECT * FROM `sys_user` where status=1 LIMIT 0, 1 " );
$login=array();
$login["username"]=$result["name"];
$login["password"]=$result["pwd"];
$login["dosubmit"]="登陆";
$login["forward"]="";

$curl = new Curl_HTTP_Client();
$curl->set_user_agent("Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
$curl->include_response_headers(1);
$html_date=$curl->send_post_data("http://".$result["url"]."/index.php?m=member&a=login",$login,"",10);
if(strstr($html_date,"登录成功")){
// 解析COOKIE
preg_match_all("/set\-cookie:([^\r\n]*)/i", $html_date, $matches);
// 后面用CURL提交的时候可以直接使用
// curl_setopt($ch, CURLOPT_COOKIE, $cookie);
//$row["cookie"]=$matches[1];
foreach($matches[1] as $value){
$d[]=str_replace(array("path=/"," ",";"),"",$value);
}
$cookie = implode(";",$d);
$row["cookie"]=$cookie;
var_dump($row["cookie"]);
if($db->row_update("sys_user",$row,"id=".$result["id"]))
echo $login["username"]." 登录成功";
else
echo $login["username"]."数据库更新错误";
}
else{
echo $login["username"].":".$login["password"]." 登陆失败了";
}
//echo $html_date;
$db->close_db();
?>