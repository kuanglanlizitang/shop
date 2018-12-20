mui.init();
mui.plusReady(function() {
	Language.init();
	mui('.form_tijiao').on('tap', '#doRegister', function() {
		doRegister1();
	});
	mui('.inputform1').on('tap', '#et_group', function() {
		console.log("aaa");
		mui.openWindow({
			url: "../html/group.html",
			id: "group",
		});
	});
//	mui('#header').on('tap','.nvbt',function(){
//	  mui.openWindow({
//			url: "../html/login.html",
//			id: "login",
//		});
//	});
	document.getElementById("doRegister").value=Language.getValue("register[9]");
});
 var condition;
var condition1;

function doRegister1() {
	var re_email = document.getElementById("re_email").value;
	if(re_email.length <= 0) {
		plus.nativeUI.confirm(Language.getValue("register[2]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
		return false;
	} else {
		re_email = re_email + "@unilever.com";
	}

	console.log(re_email);
	condition = {
		type: "iVCheckEmail",
		re_email: re_email,
	};
	HttpGet(condition, function(msg) {
		if(msg == "1") {
			var staff_name = document.getElementById("staff_name").value;
			var staff_code = document.getElementById("staff_code").value;

			var pwd1 = document.getElementById("pwd1").value;
			var pwd2 = document.getElementById("pwd2").value;

			var time = CurentTime();
			console.log(staff_name);
			console.log(staff_code);
			console.log(pwd1);
			console.log(pwd2);
			if(staff_name.length <= 0) {
				staff_name = re_email;

			}
			if(staff_code.length <= 0) {
				staff_code = '';

			}
			if(pwd1.length <= 0 || pwd2 <= 0) {
				plus.nativeUI.confirm(Language.getValue("register[3]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
				return;
			}
			if(pwd1 != pwd2) {
				plus.nativeUI.confirm(Language.getValue("register[4]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
				return;
			}
			var title = document.getElementById("et_group").value;
			var group_c = document.getElementById("et_group").title;
			if(title == "") {
				plus.nativeUI.confirm(Language.getValue("register[5]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
				return;
			}
			condition1 = {
				type: "iVRegister",
				g_name: title,
				g_code: group_c,
				re_email: re_email,
				pwd: pwd1,
				time: time,
				staff_name: staff_name,
				staff_code: staff_code,
			};
			HttpGet(condition1, function(msg) {
				if(msg == '0') {
					plus.nativeUI.confirm(Language.getValue("register[6]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
					mui.openWindow({
						url: "../html/login.html",
						id: "login",
					})
				}else{
					plus.nativeUI.confirm(Language.getValue("register[7]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
				}
			},function(){
				plus.nativeUI.confirm(Language.getValue("register[7]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
			});
		} else {
			plus.nativeUI.confirm(Language.getValue("register[8]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
		}
	},function(){
		plus.nativeUI.confirm(Language.getValue("register[7]"),null,"",[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
	})
};

window.addEventListener("group_result", function(e) {
	var name = e.detail.gcode;
	var code = e.detail.code;
	document.getElementById("et_group").value = name;
	document.getElementById("et_group").title = code;
})