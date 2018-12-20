mui.init({
	pullRefresh: {
		container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			color: '#FF8A00', //可选，默认“#2BD009” 下拉刷新控件颜色
			height: '100px', //可选,默认50px.下拉刷新控件的高度,
			range: '200px', //可选 默认100px,控件可下拉拖拽的范围
			offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
			callback: pulldownRefresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		},
		up: {
			height: 200, //可选.默认50.触发上拉加载拖动距离 
			contentinit: '',
			contentdown: '',
			contentrefresh: window.localStorage.getItem("language")=="cn"?"正在加载...":"Loading...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: window.localStorage.getItem("language")=="cn"?"没有更多数据了":"no more data", //可选，请求完毕若没有更多数据时显示的提醒内容；

			callback: pullupRefresh
		}
	}
});

var page = 0,
	searchCondition;

function getStoreList(pages) {
	//	if(arguments.length==2){
	//		var p = arguments[1];
	//		searchCondition.latitude = p.coords.latitude;
	//		searchCondition.lontitude = p.coords.longitude;
	//		searchCondition.city_name = p.address.city;
	//	}
	console.log("正在刷新");
	console.log(plus.storage.getItem("geolocation"));
	var showNotice = null;
	if(pages == 0) {
		if(document.getElementById("mapCon").style.display != '') {
			document.getElementById("storelist").innerHTML = '';
			//			mui('#refreshContainer').pullRefresh().enablePulldownToRefresh();
			//			mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
			showNotice = 'getData';
		} else {

		}
	}

	searchCondition.page = pages;
	HttpGet(searchCondition, function(data) {
		page = pages;
		if(document.getElementById("mapCon").style.display != '') {
			if(data == '1') {
				//无数据
				mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
				return;
			}
			var w=plus.webview.currentWebview().opener();
			mui.fire(w,"setCommentCount",{
				commentCount:data.data[0].NEW_COMMENTS_COUNT
			})
			
			
			var storelist = document.getElementById("storelist");
			mui.each(data.data, function(index, obj) {
				console.log("查找");
				console.log(obj);
				var li = document.createElement('li');
				li.className = 'mui-table-view-cell mui-media';
				li.setAttribute("storeCode", obj.STORE_CODE);
				var line1_right = '';
				if(obj.TOP_STORE == '1') {
					line1_right += '<i class="tag topstore"></i>';
				}
				if(obj.AG_FLAG == '1') {
					line1_right += '<i class="tag ag"></i>';
				}
				if(obj.ISA_FLAG == '1') {
					line1_right += '<i class="tag isa"></i>';
				}
				if(obj.TAG2 == '1') {
					line1_right += '<i class="tag ps"></i>';
				}
				if(obj.TAG1 != '') {
					line1_right += '<i class="tag tag1">' + obj.TAG1 + '</i>';
				}
				if(obj.STATUS != "正常" && obj.STATUS != "") {
					line1_right += '<i class="tag status">' + Language.getValue("storetags")[0] + '</i>';
				}
				var line2_right = '';
				if(obj.CHANNEL_CODE != '') {
					line2_right += '<i class="tag channel">' + obj.CHANNEL_CODE + '</i>';
				}
				if(obj.TAG6 != '') {
					line2_right += '<i class="tag tag6">' + obj.TAG6 + '</i>';
				}
				if(obj.TAG5 != '') {
					line2_right += '<i class="tag tag5">' + Language.getValue("storetags")[2] + '</i>';
				}
				if(obj.TAG4 != '') {
					line2_right += '<i class="tag tag4">' + Language.getValue("storetags")[1] + '</i>';
				}
				var dis = '';
				if(isNaN(obj.DISTANCE)) {
					dis = Language.getValue("km")[1];
				} else {
					dis = (obj.DISTANCE / 1000).toFixed(2) + Language.getValue("km")[0];
				}

				li.innerHTML = '<img class="mui-media-object mui-pull-left" src="' + getImageUrl(obj.STORE_PICTURE, 'name') + '"><div class="mui-media-body">' + obj.STORE_NAME + '<p class="mui-ellipsis">' + obj.STORE_CODE + '<span class="tagspanel">' + line1_right + '</span></p><p class="mui-ellipsis address">' + obj.ADDRESS + '<span class="tagspanel">' + line2_right + '</span></p><p class="mui-ellipsis"><div class="lastline"><img src="../../img/pic_dingwei.png" class="pic_dingwei">(' + obj.SIGN_COUNT + ')<img src="../../img/pic_pinglun.png" class="pic_pinglun">(' + obj.COMMENTS_COUNT + ')</div><span style="font-size:0.8em;">' + dis + '</span></p></div>';
				storelist.appendChild(li);
			});
			if(pages != 0) {
				if(data.rows < 10) {
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
				} else {
					mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
				}
			} else {
				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			}
		} else {
			if(data == '1') {
				return;
			}
			add_overlays(data);
		}
	}, function(error) {
		if(document.getElementById("mapCon").style.display != '') {
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh(true);
			//			mui('#refreshContainer').pullRefresh().endPullToRefresh(true);
		}
	}, showNotice);
}

var pointArray;

function add_overlays(data) {
	map.clearOverlays();
	pointArray = new Array();
	mui.each(data.data, function(index, obj) {
		var point = new BMap.Point(obj.PICTURE_YY, obj.PICTURE_XX);
		var marker = new BMap.Marker(point);
		map.addOverlay(marker);
		pointArray[index] = point;
		marker.addEventListener("click", function() {
			map.centerAndZoom(point, 16);
			markerClick(obj);
		});
		if(index == 0) {
			map.centerAndZoom(point, 12);
		}
	});
	map.setViewport(pointArray);
}

function markerClick(obj) {
	var reach = ''
	if(obj.TAG2 == '1') {
		reach = Language.getValue("maptags")[9];
	} else {
		reach = Language.getValue("maptags")[10];
	}
	var sContent = '<div class="mappop"><div id="customername" class="top"><span>' + obj.STORE_CODE + '</span><span class="mui-navigate-right" style="color:#FFF">' + obj.STORE_NAME + '</span></div><div class="bottom"><div><span>' + Language.getValue("maptags")[7] + reach + '</span><span>' + Language.getValue("maptags")[8] + '</span></div><div id="navigate" >' + Language.getValue("maptags")[6] + '<img src="../../img/dh.png" style="height:15px;vertical-align:middle"></div></div></div>';
	var mask = mui.createMask(function() {
		map.setViewport(pointArray);
	});
	mask.show();
	document.querySelectorAll('.mui-backdrop')[0].innerHTML = sContent;
	document.getElementById('navigate').addEventListener('tap', function() {
		goHere(obj.PICTURE_XX, obj.PICTURE_YY);
	})
	document.getElementById('customername').addEventListener('tap', function() {
		mui.openWindow({
			url: "../customer/html/customerdetail.html",
			id: "customerdetail",
			extras: {
				storeCode: obj.STORE_CODE
			}
		})
	})
}

mui.plusReady(function() {
	Language.init();
	searchCondition = {
		type: 'customerListSearch2',
		city_name: '',
		filterva: 'up', //up,down
		filter: '', //sales,ag,ps
		language: plus.storage.getItem("language"),
		channel: '',
		cust_type: '',
		svalue: '',
		latitude: '',
		lontitude: '',
		page: page,
		nielsen: ''
	};
	
	initTabs(getStoreList, searchCondition);
	document.getElementById('showmap').addEventListener('tap', function() {
		showmap();
	});
	


	mui('#storelist').on('tap', 'li', function() {
		mui.openWindow({
			url: "../customer/html/customerdetail.html",
			id: "customerdetail",
			extras: {
				storeCode: this.getAttribute("storeCode")
			}
		})
	})

});

function goHere(xx, yy) {
	var p = eval('(' + plus.storage.getItem("geolocation") + ')');
	var latitude = p.coords.latitude;
	var longitude = p.coords.longitude;
	var uu = "http://api.map.baidu.com/direction?origin=latlng:" + latitude + "," + longitude + "|name:" + "" + "&destination=latlng:" + xx + "," + yy + "|name:" + "" + "&mode=driving&region=北京&output=html&src=iVisit ";
	console.log('start go goHeree ... ');
	var urlStr = encodeURI(uu)
	plus.runtime.openURL(urlStr);
}

function pulldownRefresh() {
	plus.webview.currentWebview().reload();
}
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	getStoreList(page + 1);
}

var map;

function showmap() {
	if(map == null) {
		mui('#refreshContainer').pullRefresh().disablePulldownToRefresh();
		mui('#refreshContainer').pullRefresh().disablePullupToRefresh();
		document.getElementById("mapCon").style.display = '';
		map = new BMap.Map('mapCon', {
			minZoom: 14,
			maxZoom: 18
		});
		if(eval('(' + plus.storage.getItem("geolocation") + ')') != undefined) {
			map.centerAndZoom(new BMap.Point(eval('(' + plus.storage.getItem("geolocation") + ')').coords.longitude, eval('(' + plus.storage.getItem("geolocation") + ')').coords.latitude), 11);
		} else {
			map.centerAndZoom(new BMap.Point(118.82408, 32.026345), 16);
		}
 		map.enableScrollWheelZoom(true);
		map.setMapStyle({
			style: 'normal'
		});
		map.addControl(new BMap.GeolocationControl({
			enableAutoLocation: true,
			showAddressBar: false,
			anchor: BMAP_ANCHOR_BOTTOM_RIGHT
		}));
		map.addControl(new ZoomControl());
		map.addControl(new PanelControl());
		document.getElementById("storelist").innerHTML = '';
		document.getElementById("icontop").src = '../../img/icon2list.png';
	} else {
		if(document.getElementById("mapCon").style.display == '') {
			document.getElementById("icontop").src = '../../img/pic_map.png';
			document.getElementById("mapCon").style.display = 'none';
			mui('#refreshContainer').pullRefresh().enablePulldownToRefresh();
			mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
		} else {
			document.getElementById("storelist").innerHTML = '';
			document.getElementById("icontop").src = '../../img/icon2list.png';
			mui('#refreshContainer').pullRefresh().disablePulldownToRefresh();
			mui('#refreshContainer').pullRefresh().disablePullupToRefresh();
			document.getElementById("mapCon").style.display = '';
		}
	}
	getStoreList(0);
}

function ZoomControl() {
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
	this.defaultOffset = new BMap.Size(50, 30);
}
ZoomControl.prototype = new BMap.Control();
ZoomControl.prototype.initialize = function(map) {
	// 创建一个DOM元素
	var div = document.createElement("div");
	div.innerHTML = '<div id="mapControlLeft" onclick="last()" class="left">' + Language.getValue('maptags')[4] + '</div><div id="mapControlRight" onclick="next()" class="right">' + Language.getValue('maptags')[5] + '</div>';
	// 设置样式
	div.className = "map-control-num";
	map.getContainer().appendChild(div);
	return div;
}

function PanelControl() {
	// 默认停靠位置和偏移量
	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	this.defaultOffset = new BMap.Size(0, 10);
}
PanelControl.prototype = new BMap.Control();
PanelControl.prototype.initialize = function(map) {
	// 创建一个DOM元素
	var div = document.createElement("div");
	div.setAttribute("id", "panel-map");
	div.innerHTML = "<div class='maptagpanel'><div><span class='maptag red'>" + Language.getValue("maptags")[0] + "</span>H/LS</div><div><span class='maptag yellow'>" + Language.getValue("maptags")[1] + "</span>SS/CVS/GRO/COS/W</div><div><span class='maptag green " + Language.getValue("maptags")[3] + "'>" + Language.getValue("maptags")[2] + "</span>PC/DE/ECOMM/OTHERS/C&amp;C</div></div><div id='mapbtn' class='mapbtnopen' onclick='panelcontrol()'></div>";
	// 设置样式
	div.className = "map-control-panel";
	map.getContainer().appendChild(div);
	return div;
}

function panelcontrol() {
	if(document.getElementById("panel-map").className == 'map-control-panel panel-left-in') {
		document.getElementById("panel-map").className = 'map-control-panel panel-left-out';
		document.getElementById("mapbtn").className = 'mapbtnopen';
	} else {
		document.getElementById("panel-map").className = 'map-control-panel panel-left-in';
		document.getElementById("mapbtn").className = 'mapbtnclose';
	}
}

function last() {
	if(page > 0)
		getStoreList(page - 1);
}

function next() {
	getStoreList(page + 1);
}

window.addEventListener('setCity', function(e) {
	if(plus.storage.getItem("language") == 'cn') {
		document.getElementById("citylabel").innerHTML = '<div>' + e.detail.city + '</div>';
	} else {
		document.getElementById("citylabel").innerHTML = '<div>' + ConvertPinyin(e.detail.city) + '</div>';
	}
	if(e.detail.isAuto == '1') {
		//自动
		var p = eval('(' + plus.storage.getItem("geolocation") + ')');
		searchCondition.latitude = p.coords.latitude;
		searchCondition.lontitude = p.coords.longitude;
		searchCondition.city_name = p.address.city;
	} else {
		searchCondition.city_name = e.detail.city;
	}
	getStoreList(0);
});

//添加newId自定义事件监听
window.addEventListener('result', function(event) {
	var storeCode = event.detail.storeCode;
	var storeName = event.detail.storeName;
	searchCondition.svalue = storeCode;
//	var w = plus.webview.getWebviewById("HBuilder");
	var w=plus.webview.currentWebview().opener();
	console.log("传输的名称："+storeName);
	mui.fire(w, 'setResult', {
		storeName: storeName
	});
	getStoreList(0);
});

window.addEventListener('deletekey', function(event) {

	searchCondition.svalue = "";
	console.log("准备刷新");
	getStoreList(0);
});

function getLocalInfo() {
	plus.nativeUI.showWaiting(Language.getValue("geoing"));
	plus.geolocation.getCurrentPosition(function(p) {
		console.log("定位==》" + p);
		//将坐标信息缓存,除非重新获取.
		plus.storage.setItem("geolocation", JSON.stringify(p));
		document.getElementById("localinfo1").innerText = Language.getValue("localinfo1") + p.address.district;
		HttpGet({
			type: 'townMoreInfo',
			org_name: p.address.district
		}, function(datas) {
			if(datas == '1') {
				document.getElementById("localinfo2").innerText = Language.getValue("localinfo2");
				document.getElementById("localinfo3").innerText = Language.getValue("localinfo3");
				showPop("popover", "linfo");
			} else {
				if(parseInt(datas.data[0].ORG_POPULATION) == datas.data[0].ORG_POPULATION) {
					document.getElementById("localinfo2").innerText = Language.getValue("localinfo2") + parseInt(datas.data[0].ORG_POPULATION);
				} else {
					document.getElementById("localinfo2").innerText = Language.getValue("localinfo2") + datas.data[0].ORG_POPULATION;
				}
				if(parseInt(datas.data[0].ORG_INCOME) == datas.data[0].ORG_INCOME) {
					document.getElementById("localinfo3").innerText = Language.getValue("localinfo3") + parseInt(datas.data[0].ORG_INCOME);
				} else {
					document.getElementById("localinfo3").innerText = Language.getValue("localinfo3") + datas.data[0].ORG_INCOME;
				}

				showPop("popover", "linfo");
			}
		}, function(error) {
			showPop("popover", "linfo");
		}, 'getData')
	}, function(e) {
		showPop("popover", "linfo");
	}, {
		enableHighAccuracy: true,
		provider: 'baidu'
	});
}