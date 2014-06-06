var user =new Object();//全局对象存放用户信息
var nulfun=function(){}
//绑定事件
$(function(){
$("#buylist").click(function(){
if("undefined"==typeof user.name){
	showDialog("alert","亲亲，登录以后在来查看！","提示");
	return;
	}
	buylist1(this);
});

//绑定首页
$("#shouye").attr("href","http://"+window.location.host);
//充值页面绑定
$(".chongzhilink").click(function(){
if("undefined"==typeof user.name){
	showDialog("alert","亲亲，登录以后在来充值哦！","提示");
	return;
	}
	succes=function(zhi){showDialog("window",zhi,"充值",700);
$("#zhifubaolink").click(function(){
if("undefined"==typeof user.name)
	showDialog("alert","转账最好是登录后操作,不然无法备注您的帐号名字容易出错！","提示信息");
if($("#zfbtitle").length==0)
	$("#zfbform").append($("<input id='zfbtitle' type='hidden' name='title' value='"+user.name+"'>/"));
$("#zfbform").attr("action","https://shenghuo.alipay.com/send/payment/fill.htm");
$("#zfbform").submit();
$("#chongzhijg").attr("value",$("#zhifje").val());
HoverLi(1,2,3);
});
$("#chongzhitj").click(function(){if($("#chongzhijg").val()==""){alert("亲亲，忘了填写金额了");$("#chongzhijg").focus();return;}
if($("#chongzhijyh").val()==""){alert("亲亲，忘了填写交易号了是28位数字哦！");$("#chongzhijyh").focus();return;}
zfb.czjg=$("#chongzhijg").val();
zfb.zfbjyh=$("#chongzhijyh").val();
zfb.name=user.name;
zfbchongzhipost(zfb);
});};
postdata("chongzhi.html","","html",nulfun,succes,nulfun);
});
$("#loginout").click(function(){
if("undefined"==typeof user.name){
	showDialog("info","亲亲，您还没有登录无需退出登录哦！","消息");
	 setTimeout("sd_remove()",2000);
	}else{
	succes=function(zhi){if(zhi){
	showDialog("info","已经退出登录！","消息");
	setTimeout(function(){sd_remove();location.reload();},2000); 
	}}}
	postdata("loginout.php","","html",nulfun,succes,nulfun)
});
$("#kuaidinumber").click(function(){
succes=function(zhi){$("#showdatanavig").html(zhi);showdanhao();};	
postdata("danhao.html","","html",nulfun,succes,nulfun);
 });
 //登录绑定
 $("#loginlink").click(function(){
 if("undefined"!=typeof user.name){
	showDialog("alert","亲亲已经登录了，无需再次登录哦！","提示信息");
	setTimeout("sd_remove()",2000);
	return;
	}
	succes=function(zhi){
	showDialog("window",zhi,"用户登录",700);
	$("#hyreg").click(function(){
	$("#reglink").trigger("click");//模拟点击一次注册按钮
	});
	$("#hylogin").click(function(){
	if(Checklogin()){
	var data=new Object();
	data.userlogin=true;
	data.name=$("#UserName").val();
	data.pwd=$("#Password").val();
	data.code=$("#ValidCode").val();
	succes1=function(rel){if(rel){
		if(rel.code==1){
			showDialog("msg","登录成功！即将跳转。。","成功");
			user=rel;
			$("#top").html("欢迎您:"+rel.name+"("+rel.vip+")账户余额:<span id='userrmb' >"+rel.rmb+"</span>");
			 setTimeout(function(){sd_remove();},3000);
		}else{
			$("#code").attr("src","include/code.php?"+Math.random());
			if(rel.code==-1)
				alert("请不要非法提交数据");
			else if(rel.code==-2){
				alert("验证码错误！");
				}
				else
				alert("用户名或密码错误");
			}
		}};
	postdata("login.php",data,"json",nulfun,succes1,nulfun);
	}
	});};
	postdata("login.html","","html",nulfun,succes,nulfun);
 });
 //开发绑定
 $(".kaifa").click(function(){
	showDialog("confirm","程序猿开发中。。。","开发组");
 });
 //注册绑定
 $("#reglink").click(function(){
	postdata("register.html","","html",nulfun,function(zhi){showDialog("window",zhi,"用户注册");},nulfun)
 });
 $("#kuaidinumber").trigger("click");//加载页面就点一次kuaidinumber
 var data=new Object();
 data.check=true;
 succes=function(rel){if(rel.code==1){
 $("#top").html("欢迎您:"+rel.name+"("+rel.vip+")账户余额:<span id='userrmb' >"+rel.rmb+"</span>");//首次加载用户信息
 user=rel;
 }else if(rel.code==0){
 $("#top").html("游客请登录或注册，现在注册就送5元体验金！(一个IP只送一次哦)");
 }else{
	showDialog("info","请不要非法提交数据","失败");
	 setTimeout("sd_remove()",2000);
	}};
	postdata("shuju/checklogin.php",data,"json",nulfun,succes,nulfun);
	postdata("qq.html","","html",nulfun,function(zhi){$("#qqtop").html(zhi);},nulfun);
})
//全局POST
function postdata(url,data,type,befor,succes,err){
$.ajax({
		type: 'POST',
		url: url,
		data: jQuery.param(data),
		dataType:type,
		timeout: 10000,
		beforeSend:function(){befor();},
		success:function(msg){succes(msg);},
		error:function(XMLHttpRequest, textStatus, errorThrown){err(textStatus,errorThrown);}
	});
}
//注册检查验证
function registercheck(){
	personObj=new Object();
	personObj.pwd=$("#pass").val();
	personObj.emal=$("#email").val();
	personObj.name=$("#username").val();
		succes=function(rel){if(rel){
		showDialog("info","注册成功！即将跳转登录页面..","欢迎您");
		setTimeout("$('#loginlink').trigger('click')",3000);
		//把注册ID写到网页头
		}else{
		alert("失败了 检查一下是否非法提交 建议换个用户名试试");
		}};
		postdata("shuju/register.php",personObj,"html",nulfun,succes,nulfun);
}
//登录验证
function Checklogin(){
if($("#UserName").val()==""){
alert("亲，忘了输入用户名哦！");
return false;
}
if($("#Password").val()==""){
alert("亲，忘了输入密码哦！");
return false;
}
if($("#ValidCode").val()==""){
alert("亲，忘了输入验证码哦！");
return false;
}
return true;
}	

clickfrom=false;//true 为超连接 false 为按牛
function showdanhao(){
setdatepicker(); 
$('#txtDate').datepicker({minDate:-4,maxDate:0});
//$('.date-pick').datepicker({changeMonth:true,changeYear:true});
$("#txtDate").val( new Date().format("yyyy-MM-dd"));
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
			$("#showdata").html("<div  style='width:200px; margin: 0 auto;text-align:center;padding-top:100px'><img src='../jpg/loading.gif'/></div>");
			//$("#pagecount").empty();
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
			htmls.push("<tr height='15px'><td>"+(i+1)+"</td><td class='send'>"+json.list[i]['send']+"</td><td class='shou'>"+json.list[i]['shou']+"</td><td class='company'>"+json.list[i]['company']+"</td><td class='seantime'>"+json.list[i]['scantime']+"</td><td dataid='"+json.list[i]['id']+"'><input type='button' class='dhshow' value='显示'/></td><td>开发中</td></tr>")
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
			$("#showdata").html();
		}
	});
})
$("#sbt").trigger("click");
}
//获取分页条
function getPageBar(){
	//var totalPage= data.totle/data.list.length;
	//var curPage=data.curPage;
	//页码大于最大页数
	if(Page>totalPage) Page=totalPage;
	//页码小于1
	if(Page<1) Page=1;
	//pageStr="<span>共"+total+"条</span>";
	pageStr = "<span>"+Page+"/"+totalPage+"</span>";
	
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
	if("undefined"==typeof user.name){
	showDialog("info","亲亲，您还没有登录请先登录哦！","登录提示",300);
	setTimeout(function(){$("#loginlink").trigger("click");},2000);//模拟点击一次登录按钮
	}else{
	if(confirm("显示单号需要花费"+user.vipprice.快递单号+"元，确定要购买")){
	buypost(zhi);
	}
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
	td=$(zhi).parent();
	var datazhi=new Object();
	datazhi.company=$(zhi).parent().parent().find(".company").html();
	datazhi.send=$(zhi).parent().parent().find(".send").html();
	datazhi.shou=$(zhi).parent().parent().find(".shou").html();
	datazhi.seantime=convertdate($(zhi).parent().parent().find(".seantime").html());
	datazhi.id=$(zhi).parent().attr("dataid");
	datazhi.buyuser=user.name;
	var temp=$(td).html();
	$.ajax({
		type: 'POST',
		url: 'shuju/postdanhao.php',
		data: jQuery.param(datazhi),
		dataType:'json',
		timeout: 30000,
		beforeSend:function(){
			$(td).html("<img style='width:20px;height:20px;' src='jpg/sd_loading.gif'/>");
		},
		success:function(json){
		if(json){
		if(json.code==1){
		$(td).html(json.number+"<a href='#' class='chadanhao'>查物流</a>");
		$(".chadanhao").click(function(){
		var dhzhi=new Object();
		dhzhi.company=$(td).parent().find(".company").html();
		dhzhi.number=json.number;
		succes=function(reljson){
		var htmls=reljson.name+":"+reljson.order+"<br/><br/>";
		for(var i=0;i<reljson.data.length;i++){
		htmls+=reljson.data[i].time+":"+reljson.data[i].content+"<br/>";
		}
		if(reljson.data.length==0)
			htmls+="此单号还没有扫描,可以放心使用....<br/>";
		showDialog("window",htmls,"物流信息");
		};
		postdata("shuju/selectdanhao.php",dhzhi,"json",function(){showDialog("window","查询中,请稍后...","稍等");},succes,nulfun);
		});
		}else if(json.code==0||json.code==-1){
			showDialog("alert",json.msg,"错误");
			$(td).html(temp);
			$(td).find(".dhshow").click(function(){
			checkbuy(this);
			});
		}else{
		 $(td).html("<input type='button' class='buyrel' value='重试'/>");
		 $(".buyrel").click(function(){checkbuy(this);});
		}
		}			
		},
		complete:function(json,jieguo){ 
		},
		error:function(){
			//alert($(tr)val());
			$(td).html("网络错误<input class='buyrel' type='button' value='重试'/>");
			$(".buyrel").click(function(){checkbuy(this);});
		}
	});
}

function buylist1(daa){
var page=1;
if(typeof $(daa).attr("page")!="undefined")
	page=$(daa).attr("page");
var data=new Object();
data.page=page;
data.pagesize=20;
data.name=user.name;
succes=function(zhi){
if(zhi.data){
var htmls="<table class='buylistdanhao'><tr><td style='width:160px'>发货地址</td><td style='width:160px'>收货地址</td><td style='width:80px'>上传时间</td><td style='width:80px'>购买时间</td><td style='width:30px'>价格</td><td style='width:60px'>快递类型</td><td style='width:90px'>快递单号</td><td>状态</td></tr>";
for(var i=0;i<zhi.data.length;i++){
htmls+="<tr><td>"+zhi.data[i].send+"</td><td>"+zhi.data[i].shou+"</td><td>"+new Date(parseInt(zhi.data[i].scantime)*1000).format("yyyy-MM-dd hh:mm:ss")+"</td><td>"+new Date(parseInt(zhi.data[i].buytime)*1000).format("yyyy-MM-dd hh:mm:ss")+"</td><td>"+zhi.data[i].buyprice+"</td><td class='company'>"+zhi.data[i].company+"</td><td class='number'>"+(zhi.data[i].number=="-1"?"无":zhi.data[i].number)+"</td>";
if(zhi.data[i].status==1){
htmls+="<td><a href='javascript:void(1)' class='chawuliu'>查物流</a>&nbsp;<a href='javascript:void(0)' class='tousu1'>投诉<a></td>";
}else if(zhi.data[i].status==0){
htmls+="<td>未结算</td>";
}else if(zhi.data[i].status==-1){
htmls+="<td>已举报</td>";
}else if(zhi.data[i].status==-2){
htmls+="<td>已退款</td>";
}
htmls+="</tr>";
}
htmls+="</table>";
}
showDialog("window",htmls,"已购买的单号",850);
$(".tousu1").click(function(){showlayer();});
$(".chawuliu").click(function(){
showlayer();
var dhzhi=new Object();
dhzhi.number=$(this).parent().parent().find(".number").html();
dhzhi.company=$(this).parent().parent().find(".company").html();
succes=function(reljson){
		var htmls=reljson.name+":"+reljson.order+"<br/><br/>";
		for(var i=0;i<reljson.data.length;i++){
		htmls+=reljson.data[i].time+":"+reljson.data[i].content+"<br/>";
		}
		if(reljson.data.length==0)
			htmls+="此单号还没有扫描,可以放心使用....<br/>";
		$("#layer_body").html(htmls);
		};
postdata("shuju/selectdanhao.php",dhzhi,"json",function(){$("#layer_body").html("查询中，请稍后。。");},succes,nulfun);
});
}
postdata("shuju/buylist1.php",data,"json",nulfun,succes,nulfun);
}
//设置setdatepicker日历控件
function setdatepicker(){
$.datepicker.regional['zh-CN'] = {  
      clearText: '清除',  
      clearStatus: '清除已选日期',  
      closeText: '关闭',  
      closeStatus: '不改变当前选择',  
      prevText: '<上月',  
      prevStatus: '显示上月',  
      prevBigText: '<<',  
      prevBigStatus: '显示上一年',  
      nextText: '下月>',  
      nextStatus: '显示下月',  
      nextBigText: '>>',  
      nextBigStatus: '显示下一年',  
      currentText: '今天',  
      currentStatus: '显示本月',  
      monthNames: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月'],  
      monthNamesShort: ['一','二','三','四','五','六', '七','八','九','十','十一','十二'],  
      monthStatus: '选择月份',  
      yearStatus: '选择年份',  
      weekHeader: '周',  
      weekStatus: '年内周次',  
      dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],  
      dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],  
      dayNamesMin: ['日','一','二','三','四','五','六'],  
      dayStatus: '设置 DD 为一周起始',  
      dateStatus: '选择 m月 d日, DD',  
      dateFormat: 'yy-mm-dd',  
      firstDay: 1,  
      initStatus: '请选择日期',  
      isRTL: false  
    }; 
$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
}
//注册format方法用于格式化时间
Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, //month 
	"d+" : this.getDate(), //day 
	"h+" : this.getHours(), //hour 
	"m+" : this.getMinutes(), //minute 
	"s+" : this.getSeconds(), //second 
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
	"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
} 
var zfb=new Object();//全局变量存放支付宝充值信息
//支付宝充值后台进程
function zfbcheckchongzhi(){
	succes=function(rel){if(rel.code==1){
		zfb.ci=0;
		if($("#zfbfankui").length>0){
		HoverLi(1,3,3);
		$("#zfbfankui").html("<h3>服务器已经返回结果:</h3>"+rel.msg+"<br/><br/>此次充值金额:"+rel.czjg+"余额："+rel.rmb);
		user.rmb=rel.rmb;
		$("#top").html("欢迎您:"+user.name+"("+user.vip+")账户余额:<span id='userrmb' >"+rel.rmb+"</span>");
		}else{
		showDialog("info",rel.msg,"消息");
		}
		user.rmb=rel.rmb;
	}else if(zfb.cishu==30){
		showDialog("alert","不好意思，已经超过5分钟了系统还是没有充值成功！麻烦您联系一下客服手工充值。","提示信息");
		zfb.cishu=0;
	}else if(rel.code==-1){
		showDialog("alert",rel.msg,"警告");
	}else{
	setTimeout("zfbcheckchongzhi()",10000);
	if("undefined"==typeof zfb.cishu)
		zfb.cishu=0;
	zfb.cishu++;
	}};
postdata("shuju/checkcz.php",user,"json",nulfun,succes,nulfun);
}
function zfbchongzhipost(zhi){
	HoverLi(1,3,3);
	succes=function(rel){if(rel.code==1){
		$("#zfbtj").html("提示："+rel.msg);
		zfbcheckchongzhi();
		}
	else
		showDialog("alert",rel.msg,"提示信息");
		};
postdata("shuju/cztj.php",zhi,"json",nulfun,succes,nulfun);
}
/*!
 * jQuery showDialog
 * befen.net
 * Date: 2013.02.08
 1, mode 模式
a. confirm [确认模式]
b. info [显示信息]
b. window [AJAX获取网页内容]
c. alert [警告模式]

2, msg 内容
显示弹出宽口的内容

3, t 标题
显示弹出窗口的标题

4, sd_width 宽度
显示弹出窗口的宽度
*/

function detectMacXFF() {
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf("mac") != -1 && userAgent.indexOf("firefox") != -1) {
		return true;
	}
}

function in_array(needle, haystack) {
	if(typeof needle == "string" || typeof needle == "number") {
		for(var i in haystack) {
			if(haystack[i] == needle) {
				return true;
			}
		}
	}
	return false;
}

function sd_load(sd_width) {
	if(sd_width) {
		$("#SD_window").css("width", sd_width + "px");
	}
	var sd_top = ($(window).height() - $("#SD_window").height()) / 2 + $(document).scrollTop();
	if(sd_top < 0) {
		sd_top = 0;
	}
	var sd_left = ($(window).width() - $("#SD_window").width()) / 2;
	if(sd_left < 0) {
		sd_left = 0;
	}
	$("#SD_window").css("top", sd_top);
	$("#SD_window").css("left", sd_left);
}

function sd_remove() {
	$("#SD_close,#SD_cancel,#SD_confirm").unbind("click");
	$("#SD_window,#SD_overlay,#SD_HideSelect").remove();
	if(typeof document.body.style.maxHeight == "undefined") {
		$("body","html").css({height: "auto", width: "auto"});
	}
}

function showDialog(mode, msg, t, sd_width) {
	var sd_width = sd_width ? sd_width : 400;
	var mode = in_array(mode, ['confirm', 'window', 'info', 'loading']) ? mode : 'alert';
	var t = t ? t : "提示信息";
	var msg = msg ? msg : "";
	var confirmtxt = confirmtxt ? confirmtxt : "确定";
	var canceltxt = canceltxt ? canceltxt : "取消";
	sd_remove();
	try {
		if(typeof document.body.style.maxHeight === "undefined") {
			$("body","html").css({height: "100%", width: "100%"});
			if(document.getElementById("SD_HideSelect") === null) {
				$("body").append("<iframe id='SD_HideSelect'></iframe><div id='SD_overlay'></div>");
			}
		} else {
			if(document.getElementById("SD_overlay") === null) {
				$("body").append("<div id='SD_overlay'></div>");
			}
		}
		if(mode == "alert") {
			if(detectMacXFF()) {
				$("#SD_overlay").addClass("SD_overlayMacFFBGHack");
			} else {
				$("#SD_overlay").addClass("SD_overlayBG");
			}
		} else {
			if(detectMacXFF()) {
				$("#SD_overlay").addClass("SD_overlayMacFFBGHack2");
			} else {
				$("#SD_overlay").addClass("SD_overlayBG2");
			}
		}
		$("body").append("<div id='SD_window'></div>");
		var SD_html;
		SD_html = "";
		SD_html += "<table cellspacing='0' cellpadding='0'><tbody><tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td>";
		SD_html += "<td id='SD_container'>";
		SD_html += "<h3 id='SD_title'>" + t + "</h3>";
		SD_html += "<div id='SD_body'><div id='SD_content'>" + msg + "</div></div>";
		SD_html += "<div id='SD_button'><div class='SD_button'>";
		SD_html += "<a id='SD_confirm'>" + confirmtxt + "</a>";
		SD_html += "<a id='SD_cancel'>" + canceltxt + "</a>";
		SD_html += "</div></div>";
		SD_html += "<a href='javascript:;' id='SD_close' title='关闭'></a>";
		SD_html += "</td>";
		SD_html += "<td class='SD_bg'></td></tr>";
		SD_html += "<tr><td class='SD_bg'></td><td class='SD_bg'></td><td class='SD_bg'></td></tr></tbody></table>";
		$("#SD_window").append(SD_html);
		$("#SD_confirm,#SD_cancel,#SD_close").bind("click", function(){
			sd_remove();
		});
		if(mode == "info" || mode == "alert") {
			$("#SD_cancel").hide();
			$("#SD_button").show();
		}
		if(mode == "window") {
			$("#SD_close").show();
		}
		if(mode == "confirm") {
			$("#SD_button").show();
		}
		var sd_move = false;
		var sd_x, sd_y;
		$("#SD_container > h3").click(function(){}).mousedown(function(e){
			sd_move = true;
			sd_x = e.pageX - parseInt($("#SD_window").css("left"));
			sd_y = e.pageY - parseInt($("#SD_window").css("top"));
		});
		$(document).mousemove(function(e){
			if(sd_move){
				var x = e.pageX - sd_x;
				var y = e.pageY - sd_y;
				$("#SD_window").css({left:x, top:y});
			}
		}).mouseup(function(){
			sd_move = false;
		});
		$("#SD_body").width(sd_width - 50);
		sd_load(sd_width);
		$("#SD_window").show();
		$("#SD_window").focus();
	} catch(e) {
		alert("System Error !");
	}
}

function showInfo(msg, fn, timeout) {
	showDialog("info", msg);
	$("#SD_confirm").unbind("click");
	if(fn && timeout) {
		st = setTimeout(function(){
			sd_remove();
			fn();
		}, timeout * 1000);
	}
	$("#SD_confirm").bind("click", function(){
		if(timeout) {
			clearTimeout(st);
		}
		sd_remove();
		if(fn) {
			fn();
		}
	});
}

function showWindow(title, the_url, sd_width) {
	var sd_width = sd_width ? sd_width : 400;
	$.ajax({
		type		: "GET",
		dataType	: "html",
		cache		: false,
		timeout		: 10000,
		url			: the_url,
		data		: "isajax=1",
		success		: function(data){
			showDialog("window", data, title, sd_width);
		},
		error		: function(data){
			showDialog("alert", "读取数据失败");
		},
		beforeSend	: function(data){
			showDialog("loading", "正在读取数据...");
		}
	});
}

function showConfirm(msg, fn) {
	showDialog("confirm", msg);
	$("#SD_confirm").unbind("click");
	$("#SD_confirm").bind("click", function(){
		if(fn) {
			fn();
		}
	});
}

/*layers*/
function showlayer(){
if($("#layer").length>0){
$("#layer").remove();
}
var layer=document.createElement("div");
layer.setAttribute("id","layer"); 
layer.innerHTML="<a href='javascript:void(1);' id='layer_close' title='关闭' style='display: inline;'></a><div id='layer_body'></div>";
$("#SD_content").append(layer); 
   //var offset = $(event.target).offset();//取消事件冒泡
  $("#layer").css({fontSize:14,top:80, left:150});//设置弹出层位置
  $("#layer").show(800);//动画显示
  $("#layer_close").click(function(){$(this).parent().remove();});



}