var store_name;
var latitude,longitude;
var xx,yy;
var address;
var map;
mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	var store_code = w.store_code;
	store_name = w.store_name;
	address = w.address;
	xx = w.xx;
	yy = w.yy;
	$("#span_cust").text(store_name);
	$("#span_address").text(Language.getValue("mapnavigate[1]") + address);
	var p = eval('(' + plus.storage.getItem("geolocation") + ')');
	//	condition.city_name = p.address.city;
	//	condition.latitude = p.coords.latitude;
	//	condition.lontitude = p.coords.longitude;
	latitude = p.coords.latitude;
	longitude = p.coords.longitude;
	initMap(xx,yy);
})

function initMap(latitude, longitude) {
	
		map = new BMap.Map('container', {
			minZoom: 14,
			maxZoom: 18
		});
		if(eval('(' + plus.storage.getItem("geolocation") + ')') != undefined) {
			map.centerAndZoom(new BMap.Point(eval('(' + plus.storage.getItem("geolocation") + ')').coords.longitude, eval('(' + plus.storage.getItem("geolocation") + ')').coords.latitude), 11);
		} else {
			map.centerAndZoom(new BMap.Point(118.82408, 32.026345), 16);
		}

		map.setMapStyle({
			style: 'normal'
		});
	map.addControl(new BMap.GeolocationControl({
			enableAutoLocation: true,
			showAddressBar: false,
			anchor: BMAP_ANCHOR_BOTTOM_RIGHT
		}));
	//map.centerAndZoom(new BMap.Point(parseFloat(longitude), parseFloat(latitude)), 15);

	console.log("mao....");
	//var tmp = routeList[index];

	//		label.setStyle({
	//			 color : "red",
	//			 fontSize : "12px",
	//			 height : "20px",
	//			 lineHeight : "20px",
	//			 fontFamily:"微软雅黑"
	//		 });

	var p1 = new BMap.Point(parseFloat(longitude), parseFloat(latitude));
	var myIcon = new BMap.Icon("../../../img/big.png",
		new BMap.Size(10, 20), {
			anchor: new BMap.Size(7, 20),
		});
	//setImageSize(tmp[0].CHANNEL_CODE, myIcon);
	var mm = new BMap.Size(30, 36);
	myIcon.setImageSize(mm);
	myIcon.setSize(mm);
	var marker = new BMap.Marker(p1, {
		icon: myIcon
	}); // 创建标注
	map.addOverlay(marker); // 将标注添加到地图中
	var label = new BMap.Label(store_name, {
		offset: new BMap.Size(30, 0)
	});
	label.setStyle({
		color: "white",
		fontSize: "12px",
		height: "20px",
		lineHeight: "20px",
		backgroundColor: "#FFC128",
		border: "none",
		fontFamily: "微软雅黑"
	});
	marker.setLabel(label);

}

function goHere() {
	var uu = "http://api.map.baidu.com/direction?origin=latlng:" + latitude + "," + longitude + "|name:" + address + "&destination=latlng:" + xx + "," + yy + "|name:" + "" + "&mode=driving&region=北京&output=html&src=iVisit ";
	console.log('start go goHeree ... '+uu);
	var urlStr = encodeURI(uu)
	plus.runtime.openURL(urlStr);
}