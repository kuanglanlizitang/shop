mui.plusReady(function() {
	Language.init();
	 $("#signdate").text(getNowFormatDate())
	 getList();
})

function getList(){
	var w = plus.webview.currentWebview();
	var code = w.store_code;
	var condition = {
		type:"storeSignSearch",
		store_code:code,
	}
	HttpGet(condition,function(data){
		var content = "";
		for(var i=0;i<data.rows;i++){
			var dete=data.data[i].SIGN_DATE.split(".");
			content += '<li class="mui-table-view-cell"><div style="display: flex;"><img height="50px" onerror="this.src=\'../../../img/image01.png\'" src="'+getImageUrl(data.data[i].HEAD_IMAGE,"id")+'" /><div style="margin-left: 10px;padding-top: 6px;"><div style="font-size: 16px;color: #ff8a00;">'+data.data[i].STAFF_NAME+'</div><div style="color: #555555;font-size: 12px;">'+dete[0]+'</div></div></div></li>'
		}
		$(".mui-table-view").html(content);
		
	},function(){},"loading")
}


function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 +
		strDate + " " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

function formatdate(s) {
	var strs = new Array();
	strs = s.split(".");
	return strs[0];
}