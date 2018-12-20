var condition = {
	type: "customerHisSaleDetailSearch",
	store_code: ""
}

var store_code;
var store_name;
var ytd;
mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	store_code = w.store_code;
	store_name = w.store_name;
	ytd = w.ytd;
	condition.store_code = store_code;
	$("#code").html(store_code);
	$("#name").html(store_name);
	$("#all").html("All:"+ytd);
	getData();
	mui('#tags').on('tap', 'li', function() {
		for(var i = 0; i < $("#tags li").length; i++) {
			$("#tags li").eq(i).find("div").attr("class", $("#tags li").eq(i).find("div").attr("oldclass"));
		}
		
		$(this).find("div").attr("class", "blue");
		if($(this).find("div").attr("oldclass")=="grey"){
			$("#no_sale").css("display","block");
			$("#chart_div").css("display","none");
			return;
		}else{
			$("#no_sale").css("display","none");
			$("#chart_div").css("display","block");
		}
		var tmp = alldata[$(this).attr("index")];
		console.log(JSON.stringify(alldata[$(this).attr("index")]));
		$("#cate").html(document.getElementsByClassName("blue")[0].innerText+":"+"ytd:"+tmp.ytd);
		var chart = new Highcharts.Chart("chart_div", tmp);
	})
})
var alldata;

function getData() {
	var url = 'http://' + getIPPort() + '/ivisit_mobile/servlet/MobileUploadServlet' + getParams(condition);
	console.log(url);
	mui.ajax(url, {
		dataType: 'text', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			console.log(data);

			data = eval("(" + data + ")");
			alldata = data;
			console.log("111");
			
			console.log(JSON.stringify(data[0]));
			var content = "";
			for(var i = 0; i < data[0].tags.length; i++) {
				if(i == 0) {
					if(data[0].tags[i].index == -1) {
						content += "<li index=" + data[0].tags[i].index + "><div class='grey' oldclass='grey'>" + data[0].tags[i].name + "</div></li>"
					} else {
						content += "<li  index=" + data[0].tags[i].index + "><div class='blue' oldclass='yellow'>" + data[0].tags[i].name + "</div></li>"
					}

				} else {
					if(data[0].tags[i].index == -1) {
						content += "<li  index=" + data[0].tags[i].index + "><div class='grey' oldclass='grey'>" + data[0].tags[i].name + "</div></li>"
					} else {
						content += "<li  index=" + data[0].tags[i].index + "><div class='yellow' oldclass='yellow'>" + data[0].tags[i].name + "</div></li>"
					}
				}
				//content += "<li index=" + data[0].tags[i].index + "><div>" + data[0].tags[i].name + "</div></li>"
			}
			$("#tags ul").html(content);
			$("#cate").html(document.getElementsByClassName("blue")[0].innerText+":"+"ytd:"+data[1].ytd);
			var tmp = data[1];

			new Highcharts.Chart("chart_div", tmp);

		},
		error: function(xhr, type, errorThrown) {
			console.log(type);
		}
	});
}

function formatK(d) {
	return(d / 1000).toFixed(2);;
}