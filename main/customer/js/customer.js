mui.init();
mui.plusReady(function() {

	document.getElementById("show-btn").addEventListener("tap", function() {

		var main = plus.webview.getWebviewById('../../customer/html/main.html');
		mui.fire(main, 'openmenu', {});
	});

});