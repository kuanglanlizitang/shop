mui.plusReady(function() {
	Language.init();
})
var condition2

function pwdsubmit() {
	var email = document.getElementById("pwd-input").value;
	var time = CurentTime();

	if(email.length <= 0) {
		plus.nativeUI.alert(Language.getValue("register[2]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
		return false;
	} else {
		email = email + "@unilever.com";
	}
	condition2 = {
		type: "iVRorgotPwd",
		email: email,
		time: time,
	};
	HttpGet(condition2, function(msg) {
		if(msg == '0') {
			mui.openWindow({
				url: "../html/login.html",
				id: "login",
			});
			plus.nativeUI.alert(Language.getValue("register[6]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
		} else {
			plus.nativeUI.alert(Language.getValue("register[7]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
		}
	},
	function(msg) {
		plus.nativeUI.alert(Language.getValue("register[7]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
	})
}