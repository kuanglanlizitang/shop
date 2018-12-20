mui.init();
var hotcondition;
var hotcontent = "";
var at_staff_code = "",
	at_staff_name = "";
var store_code, group = "";
mui.plusReady(function() {
	Language.init();
	getHot();
	var w = plus.webview.currentWebview();
	store_code = w.store_code;
	group = w.gcode;
	document.getElementById('at').addEventListener('tap', function() {
		mui.openWindow({
			url: "../../comment/html/comment_atgroup.html",
			id: "comment_atgroup",
			extras: {

			}
		});
	})

	document.getElementById('pic').addEventListener('tap', function() {
		if($("#pics ul").children().length <= 8) {
			captureImage();
		} else {
			plus.nativeUI.toast("最多拍摄8张照片")
		}

	})
	document.getElementById('picadd').addEventListener('tap', function() {
		if($("#pics ul").children().length < 8) {
			captureImage();
		} else {
			plus.nativeUI.toast("最多拍摄8张照片")
		}
	})

	mui('#pics').on('tap', 'li', function() {
		if($("#pics ul").children().length != ($(this).index() + 1)) {
			if(plus.os.name == "iOS") {
			delimg(plus.io.convertAbsoluteFileSystem($(this).attr("xpath")));
			}else{
				delimg($(this).attr("xpath"));
			}
			$(this).remove();
		}

	})
	document.getElementById('submit').addEventListener('tap', function() {
		if($("#text").val()==""){
			plus.nativeUI.alert(Language.getValue("commentadd[2]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			return;
		}
		var files = [];
		for(var i = 0; i < $("#pics ul").children().length - 1; i++) {
			files.push($("#pics li").eq(i).attr("xpath"));
		}
        if(files.length==0){
        	submit(files);
        }else{ 	
        	uploadImg(files);
        }
		
	})

	document.getElementById("close").addEventListener("tap", function() {
		plus.nativeUI.confirm(Language.getValue("commentadd")[1], function(e) {
			if(e.index == 1) {

			} else {
				mui.back();
			}
			
		},"", [Language.getValue("versioncheck[2]"),Language.getValue("config[2]")]);
	});

})

function getHot() {
	hotcondition = {
		type: "select",
		region_code: plus.storage.getItem("region_code")
	}

	HttpGet(hotcondition, function(data) {
		if(data != 1) {
			var content = "";
			for(var i = 0; i < data.data.length; i++) {
				content += '<li class="mui-table-view-cell"><a href="#">' + data.data[i].HEAT_WORDS + '</a></li>';
			}
			$("#popover ul").append(content);
		}

		mui('#popover').on('tap', 'li', function() {
			var tmp = "#" + $(this).find("a").text() + "#";
			var txt = $("#text").val();
			txt = txt.replace(hotcontent, tmp);
			hotcontent = tmp;
			$("#text").val(txt);
			mui('#popover').popover('toggle'); //show hide toggle
		})
	}, function() {}, "loading");
	mui('.mui-scroll-wrapper').scroll();
}
window.addEventListener("atresult", function(e) {
	var code = e.detail.code;
	var name = e.detail.name;
	at_staff_code += "$" + code;
	at_staff_name += "$@" + name;
	if(at_staff_code.indexOf("$") == 0) {
		at_staff_code = at_staff_code.substr(1);
		at_staff_name = at_staff_name.substr(1);
	}
	$(".listtags").children().remove();
	var names = "";
	var len = at_staff_name.split("$").length;
	for(var i = 0; i < len; i++) {
		names += '<div onclick="removeself(this);" style="color: #ff8a00;margin-left: 10px;font-size: 14px;display: inline;">' + at_staff_name.split("$")[i] + '</div>';
	}
	$(".listtags").append(names);

});

function removeself(tag) {
	var index = $(tag).index();
	$(tag).remove();
	var tmp = at_staff_name.split("$");
	var tmp2 = at_staff_code.split("$");

	tmp.splice(index, 1);
	tmp2.splice(index, 1);
	at_staff_name = "";
	at_staff_code = "";
	for(var ii = 0; ii < tmp.length; ii++) {
		at_staff_name += "$" + tmp[ii];
		at_staff_code += "$" + tmp2[ii];
	}
	if(at_staff_name.indexOf("$") == "0") {
		at_staff_code = at_staff_code.substr(1);
		at_staff_name = at_staff_name.substr(1);
	}

}

function captureImage() {
	var cmr = plus.camera.getCamera();
	var res = cmr.supportedImageResolutions[0];
	var fmt = cmr.supportedImageFormats[0];
	var filename = createUUID();
	console.log("Resolutaion: " + res + ", Format: " + fmt);
	cmr.captureImage(function(path) {
			var xpath = plus.io.convertLocalFileSystemURL(path);
			var content = '<li xpath="' + xpath + '"><img style="width: 80px;height:80px" src="' + xpath + '" /></li>'
			$(content).insertBefore("#picadd")
		},
		function(error) {}, {
			resolution: res,
			format: fmt,
			filename: "_doc/camera/" + filename + ".jpg"
		}
	);
}

function createUUID() {
	return UUID.prototype.createUUID();
}

function delimg(url) {
	plus.io.resolveLocalFileSystemURL(url, function(entry) {
		entry.remove();

	}, function(e) {
		alert("Resolve file URL failed: " + e.message);
	});
}

function uploadImg(files) {
	plus.nativeUI.showWaiting();
	for(i in files) {
		var fnm = files[i].substring(files[i].lastIndexOf('/') + 1, files[i].lastIndexOf('.'));
		console.log("fnm:"+fnm);
		var url = 'http://' + getIPPort() + '/ivisit_mobile/servlet/MobileUploadServlet?type=uploadFile&fnm=' + fnm + "&store_code=" + store_code;
		console.log("url"+url);
		var task = null;
		console.log("上传前准备");
		task = plus.uploader.createUpload(
			url, {
				method: "POST",
				priority: 100
			},
			function(t, status) {
				console.log("t:"+t+"status"+status);
				console.log("上传中");
				plus.nativeUI.closeWaiting();
				console.log("t.responseText:"+t.responseText);
				mui.toast('上传成功');
				console.log("上传成功进入点击");
				submit(files);
			}
		);
		if(plus.os.name == "iOS") {
			console.log("ios");
			console.log("33432"+plus.io.convertAbsoluteFileSystem(files[i]));
			task.addFile(plus.io.convertAbsoluteFileSystem(files[i]), {
				key: "file"
			});
		} else {
			console.log("andriod");
			task.addFile(files[i], {
				key: "file",
				mime: "image/JPEG",
			});
		}

		task.start();
	}

}

function submit(files) {
	console.log("进入点击");
	submitcondition = {
		type: "submitComment",
		store_code: store_code,
		comment: "",
		heat_words: "",
		group: "",
		img: "",
		lontitude_cyy: "",
		latitude_cxx: "",
		dis: "0",
		star: 0,
		isnearly: "0",
		at_staff_code: "",
		at_staff_name: "",
		check_dis: "0"
	}
	var fnm = "";
	for(i in files) {
		fnm += files[i].substring(files[i].lastIndexOf('/') + 1, files[i].lastIndexOf('.')) + ",";
		console.log("fnm地址"+fnm);
	}
	if(group == undefined) {
		group = "";
	}
	submitcondition.at_staff_code = at_staff_code;
	submitcondition.at_staff_name = at_staff_name;
	submitcondition.comment = $("#text").val().replace(hotcontent, "");
	submitcondition.heat_words = hotcontent.substring(1, hotcontent.length - 1);
	submitcondition.group = group;
	submitcondition.img = fnm.substring(0, fnm.length - 1);
	var p = eval('(' + plus.storage.getItem("geolocation") + ')');
	var latitude = p.coords.latitude;
	var lontitude = p.coords.longitude;
	submitcondition.lontitude_cyy = lontitude;
	submitcondition.latitude_cxx = latitude;
	HttpGet(submitcondition, function(data) {
		console.log("点击进入接口"+ data);
		if(data == "0") {
			plus.nativeUI.confirm(Language.getValue("grade[6]"), function(e) {
				if(e.index == 1) {

				} else {
					console.log("点击返回页面");
					mui.back();
					mui.fire(plus.webview.currentWebview().opener(), 'detail', {});
				}

			}, Language.getValue("versioncheck[0]"),[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);

		}
	}, function() {
		plus.nativeUI.confirm(Language.getValue("grade[7]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
	}, "loading");

}