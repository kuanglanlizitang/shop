(function(owner) {
	var view;
	owner.init = function() {
		view = new plus.nativeObj.View('hover', {
			bottom:'50px',
			left: '10px',
			height: '50px',
			width: '50px',
		});
		view.drawBitmap('../kefu.png', {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		}, {
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%'
		}, 'hoverbg');
		view.addEventListener("click", function() {
			//需要更改
			if(plus.webview.getWebviewById("../dir1/help.html") == null) {
				var wv = plus.webview.create('../dir1/help.html', '../dir1/help.html', {
					'popGesture': 'close'
				});
				wv.show('pop-in',200);
			} else {
				plus.webview.getWebviewById("../dir1/help.html").show();
			}
		}, false);
	}

	owner.show = function() {
		view.show();
	}

})(window.HoverButton = {});