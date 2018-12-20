mui.plusReady(function () {
    var w = plus.webview.currentWebview();
    var data = w.data;
    var category = w.categoryname;
    $("#category").html(category);
    var content = "";
   	for(var i=0;i<data.length;i++){
   		content +='<li class="mui-table-view-cell" ><div style="display: flex;justify-content: space-between;"><div>'+data[i].SKUName+'</div><div>'+data[i].Result+'</div></div></li>';
   	}
   	
   	$(".mui-table-view").html(content);
})