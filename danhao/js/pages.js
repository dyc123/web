var curPage = 1; //��ǰҳ��
var total,pageSize,totalPage;
//��ȡ����

$(function(){$("#sbtss").click(function(){ 
	var sendprovince=$("#fa_province").val();
	var sendcity=$("#fa_city").val();
	var collectrovince=$("#shou_province").val();
	var collectcity=$("#shou_city").val();
	var company=$("#kuaidileixing").val();
	var txtDate=$("#txtDate").val();
	//alert(sendprovince+sendcity+collectrovince+collectcity+company+txtDate);
	$.ajax({
		type: 'POST',
		url: 'show/showpages.php',
		data: {'pageNum':curPage-1,'sendprovince':sendprovince,'sendcity':sendcity,'collectrovince':collectrovince,'collectcity':collectcity,'company':company,'scantime':txtDate},
		dataType:'json',
		beforeSend:function(){
			//$("#list ul").append("<li id='loading'>loading...</li>");
		},
		success:function(json){
			//$("#list ul").empty();
			total = json.total; //�ܼ�¼��
			pageSize = json.pageSize; //ÿҳ��ʾ����
			curPage = json.page; //��ǰҳ
			totalPage = json.totalPage; //��ҳ��
			var li = "";
			var list = json.list;
			$.each(list,function(index,array){ //����json������
				li += "<li><a href='#'><img src='"+array['pic']+"'>"+array['title']+"</a></li>";
			});
			$("#list ul").append(li);
		},
		complete:function(){ //���ɷ�ҳ��
			getPageBar();
		},
		error:function(){
			alert("���ݼ���ʧ��");
		}
	});
})
})
//��ȡ��ҳ��
function getPageBar(){
	//ҳ��������ҳ��
	if(curPage>totalPage) curPage=totalPage;
	//ҳ��С��1
	if(curPage<1) curPage=1;
	pageStr = "<span>��"+total+"��</span><span>"+curPage+"/"+totalPage+"</span>";
	
	//����ǵ�һҳ
	if(curPage==1){
		pageStr += "<span>��ҳ</span><span>��һҳ</span>";
	}else{
		pageStr += "<span><a href='javascript:void(0)' rel='1'>��ҳ</a></span><span><a href='javascript:void(0)' rel='"+(curPage-1)+"'>��һҳ</a></span>";
	}
	
	//��������ҳ
	if(curPage>=totalPage){
		pageStr += "<span>��һҳ</span><span>βҳ</span>";
	}else{
		pageStr += "<span><a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'>��һҳ</a></span><span><a href='javascript:void(0)' rel='"+totalPage+"'>βҳ</a></span>";
	}
		
	$("#pagecount").html(pageStr);
}
/*
$(function(){
	getData(1);
	$("#pagecount span a").live('click',function(){
		var rel = $(this).attr("rel");
		if(rel){
			getData(rel);
		}
	});
});*/