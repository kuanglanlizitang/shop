(function(w) {

	document.addEventListener('plusready', function() {
		console.log("Immersed-UserAgent: " + navigator.userAgent);

	}, false);

	var immersed = 0;
	var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
	if(ms && ms.length >= 3) {
		immersed = parseFloat(ms[2]);
	}

	//	if(plus.navigator.isImmersedStatusbar()) { // 兼容immersed状态栏模式
	//		// 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
	//		immersed = (Math.round(plus.navigator.getStatusbarHeight())) + 'px';
	//		console.log("topoffset" + immersed);
	//		alert(immersed);
	//	}
	w.immersed = immersed;
	console.log("immersed=" + immersed);
	if(!immersed) {
		return;
	}
	var t = document.getElementById('header');
	//t&&(t.style.paddingTop=immersed+'px',t.style.background='-webkit-linear-gradient(top,rgba(215,75,40,1),rgba(215,75,40,0.8))',t.style.color='#FFF');
	t && (t.style.paddingTop = immersed + 'px', t.style.background = '#ff8a00', t.style.color = '#FFF');
	t = document.getElementById('content');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('scontent');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('dcontent');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('map');
	t && (t.style.marginTop = immersed + 'px');
	t = document.getElementById('container');
	t && (t.style.paddingTop = immersed + 'px');


})(window);