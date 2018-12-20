function CurentTime() {
	var now = new Date();
	var year = now.getFullYear(); //年
	var month = now.getMonth() + 1; //月
	var day = now.getDate(); //日
	var hh = now.getHours(); //时
	var mm = now.getMinutes(); //分
	var clock = year + "-";
	if(month < 10)
		clock += "0";
	clock += month + "-";
	if(day < 10)
		clock += "0";
	clock += day + " ";
	if(hh < 10)
		clock += "0";
	clock += hh + ":";
	if(mm < 10) clock += '0';
	clock += mm;
	return(clock);
}

function getParams(datas) {
	if(datas.exceptcode == true) {

	} else {
		datas.staff_code = plus.storage.getItem("staff_code");
	}
	datas.platform = plus.os.name;
	datas.language = plus.storage.getItem("language");
	var paramStr = '?';
	for(var key in datas) {
		if(typeof(datas[key]) == "string" && datas[key].indexOf("#") >= 0) {
			paramStr = paramStr += key + "=" + encodeURIComponent(datas[key]) + "&";
		} else {
			paramStr = paramStr += key + "=" + encodeURI(encodeURI(datas[key])) + "&";
		}
	}
	return paramStr + "t=" + Math.random();
}

//网络请求
function HttpGet(datas, success, error, waitStr, except) {
	if(waitStr != null) {
		plus.nativeUI.showWaiting(Language.getValue(waitStr));
	}
	var url = 'http://' + getIPPort() + '/ivisit_mobile/servlet/MobileUploadServlet' + getParams(datas);
	console.log(JSON.stringify(datas));
	console.log('[url]:' + url);
	mui.ajax(url, {
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			console.log("suc=>" + JSON.stringify(data));
			plus.nativeUI.closeWaiting();
			success(data);
		},
		error: function(xhr, type, errorThrown) {
			console.log("err=>" + JSON.stringify(type));
			plus.nativeUI.closeWaiting();
			error(type);
		}
	});
}

function HttpGet1(datas, success, error, waitStr, except) {
	if(waitStr != null) {
		plus.nativeUI.showWaiting(Language.getValue(waitStr));
	}
	var url = 'http://' + getIPPort() + '/ivisit_mobile/servlet/MobileUploadServlet' + getParams(datas);
	console.log('[url]:' + url);
	mui.ajax(url, {
		dataType: "text", //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		headers: {
			'Content-Type': 'application/json'
		},
		success: function(data) {
			console.log("suc=>" + JSON.stringify(data));
			plus.nativeUI.closeWaiting();
			success(data);
		},
		error: function(xhr, type, errorThrown) {
			console.log("err=>" + JSON.stringify(type));
			plus.nativeUI.closeWaiting();
			error(type);
		}
	});
}

function getImageUrl(name, type) {
	if(type == 'name') {
		return 'http://139.198.188.153:3000/ulsfa_mobile/servlet/MobileUploadServlet?type=downloadFile&fnm=' + name;
	} else if(type == "id") {
		return 'http://'+getIPPort()+'/ivisit_mobile/servlet/MobileUploadServlet?type=downloadFile&fnm=' + name + '&action=compress'
	} else if(type == "head") {
		return 'http://'+getIPPort()+'/ivisit_mobile/servlet/MobileUploadServlet?type=downloadFile&fnm=' + name;
	} else {
		return 'http://139.198.188.153:3000/ulsfa_mobile/servlet/MobileUploadServlet?type=downloadFile&fid=' + name;
	}

}

function getIPPort() {
	var ip = plus.storage.getItem("ip");
	var port = plus.storage.getItem("port");
	if(ip == null) {
		return 'ivisit.u-iboard.com:80';
	} else {
		return ip + ":" + port;
	}

	//	return '139.198.189.47:80';
}

function setImageSize(channel_code, icon) {
	var mm = new BMap.Size(30, 36);
	if(channel_code == 'H' || channel_code == 'LS') { //橙色
		icon.setImageSize(mm);
		icon.setSize(mm);
		//绿色
	} else if(channel_code == 'SS' || channel_code == 'CVS' || channel_code == 'Gro' || channel_code == 'Cos/HD' || channel_code == 'W') {
		icon.setImageSize(mm);
		icon.setSize(mm);
	} else { //蓝色
		icon.setImageSize(mm);
		icon.setSize(mm);
	}

}

Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	}
	if(/(y+)/.test(format)) format = format.replace(RegExp.$1,
		(this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1,
				RegExp.$1.length == 1 ? o[k] :
				("00" + o[k]).substr(("" + o[k]).length));
	return format;
}

var authcode = 0;
//个推鉴权 短信 
function authgetui() {
	var timestamp3 = new Date().getTime();
	var appkey = "5mNsbUfOHn5GjeVICqvqtA";
	console.log(timestamp3);
	console.log(appkey + timestamp3 + "YWs0f1Sy7C7YE94WPHOys4");
	console.log(hex_sha256(appkey + timestamp3 + "YWs0f1Sy7C7YE94WPHOys4"));
	mui.ajax('https://restapi.getui.com/v1/9V9ORW7y1b8ZZaM5D19pn/auth_sign', {
		data: {
			timestamp: timestamp3,
			appkey: appkey,
			sign: hex_sha256(appkey + timestamp3 + "YWs0f1Sy7C7YE94WPHOys4")
		},
		contentType: 'application/json',
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			console.log("成功哈哈哈");
			console.log(JSON.stringify(data));
			authcode = data.auth_token;
			plus.storage.setItem("auth_token", authcode);
			bindalias(authcode);
		},
		error: function(xhr, type, errorThrown) {
			console.log("失败呜呜呜")
		}
	});
}

function bindalias(authcode) {
	console.log(plus.push.getClientInfo().clientid);
	console.log("dddd" + plus.storage.getItem("staff_code"));
	mui.ajax('https://restapi.getui.com/v1/9V9ORW7y1b8ZZaM5D19pn/bind_alias', {
		data: {
			alias_list: [{
				cid: plus.push.getClientInfo().clientid,
				alias: plus.storage.getItem("staff_code")
			}]
		},
		contentType: 'application/json',
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		beforeSend: function(xhr) {
			xhr.setRequestHeader("authtoken", authcode);
		},
		success: function(data) {
			console.log("成功哈哈哈");
			console.log(JSON.stringify(data));
			//sendRequest();
		},
		error: function(xhr, type, errorThrown) {
			console.log("失败呜呜呜")
		}
	});
}

function sendRequest(staff_code, content) {

	mui.ajax('https://restapi.getui.com/v1/9V9ORW7y1b8ZZaM5D19pn/push_single', {
		data: {
			"message": {
				"appkey": "5mNsbUfOHn5GjeVICqvqtA",
				"msgtype": "notification"
			}, 
			"notification": {

				"style": {
					"type": 1,
					"text": "点击查看",
					"title": content,
					"logo": "../img/no_image.png",
					"is_ring": true,
					"is_vibrate": true,
					"is_clearable": true             
				},
				"transmission_type": true,
				"transmission_content": content
			},
			"alias": staff_code,
			"requestid": "ivisit" + new Date().getTime()
		},
		contentType: 'application/json',
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		beforeSend: function(xhr) {
			xhr.setRequestHeader("authtoken", plus.storage.getItem("auth_token"));
		},
		success: function(data) {
			console.log("成功哈哈哈");
			console.log(JSON.stringify(data));
			console.log("透传");
//			plus.push.createMessage();
		},
		error: function(xhr, type, errorThrown) {

		}
	});
}