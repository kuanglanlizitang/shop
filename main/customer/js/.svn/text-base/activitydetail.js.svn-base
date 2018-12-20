var dateRange1;
var condition;
var typeName;
var startdate, enddate;
var search;
var store_code;
mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	store_code = w.store_code;
	condition = {
		type: "activityDetailSearch",
		store_code: store_code,
		collect_status: "",
		activity_name: "",
		begin_date: "",
		end_date: "",
		language: "",
	}
	initCalender();

	if(document.getElementById("div_ca") != null) {
		if(document.getElementById("div_ca").getAttribute("name") != null &&
			document.getElementById("div_ca").getAttribute(
				"name") != '') {
			document.getElementById("div_ca").style.backgroundImage = 'url(../../../img/map_footer3.png)';
//			document.getElementById("active_ts").style.display = "block";
		} else {
			document.getElementById("div_ca").style.backgroundImage = 'none';
//			document.getElementById("active_ts").style.display = "none";	                  
		}
	}

	startdate = "";
	enddate = "";
	typeName = "已开档";
	search = "";
	getActivityByTypeName(typeName);
	document.getElementById('key_search_store').addEventListener('tap', function() {
		search = $("#comm_inputt_store").val();
		condition.activity_name = search;
		getActivityByTypeName(typeName);
	})

	$('#comm_inputt_store').on('touchstart', function() {
		$(this).focus();
	});

})

function initCalender() {
	if(plus.storage.getItem("language") != "cn") {
		lan = "en";
	} else {
		lan = "cn";
	}
	dateRange1 = new pickerDateRange(
		'div_ca', {
			stopToday: false,
			isTodayValid: true,
			startDate: '',
			endDate: '',
			needCompare: false,
			defaultText: '$',
			autoSubmit: false,
			inputTrigger: 'input_trigger1',
			theme: 'ta',
			language: lan
		},
		function(result) {
			if(document.getElementById("div_ca") != null) {
				if(document.getElementById("div_ca")
					.getAttribute("name") != null &&
					document.getElementById("div_ca")
					.getAttribute("name") != '') {
					document.getElementById("div_ca").style.backgroundImage = 'url(../../../img/map_footer3.png)';
//					document.getElementById("active_ts").style.display = "block";
				} else {
					document.getElementById("div_ca").style.backgroundImage = 'none';
//					document.getElementById("active_ts").style.display = "none";
					typeName="已开档";
					getActivityByTypeName(typeName);
				};
			}

			if(result == 'cancel') {
				$("#" + dateRange1.calendarId).css("display", "none");
				return;
			}

			if(result != '' && result != '$') {
				setdaterange(result.split("$")[0], result
					.split("$")[1]);
			} else {
				setdaterange("", "");
			}
		});
}

function activityTabClick(actid) {

	if($(actid).attr('id') == "spandate1") {
		if(!$("#spandate1").hasClass("acttabselect")) {
			$("#spandate1").addClass("acttabselect");
		}
		$("#spandate2").removeClass("acttabselect");
		$("#spandate3").removeClass("acttabselect");
		$("#spandate4").removeClass("acttabselect");
		typeName = '已开档';
	} else if($(actid).attr('id') == "spandate2") {
		if(!$("#spandate2").hasClass("acttabselect")) {
			$("#spandate2").addClass("acttabselect");
		}
		$("#spandate1").removeClass("acttabselect");
		$("#spandate3").removeClass("acttabselect");
		$("#spandate4").removeClass("acttabselect");
		typeName = '7天内即将开档';
	} else if($(actid).attr('id') == "spandate3") {
		if(!$("#spandate3").hasClass("acttabselect")) {
			$("#spandate3").addClass("acttabselect");
		}
		$("#spandate2").removeClass("acttabselect");
		$("#spandate1").removeClass("acttabselect");
		$("#spandate4").removeClass("acttabselect");
		typeName = '未开档';
	} else if($(actid).attr('id') == "spandate4") {
		if(!$("#spandate4").hasClass("acttabselect")) {
			$("#spandate4").addClass("acttabselect");
		}
		$("#spandate2").removeClass("acttabselect");
		$("#spandate3").removeClass("acttabselect");
		$("#spandate1").removeClass("acttabselect");
		typeName = '历史活动';
	}
	getActivityByTypeName(typeName);
}

function getActivityByTypeName(name) {
	condition.collect_status = name;
	HttpGet(condition, function(data) {
		if(data == 0) {
			getNoActivity();
		} else if(data == 1) {
			emptyView();
			getNoActivity();
		} else {
			if(data.data.length > 0) {
				document.getElementById("no_storedeactivity").style.display = "none";
				showActivityByTypeName(data.data);
			}
		}
	}, function() {}, "loading");

}

// 没有数据清空界面
function emptyView() {
	agactivityContainer = $("#agactivity_container");
	agactivityContainer.empty();
	isaactivityContainer = $("#isaactivity_container");
	isaactivityContainer.empty();

}

function setdaterange(s, e) {
	this.startdate = s;
	this.enddate = e;
	condition.begin_date = startdate;
	condition.end_date = enddate;
	condition.activity_name = $("#comm_inputt_store").text();
	getActivityByTypeName(typeName);
}

// 绑定数据到界面
function showActivityByTypeName(data) {
	if(data == null) {
		return;
	}
	emptyView();
	for(i = 0; i < data.length; i++) {
		// alert(i);
		if(i == 0) {} else {
			contentHtml += '</div>'
		}
		if(data[i].ACTIVE_TYPE == "AG") {
			var contentHtml = '<div class="activity_itemdiv">'

			if(plus.storage.getItem("language") == "cn") {
				contentHtml += '<div style="float: left;width: 47%;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">' +
					'<div class="scroller-div" style="overflow-x:scroll"><span style="margin-left: 5px;text-align: left;color: #fff">' +
					data[i].SFA_COLLECT_TITLE +
					'</span></div>' +
					'</div>' +
					'<div style="float: left;width: 28%">' +
					'<span style="text-align: center;color: #fff">(' +
					formatTextContent(data[i].COLLECT_STATUS) +
					')</span>' +
					'</div>'

					+
					'<div style="float: left;width: 25%;text-align:right;">' +
					'<span style="text-align: left;color:#fff;margin-bottom:6px;">' +
					data[i].COLLECT_DATE +
					'</span>' +
					'<img id="imgactivityzhedie' +
					i +
					'" onclick="zheqiebiaoge(' +
					i +
					');" style="margin-left:5px;margin-right:2px;width: 14px;position:relative;top:3px;" src="../../../img/pic_activity_jian.png">' +
					'</div>' + '</div>'
			} else {
				contentHtml += '<div style="float: left;width: 35%;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">' +
					'<div class="scroller-div" style="overflow-x:scroll"><span style="margin-left: 5px;text-align: left;color: #fff">' +
					data[i].SFA_COLLECT_TITLE +
					'</span></div>' +
					'</div>' +
					'<div style="float: left;width: 40%">' +
					'<span style="text-align: center;color: #fff">(' +
					formatTextContent(data[i].COLLECT_STATUS) +
					')</span>' +
					'</div>'

					+
					'<div style="float: left;width: 25%;text-align:right;">' +
					'<span style="text-align: left;color:#fff;margin-bottom:6px;">' +
					data[i].COLLECT_DATE +
					'</span>' +
					'<img id="imgactivityzhedie' +
					i +
					'" onclick="zheqiebiaoge(' +
					i +
					');" style="margin-left:5px;margin-right:2px;width: 14px;position:relative;top:3px;" src="../../../img/pic_activity_jian.png">' +
					'</div>' + '</div>'
			}

			contentHtml += '<div id="divagactivitydetail' +
				i +
				'"><div class="psnew_itemdiv_agdetail">' +
				'<span style="margin-left: 7px;color: #666666;display:inline-block;">' +
				data[i].ACTIVE_MECHANISM + '</span>' + '</div>'

			contentHtml += '<table border="0";id="cxtable0";cellspacing="0" class="cxtable2">' +
				'<tbody id="tbody0">' +
				'<tr>' +
				'<td class="cxtabletd1" colspan="2"><span class="cxtabletdspan3">' +
				getActivityfankui() + '</span></td>' + '</tr>'

			if(data[i].EXECUTE_STATUS == "是") {
				contentHtml += '<tr>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan4">' +
					getActivityIsOrNo() +
					'</span></td>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan5">' + getYorN1() + '</span></td>' +
					'</tr>'
			} else if(data[i].EXECUTE_STATUS == "否") {
				contentHtml += '<tr>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan4">' +
					getActivityIsOrNo() +
					'</span></td>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan5">' + getYorN2() + '</span></td>' +
					'</tr>' +
					'<tr>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan4">' +
					getActivityNoReason() +
					'</span></td>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan5">' +
					data[i].CANCEL_REASON + '</span></td>' + '</tr>'
			} else if(data[i].EXECUTE_STATUS == "") {
				contentHtml += '<tr>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan4">' +
					getActivityIsOrNo() +
					'</span></td>' +
					'<td class="cxtabletd1"><span class="cxtabletdspan5"></span></td>' +
					'</tr>'
			}

			contentHtml += '</tbody></table>'

			contentHtml += '<table border="0";id="cxtable0";cellspacing="0" class="cxtable2">' +
				'<tbody id="tbody0">' +
				'<tr>' +
				'<td class="cxtabletd4"><span class="cxtabletdspan3">PMG</span></td>' +
				'<td class="cxtabletd5"><span class="cxtabletdspan3">TG</span></td>' +
				'<td class="cxtabletd3"><span class="cxtabletdspan3">SALES</span></td>' +
				'</tr>' +
				'<tr>' +
				'<td class="cxtabletd1">' +
				'<span class="cxtabletdspan3">' +
				getPlan() +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				getActual() +
				'</span><br>' +
				'<span class="cxtabletdspan3">' +
				data[i].PMG_PLAN +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				data[i].PMG_ACTUAL +
				'</span>' +
				'</td>' +
				'<td class="cxtabletd1">' +
				'<span class="cxtabletdspan3">' +
				getPlan() +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				getActual() +
				'</span><br>' +
				'<span class="cxtabletdspan3">' +
				data[i].DISPLAY_REQUIREMENT_AREA +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				data[i].AREA_ACTUAL +
				'</span>' +
				'</td>' +
				'<td class="cxtabletd1">' +
				'<span class="cxtabletdspan3">' +
				getPlan() +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				getActual() +
				'</span><br>' +
				'<span class="cxtabletdspan3">' +
				data[i].SALES_TARGET +
				'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
				data[i].SALES_ACTUAL +
				'</span>' +
				'</td>' +
				'</tr>' +
				'</tbody>' + '</table>'
			// $("#agactivity_container").html(contentHtml);
			if(data[i].POSM_CONTENT == "") {
				if(data[i].GIFT_CONTENT == "") {} else {
					contentHtml += '<table border="0";id="cxtable0";cellspacing="0" class="cxtable2">' +
						'<tbody id="tbody0">' +
						'<tr>' +
						'<td class="cxtabletd4">' +
						'<span class="cxtabletdspan3">' +
						getType() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getWuzi() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getPlan() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getArrived() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd3">' +
						'<span class="cxtabletdspan3">' +
						getUsed() +
						'</span>' + '</td>' + '</tr>'

					var giftNum = data[i].GIFT_CONTENT.split("$");
					if(giftNum.length == 1) {
						contentHtml += '<tr>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan3">' + getZengpin() + '</span>' +
							'</td>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan3">' +
							splitString(giftNum[0])[0] + '</span>' +
							'</td>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							splitString(giftNum[0])[1] + '</span>' +
							'</td>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							data[i].GIFT_RECEIVED + '</span>' + '</td>' +
							'<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							data[i].GIFT_USED + '</span>' + '</td>' +
							'</tr>'
					} else {
						for(m = 0; m < giftNum.length; m++) {
							if(m == 0) {
								contentHtml += '<tr>' +
									'<td class="cxtabletd1" rowspan="' +
									giftNum.length +
									'">' +
									'<span class="cxtabletdspan3">' + getZengpin() + '</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan3">' +
									splitString(giftNum[0])[0] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(giftNum[0])[1] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1" rowspan="' +
									giftNum.length +
									'">' +
									'<span class="cxtabletdspan7">' +
									data[i].GIFT_RECEIVED +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1" rowspan="' +
									giftNum.length +
									'">' +
									'<span class="cxtabletdspan7">' +
									data[i].GIFT_USED +
									'</span>' +
									'</td>' + '</tr>'
							} else {
								contentHtml += '<tr>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan3">' +
									splitString(giftNum[m])[0] +
									'</span>' + '</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(giftNum[m])[1] +
									'</span>' + '</td>' + '</tr>'
							}

						}
					}
					contentHtml += '</tbody></table>'
				}
			} else {
				if(data[i].KEY_MATERIAL_USED == "") {

					var posmNum = data[i].POSM_CONTENT.split("$");

					contentHtml += '<table border="0";id="cxtable0";cellspacing="0" class="cxtable2">' +
						'<tbody id="tbody0">' +
						'<tr>' +
						'<td class="cxtabletd4">' +
						'<span class="cxtabletdspan3">' +
						getType() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getWuzi() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getPlan() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getArrived() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd3">' +
						'<span class="cxtabletdspan3">' +
						getUsed() +
						'</span>' + '</td>' + '</tr>'

					if(posmNum.length == 1) {
						contentHtml += '<tr>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan3">POSM</span>' +
							'</td>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan3">' +
							splitString(posmNum[0])[0] + '</span>' +
							'</td>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							splitString(posmNum[0])[1] + '</span>' +
							'</td>' + '<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							data[i].POSM_RECEIVED + '</span>' + '</td>' +
							'<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							data[i].POSM_USED + '</span>' + '</td>' +
							'</tr>'

					} else {
						for(k = 0; k < posmNum.length; k++) {
							if(k == 0) {
								contentHtml += '<tr>' +
									'<td class="cxtabletd1" rowspan="' +
									posmNum.length +
									'">' +
									'<span class="cxtabletdspan3">POSM</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan3">' +
									splitString(posmNum[0])[0] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(posmNum[0])[1] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1" rowspan="' +
									posmNum.length +
									'">' +
									'<span class="cxtabletdspan7">' +
									data[i].POSM_RECEIVED +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1" rowspan="' +
									posmNum.length +
									'">' +
									'<span class="cxtabletdspan7">' +
									data[i].POSM_USED +
									'</span>' +
									'</td>' + '</tr>'
							} else {
								contentHtml += '<tr>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan3">' +
									splitString(posmNum[k])[0] +
									'</span>' + '</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(posmNum[k])[1] +
									'</span>' + '</td>' + '</tr>'
							}
						}
					}

					if(data[i].GIFT_CONTENT == "") {
						contentHtml += '</tbody></table>'
					} else {
						var giftNum = data[i].GIFT_CONTENT.split("$");
						if(giftNum.length == 1) {
							contentHtml += '<tr>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan3">' + getZengpin() + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan3">' +
								splitString(giftNum[0])[0] + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan7">' +
								splitString(giftNum[0])[1] + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan7">' +
								data[i].GIFT_RECEIVED + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan7">' +
								data[i].GIFT_USED + '</span>' + '</td>' +
								'</tr>'
						} else {
							for(n = 0; n < giftNum.length; n++) {
								if(n == 0) {
									contentHtml += '<tr>' +
										'<td class="cxtabletd1" rowspan="' +
										giftNum.length +
										'">' +
										'<span class="cxtabletdspan3">' + getZengpin() + '</span>' +
										'</td>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan3">' +
										splitString(giftNum[0])[0] +
										'</span>' +
										'</td>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan7">' +
										splitString(giftNum[0])[1] +
										'</span>' +
										'</td>' +
										'<td class="cxtabletd1" rowspan="' +
										giftNum.length +
										'">' +
										'<span class="cxtabletdspan7">' +
										data[i].GIFT_RECEIVED +
										'</span>' +
										'</td>' +
										'<td class="cxtabletd1" rowspan="' +
										giftNum.length +
										'">' +
										'<span class="cxtabletdspan7">' +
										data[i].GIFT_USED +
										'</span>' +
										'</td>' + '</tr>'
								} else {
									contentHtml += '<tr>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan3">' +
										splitString(giftNum[n])[0] +
										'</span>' + '</td>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan7">' +
										splitString(giftNum[n])[1] +
										'</span>' + '</td>' + '</tr>'
								}

							}
						}

						contentHtml += '</tbody></table>'
					}

				} else {
					var posmNumZhong = data[i].KEY_MATERIAL_USED.split("$");
					// alert(posmNumZhong[0]);
					contentHtml += '<table border="0";id="cxtable0";cellspacing="0" class="cxtable2">' +
						'<tbody id="tbody0">' +
						'<tr>' +
						'<td class="cxtabletd4">' +
						'<span class="cxtabletdspan3">' +
						getType() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getWuzi() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getPlan() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd5">' +
						'<span class="cxtabletdspan3">' +
						getArrived() +
						'</span>' +
						'</td>' +
						'<td class="cxtabletd3">' +
						'<span class="cxtabletdspan3">' +
						getUsed() +
						'</span>' + '</td>' + '</tr>'

					if(posmNumZhong.length == 1) {
						contentHtml += '<tr>' +
							'<td class="cxtabletd1" rowspan="' +
							posmNumZhong.length +
							'">' +
							'<span class="cxtabletdspan3">POSM</span>' +
							'</td>' +
							'<td class="cxtabletd1">' +
							'<span class="cxtabletdspan3">' +
							splitString(posmNumZhong[0])[0] +
							'</span>' +
							'</td>' +
							'<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							splitString2(splitString(posmNumZhong[0])[0],
								data[i].POSM_CONTENT) +
							'</span>' +
							'</td>' +
							'<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							splitString(posmNumZhong[0])[1] +
							'</span>' +
							'</td>' +
							'<td class="cxtabletd1">' +
							'<span class="cxtabletdspan7">' +
							splitString(posmNumZhong[0])[1] +
							'</span>' +
							'</td>' + '</tr>'
					} else {
						for(j = 0; j < posmNumZhong.length; j++) {
							if(j == 0) {
								contentHtml += '<tr>' +
									'<td class="cxtabletd1" rowspan="' +
									posmNumZhong.length +
									'">' +
									'<span class="cxtabletdspan3">POSM</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan3">' +
									splitString(posmNumZhong[0])[0] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString2(
										splitString(posmNumZhong[0])[0],
										data[i].POSM_CONTENT) +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(posmNumZhong[0])[1] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(posmNumZhong[0])[1] +
									'</span>' + '</td>' + '</tr>'
							} else {
								contentHtml += '<tr>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan3">' +
									splitString(posmNumZhong[j])[0] +
									'</span>' +
									'</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString2(
										splitString(posmNumZhong[j])[0],
										data[i].POSM_CONTENT) +
									'</span>' + '</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(posmNumZhong[j])[1] +
									'</span>' + '</td>' +
									'<td class="cxtabletd1">' +
									'<span class="cxtabletdspan7">' +
									splitString(posmNumZhong[j])[1] +
									'</span>' + '</td>' + '</tr>'
							}
						}
					}
					if(data[i].GIFT_CONTENT == "") {
						contentHtml += '</tbody></table>'
					} else {
						var giftNum = data[i].GIFT_CONTENT.split("$");
						if(giftNum.length == 1) {
							contentHtml += '<tr>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan3">' + getZengpin() + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan3">' +
								splitString(giftNum[0])[0] + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan7">' +
								splitString(giftNum[0])[1] + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan7">' +
								data[i].GIFT_RECEIVED + '</span>' +
								'</td>' + '<td class="cxtabletd1">' +
								'<span class="cxtabletdspan7">' +
								data[i].GIFT_USED + '</span>' + '</td>' +
								'</tr>'
						} else {
							for(t = 0; t < giftNum.length; t++) {
								if(t == 0) {
									contentHtml += '<tr>' +
										'<td class="cxtabletd1" rowspan="' +
										giftNum.length +
										'">' +
										'<span class="cxtabletdspan3">' + getZengpin() + '</span>' +
										'</td>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan3">' +
										splitString(giftNum[0])[0] +
										'</span>' +
										'</td>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan7">' +
										splitString(giftNum[0])[1] +
										'</span>' +
										'</td>' +
										'<td class="cxtabletd1" rowspan="' +
										giftNum.length +
										'">' +
										'<span class="cxtabletdspan7">' +
										data[i].GIFT_RECEIVED +
										'</span>' +
										'</td>' +
										'<td class="cxtabletd1" rowspan="' +
										giftNum.length +
										'">' +
										'<span class="cxtabletdspan7">' +
										data[i].GIFT_USED +
										'</span>' +
										'</td>' + '</tr>'
								} else {
									contentHtml += '<tr>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan3">' +
										splitString(giftNum[t])[0] +
										'</span>' + '</td>' +
										'<td class="cxtabletd1">' +
										'<span class="cxtabletdspan7">' +
										splitString(giftNum[t])[1] +
										'</span>' + '</td>' + '</tr>'
								}

							}
						}

						contentHtml += '</tbody></table>'
					}

				}

			}

			agactivityContainer.append(contentHtml);
		} else if(data[i].ACTIVE_TYPE == "ISA") {

			var contentHtml = '<div class="activity_itemdiv">'
			if(plus.storage.getItem("language") == "cn") {
				contentHtml += '<div style="float: left;width: 47%;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">' +
					'<div class="scroller-div" style="overflow-x:scroll"><span style="margin-left: 5px;text-align: left;color: #fff">' +
					data[i].SFA_COLLECT_TITLE +
					'</span></div>' +
					'</div>' +
					'<div style="float: left;width: 28%">' +
					'<span style="text-align: center;color: #fff">(' +
					formatTextContent1(data[i].COLLECT_STATUS) +
					')</span>' +
					'</div>'

					+
					'<div style="float: left;width: 25%;text-align:right;">' +
					'<span style="text-align: left;color:#fff;margin-bottom:6px;">' +
					data[i].COLLECT_DATE +
					'</span>' +
					'<img id="imgactivityzhedie' +
					i +
					'" onclick="zheqiebiaoge(' +
					i +
					');" style="margin-left:5px;margin-right:2px;width: 14px;position:relative;top:3px;" src="../../../img/pic_activity_jian.png">' +
					'</div>' + '</div>'
			} else {
				contentHtml += '<div style="float: left;width: 35%;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">' +
					'<div class="scroller-div" style="overflow-x:scroll"><span style="margin-left: 5px;text-align: left;color: #fff">' +
					data[i].SFA_COLLECT_TITLE +
					'</span></div>' +
					'</div>' +
					'<div style="float: left;width: 40%">' +
					'<span style="text-align: center;color: #fff">(' +
					formatTextContent1(data[i].COLLECT_STATUS) +
					')</span>' +
					'</div>'

					+
					'<div style="float: left;width: 25%;text-align:right;">' +
					'<span style="text-align: left;color:#fff;margin-bottom:6px;">' +
					data[i].COLLECT_DATE +
					'</span>' +
					'<img id="imgactivityzhedie' +
					i +
					'" onclick="zheqiebiaoge(' +
					i +
					');" style="margin-left:5px;margin-right:2px;width: 14px;position:relative;top:3px;" src="../../../img/pic_activity_jian.png">' +
					'</div>' + '</div>'
			}

			contentHtml += '<div id="divagactivitydetail' +
				i +
				'"><div class="psnew_itemdiv_agdetail">' +
				'<span style="margin-left: 7px;color: #666666;display:inline-block;">' +
				data[i].ACTIVE_MECHANISM + '</span>' + '</div>'

			contentHtml += '<table border="0";id="cxtable0";cellspacing="0" class="cxtable2" table-layout="fixed">' +
				'<tbody id="tbody0">' +
				'<tr>' +
				'<td class="cxtabletd4"><span class="cxtabletdspan3">' +
				getWuzi() +
				'</span></td>' +
				'<td class="cxtabletd5" style="width:30px;"><span class="cxtabletdspan3">' +
				getPlan() +
				'</span></td>' +
				'<td class="cxtabletd3" style="width:30px;"><span class="cxtabletdspan3">' +
				getActual() + '</span></td>' + '</tr>'
			var isaContentNum = data[i].GIFT_CONTENT.split("$");
			for(t = 0; t < isaContentNum.length; t++) {
				contentHtml += '<tr>'

					+
					'<td class="cxtabletd6">' +
					'<div style="height:32px;line-height:32px;">' +
					'<img style="width: 30px;height:30px;" src="' +
					"http://" + getIPPort() +
					'ivisit_mobile/servlet/MobileUploadServlet?type=downloadFile&fnm=' +
					splitString3(isaContentNum[t])[1] + '">' +
					'<span class="cxtabletdspan8">' +
					splitString3(isaContentNum[t])[0] + '</span>' +
					'</div>' + '</td>' + '<td class="cxtabletd1">' +
					'<span class="cxtabletdspan3">' +
					splitString3(isaContentNum[t])[2] + '</span><br>' +
					'</td>' + '<td class="cxtabletd1">' +
					'<span class="cxtabletdspan3">' +
					splitString3(isaContentNum[t])[3] + '</span><br>' +
					'</td>' + '</tr>'
			}

			contentHtml += '</tbody></table>'

			isaactivityContainer.append(contentHtml);
		}
	}
	// agactivityContainer.html(contentHtml);
}

function zheqiebiaoge(s) {

	if(document.getElementById("imgactivityzhedie" + s + "").src
		.indexOf("img/pic_activity_jian.png") != -1) {
		document.getElementById("divagactivitydetail" + s + "").style.display = "none";
		document.getElementById("imgactivityzhedie" + s + "").src = "../../../img/pic_activity_jia.png";
	} else {
		document.getElementById("divagactivitydetail" + s + "").style.display = "block";
		document.getElementById("imgactivityzhedie" + s + "").src = "../../../img/pic_activity_jian.png";
	}

}

function splitString(s) {
	var content = s.split(":");
	return content;
}

function splitString2(s1, s2) {
	var content = s2.split("$");
	for(q = 0; q < content.length; q++) {
		if(s1 == splitString(content[q])[0]) {
			return splitString(content[q])[1];
		}
	}
	return '';
}

function splitString3(s) {
	var content = s.split("#");

	return content;
}

function closeDateSelect() {
	$("#schedule-box").hide();
	document.getElementById("activity11").style.display = "none";
}

function showdate() {
	/*
	 * $.mobile.changePage("pagecalendar.html", { transition: "none", reverse:
	 * false }, false);
	 */

	$("#schedule-box").show();
	document.getElementById("activity11").style.display = "block";

}

function formatTextContent1(s) {
	if(s != null) {
		if(plus.storage.getItem("language") == "cn") {
			return s;
		} else {
			if(s.indexOf("全周") > -1) {
				return s.replace("全周", "Everyday");
			} else if(s.indexOf("周末") > -1) {
				return s.replace("周末", "Weekend");
			} else {
				return s;
			}

		}
	}
	return s;
}

function formatTextContent(s) {
	var text = "";
	if(s != null) {
		switch(s) {
			case "已采集/已执行":
				if(plus.storage.getItem("language") == "cn") {
					text = "已采集/已执行";
				} else {
					text = "Collected/Executed";
				}

				break;
			case "已采集/未执行":
				if(plus.storage.getItem("language") == "cn") {
					text = "已采集/未执行";
				} else {
					text = "Collected/Unexecuted";
				}

				break;
			case "未采集/未执行":
				if(plus.storage.getItem("language") == "cn") {
					text = "未采集/未执行";
				} else {
					text = "Uncollected/Unexecuted";
				}

				break;

		}
	}

	return text;
}

function getActivityfankui() {
	if(plus.storage.getItem("language") == "cn") {
		return '活动开档反馈';
	} else {
		return 'Promotion Status';
	}
}

function getActivityIsOrNo() {
	if(plus.storage.getItem("language") == "cn") {
		return '活动是否在开档日期三天内执行?';
	} else {
		return 'Promotion executed in 3 days?';
	}
}

function getActivityNoReason() {
	if(plus.storage.getItem("language") == "cn") {
		return '未执行原因?';
	} else {
		return 'Unexecuted Reason?';
	}
}

function getPlan() {
	if(plus.storage.getItem("language") == "cn") {
		return '计划';
	} else {
		return 'Plan';
	}
}

function getActual() {
	if(plus.storage.getItem("language") == "cn") {
		return '实际';
	} else {
		return 'Actual';
	}
}

function getType() {
	if(plus.storage.getItem("language") == "cn") {
		return '类型';
	} else {
		return 'Sort';
	}
}

function getWuzi() {
	if(plus.storage.getItem("language") == "cn") {
		return '物资';
	} else {
		return 'Item';
	}
}

function getArrived() {
	if(plus.storage.getItem("language") == "cn") {
		return '是否到店';
	} else {
		return 'Arrived';
	}
}

function getUsed() {
	if(plus.storage.getItem("language") == "cn") {
		return '是否使用';
	} else {
		return 'Occupied';
	}
}

function getYorN1() {
	if(plus.storage.getItem("language") == "cn") {
		return '是';
	} else {
		return 'Y';
	}
}

function getYorN2() {
	if(plus.storage.getItem("language") == "cn") {
		return '否';
	} else {
		return 'N';
	}
}

function getZengpin() {
	if(plus.storage.getItem("language") == "cn") {
		return '赠品';
	} else {
		return 'PREMIUM';
	}
}

function getNoActivity() {
	document.getElementById("no_storedeactivity").style.display = "block";
	if(plus.storage.getItem("language") == "cn") {
		$("#noStore_deactivity").text('没有符合条件的活动');
	} else {
		$("#noStore_deactivity").text('Does not meet the conditions of the activity');
	}
}
