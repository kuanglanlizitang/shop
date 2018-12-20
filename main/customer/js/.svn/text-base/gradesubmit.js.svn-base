var store_code;
var info;
var groupname;
var lables;

mui.plusReady(function() {
	var w = plus.webview.currentWebview();
	store_code = w.storeCode;
	info = w.info;
	groupname = w.groupName;
	initTop(info, groupname);
	//$("#startone").html('<div class="star_score"></div><p style="float:left;display: none;">您的评分：<span class="fenshu"></span> 分</p>');

	setTimeout(function() {
		var ww = plus.webview.getWebviewById("grade");
//		ww.close("none");
	}, 1000);

	scoreFun($("#startone"), {
		fen_d: 70, //每一个a的宽度
		ScoreGrade: 5, //a的个数 10或者
		schange: outerchange
	});
	getLabels();

	document.getElementById('gradesub').addEventListener('tap', function() {
		console.log("点击提交");
		var txt = $("#gradetxt").val();

		var assess_user = info.Code;
		var assess_score = $(".fenshu").text();
		var assess_label = "";
		var assess_content = encodeURI(encodeURI(txt));
		$("#labelspane td").each(function() {
			if($(this).attr("sel") == "1") {
				assess_label += $(this).text() + "$";
			}
		});
		if(assess_label == "" && txt == "") {
			console.log("有空");
			plus.nativeUI.alert(Language.getValue("grade[5]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			return;
		}
	//	assess_label = encodeURI(encodeURI(assess_label));
		var p = eval('(' + plus.storage.getItem("geolocation") + ')');
		var latitude = p.coords.latitude;
		var lontitude = p.coords.longitude;
		var condition = {
			type: "submitAccreditingAssess",
			store_code: store_code,
			assess_user: assess_user,
			assess_score: assess_score,
			assess_label: assess_label,
			assess_content: assess_content,
			latitude: latitude,
			lontitude: lontitude
		}

		HttpGet(condition, function(data) {
			if(data == '0') {
				console.log("提交成功");
				plus.nativeUI.alert(Language.getValue("grade[6]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
				$("#gradetxt").val("");
				mui.back();
			} else if(data == '2') {
				console.log("提交失败了");
				plus.nativeUI.alert(Language.getValue("grade[7]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			} else if(data == '3') {
				console.log("提交过");
				plus.nativeUI.alert(Language.getValue("grade[8]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			}
		}, function() {
			
		}, "loading");

	})

})

function initTop(info, groupname) {
	var contentHtml = '';
	contentHtml += '<div style="width: 100%;height: 1px;background-color: #CCCCCC;margin-top: 2px;"></div><div style="padding-left:5px">' +
		groupname +
		'</div><div style="width: 100%;height: 1px;background-color: #CCCCCC;margin-top: 2px;"></div><div id="">';

	contentHtml += '<div style="padding-left:5px"><div id="" style="float: left;width: 60px;height: 120px;margin-top: 5px;">';
	contentHtml += '<img src="' + info.ImageUrl + '" style="width: 60px;" /></div>';
	contentHtml += '<div style="margin-left: 60px;height: 120px;margin: 5px 5px;"><div style="display: flex;flex-direction:row;justify-content: space-between;padding: 5px 5px;"><div style="display: flex;"><div id="">' +
		info.Name +
		'</div>';
	contentHtml += '<img src="../../../img/phone1.png" style="width: 15px;height: 15px;display: inline-flex;margin-left: 10px;margin-top:3px" /><a href="tel:' + info.Phone + '" style="text-decoration: underline;color: #FF8A00;"><div style="color: #FF8A00;">' +
		info.Phone +
		'</div></a>';
	if(info.Score == '0') {
		contentHtml += '</div><div style="color: #FF8A00;">' + Language.getValue("point[1]") + '</div></div>';
	} else {
		contentHtml += '</div><div style="color: #FF8A00;">' + info.Score + Language.getValue("point[0]") + '</div></div>';
	}
	contentHtml += '<div style="display: inline-flex;flex-direction: row;padding: 0px 0px;">' +
		'<div style="margin: 0px 5px;font-size:12px">' +
		info.StaffType +
		'</div></div>';
	contentHtml += '<div style="display: flex;flex-direction: row;padding: 0px 0px;">' +
		'<img src="../../../img/work03.png" style="width: 14px;height: 14px;display: inline;margin-left: 7px;" />' +
		'<div style="margin: 0px 5px;font-size:12px">' +
		info.WorkType +
		'</div></div>';
	contentHtml += '<div style="display: flex;flex-direction: row;padding: 0px 5px;">' +
		'<img src="../../../img/work.png" style="width: 20px;height: 20px;display: inline;" />' +
		'<div style="font-size:12px">' +
		info.WorkTime +
		'</div></div>';
	contentHtml += '<div style="display: flex;flex-direction: row;justify-content: space-between;padding: 0px 5px;">' +
		'<div style="display: flex;">' +
		'<img src="../../../img/eat.png" style="width: 20px;height: 20px;display: inline;" />' +
		'<div style="margin: auto;font-size:12px">' +
		info.EatTime +
		'</div>' +
		'</div>' +
		'<div style="display: flex;">';
	var iii = parseFloat(info.Score).toFixed(0);

	for(var m = 0; m < iii; m++) {
		contentHtml += '<img src="../../../img/starsybig.png" style="width: 20px;height: 20px;display: inline-flex;" />';
	}
	for(var n = 0; n < (5 - iii); n++) {
		contentHtml += '<img src="../../../img/star.png" style="width: 20px;height: 20px;display: inline-flex;" />';

	}

	contentHtml += '</div></div>';
	contentHtml += '</div></div><div style="width: 100%;height: 1px;background-color: #CCCCCC;"></div>';
	$("#gradesubtop").html(contentHtml);
}

function getLabels() {
	var condition = {
		type: "accreditingAssessLabel"
	}
	HttpGet(condition, function(jsonStr) {
		if(jsonStr == 0) {

		} else if(jsonStr == 1) {

		} else {
			lables = jsonStr;
			$(".star_score a:last").click();
		}
	}, function() {}, "loading");
}

function outerchange(index) {
	var ltm = "";
	for(var i = 0; i < lables.length; i++) {
		if(lables[i].Score == (index + 1)) {
			if(lables[i].Labels != undefined && lables[i].Labels.length > 0) {
				var jj = 0;
				if(lables[i].Labels.length % 2 != 0) {
					jj = parseInt(lables[i].Labels.length / 2) + 1;
				} else {
					jj = lables[i].Labels.length / 2;
				}
			} else {
				return;
			}
			var j = 0;
			var m = 0;
			while(j < lables[i].Labels.length) {
				if(m < jj - 1) {
					ltm += '<tr>';
					ltm += '<td style="height:30px;width: 50%;padding-left:5px;border: 1px solid #000000;font-size:14px;color:#000000;background-color:#FFFFFF">' + lables[i].Labels[j].LabelName + '</td>';
					ltm += '<td style="height:30px;width: 50%;padding-left:5px;border: 1px solid #000000;font-size:14px;color:#000000;background-color:#FFFFFF">' + lables[i].Labels[j + 1].LabelName + '</td>';
					ltm += '</tr>';
				} else {
					if((m + 1) * 2 == lables[i].Labels.length) {
						ltm += '<tr>';
						ltm += '<td style="height:30px;width: 50%;padding-left:5px;border: 1px solid #000000;font-size:14px;color:#000000;background-color:#FFFFFF">' + lables[i].Labels[j].LabelName + '</td>';
						ltm += '<td style="height:30px;width: 50%;padding-left:5px;border: 1px solid #000000;font-size:14px;color:#000000;background-color:#FFFFFF">' + lables[i].Labels[j + 1].LabelName + '</td>';
						ltm += '</tr>';
					} else {
						ltm += '<tr>';
						ltm += '<td style="height:30px;width: 50%;padding-left:5px;border: 1px solid #000000;font-size:14px;color:#000000;background-color:#FFFFFF">' + lables[i].Labels[j].LabelName + '</td>';
						ltm += '<td style="height:30px;width: 50%;padding-left:5px;border: 1px solid #000000;font-size:14px;color:#000000;visibility:hidden"></td>';
						ltm += '</tr>';
					}
				}
				j += 2;
				m++;
			}
		}
	}

	$("#labelspane").html(ltm);
	$("#labelspane td").on("tap", function() {
		if($(this).attr("sel") == "0" || $(this).attr("sel") == null) {
			$(this).css("background-color", "#FFA800");
			$(this).attr("sel", "1");
			return false;
		} else {
			$(this).css("background-color", "#FFFFFF");
			$(this).attr("sel", "0");
			return false;
		}

	});
}