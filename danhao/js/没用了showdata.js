clickfrom=false;//true 为超连接 false 为按牛
$(function(){
$("#sbt").click(function(){ 
	var sendprovince=$("#fa_province").val();
	var sendcity=$("#fa_city").val();
	var collectrovince=$("#shou_province").val();
	var collectcity=$("#shou_city").val();
	var company=$("#kuaidileixing").val();
	var txtDate=$("#txtDate").val();
	if(!clickfrom) curPage=1;
	//alert(sendprovince+sendcity+collectrovince+collectcity+company+txtDate);
	$.ajax({
		type: 'POST',
		url: 'show/showdatacurl.php',
		data: {'p':curPage,'fa_province':sendprovince,'fa_city':sendcity,'shou_province':collectrovince,'shou_city':collectcity,'kuaidileixing':company,'date1':txtDate},
		dataType:'json',
		timeout: 10000,
		beforeSend:function(){
			$("#showdata").html("<div  width='200px' style='margin: 0 auto;text-align:center;padding-top:100px'><img src='../jpg/loading.gif'/><li id='loading'>系统正在拼命的生成单号...</li></div>");
			$("#pagecount").empty();
		},
		success:function(json){
			$("#showdata").empty();
			if("undefined" == typeof json||null==json||"undefined" == typeof json.list||null==json.list||json.list.length==0){
				$("#pagecount").empty();
				$("#showdata").html("抱歉暂时没有您要快递单号,梢等一会儿再来试试手气吧!");
				return;
				}
			total = parseInt(json.totle); //总记录数
			pageSize = 15//每页显示条数
			Page = parseInt(json.curPage); //当前页
			if(total%pageSize==0){
			totalPage = parseInt(total/pageSize); //总页数
			}else{
			totalPage = parseInt(total/pageSize)+1;
			}
			var htmls=["<table class='datalist' width='900px'><tr height='15px'><td>序号</td><td>发货地址</td><td>收货地址</td><td>快递类型</td><td>上传时间</td><td >快递单号</td><td>批量操作</td></tr>"];
			
			for(var i=0;i<json.list.length;i++){
			htmls.push("<tr height='15px'><td>"+(i+1)+"</td><td>"+json.list[i]['send']+"</td><td>"+json.list[i]['shou']+"</td><td>"+json.list[i]['company']+"</td><td>"+json.list[i]['scantime']+"</td><td datazhi='"+convertdate(json.list[i]['scantime'])+":"+json.list[i]['id']+":"+json.list[i]['company']+"'><input type='button' class='dhshow' value='显示'/></td><td>11</td></tr>")
			}
			htmls.push('</table>');
			$("#showdata").append(htmls.join(''));
			getPageBar();
		},
		complete:function(json,jieguo){ 
		clickfrom=false;
			$("tr").addClass("trbense");
			$("tr").hover(
			function(){$(this).removeClass("trbense");$(this).addClass("trbense1");},
			function(){$(this).removeClass("trbense1");$(this).addClass("trbense");}
			);
			$(".dhshow").click(function(){
			checkbuy(this);
			});
			//生成分页条
		},
		error:function(){
			alert("数据加载失败");
			$("#showdata").empty();
		}
	});
})
$("#sbt").trigger("click");
})
//获取分页条
function getPageBar(){
	//var totalPage= data.totle/data.list.length;
	//var curPage=data.curPage;
	//页码大于最大页数
	if(Page>totalPage) Page=totalPage;
	//页码小于1
	if(Page<1) Page=1;
	pageStr = "<span>共"+total+"条</span><span>"+Page+"/"+totalPage+"</span>";
	
	//如果是第一页
	if(Page==1){
		pageStr += "<span>首页</span><span>上一页</span>";
	}else{
		pageStr += "<span><a href='javascript:void(0)' rel='1'>首页</a></span><span><a href='javascript:void(0)' rel='"+(Page-1)+"'>上一页</a></span>";
	}
	
	//如果是最后页
	if(Page>=totalPage){
		pageStr += "<span>下一页</span><span>尾页</span>";
	}else{
		pageStr += "<span><a href='javascript:void(0)' rel='"+(parseInt(Page)+1)+"'>下一页</a></span><span><a href='javascript:void(0)' rel='"+totalPage+"'>尾页</a></span>";
	}
		
	$("#pagecount").html(pageStr);
	$("#pagecount a").click(function(){
		 curPage =parseInt($(this).attr("rel"));
		 clickfrom=true;
		$("#sbt").trigger("click");
		});
}
//鼠标移动变色
function bianse(){
  var rows=document.getElementsByTagName("tr");
   for (var i=0;i<rows.length;i++)
   {
		//alert(rows[i]);
	    rows[i].onmouseover = function(){      
	        thhis.className += 'altrow';//鼠标经过时，显示样式altrow,注意，js中的样式是className而不是class，这个是新手容易犯的错误；
	    }
	    rows[i].onmouseout = function(){       
	        this.className = this.className.replace('altrow','');//鼠标一走的时候，把样式也去掉
		}
	}
}
function checkbuy(zhi){ 
	if(confirm("显示单号需要花费$元，确定要购买？")){
		buypost(zhi);
	}
}
//转换时间戳
function convertdate(zhi){
zhi = zhi.replace(/-/g,'/'); // 将-替换成/，因为下面这个构造函数只支持/分隔的日期字符串
var date = new Date(zhi);
var time = date.getTime();
return time/1000;
}
//购买提交
function buypost(zhi){
	tr=$(zhi).parent()
	$.ajax({
		type: 'POST',
		url: 'shuju/postdanhao.php',
		data: {"danhao":$(zhi).parent().attr("datazhi")},
		dataType:'html',
		timeout: 10000,
		beforeSend:function(){
			$(tr).html("<img style='width:10px;height:10px;' src='jpg/loading2.gif'/>");
		},
		success:function(json){
		if(json.indexOf("失败")>=0)
			$(tr).html("<input type='button' value='重试'/>");
			$(tr).html( json);
			
		},
		complete:function(json,jieguo){ 
		},
		error:function(){
			//alert($(tr)val());
			$(tr).html("网络错误<input type='button' value='重试'/>");
		}
	});
}