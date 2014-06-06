<?php
include_once("../include/db_config.php");
include_once("../include/db.php");
include_once("../include/mysqli.php");
date_default_timezone_set('Asia/Shanghai');

$page = intval($_POST['pageNum']);
unset($_POST['pageNum']);
$sqlwhere=" where ";
foreach ($_POST as $key => $value) { 
	if($value!="0")
	if($key=="scantime"){
	$endtime=strtotime($value)+86399;
	$sqlwhere.= strtotime($value)."<".$key."<".$endtime." and ";
	}else{
   $sqlwhere.= $key." like '%".$value."%' and ";  
	}   
}  
$sqlwhere=substr($sqlwhere,0,strlen($sqlwhere)-4); 
$db_config["database"]    = "dh_main";
$db = new db(); 
$db->connect($db_config);
$result = $rows = $db->row_query_one("select count(*) as total from numbers ".$sqlwhere);
$total = $result["total"];//总记录数

$pageSize = 15; //每页显示数
$totalPage = ceil($total/$pageSize); //总页数

$startPage = $page*$pageSize;
$arr['total'] = $total;
$arr['pageSize'] = $pageSize;
$arr['totalPage'] = $totalPage;
$arr["page"]=$page;
$query = mysql_query("select * from numbers  ".$sqlwhere." order by id asc limit $startPage,$pageSize");
while($row=mysql_fetch_array($query)){
	 $arr['list'][] = array(
	 	'id' => $row['id'],
		'title' => $row['title'],
		'pic' => $row['pic'],
	 );
}
//print_r($arr);
echo json_encode($arr);
?>