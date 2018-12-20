function switch_tab(i) {
	switch(i) {
		case 0:
			document.getElementById("input_content").placeholder = Language.getValue("email");
			document.getElementById("input_pass").placeholder = Language.getValue("请输入iVisit登录密码");
			document.getElementById("loginimg").innerText = Language.getValue("邮箱登录");
			document.getElementById("suffix").style.display = "block";
			document.getElementById("com_placeholder").style.display = "none";
			document.getElementById("input_content").style.width = "50%";
			index = 0;
			break;
		case 1:
			document.getElementById("input_content").placeholder = Language.getValue("gonghao");
			document.getElementById("input_pass").placeholder = Language.getValue("请输入iVisit登录密码");
			document.getElementById("loginimg").innerText = Language.getValue("工号登录");
			document.getElementById("suffix").style.display = "none";
			document.getElementById("com_placeholder").style.display = "block";
			document.getElementById("input_content").style.width = "70%";
			index = 1;
			break;
		default:

			break;
	}
	document.getElementById("input_content").value = "";
	document.getElementById("input_pass").value = "";
}

var index = 0;

mui.init();

mui.plusReady(function() {

	Language.init();
	Language.setLanguage("en")
var shares = {};
	plus.share.getServices(function(s) {
		if(s && s.length > 0) {
			for(var i = 0; i < s.length; i++) {
				var t = s[i];
				shares[t.id] = t;
				console.log(t);
			}
		}
	}, function() {
		console.log("获取分享服务列表失败");
	});

	plus.storage.setItem('device_model', plus.device.model);
	plus.storage.setItem('uuid', plus.device.uuid);
	plus.storage.setItem('platform', plus.os.name);
	plus.storage.setItem('local_version_code', "316");
	if(plus.storage.getItem("staff_code") != null && plus.storage.getItem("userpass")) {
		document.getElementById("input_content").value = plus.storage.getItem("staff_code");
		document.getElementById("input_pass").value = plus.storage.getItem("userpass");
		login();
		return;
	}

	document.getElementById("maillogin").addEventListener("tap", function() {
		switch_tab(0);
		document.getElementById("idlogin").getElementsByTagName('img')[0].src = "../pic/gonghao.png";
		document.getElementById("maillogin").getElementsByTagName('img')[0].src = "../pic/youxianglight.png";
	});

	document.getElementById("idlogin").addEventListener("tap", function() {
		switch_tab(1);
		document.getElementById("idlogin").getElementsByTagName('img')[0].src = "../pic/gonghaolight.png";
		document.getElementById("maillogin").getElementsByTagName('img')[0].src = "../pic/youxiang.png";
	});

	document.getElementById("loginimg").addEventListener("tap", function() {
		console.log("点击登录");
		checkInput();
	});

	document.getElementById("div_wufaregister").addEventListener("tap", function() {

	});

	document.getElementById("div_wufasetting").addEventListener("tap", function() {
		clicked("config.html");
		cancelWufa();
	});

	document.getElementById("div_chinese").addEventListener("tap", function() {
		Language.setLanguage("cn");
		window.localStorage.setItem("language","cn");
		cancelLanguage();
	});

	document.getElementById("div_English").addEventListener("tap", function() {
		Language.setLanguage("en");
		window.localStorage.setItem("language","en");
		cancelLanguage();
	});

	document.getElementById("wangjimima1").addEventListener("tap", function() {
		clicked("forget.html");
	});

	document.getElementById("div_wufaregister").addEventListener("tap", function() {
		mui.openWindow({
			url: "../html/register.html",
			id: "register",
		})
	});
	document.getElementById('share').addEventListener('tap', function() {
//		showshare();
		mui.openWindow({
			url: "../../main/menu-3.html",
			id: "menu-3",
		});
	});

});

function checkInput() {
	check = true;
	mui("#input_form input").each(function() {
		console.log("this:"+this);
		if(!this.value || this.value.trim() == "") {
//			alert(this.placeholder);
			mui.alert(this.placeholder,Language.getValue("about[1]"),Language.getValue("versioncheck[2]"));
			check = false;
			return false;
		}
	});
	if(check) {
		console.log("准备进入登录");
		login();
	}
	
}

function login() {
	console.log("进入登录判断");
	var uuid = plus.storage.getItem('uuid');
	var login_time = CurentTime();
	console.log("uuid is " + uuid);
	console.log("login_time is " + login_time);
	var _staff = mui("#input_form input")[0].value;
	var _pwd = mui("#input_form input")[1].value;
	plus.storage.setItem("staff_code", _staff);
	var condition = {
		type: "iVisitLogin",
		pwd: _pwd,
		uuid: uuid,
		login_time: login_time,
		logintype: index, //1是输入账户密码
		version_code: "1000"
	}
	if(index == 0) {
		condition.email = _staff + '@unilever.com';
		condition.exceptcode = true;
	} else {
		condition.staff_code = _staff;
		condition.exceptcode = true;
	}

	HttpGet(condition, function(data) {
		if(data == 1) {
			plus.nativeUI.alert(Language.getValue("登录失败请检查用户名密码"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			return;
		}
		//		plus.nativeUI.alert("登录成功");
		plus.storage.setItem("staff_code", data.data[0].STAFF_CODE);
		plus.storage.setItem("userpass", _pwd);
		mui.openWindow({
			url: "../../main/tab-main.html",
			id: "tab-main",
		});

	}, function(error) {
		mui.alert(Language.getValue("登录失败"),Language.getValue("about[1]"),Language.getValue("versioncheck[2]"));
	}, "loading");
}

function chooesWufa() {
	$("#div-languagebg").fadeIn(1000);
	$("#div_wufa").fadeIn(1000);
	document.getElementById("div-languagebg").style.display = 'block';
	document.getElementById("div_wufa").style.display = 'block';
}

function cancelWufa() {
	$("#div-languagebg").fadeOut(1000);
	$("#div_wufa").fadeOut(1000);
	document.getElementById("div-languagebg").style.display = 'none';
	document.getElementById("div_wufa").style.display = 'none';
}

function chooesLan() {
	$("#div-languagebg").fadeIn(1000);
	$("#div_language").fadeIn(1000);
	document.getElementById("div-languagebg").style.display = 'block';
	document.getElementById("div_language").style.display = 'block';
}

function cancelLanguage() {
	$("#div-languagebg").fadeOut(1000);
	$("#div_language").fadeOut(1000);
	document.getElementById("div-languagebg").style.display = 'none';
	document.getElementById("div_language").style.display = 'none';
}