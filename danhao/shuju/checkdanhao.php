<?php
function checkdanhao($db,$curl){
$relsjk=$db->row_query("select u.id,u.oid,s.cjid,u.uid,s.company,s.scantime,s.send,s.collect,u.buyprice from user_orders as u,sys_orders as s where u.oid=s.id and u.status=0");
if(sizeof($relsjk)>0){
	$html_date=$curl->fetch_url("http://www.jisudan.org/index.php?m=member&c=buy&a=buylist2&p=1&rand=".rand(0,100000000000000),null,5);
		preg_match_all( '/<table[^>]*([\s\S]*?)<\/table>/i', $html_date, $table );
		preg_match_all( '/<tr[^>]*([\s\S]*?)<\/tr>/i', $table[0][0], $arr );
		//var_dump($html_date);
		foreach($relsjk as $value){
			for($i=1;$i<count($arr[0]);$i++){
				preg_match_all( '|<td[^>]+>(.*)<|U', $arr[0][$i], $arr1 );
				//var_dump(array(strtotime($arr1[1][4]),$seantime,$arr1[1][0],$company));
				if(strtotime($arr1[1][4])==$value["scantime"]&&$arr1[1][0]==$value["company"]&&trim($arr1[1][5])==$value["send"]&&trim($arr1[1][6])==$value["collect"]){
					$relmsg=$db->row_update("sys_orders",array("number"=>$arr1[1][1],"buytime"=>time()),"id=".$value["oid"]);
					//var_dump($relmsg);
					$relmsg=$db->row_update("user_orders",array("status"=>1,"msg"=>"¹ºÂò³É¹¦"),"id=".$value["id"]);
					//var_dump($relmsg);
					$result=$db->row_query_one("select rmb from user where id=".$value["uid"]);
					$relmsg=$db->row_update("user",array("rmb"=>intval($result["rmb"])-intval($value["buyprice"]))," id=".$uid);
					break;
				}
			}
		}
	}
}

?>