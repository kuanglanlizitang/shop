mui.init({

});

var conditon;
var dateRange1;
var routeList = [];
var daysArr;
mui.plusReady(function() {
	Language.init();
	console.log("plus");
	if(plus.storage.getItem("language") == "cn") {
		daysArr = ['日', '一', '二', '三', '四', '五', '六'];
	} else {
		daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	}
	var curDate = new Date(),
		curYear = curDate.getFullYear();
	var day = curDate.getDay();
	document.getElementById("day").innerHTML = curDate.getDate();
	document.getElementById("year").innerHTML = curDate.getFullYear();
	document.getElementById("month").innerHTML = curDate.getMonth();
	document.getElementById("spanroute_date").innerText = (document.getElementById("year").innerHTML + "-" + (parseInt(document.getElementById("month").innerHTML) > 8 ? (parseInt(document.getElementById("month").innerHTML) + 1) : "0" + (parseInt(document.getElementById("month").innerHTML) + 1)));

	logDateControl.changedate(0);
	getRouteList();
	window.addEventListener("route_add", function(event) {
		var d = new Date(document.getElementById("year").innerHTML, document.getElementById("month").innerHTML, document.getElementById("day").innerHTML);
		var tmp = d.format("yyyy-MM-dd");
		mui.openWindow({
			url: "route_add_customer.html",
			id: "route_add_customer",
			extras: {
				setDate: tmp
			}
		});
	});
})

function getRouteList() {

	conditon = {
		type: 'routeSearch',
		staff_code: plus.storage.getItem("staff_code")
	}

	HttpGet(conditon, function(data) {
		if(data == 1) {
			document.getElementById("nodata").style.display = "block";
			document.getElementById("list").style.display = "none";
		} else {
			document.getElementById("nodata").style.display = "none";
			document.getElementById("list").style.display = "block";
			document.getElementById("list").innerHTML = "";
			routeList = [];
			var tmp = new Array();

			console.log(data.data.length);
			for(var i = 0; i < data.data.length; i++) {
				var tmpid = data.data[i].ID;
				if(i < data.data.length - 1) {
					if(tmpid != data.data[i + 1].ID) {
						tmp.push(data.data[i]);
						routeList.push(tmp);
						tmp = new Array();
					} else {
						tmp.push(data.data[i]);

					}
				} else {
					if(data.data.length == 1) {
						tmp.push(data.data[i]);
						routeList.push(tmp);
						tmp = new Array();
					} else if(tmpid != data.data[i - 1].ID) {
						tmp = new Array();
						tmp.push(data.data[i]);
						routeList.push(tmp);
						console.log(routeList.length);
					} else {
						tmp.push(data.data[i]);
						routeList.push(tmp);
						tmp = new Array();
					}
				}
			}
			//			console.log(JSON.stringify(routeList));
			//			mui.each(routeList, function(index, obj) {
			//				if(index < 1)
			//					mui.each(obj, function(i, o) {
			//						if(i < 4)
			//							console.log(JSON.stringify(o));
			//					})
			//			});
			//	showRoute(routeList);
			showRedDot(routeList);
			var ll;
			if(window.sessionStorage.getItem("setDate")) {
				var tmp = window.sessionStorage.getItem("setDate");
				ll = filterRouteList(routeList, window.sessionStorage.getItem("setDate"));
				if(ll.length == 0) {
					showNoData(0);
				} else {
					showRoute(ll);
					//	logDateControl.changedate(2,tmp.split("-")[0],tmp.split("-")[1],tmp.split("-")[2])
				}
				window.sessionStorage.removeItem("setDate");
			} else {
				ll = filterRouteList(routeList, (new Date().getFullYear() + "-" + (new Date().getMonth() > 8 ? (new Date().getMonth() + 1) : "0" + (new Date().getMonth() + 1)) + "-" + (new Date().getDate() > 9 ? new Date().getDate() : "0" + new Date().getDate())));
				if(ll.length == 0) {
					showNoData(0);
				} else {
					showRoute(ll);
				}
			}
		}
	}, function(error) {

	}, "loading");

}

function showNoData(i) {
	document.getElementById("nodata").style.display = "block";
	document.getElementById("list").style.display = "none";
	document.querySelectorAll("[_oldcls='unSelectDay']")[i].querySelector("i").style.display = 'none';
	//showRoute(tmplist);
}

function showRedDot(routeList) {
	var ddd = logDateControl.getdate();

	for(var i = 0; i < ddd.length; i++) {
		var d;
		var tm;
		var td;
		if(ddd[i].month < 9) {
			tm = "0" + (ddd[i].month + 1);
		} else {
			tm = (ddd[i].month + 1);
		}
		if(ddd[i].day < 10) {
			td = "0" + ddd[i].day;
		} else {
			td = ddd[i].day;
		}
		d = new Date(ddd[i].year, tm, td);
		//		var tmp = d.toLocaleDateString().replace(new RegExp("/", 'g'), "-");
		var tmp = ddd[i].year + "-" + tm + "-" + td;
		var tmplist = filterRouteList(routeList, tmp);

		if(tmplist.length > 0) {
			//$("[_oldcls='unSelectDay']").eq(i).find("i").css("display", "block");
			//showRoute(tmplist);
			document.querySelectorAll("[_oldcls='unSelectDay']")[i].querySelector("i").style.display = "block";
		}
	}

}

function filterRouteList(list, sdate) {

	var tmp = [];

	for(var ii = 0; ii < list.length; ii++) {
		if(list[ii].length > 0) {

			if(list[ii][0].ROUTE_DATE == sdate) {

				tmp.push(list[ii]);
			}
		}

	}

	return tmp;

}

function showRoute(routeList) {

	document.getElementById("nodata").style.display = "none";
	document.getElementById("list").style.display = "block";
	document.getElementById("list").innerHTML = '';
	var content = "";
	//编辑菜单
	for(var i = 0; i < routeList.length; i++) {
		console.log(routeList.length);
		console.log(JSON.stringify(routeList));
		var tmp = routeList[i];
		content += '<li style="margin-top: 10px;background: #FFFFFF;" id="li' + i + '"><div style="padding: 5px 5px;"><div><a href="#popover' + i + '" ' + 'id="openPopover" style="position: absolute; right: 10px;height:25px;width:25px;text-align:center"><img src="../../../img/pic_route_bianji.png" class="" id="dropdownMenu1"  style="height:25px;" /></a>';
		content += '<div id="popover' + i + '" ' + 'class="mui-popover" style="margin-top:0px;width:100px;font-size:14px;text-align:center"><ul class="mui-table-view" style="height:auto;" ><li class="mui-table-view-cell modify"  role="presentation" pindex="' + i + '"><a role="menuitem" routeid="' + tmp[0]["ID"] + '" href="#">' + Language.getValue("mainroute[3]") + '</a></li><li class="mui-table-view-cell del"   role="presentation" pindex="' + i + '"><a role="menuitem" routeid="' + tmp[0]["ID"] + '">' + Language.getValue("mainroute[4]") + '</a></li><li class="mui-table-view-cell copy"  role="presentation" pindex="' + i + '"><a role="menuitem" tabindex="-1" href="#">' + Language.getValue("mainroute[5]") + '</a></li></ul></div></div>';

		content += '<div style="padding: 0px 10px;">';
		content += '<img src="../../../img/pic_route_date.png" style="width:20px;height:20px;margin-top: 15px;float: left;" />';
		content += '<span style="margin-left: 5px;float: left;margin-top: 17px;font-size: 16px;font-weight:bold;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;width: 80%;">' + tmp[0]["ROUTE_NAME"] + '</span><br />';
		content += '<div style="clear: left;position: relative;top:5px"><div><span style="color: #CCCCCC;">' + Language.getValue("mainroute[0]") + '</span><span style="margin-left: 5px;margin-top: 5px;">' + tmp[0]["ROUTE_DATE"] + '</span></div></div>';

		content += '<div class="maps" pindex="' + i + '" id="map' + i + '" style="height:200px;margin-top: 10px;margin-left: 10px;margin-right: 10px;"></div><div style="position:relative;float: right; top: 8px;right: 5px;"><a class="detail" pindex="' + i + '"  style="margin-bottom: 10px; margin-right: 5px;font-size:12px;text-decoration: underline;color: #CCCCCC;padding-right: 5px;">' + Language.getValue("mainroute[2]") + '</a></div>';
		content += '<div style="width: 70%;"><div class="mui-table-view-cell mui-collapse" ><a class="mui-navigate-right" href="#" >'+Language.getValue("mainroute[1]")+'</a><div class="mui-collapse-content"><div class="well" style="background: #FFFFFF;"><ul>'
		for(var j = 0; j < tmp.length; j++) {
			console.log("tmplength=>>" + tmp.length);
			if(tmp.length == 1) {
				content += '<li style="clear: both;display:flex;"><img src="../../../img/pic_route_dot_1.png" style="width:12px;height:12px;float: left;margin-top: 5px;" /><span style="float: left;margin-left: 5px;margin-top: 1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:90%;">' + tmp[j]["STORE_NAME"] + '</span></li>';
			} else {
				if(j == 0) {
					console.log("diyi-----")
					content += '<li style="clear: both;line-height: 40px;display:flex;"><img src="../../../img/pic_route_dot.png" style="width:12px;height:25px;float: left;margin-top: 15px;" /><span style="float: left;margin-left: 5px;margin-top: 1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:90%;">' + tmp[j]["STORE_NAME"] + '</span></li>';
				} else if(j == (tmp.length - 1)) {
					console.log("zuihou-----")
					content += '<li style="clear: both;line-height: 40px;display:flex;"><img src="../../../img/pic_route_dot_reverse.png" style="width:12px;height:25px;float: left;margin-top: 2px;" /><span style="float: left;margin-left: 5px;margin-top: 1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:90%;">' + tmp[j]["STORE_NAME"] + '</span></li>';
				} else {
					console.log("zhongjian-----")
					content += '<li style="clear: both;line-height: 40px;display:flex;"><img src="../../../img/pic_route_dots.png" style="width:12px;height:40px;float: left;margin-top: 2px;" /><span style="float: left;margin-left: 5px;margin-top: 1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:90%;">' + tmp[j]["STORE_NAME"] + '</span></li>';
				}
			}
		}

		content += '</ul></div></div></div></div></div></div></div></li>';
		//	initMap(i,routeList);

	}

	document.getElementById("list").innerHTML = content;
	for(var i = 0; i < routeList.length; i++) {
		initMap(i, routeList);
	}
	//	$(".del").on("tap", function() {
	//		delRoute(this);
	//	});

	mui('.mui-table-view').on('tap', '.del', function(e) {

		delRoute(this);
	})

	//	document.getElementsByClassName("del").addEventListener("tap",function(){
	//		alert(this);
	//	});
	$(".maps").on("click", function() {
		ditem = routeList[$(this).attr("pindex")];
		var mlist = routeList[$(this).attr("pindex")];
		mui.openWindow({
			url: "routedetail.html",
			id: "routedetail",
			extras: {
				ditem: ditem
			}
		})
	});

	$(".detail").on("tap", function() {
		//gotoDetail(routeList[(this).attr("pindex")]);
		ditem = routeList[$(this).attr("pindex")];
		mui.openWindow({
			url: "routedetail.html",
			id: "routedetail",
			extras: {
				ditem: ditem
			}
		})
	});

	mui('.mui-table-view').on('tap', '.modify', function() {

		var mlist = routeList[this.getAttribute("pindex")];
		mui.openWindow({
			url: "route_add_customer.html",
			id: "route_add_customer",
			extras: {
				modify: 1,
				routeid: mlist[0].ID,
				modifyList: JSON.stringify(mlist),
				setDate: mlist[0].ROUTE_DATE
			}
		});
	})

	mui('.mui-table-view').on('tap', '.copy', function() {
		mui('#popover' + this.getAttribute("pindex")).popover('hide');
		ditem = routeList[this.getAttribute('pindex')];
		document.querySelector("#datesel").style.display = "block";
		document.querySelector("#data_sel").style.display = "block";

		var lan = "cn";

		if(plus.storage.getItem("language") != "cn") {
			lan = "en";
		}

		if(dateRange1 != null) {
			document.querySelector("#" + dateRange1.calendarId).remove();
		}

		dateRange1 = new pickerDateRange("data_sel",  {
			stopToday: false,
			isTodayValid: true,
			startDate: '',
			endDate: '',
			needCompare: false,
			defaultText: '$',
			autoSubmit: false,
			theme: 'ta',
			isSingleDay: true,
			language: lan
		}, function(result) {

			if(result == "cancel") {
				$("#date_sel").hide();
				$("#datesel").hide();
				//	
				console.log("calender hide");
				document.querySelector("#" + dateRange1.calendarId).style.display = "none";
				return;
			}
			if(result != '' && result != '$') {
				document.querySelector("#datesel").style.display = "none";
				var day = result.split("$");
				copyRoute(day[0]);
				$("#date_sel").hide();
				$("#datesel").hide();
				//	$("#"+dateRange1.calendarId).remove();
			}

		});
		dateRange1.show(false, "data_sel");
	});

	//	$(".modify").on("tap", function() {
	//		window.sessionStorage.setItem("modifyroute", "1");
	//		var mlist = routeList[$(this).attr("pindex")];
	//		console.log(JSON.stringify(mlist));
	//		window.sessionStorage.setItem("modifyList", JSON.stringify(mlist));
	//		window.sessionStorage.setItem("routeid", mlist[0].ID);
	//		console.log(mlist[0].ID);
	//		window.sessionStorage.setItem("setDate", mlist[0].ROUTE_DATE);
	//		console.log(mlist[0].ID + '======' + mlist[0].ROUTE_DATE);
	//		window.sessionStorage.setItem("routetype", "1");
	//		window.localStorage.removeItem("svalue_route");
	//		window.localStorage.removeItem("channel_code_route");
	//		window.localStorage.removeItem("cust_code_route");
	//		window.localStorage.setItem("list_filter_route", "distance");
	//		$.mobile.changePage("route_add_customer.html");
	//	});

	//	$(".detail").on("tap", function() {
	//		//gotoDetail(routeList[(this).attr("pindex")]);
	//		ditem = routeList[$(this).attr("pindex")];
	//		var mlist = routeList[$(this).attr("pindex")];
	//		window.sessionStorage.setItem("setDate", mlist[0].ROUTE_DATE);
	//		$.mobile.changePage("routedetail.html");
	//	});
	//	$(".maps").on("click", function() {
	//		ditem = routeList[$(this).attr("pindex")];
	//		var mlist = routeList[$(this).attr("pindex")];
	//		window.sessionStorage.setItem("setDate", mlist[0].ROUTE_DATE);
	//		$.mobile.changePage("routedetail.html");
	//	});
	//	$(".copy").on("tap", function(e) {
	//		e.preventDefault();
	//		document.getElementsByClassName("dropdown open")[0].className = "dropdown";
	//		ditem = routeList[$(this).attr("pindex")];
	//		$("#datesel").show();
	//		$("#data_sel").show();
	//
	//		var lan = "cn";
	//
	//		if(window.localStorage.getItem("language") != "chinese") {
	//			lan = "en";
	//		}
	//
	//		if(dateRange1 != null) {
	//			$("#" + dateRange1.calendarId).remove();
	//		}
	//
	//		dateRange1 = new pickerDateRange("data_sel", 'rute', {
	//			stopToday: false,
	//			isTodayValid: true,
	//			startDate: '',
	//			endDate: '',
	//			needCompare: false,
	//			defaultText: '$',
	//			autoSubmit: false,
	//			theme: 'ta',
	//			isSingleDay: true,
	//			language: lan
	//		}, function(result) {
	//
	//			if(result == "cancel") {
	//				$("#date_sel").hide();
	//				$("#datesel").hide();
	//				//	
	//				console.log("calender hide");
	//				$("#" + dateRange1.calendarId).css("display", "none");
	//				return;
	//			}
	//			if(result != '' && result != '$') {
	//				$("#datesel").hide();
	//				var day = result.split("$");
	//				copyRoute(day[0]);
	//				$("#date_sel").hide();
	//				$("#datesel").hide();
	//				//	$("#"+dateRange1.calendarId).remove();
	//			}
	//
	//		});
	//		dateRange1.show(false, "data_sel");
	//
	//	});
	//	$("#datesel").on("tap", function() {
	//		$("#datesel").hide();
	//	});
	//	$("#data_sel").on("tap", function(e) {
	//		e.preventDefault();
	//		e.stopPropagation();
	//	});
}

function delRoute(t) {
	mui('#popover' + t.getAttribute("pindex")).popover('hide'); //show hide toggle
	var conditon = {
		type: 'routeDelete',
		id: t.querySelector("a").getAttribute("routeid")
	}
	HttpGet(conditon, function() {
		document.querySelector("#li" + t.getAttribute("pindex")).remove();
		for(var i = 0; i < routeList.length; i++) {
			if(routeList[i][0]["ID"] == t.querySelector("a").getAttribute("routeid")) {
				routeList.splice(i, 1);
			}
		}
		//			if($("#list").children().length == 0) {
		//				$("#nodata").show();
		//				$("#list").hide();
		//			} else {
		//				$("#nodata").hide();
		//				$("#list").show();
		//			}
		var tmp = filterRouteList(routeList, document.querySelector("#year").innerHTML + "-" + (parseInt(document.querySelector("#month").innerHTML) > 8 ? (parseInt(document.querySelector("#month").innerHTML) + 1) : "0" + (parseInt(document.querySelector("#month").innerHTML) + 1)) + "-" + (parseInt(document.querySelector("#day").innerHTML) > 9 ? parseInt(document.querySelector("#day").innerHTML) : "0" + parseInt(document.querySelector("#day").innerHTML)));
		if(tmp.length == 0) {
			showNoData(document.querySelector("#index").innerHTML);
		} else {
			showRoute(tmp);
		}
	}, function() {

	}, "loading");

	//	$.ajax({
	//		type: "get",
	//		url: Init.appurl + 'ivisit_mobile/servlet/MobileUploadServlet?type=routeDelete&id=' + $(t).find("a").attr("routeid"),
	//		success: function(data) {
	//			$("#li" + $(t).attr("pindex")).remove();
	//			for(var i = 0; i < routeList.length; i++) {
	//				if(routeList[i][0]["ID"] == $(t).find("a").attr("routeid")) {
	//					routeList.splice(i, 1);
	//				}
	//			}
	//			console.log($("#list").children().length);
	//			//			if($("#list").children().length == 0) {
	//			//				$("#nodata").show();
	//			//				$("#list").hide();
	//			//			} else {
	//			//				$("#nodata").hide();
	//			//				$("#list").show();
	//			//			}
	//			var tmp = filterRouteList(routeList, $("#year").html() + "-" + (parseInt($("#month").html()) > 8 ? (parseInt($("#month").html()) + 1) : "0" + (parseInt($("#month").html()) + 1)) + "-" + (parseInt($("#day").html()) > 9 ? parseInt($("#day").html()) : "0" + parseInt($("#day").html())));
	//			if(tmp.length == 0) {
	//				showNoData($("#index").html());
	//			} else {
	//				showRoute(tmp);
	//			}
	//
	//		},
	//		error: function() {
	//			//alert("eee");
	//		}
	//	});
}

function copyRoute(da) {
	var storeCode = "";
	var routeName = "";

	for(var i = 0; i < ditem.length; i++) {
		storeCode += ditem[i].STORE_CODE + "#";
	}
	storeCode = storeCode.substr(0, storeCode.length - 1);
	var qurl;
	var d = new Date($("#year").html(), $("#month").html(), $("#day").html());
	var tmp = d.format("yyyy-MM-dd");
	var condition = {
		type: "routeSubmit",
		store_code: storeCode,
		route_date: da
	}
	HttpGet(condition, function(data) {
		if(data == 2) {
			plus.nativeUI.alert("保存失败",null,"",Language.getValue("customerSearchPop1Condition[2]"));
		}
		getRouteList();
	}, function() {}, "loading");

	//	qurl = Init.appurl + 'ivisit_mobile/servlet/MobileUploadServlet?type=routeSubmit&staff_code=' + encodeURI(window.localStorage.getItem("staff_code")) + '&email=' + encodeURI(window.localStorage.getItem("_email1")) +
	//		'&store_code=' + encodeURIComponent(storeCode) + '&route_date=' + da;
	//
	//	console.log(qurl);
	//	$.ajax({
	//		type: "post",
	//		url: qurl,
	//		async: true,
	//		success: function(data) {
	//			//logDateControl.changedate(0);
	//			if(data == 2) {
	//				navigator.notification.confirm(
	//					saveRouteFailed(),
	//					ensure,
	//					getStringTips(),
	//					getStringOk());
	//				return;
	//			}
	//			getRouteList();
	//		},
	//		error: function() {
	//			//alert("err");
	//		}
	//	});
}

function pre() {
	logDateControl.changedate(-1);
	console.log(JSON.stringify(routeList));
	showRedDot(routeList);
}

function next() {
	logDateControl.changedate(1);
	console.log(JSON.stringify(routeList));
	showRedDot(routeList);
}

function getImgUrl(channel_code) { // 创建图标对象
	console.log("创建图标对象:"+channel_code);
	if(channel_code == 'H' || channel_code == 'LS') {
		return "../../../img/big.png";
	} else if(channel_code == 'SS' || channel_code == 'CVS' || channel_code == 'Gro' || channel_code == 'Cos/HD' || channel_code == 'W') {
		return "../../../img/small.png";
	} else {
		return "../../../img/other.png";
	}

}

function initMap(index, routeList) {
	// 百度地图API功能
	var maps = [];
	var tmp = routeList[index];
	var map = new BMap.Map("map" + index);

	map.centerAndZoom(new BMap.Point(parseFloat(tmp[0]["PICTURE_YY"]), parseFloat(tmp[0]["PICTURE_XX"])), 15);
//	map.disableScrollWheelZoom();
//	map.disableDoubleClickZoom();
//	map.disablePinchToZoom();
//	map.disableDragging();
	maps.push(map);
	console.log("mao....");
	//var tmp = routeList[index];

	//		label.setStyle({
	//			 color : "red",
	//			 fontSize : "12px",
	//			 height : "20px",
	//			 lineHeight : "20px",
	//			 fontFamily:"微软雅黑"
	//		 });

	if(tmp.length == 1) {
		var p1 = new BMap.Point(parseFloat(tmp[0]["PICTURE_YY"]), parseFloat(tmp[0]["PICTURE_XX"]));
		console.log("tmp.length==1的时候CHANNEL_CODE:"+tmp[0].CHANNEL_CODE);
		var myIcon = new BMap.Icon(getImgUrl(tmp[0].CHANNEL_CODE),
			new BMap.Size(28, 46), {

				anchor: new BMap.Size(7, 20),
			});
		setImageSize(tmp[0].CHANNEL_CODE, myIcon);

		var marker = new BMap.Marker(p1, {
			icon: myIcon
		}); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
		var label = new BMap.Label(tmp[0]["STORE_NAME"], {
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
	} else {
		var p1 = new BMap.Point(parseFloat(tmp[0]["PICTURE_YY"]), parseFloat(tmp[0]["PICTURE_XX"]));
		console.log(" CHANNEL_CODE:"+tmp[0].CHANNEL_CODE);
		var myIcon = new BMap.Icon(getImgUrl(tmp[0].CHANNEL_CODE),
			new BMap.Size(28, 46), {

				anchor: new BMap.Size(7, 20),
			});
		setImageSize(tmp[0].CHANNEL_CODE, myIcon);
		var marker = new BMap.Marker(p1, {
			icon: myIcon
		}); // 创建标注
		map.addOverlay(marker); // 将标注添加到,地图中
		var label = new BMap.Label(tmp[0]["STORE_NAME"], {
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

		var p2 = new BMap.Point(parseFloat(tmp[tmp.length - 1]["PICTURE_YY"]), parseFloat(tmp[tmp.length - 1]["PICTURE_XX"]));
		console.log("CHANNEL_CODE:"+tmp[0].CHANNEL_CODE);
		var myIcon = new BMap.Icon(getImgUrl(tmp[tmp.length - 1].CHANNEL_CODE),
			new BMap.Size(28, 46), {

				anchor: new BMap.Size(7, 20),
			});
		setImageSize(tmp[tmp.length - 1].CHANNEL_CODE, myIcon);
		var marker = new BMap.Marker(p2, {
			icon: myIcon
		}); // 创建标注
		map.addOverlay(marker); // 将标注添加到地图中
		var label = new BMap.Label(tmp[tmp.length - 1]["STORE_NAME"], {
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

		var wayps = [];
		for(var i = 1; i < tmp.length - 1; i++) {
			var tmppoint = new BMap.Point(parseFloat(tmp[i]["PICTURE_YY"]), parseFloat(tmp[i]["PICTURE_XX"]));
			var myIcon = new BMap.Icon(getImgUrl(tmp[i].CHANNEL_CODE),
				new BMap.Size(28, 46), {

					anchor: new BMap.Size(7, 20),
				});
			setImageSize(tmp[i].CHANNEL_CODE, myIcon);
			var marker = new BMap.Marker(tmppoint, {
				icon: myIcon
			}); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			var label = new BMap.Label(tmp[i]["STORE_NAME"], {
				offset: new BMap.Size(30, 0)
			});
			marker.setLabel(label);

			label.setStyle({
				color: "white",
				fontSize: "12px",
				height: "20px",
				lineHeight: "20px",
				backgroundColor: "#FFC128",
				border: "none",
				fontFamily: "微软雅黑"
			});
			wayps.push(tmppoint);
		}
		var driving = new BMap.DrivingRoute(map, {
			renderOptions: {
				map: map,
				autoViewport: true,

			},
			onMarkersSet: function(routes) {
				//				map.removeOverlay(routes[0].marker); //删除起点
				//				map.removeOverlay(routes[1].marker); //删除终点
				for(var r in routes) {
					map.removeOverlay(routes[r].marker);
				}

				for(var i = 0; i < routes.length; i++) {
					if(i != 0 && i != routes.length - 1) {
						routes[i].Km.Yc.innerHTML = '';
						routes[i].Km.Yc.innerHTML = '';
					}
				}

			}
		});
		driving.search(p1, p2, {
			waypoints: wayps
		}); //waypoints表示途经点
	}

}

var logDateControl = (function() {
	var curSelEl; //当前选中的日期
	var styleData = [],
		dataStyle = {};
	var iyear, imonth, iday;
	var ryear, rmonth, rday;
	var ww = [];
	var syear, smonth, sday;
	var daysList = [];
	//获取指定id的元素
	var $ = function(id) {
		return document.getElementById(id)
	}
	//计算指定日期是第几周（默认为当前日期），该计算方法比较严密准确
	var calWeek = function(dt) {
		var calDay = dt || new Date(); //当前要计算的时间
		var firstDay = new Date(calDay.getFullYear(), 0, 1); //本年第一天
		//计算当前是本年的第几天,00：00为当天开始

		var daysAll = Math.floor((calDay - firstDay) / 1000 / 60 / 60 / 24) + 1;
		//本年第一天星期几
		var firstDayWeekday = firstDay.getDay();
		//该结果加到第一周的周一，便于后面计算
		var diffDay = firstDayWeekday == 0 ? 6 : firstDayWeekday - 1;
		daysAll = daysAll + diffDay;
		return Math.ceil(daysAll / 7); //返回计算结果
	}

	function Tday(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;

	}

	//计算一个月多少天,年份4位数字，月份1-2位数字（应该是js日期格式如1月传入0）,数据非法返回-1
	var getDaysLen = function(year, month) {
		if(!(/^\d{4}$/.test(year) && /^\d{1,2}$/.test(month))) {
			return -1
		}
		var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		//存在2月29日
		if(month == 1 && new Date(year, 1, 29).getMonth() == 1) {
			monthDays[1] = 29
		}
		return monthDays[month]
	}
	//显示日期列表,传入年、月(按日常月份传入。如二月传入2)、及显示位置
	var displayDayList = function(year, month, day, select, pos) {
		daysList = [];
		console.log("-->" + pos);
		var cells1 = $(pos).rows[0].cells;
		var cells2 = $(pos).rows[1].cells;
		var daysArr;
		if(plus.storage.getItem("language")=="cn") {
			daysArr = ['日', '一', '二', '三', '四', '五', '六'];
		} else {
			daysArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		}
		rmonth = imonth = month;
		ryear = iyear = year;
		rday = iday = day;
		console.log("-->" + day);
		if(select < 0) {

			var tmp = false;
			var tyear = year - 1,
				tmonth = month - 1;
			var ey, em;
			ey = year;
			em = month;
			for(var i = day - 6, l = day + 1; i < l; i++) {
				var showday = i;
				var wd = new Date(year, month, i).getDay();
				cells1[i - day + 6].className = "";
				if(i < 1) {
					if(rmonth == 0 && rmonth == month) {
						showday = i + getDaysLen(tyear, 11);
						ey = tyear--;
						em = 11;
					} else if(rmonth == month) {
						showday = i + getDaysLen(year, tmonth);
						em = tmonth;
					} else if(rmonth > month) {
						tmonth = rmonth;
						showday = i + getDaysLen(year, tmonth);
						em = tmonth;
					} else {
						tmonth = month - 1;
						showday = i + getDaysLen(year, tmonth);
						em = tmonth;
					}

				} else {
					em = month;
					ey = year;
				}
				//	rday = showday;
				if(!tmp) {
					if(i < 1) {

						rday = showday;
						if(rmonth == 0 && rmonth == month) {
							ryear--;
							rmonth = 11;
						} else if(rmonth == month) {
							rmonth--;
						}

					} else {
						rday = showday;
					}

					tmp = true;

				}
				var tmpday = new Tday(ey, em, showday);
				console.log(ey + "-" + em + "-" + showday);
				daysList.push(tmpday);

				/*	if(wd == 0 || wd == 6) {
						cells1[i - day + 6].className = "weekEnd";
					} //为周末添加特殊样式 */
				//_oldCls保存当前日期的默认样式 
				cells1[i - day + 6].firstChild.innerText = daysArr[wd];
				cells2[i - day + 6].firstChild.className = "unSelectDay";
				cells2[i - day + 6].firstChild.setAttribute("_oldCls", "unSelectDay");
				//cells2[i - day + 6].innerHTML = showday > 9 ? showday : "0" + showday;
				cells2[i - day + 6].innerHTML = '<span style="position:relative;border-radius: 50%;padding:5px">' + (showday > 9 ? showday : "0" + showday) + '<i></i></span>';
				//匹配用户自定义样式 
				/*        var dtStr=year+"|"+(month+1)+"|"+i; 
						if((","+styleData.join(',')+",").indexOf(","+dtStr+",")>-1){ 
							cells2[i-day].className="unSelectDay "+dataStyle[dtStr]; 
							cells2[i-day].setAttribute("_oldCls","unSelectDay "+dataStyle[dtStr]); 
						} */
				if(i == (day - 3)) {
					$("spanroute_date").innerHTML = (ey + "-" + (em > 8 ? (em + 1) : "0" + (em + 1)));
				}

			}
		} else {
			for(var i = day, l = day + 7; i < l; i++) {
				var showday = i;
				var wd = new Date(year, month, i).getDay();
				cells1[i - day].className = "";
				if(i > getDaysLen(year, month)) {
					showday = i - getDaysLen(year, month);
					iday = showday;
					if(imonth == 11 && imonth == month) {
						iyear++;
						imonth = 0;
					} else if(imonth == month) {
						imonth++;
					}
				} else {
					iday = showday;
				}

				var tmpday = new Tday(iyear, imonth, showday);
				console.log(iyear + "-" + imonth + "-" + showday);
				daysList.push(tmpday);

				/*		if(wd == 0 || wd == 6) {
				 cells1[i - day].className = "weekEnd";
				 } //为周末添加特殊样式 */
				//_oldCls保存当前日期的默认样式
				cells1[i - day].innerText = daysArr[wd];
				cells2[i - day].className = "unSelectDay";
				cells2[i - day].setAttribute("_oldCls", "unSelectDay");
				//				//cells2[i - day].innerHTML = showday > 9 ? showday : "0" + showday;
				cells2[i - day].innerHTML = '<span style="position:relative;border-radius: 50%;padding:5px">' + (showday > 9 ? showday : "0" + showday) + '<i></i></span>';
				//匹配用户自定义样式
				/*        var dtStr=year+"|"+(month+1)+"|"+i;
				 if((","+styleData.join(',')+",").indexOf(","+dtStr+",")>-1){
				 cells2[i-day].className="unSelectDay "+dataStyle[dtStr];
				 cells2[i-day].setAttribute("_oldCls","unSelectDay "+dataStyle[dtStr]);
				 } */

				if(i == (day + 3)) {
					$("spanroute_date").innerHTML = (iyear + "-" + (imonth > 8 ? (imonth + 1) : "0" + (imonth + 1)));
				}
			}
		}

		//如果是当前月则选中当日
		if(select == 0) {
			if((new Date().getFullYear() == year) && (new Date().getMonth() == month)) {
				for(var i = 0; i < 7; i++) {
					if(cells2[i].innerText == (new Date().getDate())) {
						curSelEl = cells2[i];
						curSelEl.firstChild.className = "selectDay";

						break;
					}
				}

			}
		} else {
			if(select < 0) {
				if((parseInt($("year").innerHTML) == ryear) && (parseInt($("month").innerHTML) == rmonth)) {
					for(var i = 0; i < 7; i++) {
						if(cells2[i].innerText == parseInt($("day").innerHTML)) {
							curSelEl = cells2[i];
							curSelEl.firstChild.className = "selectDay";

							break;
						}
					}
				}
			} else {
				if((parseInt($("year").innerHTML) == year) && (parseInt($("month").innerHTML) == month)) {
					for(var i = 0; i < 7; i++) {
						if(cells2[i].innerText == parseInt($("day").innerHTML)) {
							curSelEl = cells2[i];
							curSelEl.firstChild.className = "selectDay";

							break;
						}
					}

				}
			}

		}
		/*  for(var j=i-1;j<31;j++){
		 cells1[j].className=cells2[j].className="";
		 cells1[j].innerHTML=cells2[j].innerHTML="  ";
		 
		 } */
		//		$(pos).tap = function(e) {
		//
		//			changeInfo(e, daysList);
		//		}

		document.getElementById(pos).onclick = function(e) {
			changeInfo(e, daysList);
		}

	}
	//根据选择的值进行处理周次和周几的调整,可以直接传入保存日期内容的dom元素，或者函数根据点击位置判断
	var changeInfo = function(e, daysList) {
		e = e || event;
		var el = e.target || e.srcElement || e; //最后一个e：可能是传入的对象
		var day = el.innerText;
		if(e.srcElement.tagName == "SPAN") {
			el = e.srcElement.parentElement;
		}
		if(!/^\d{1,2}$/.test(day)) return; //如果不是日期什么都不做
		//恢复之前选中日期的样式
		if(curSelEl) {
			curSelEl.firstChild.className = curSelEl.getAttribute("_oldCls")
		}
		curSelEl = el; //保存当前处理的元素
		//更新选中日期的样式

		//	el = e.target;
		//		el.className = "selectDay";
		//		e1.find("span").Style("position:relative;border-radius: 50%;padding:5px;background: #FFC128;");
		el.firstChild.className = "selectDay";
		console.log("change===>" + daysList[el.cellIndex].year + daysList[el.cellIndex].month + daysList[el.cellIndex].day);
		$("day").innerHTML = daysList[el.cellIndex].day;
		$("year").innerHTML = daysList[el.cellIndex].year;
		$("month").innerHTML = daysList[el.cellIndex].month;
		$("index").innerHTML = el.cellIndex;
		var tmp = filterRouteList(routeList, daysList[el.cellIndex].year + "-" + (daysList[el.cellIndex].month > 8 ? (daysList[el.cellIndex].month + 1) : "0" + (daysList[el.cellIndex].month + 1)) + "-" + (daysList[el.cellIndex].day > 9 ? daysList[el.cellIndex].day : "0" + daysList[el.cellIndex].day));
		if(tmp.length == 0) {
			showNoData(el.cellIndex);
		} else {
			showRoute(tmp);
		}
		$("spanroute_date").innerHTML = ($("year").innerHTML + "-" + (daysList[el.cellIndex].month > 8 ? (daysList[el.cellIndex].month + 1) : "0" + (daysList[el.cellIndex].month + 1)));
		/*//更新信息
		 $("day").value = day; //日期
		 $("weekday").value = ['日', '一', '二', '三', '四', '五', '六'][dt.getDay()]; //星期几
		 //					$("week").value = calWeek(dt); //第几周 */
	}

	//初始化

	/*		window.onload = function() {
	 var daysArr = ['日', '一', '二', '三', '四', '五', '六'];
	 var curDate = new Date(),
	 curYear = curDate.getFullYear();
	 
	 var day = curDate.getDay();
	 console.log("day============="+day);
	 
	 displayDayList(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 1, "daysList");
	 };
	 */

	//对外设定样式的接口。
	//格式：([2007,10,12],"color:#f00") ([[2007,10,20],[2007,11,25]],"color:#00f")
	//如果月份小于10不要带0
	/*   var setDateStyle=function(dateArr,style){
	 if(typeof dateArr!="object")return;
	 if(dateArr instanceof Array){
	 if(dateArr[0] instanceof Array){
	 for(var i=0;i<dateArr.length;i++) setDateStyle(dateArr[i],style);
	 }
	 var dataStr=dateArr.join('|');
	 styleData.push(dataStr);
	 dataStyle[dataStr]=style;
	 return;
	 }
	 } */
	var getdate = function() {
		return daysList;
	}

	var changedate = function(next) {
		if(next < 0) {
			displayDayList(ryear, rmonth, rday - 1, next, "daysList");
		} else if(next == 0) {
			var curDate = new Date();
			//displayDayList(2017, 11, 27, 1, "daysList");
			displayDayList(curDate.getFullYear(), curDate.getMonth(), curDate.getDate(), 1, "daysList");
		} else {
			displayDayList(iyear, imonth, iday + 1, next, "daysList");
		}
		showRedDot(routeList);
	}

	//对外接口
	return {
		changedate: changedate,
		getdate: getdate

	}
})();