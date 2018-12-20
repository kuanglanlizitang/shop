var menu = null,
	main = null;
var showMenu = false;
var isInTransition = false;

mui.init();
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var current = '';
	var styles = {
		top: '0',
		bottom: '51px'
	};
	var tabsConfig = {
		customer: {
			url: 'customer.html',
			styles: styles,
			default: true
		},
		route: {
			url: '../../route/html/mainroute.html',
			styles: styles
		},
		comments: {
			url: '../../comment/html/maincomment.html',
			styles: styles
		},
		photo: {
			url: '../../photo/html/mainphoto.html',
			styles: styles
		}
	};
	// 当前页面索引，初始化为0；
	var activeIndex = 0;
	// 目标页面索引，初始化为当前页面索引；
	var targetIndex = activeIndex;
	var tabs = {};
	for(id in tabsConfig) {
		tabs[id] = plus.webview.create(tabsConfig[id].url, id, tabsConfig[id].styles);
		if(tabsConfig[id]['default']) {
			self.append(tabs[id]);
			current = id;
		}
	}
	mui('.mui-bar-tab').on('tap', 'a.mui-tab-item', function(e) {
		if(current == this.dataset.id) {
			mui.fire(tabs[current], 'scroll2top');
			return;
		}
		tabs[this.dataset.id].show();
		tabs[current].hide();
		current = this.dataset.id;
	});

	main = plus.webview.currentWebview();
	main.addEventListener('maskClick', closeMenu);
	//处理侧滑导航，为了避免和子页面初始化等竞争资源，延迟加载侧滑页面；
	setTimeout(function() {
		menu = mui.preload({
			id: 'sidemenu',
			url: '../../menu/html/menu.html',
			styles: {
				left: 0,
				width: '70%',
				zindex: 1
			}
		});
	}, 200);

	window.addEventListener("menu:tap", closeMenu);
	window.addEventListener("openmenu", function() {
		openMenu();
	});

});

function openMenu() {
	if(isInTransition) {
		return;
	}
	if(!showMenu) {
		//侧滑菜单处于隐藏状态，则立即显示出来；
		isInTransition = true;
		menu.setStyle({
			mask: 'rgba(0,0,0,0)'
		}); //menu设置透明遮罩防止点击
		menu.show('none', 0, function() {
			//主窗体开始侧滑并显示遮罩
			main.setStyle({
				mask: 'rgba(0,0,0,0.4)',
				left: '70%',
				transition: {
					duration: 200
				}
			});
			mui.later(function() {
				isInTransition = false;
				menu.setStyle({
					mask: "none"
				}); //移除menu的mask
			}, 200);
			showMenu = true;
		});
	}
};
//关闭侧滑窗口；
function closeMenu() {
	if(isInTransition) {
		return;
	}
	if(showMenu) {
		//关闭遮罩；
		//主窗体开始侧滑；
		isInTransition = true;
		main.setStyle({
			mask: 'none',
			left: '0',
			transition: {
				duration: 200
			}
		});
		showMenu = false;
		//等动画结束后，隐藏菜单webview，节省资源；
		mui.later(function() {
			isInTransition = false;
			menu.hide();
		}, 200);
	}
};