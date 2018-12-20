var store_code;
var condition;

mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	store_code = w.store_code;
	console.log("store_code:" + store_code);
	condition = {
		type: "accreditingDetail",
		store_code: store_code
	};
	getGradeDetail();
})

function getGradeDetail() {
	HttpGet(condition, function(jsonStr) {

		if(jsonStr == 0) {
			$("#gradelist").html("");
		} else if(jsonStr == 1) {
			$("#gradelist").html("");
		} else {
			if(jsonStr.length > 0) {
				var contentHtml = "";
				for(var i = 0; i < jsonStr.length; i++) {
					var tmp = getGradeUser(jsonStr[i].Infos);
					if(tmp.length > 0) {
						contentHtml += '<li><div style="width: 100%;height: 1px;background-color: #CCCCCC;margin-top: 2px;"></div><div style="padding-left:5px">' +
							jsonStr[i].GroupName +
							'</div><div style="width: 100%;height: 1px;background-color: #CCCCCC;margin-top: 2px;"></div><div id="">';
						contentHtml += '<ul style="width: 100%;">';
						for(var j = 0; j < tmp.length; j++) {
							contentHtml += '<li  style="margin-right:5px" ><div style="padding-left:5px"><div id="" style="float: left;width: 60px;height: 120px;margin-top: 5px;">';
							contentHtml += '<img src="' + tmp[j].ImageUrl + '" style="width: 60px;" /></div>';
							contentHtml += '<div style="margin-left: 60px;height: 120px;margin: 5px 5px;"><div style="display: flex;flex-direction:row;justify-content: space-between;padding: 5px 5px;"><div style="display: flex;"><div id="">' +
								tmp[j].Name +
								'</div>';
							contentHtml += '<img src="../../../img/phone1.png" style="width: 15px;height: 15px;display: inline-flex;margin-left: 10px;margin-top:3px" /><a href="tel:' + tmp[j].Phone + '" style="text-decoration: underline;color: #FF8A00;"><div style="color: #FF8A00;">' +
								tmp[j].Phone +
								'</div></a>';
							if(tmp[j].Score == '0') {
								contentHtml += '</div><div style="color: #FF8A00;">' + Language.getValue("point[1]") + '</div></div>';

							} else {
								contentHtml += '</div><div style="color: #FF8A00;">' + tmp[j].Score + Language.getValue("point[0]") + '</div></div>';

							}
							contentHtml += '<div style="display: inline-flex;flex-direction: row;padding: 0px 0px;">' +
								'<div style="margin: 0px 5px;font-size:12px">' +
								tmp[j].StaffType +
								'</div></div>';
							contentHtml += '<div style="display: flex;flex-direction: row;padding: 0px 0px;">' +
								'<img src="../../../img/work03.png" style="width: 14px;height: 14px;display: inline;margin-left: 7px;" />' +
								'<div style="margin: 0px 5px;font-size:12px">' +
								tmp[j].WorkType +
								'</div></div>';
							contentHtml += '<div style="display: flex;flex-direction: row;padding: 0px 5px;">' +
								'<img src="../../../img/work.png" style="width: 20px;height: 20px;display: inline;" />' +
								'<div style="font-size:12px">' +
								tmp[j].WorkTime +
								'</div></div>';
							contentHtml += '<div style="display: flex;flex-direction: row;justify-content: space-between;padding: 0px 5px;">' +
								'<div style="display: flex;">' +
								'<img src="../../../img/eat.png" style="width: 20px;height: 20px;display: inline;" />' +
								'<div style="margin: auto;font-size:12px;white-space:nowrap">' +
								tmp[j].EatTime +
								'</div>' +
								'</div>' +
								'<div style="display: flex;" onclick="openGradeSub(' + JSON.stringify(tmp[j]).replace(/\"/g, "'") + "," + JSON.stringify(jsonStr[i].GroupName).replace(/\"/g, "'") + ');">';
							var iii = parseFloat(tmp[j].Score).toFixed(0);

							for(var m = 0; m < iii; m++) {
								contentHtml += '<img src="../../../img/starsybig.png" style="width: 20px;height: 20px;display: inline-flex;" />';
							}
							for(var n = 0; n < (5 - iii); n++) {
								contentHtml += '<img src="../../../img/star.png" style="width: 20px;height: 20px;display: inline-flex;" />';

							}
							contentHtml += '</div></div>';
							contentHtml += '</div></div><div style="width: 100%;height: 1px;background-color: #CCCCCC;"></div></li>'

						}
						contentHtml += '</ul></div></li>'
					}
				}
				$("#gradelist").html(contentHtml);

			} else {
				$("#gradelist").html("");
			}
		}

	}, function() {}, "loading");
}

function getGradeUser(infos) {
	var arr = [];
	for(var ii = 0; ii < infos.length; ii++) {
		if(infos[ii].Users != null && infos[ii].Users.length > 0) {
			for(var jj = 0; jj < infos[ii].Users.length; jj++) {
				arr.push(infos[ii].Users[jj]);
			}
		}
	}
	return arr;
}

function openGradeSub(inf, name) {
	info = eval(inf);
	//window.sessionStorage.setItem("gradeinf", JSON.stringify(inf));
	groupName = name;
	if(info.WorkStatus != "Y") {
		plus.nativeUI.alert(Language.getValue("grade[3]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
		return;
	}
	var conditon = {
		type: "checkDistance",
		store_code: store_code,
		latitude: "",
		lontitude: "",
		assess_user: info.Code,
		staff_code: plus.storage.getItem("staff_code")
	};

	plus.geolocation.getCurrentPosition(function(p) {
		//将坐标信息缓存,除非重新获取.
		plus.storage.setItem("geolocation", JSON.stringify(p));
		//启动循环..每隔20分钟计算.如果坐标改变过大则自动刷新列表
		//请求门店数据...
		conditon.latitude = p.coords.latitude;
		conditon.lontitude = p.coords.longitude;
		HttpGet1(conditon, function(data) {
			if(data == "Y") {
				mui.openWindow({
					url: "gradesubmit.html",
					id: "gradesubmit",
					extras: {
						info: info,
						groupName: groupName,
						storeCode: store_code
					}
				});
				
			} else if(data == "N") {
				plus.nativeUI.alert(Language.getValue("grade[7]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			} else {
				plus.nativeUI.alert(Language.getValue("grade[8]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			}
		}, function(data) {})
	}, function(e) {
		plus.nativeUI.alert(Language.getValue("grade[7]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
	}, {
		enableHighAccuracy: true,
		provider: 'baidu',
		coordsType: "bd09ll"
	});
}