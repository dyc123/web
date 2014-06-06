function showMessage(message){alert('消息:' + message);}
function getdata(){
	arr=new Array();
	for(var i=1;true;i++) {
	id="#J-item-"+i;
	if($(id).html()==null)
		return;
	data=new Object();
	data['time']=$(id).find('.time-d').html()+$(id).find('.time-h').html();
	data['beizhu']=$(id).find('.name a').attr('title');
	x=$(id).find('.tradeNo p').toArray();
	if(x[0]!=null)
	data['bianhao']=x[0].innerHTML;
	if(x[1]!=null)
	data['bianhao2']+=";"+x[1].innerHTML;
	data['memony']=$(id).find('.amount span').html();
	x=$(id).find('.status p').toArray();
	data['status']=x[0].innerHTML;
	arr.push(data);
	}
	return arr;
}
function geturldata(){
data="1";
	url="http://danhao.com/shuju/recharge.php";
	data= ajaxdata(url);
	
}
function ajaxdata(url){
$.ajax({
		type: 'GET',
		url: url,
		//data: {},
		dataType:'html',
		timeout: 5000,
		beforeSend:function(){
			//$("#showdata").html("<div  width='200px' style='margin: 0 auto;text-align:center;padding-top:100px'><img src='../jpg/loading.gif'/><li id='loading'>系统正在拼命的生成单号...</li></div>");
			//$("#pagecount").empty();
		},
		success:function(html){
		alert(html);
			return html;
		},
		complete:function(html,jieguo){ 
		
		},
		error:function(){
			
		}
	});
}
