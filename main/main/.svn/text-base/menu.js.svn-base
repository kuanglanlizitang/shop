mui.init({
	keyEventBind: {
		backbutton: false,
		menubutton: false
	}
});
var main = null;
mui.plusReady(function() {
	Language.init();
	staff_code = plus.storage.getItem("staff_code");
	main = plus.webview.currentWebview().opener();
	//请求登陆次数
	HttpGet({
		type: "personalInfo",
		staff_code:staff_code
	}, function(data) {
		var userimg=getImageUrl(data.data[0].HEAD_IMAGE,"head");
		if(userimg){
			$('#userimg').attr("src",userimg);
		}
		console.log("userimg:"+userimg);
		localStorage.setItem("userinfo", JSON.stringify(data));
//		document.getElementById("userimg").src = getImageUrl(data.data[0].HEAD_IMAGE, 'name');
		document.getElementById("username").innerText = data.data[0].STAFF_NAME;
		var data1=data.data[0].DATE.split(".");
		document.getElementById("lastdate").innerText = Language.getValue('上次登陆') + data1[0];
		document.getElementById("logincount").innerText = Language.getValue('logintimes')[0] + data.data[0].COUNT + Language.getValue('logintimes')[1];
	}, function(error) {

	}, null);
	
	
	//发现新版本,每隔半小时刷新

	mui('.userinfo').on('tap', '#userimg', function() {
		mui.openWindow({
			url: "opendetail.html",
			id: "opendetail",
		});
		closeMenu();
	});

});
window.addEventListener('menuresult', function(event) {
	//获得事件参数
	var staff_name = event.detail.staff_name;
	var src = event.detail.src;
	console.log(staff_name);
	console.log(src);
	document.getElementById("username").innerText = staff_name;
	document.getElementById("userimg").setAttribute("src",src);
});

function closeMenu() {
	mui.fire(main, "menu:swipeleft");
}

function openMenuTab(url) {
	clicked(url);
	closeMenu();
}
window.addEventListener("swipeleft", closeMenu);
mui.menu = closeMenu;

function signout() {
	closeMenu();
	console.log("signout");
	plus.storage.clear();
	plus.runtime.restart();
}