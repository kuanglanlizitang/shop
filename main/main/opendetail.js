mui.init();
var condition;
var condition1;
var condition2;
var sex;
var picUrl;
var staff_code;
var store_code
var email;
var menuleft=null;
var photo=false;
mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	store_code = w.store_code;
	
	document.getElementById("myself_carm").value=Language.getValue("opendetail[9]");
	document.getElementById("myself_album").value=Language.getValue("opendetail[10]");
	document.getElementById("myself_cancel").value=Language.getValue("opendetail[11]");
	
	document.addEventListener("plusready", onPluseReady, false);
	if(!menuleft){
		menuleft=plus.webview.getWebviewById('menu-left');
	}
	function onPluseReady() {
		console.log("plusready");
	}
	staff_code = plus.storage.getItem("staff_code");
	console.log("staff_code:"+staff_code);
	condition = {
		type: "personalInfo",
		staff_code: staff_code
	};
	HttpGet(condition, function(jsonStr) {
		var headImage=$('#headImage').attr('src', getImageUrl(jsonStr.data[0].HEAD_IMAGE,"head"));
		console.log("headImage:"+headImage);
		console.log("获取的地址："+getImageUrl(jsonStr.data[0].HEAD_IMAGE,"head"));
		if(!headImage){
			$('#headImage').attr('src', "../../img/image01.png");
		};
		document.getElementById("name_myself").value = jsonStr.data[0].STAFF_NAME;
		document.getElementById("email_myself").value = jsonStr.data[0].EMAIL;
		document.getElementById("username_myself").value = staff_code;
		document.getElementById("phone_myself").value = jsonStr.data[0].CONTACT;
		if(jsonStr.data[0].SEX == "Y") {
			$("#m_div").css("background-color", "#51cc07");
			$("#m_icon").attr("src", "../../img/male_light.png");
			sex = "Y";
		} else {
			sex = "N";
			$("#f_div").css("background-color", "#ff8a00");
			$("#f_icon").attr("src", "../../img/female_light.png");
		}
	}, function() {
		plus.nativeUI.confirm(Language.getValue("opendetail[12]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
	});

	mui('#wrapper').on('tap', '#headImage', function() {
		document.getElementById("pop_picture1").style.display = "block";
	});
});

function selM() {
	$("#m_div").css("background", "#51cc07");
	$("#m_icon").attr("src", "../../img/male_light.png");
	$("#f_div").css("background", "#e1e1e1");
	$("#f_icon").attr("src", "../../img/female.png");
	sex = "Y";
};

function selF() {
	$("#m_div").css("background", "#e1e1e1");
	$("#m_icon").attr("src", "../../img/male.png");
	$("#f_div").css("background", "#ff8a00");
	$("#f_icon").attr("src", "../../img/female_light.png");
	sex = "N";
};

function submit_myself() {
	var files="";
	files=document.getElementById("headImage").getAttribute("src");
	console.log(files);
	if(photo==false){
		submit(files);
	}else{
		uploadImg(files);
	}
}

function submit(files) {
	var name = document.getElementById("name_myself").value;
	var username = document.getElementById("username_myself").value;
	var phone = document.getElementById("phone_myself").value;
	var src = document.getElementById("headImage").src;
	email=document.getElementById("email_myself").value;
	console.log(name);
	console.log(username);
	console.log(phone);
	console.log("staff_code"+staff_code);
	condition1 = {
		type: "changeInfo",
		name: name,
		phone: phone,
		sex: sex,
		email: email,
		staff_code: staff_code,
	};
	HttpGet(condition1, function(jsonStr) {
			if(jsonStr == 0) {
				plus.nativeUI.confirm(Language.getValue("opendetail[13]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
				mui.fire(menuleft, 'menuresult', {
					staff_name: name,
					src:src
				});
				mui.back();
				
			} else {
				plus.nativeUI.confirm(Language.getValue("opendetail[14]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
			}
		},
		function() {
			plus.nativeUI.confirm(Language.getValue("opendetail[14]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
		});
};

function camera() {
	photo=true;
	var cmr = plus.camera.getCamera();
	var res = cmr.supportedImageResolutions[0];
	var fmt = cmr.supportedImageFormats[0];
	var filename = createUUID();
	console.log("Resolution: " + res + ", Format: " + fmt);

	cmr.captureImage(function(path) {
			var xpath = plus.io.convertLocalFileSystemURL(path);
			document.getElementById("headImage").src=xpath;
			console.log(xpath);
		},
		function(error) {
			console.log("Capture image failed: " + error.message);
		}, {
			resolution: res,
			format: fmt,
			filename: "_doc/camera/" + filename + ".jpg"
		}
	);
};

function createUUID() {
	return UUID.prototype.createUUID();
}

function gallery() {
	photo=true;
	console.log(Language.getValue("opendetail[15]"));
    plus.gallery.pick( function(path){
    	var xpath = plus.io.convertLocalFileSystemURL(path);
    	document.getElementById("headImage").src=xpath;
    	console.log("xpath"+xpath);
    }, function ( e ) {
    	console.log(Language.getValue("opendetail[16]"));
    }, {filter:"image"} );
};
function deletecancel(){
	document.getElementById("pop_picture1").style.display="none";
}


function uploadImg(files) {
	plus.nativeUI.showWaiting();
	email=document.getElementById("email_myself").value;
	var fnm = files.substring(files.lastIndexOf('/') + 1, files.lastIndexOf('.'));
	var url = 'http://'+getIPPort()+'/ivisit_mobile/servlet/MobileUploadServlet?type=uploadFile&fnm=' + fnm +"&email="+ email + "&staff_code=" + staff_code;
	var task = null;
	console.log("url:"+url);
	task = plus.uploader.createUpload(
		url, {
			method: "POST",
			priority: 100
		},
		function(t, status) {
			plus.nativeUI.closeWaiting();
			console.log("t.responseText:"+t.responseText);
			mui.toast(Language.getValue("opendetail[17]"));
			submit(files);
		}
	);
	task.addFile(files, {
		key: "file",
		mime: "image/JPEG",

	});
	task.start();
}