mui.init({
	pullRefresh: {
		container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		down: {
			auto: true, //可选,默认false.首次加载自动下拉刷新一次
		},
		up: {
			auto: true //可选,默认false.首次加载自动上拉加载一次
		}
	}
});

var topHeadercondition = {
	type: "custRefresh",
	store_code: ""
}

var pscondtion = {
	type: "perfectStoreScore",
	store_code: ""
}

var salecondition = {
	type: "customerHisSaleSearch",
	store_code: ""
}

var activitycondition = {
	type: "accreditingDetail",
	store_code: ""
}
var activityListconditon = {
	type: "activitySearch",
	store_code: "",
}

var uldetailcondition = {
	type: "nielsenDetail",
	store_code: ""
}

var channelCode;
var store_code;
var store_name;
var xx, yy;
var stop = true;

var chart = null;
var chartoptions = null;

function checkPerfectShow(c) {
	if(!c) {
		return '0';
	}
	if(c == "H" || c == "LS") {
		return '1';
	} else if(c == "SS" || c == "Gro") {
		return '2';
	} else if(c == "Cos/HD") {
		return '3';
	} else {
		return '0';
	}
}

mui.plusReady(function() {

	Language.init();
	var w = plus.webview.currentWebview();
	store_code = w.storeCode;
	topHeadercondition.store_code = store_code;
	pscondtion.store_code = store_code;
	salecondition.store_code = store_code;
	activitycondition.store_code = store_code;
	activityListconditon.store_code = store_code;
	uldetailcondition.store_code = store_code;

	lazyLoadApi = mui('#refreshContainer .mui-scroll').imageLazyload({
		autoDestroy: false,
		placeholder: '../../img/60x60.gif'
	});
	getTopHeader();

	document.getElementById('psdetail').addEventListener('tap', function() {
		mui.openWindow({
			url: "psdetail.html",
			id: "psdetail",
			extras: {
				store_code: store_code,
				channel_code: channelCode
			}
		});
	});

	document.getElementById('saledetail').addEventListener('tap', function() {
		mui.openWindow({
			url: "saledetail.html",
			id: "saledetail",
			extras: {
				store_code: store_code,
				store_name: store_name,
				ytd: document.getElementById("ytd").innerText
			}
		});
	});

	document.getElementById('gradetip').addEventListener('tap', function() {
		if($("#divpmgperson").html().trim() == "") {
			plus.nativeUI.alert(Language.getValue("grade[0]"),null,"",Language.getValue("customerSearchPop1Condition[2]"))
			return;
		}
		if(window.sessionStorage.getItem("actqty") == "0") {
			plus.nativeUI.alert(Language.getValue("grade[1]"),null,"",Language.getValue("customerSearchPop1Condition[2]"))
			return;
		}
		mui.openWindow({
			url: "grade.html",
			id: "grade",
			extras: {
				store_code: store_code
			}
		})
	})

	document.getElementById('navigate').addEventListener('tap', function() {
		var address = document.getElementById("address").innerText;

		mui.openWindow({
			url: "mapnavigate.html",
			id: "mapnavigate",
			extras: {
				store_code: store_code,
				store_name: store_name,
				address: address,
				xx: xx,
				yy: yy
			}
		})
	})

	document.getElementById('commentadd').addEventListener('tap', function() {
		mui.openWindow({
			url: "commentadd.html",
			id: "commentadd",
			extras: {
				store_code: store_code
			}
		});
	})

	document.getElementById('activitydetail').addEventListener('tap', function() {
		mui.openWindow({
			url: "activitydetail.html",
			id: "activitydetail",
			extras: {
				store_code: store_code
			}
		});
	})
	getcommentTop();

	$(window).scroll(function() {
		var totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
		console.log(totalheight);
		console.log("1111==" + $(document).height())
		if($(document).height() <= totalheight + 120) {
			if(stop == true) {
				stop = false;
				$('#j_loadmore').addClass('enabled');
				console.log("jiazai.....")
				pullUpLoadMore();
			}
		}
	})
})

function getcommentTop() {
	var top = $("#refreshContainer").offset().top;
	var top = $("#commentadd").offset().top;
	$("#refreshContainer").css("top", top + 20);
	console.log("top=" + top);
};

function miaodian(){
    var scroll_offset = $("#commentadd").offset();
    console.log("immersed:"+immersed);
    var scroll=scroll_offset.top-44-immersed;
    $("body").animate({ 
		scrollTop:scroll //让body的scrollTop等于pos的top，就实现了滚动 
	},0);
}

function getTopHeader() {
	HttpGet(topHeadercondition, function(data) {
		if(data == 1) {
			return;
		} else {
			var content = "";
			var line1_right = '';
			var obj = data.data[0];
			store_name = obj.STORE_NAME;
			xx = obj.PICTURE_XX;
			yy = obj.PICTURE_YY;
			plus.storage.setItem("region_code", obj.REGION_CODE);
			content = '<div class="mui-media-body mui-ellipsis" style="margin-left:10px">' + obj.STORE_NAME + '</div>';
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
			channelCode = obj.CHANNEL_CODE;
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
				$("#ulcustdetail").css("display", "block");
				$("#normaldetail").css("display", "none");
				getULDetail();
				line2_right += '<i class="tag tag4">' + Language.getValue("storetags")[1] + '</i>';
				$("#gradetip").css("display", "none");
			} else {
				getPSData();
				getSale();
				getActivity();
				getActivityList();
			}
			$("#phone").text(obj.PHONE);
			$("#area").text(obj.AREA + Language.getValue("customerdetail")[14]);
			$("#cash").text(obj.CASH_NUMBER + Language.getValue("customerdetail")[15]);
			$("#company").text(obj.COMPANY);
			$("#dt").text(obj.DTNAME);
			content += '<div id ="imgdetail"><img class="mui-media-object mui-pull-left" style="width:80px;height:60px;padding:0px 10px" src="' + getImageUrl(obj.STORE_PICTURE, 'name') + '"><span id="picnum" style="width:20px;text-align:center;position:absolute;left:50px;font-size:12px;margin-top:40px;background: #ff8a00;border-radius: 10px;color:white">' + obj.IMAGE_COUNT + '</span></div><div ><div class="mui-ellipsis" style="display: flex;justify-content: space-between;font-size: 16px;margin-right:10px"><div>' + obj.STORE_CODE + '<img id="popIcon" style="width: 25px;height: 20px;display:inline-block;position: absolute;" onclick="pop_info();" src="../../../img/moreInfo.png"></div><span class="tagspanel">' + line1_right + '</span></div><div class="mui-ellipsis address" style="display: flex;justify-content: space-between;font-size: 14px;margin-right:10px">' + obj.ORG_NAME + '<span class="tagspanel">' + line2_right + '</span></div><div class="mui-ellipsis"><div class="lastline"><div id="signin" style="display:inline;background:#FF8A00;padding:2px;margin-right:5px;color:white;font-size:10px"><img src="../../../img/pic_dingwei.png" class="pic_dingwei">' + Language.getValue("customerdetail[12]") + '(' + obj.SIGN_COUNT + ')</div><a  onclick="miaodian()"><div style="font-size:10px;color:white;margin-left:5px;display:inline;background:#FF8A00;padding:2px"><img src="../../../img/pic_pinglun.png" class="pic_pinglun">' + Language.getValue("customerdetail[13]") + '(' + obj.COMMENTS_COUNT + ')</div></a></div></div></div></div>';
			$("#topdetail").html(content);
			$("#address").text(obj.ADDRESS);
			document.getElementById('imgdetail').addEventListener('tap', function() {
				mui.openWindow({
					url: "../../photo/html/storedetail.html",
					id: "storedetail",
					extras: {
						storeCode: store_code,
						storeName: store_name
					}
				})
			})

			document.getElementById('signin').addEventListener('tap', function() {
				plus.geolocation.getCurrentPosition(function(p) {
					plus.storage.setItem("geolocation", JSON.stringify(p));
					console.log(JSON.stringify(p));
					var signcondition = {
						type: "submitStoreSign",
						store_code: store_code,
						latitude: p.coords.latitude,
						lontitude: p.coords.longitude,
						distance: "0"
					}
					HttpGet(signcondition, function(data) {
						if(data == 0) {
							mui.openWindow({
								url: "sign.html",
								id: "sign",
								extras: {
									store_code: store_code
								}
							});
						} else if(data == 1) {
							plus.nativeUI.alert(Language.getValue("customerdetail1[0]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
						} else if(data == 2) {
							plus.nativeUI.alert(Language.getValue("customerdetail1[1]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
						} else if(data == 3) {
							plus.nativeUI.alert(Language.getValue("customerdetail1[2]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
						}
					}, function() {}, "loading");
				}, function(e) {

				}, {
					enableHighAccuracy: true,
					provider: 'baidu',
					coordsType: "bd09ll"
				})
			})

		}

	}, function() {}, "loading");
}

function pop_info() {
	mui('#popover2').popover('toggle', document.getElementById("popIcon"));
}

function getULDetail() {
	HttpGet(uldetailcondition, function(data) {
		console.log(data);
		if(data == 1) {
			return;
		}
		$("#ul_location").text(data.data[0].SLOCATION);
		$("#ul_trans").text(data.data[0].SSCORE_TT);
		$("#SPARETO_TT_text").text(data.data[0].SPARETO_TT);
		$("#REST_text").text(data.data[0].REST);
		$("#SHOP_text").text(data.data[0].SHOP);
		$("#TRANS_text").text(data.data[0].TRANS);
		$("#FINA_text").text(data.data[0].FINA);
		$("#BUILDING_text").text(data.data[0].BUILDING);
	}, function() {}, "loading");

}

function getPSData() {
	var y1, y1text, y2, y2text;
	if(plus.storage.getItem("language") == "cn") {
		y1 = "{value}分";
		y1text = "完美门店得分";
		y2 = "{value}个";
		y2text = "缺核心单品";
	} else {
		y1 = "{value}";
		y1text = "PS Point";
		y2 = "{value}";
		y2text = "COTC Gap";
	}

	chartoptions = {
		chart: {
			renderTo: 'pscontainer',
		},
		title: {
			text: null
		},
		xAxis: {
			categories: [],
			labels: {
				style: {
					font: 'normal 10px Verdana, sans-serif',
					color: '#000'
				}
			}

		},
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				enabled: false
			}
		},
		plotOptions: {
			series: {
				stacking: 'normal',

			}
		},
		series: [{
			type: 'column',
			name: y2text,
			data: [],
			color: '#ffc62d',
			tooltip: {
				valueSuffix: ''
			}
		}, {
			type: 'spline',
			name: y1text,
			data: [],
			color: '#f36d8c',
			tooltip: {
				valueSuffix: ''
			},
			marker: {
				lineWidth: 2,
				lineColor: '#f36d8c',
				fillColor: '#f36d8c'
			}
		}]
	};

	HttpGet(pscondtion, function(jsonStr) {
		if(jsonStr == 1) {
			return;
		} else {
			if(checkPerfectShow(channelCode) == "0") {
				$("#pscontainer").html("<div style='text-align:center;height:150px;line-height: 150px;font-size: 20px;'>" + Language.getValue("customerdetail")[18] + "</div>");
			} else {
				for(var i = jsonStr.data.length - 1; i >= 0; i--) {
					var mon = jsonStr.data[i].MONTH_CODE.substring(0, 7).replace("-", "_");
					chartoptions.xAxis.categories.push(mon);
					chartoptions.series[0].data.push(parseFloat(jsonStr.data[i].NON_CORE_SKU));
					chartoptions.series[1].data.push(parseFloat(jsonStr.data[i].PERFECT_SCORE));
				}

				chart = new Highcharts.Chart(chartoptions);
			}

		}
	}, function() {}, "loading");
}

function getSale() {
	var saleoptions = {

	}
	var url = 'http://' + getIPPort() + '/ivisit_mobile/servlet/MobileUploadServlet' + getParams(salecondition);
	mui.ajax(url, {
		dataType: 'text', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			data = eval("(" + data + ")");
			document.getElementById("saledate").innerText = data.date;
			document.getElementById("ytd").innerText = "ytd：" + data.ytd;
			document.getElementById("salenum").innerText = Language.getValue("sale[0]") + data.avg;
			console.log("saleoptions = " + JSON.stringify(saleoptions));
			new Highcharts.Chart("chart_div", data);
		},
		error: function(xhr, type, errorThrown) {

		}
	});

}

function formatK(d) {
	return(d / 1000).toFixed(2);;
}

function getActivity() {
	HttpGet(activitycondition, function(jsonStr) {
		if(jsonStr == 0) {

		} else if(jsonStr == 1) {
			$(".noactivity").css("display", "block");
			$(".noactivity").text(Language.getValue("noactivity"));
		} else {
			if(jsonStr.length > 0) {

				var contentHtml = '<div style="width: 98%;height: 18px;font-size: 14px;text-align: left;background-color:#e5e5e5;margin-left:2px;border: 1px solid #f1f1f1" >'
				if(plus.storage.getItem("language") == "cn") {
					contentHtml += '<span id="person_dispatch" style="margin-left: 8px;color:#333;">PMG人员派遣(计划/实际)</span>'
				} else {
					contentHtml += '<span id="person_dispatch" style="margin-left: 8px;color:#333;">PMG personnel allotment(Plan/Actual)</span>'
				}

				contentHtml += '</div>' +
					'<table border="1px solid #ccc";id="cxtable0";cellspacing="0" style="margin:2px 5px;text-align:center"><tbody id="tbody0">'

				window.sessionStorage.setItem("actqty", "-1");
				if(jsonStr.length > 0) {
					if(jsonStr[0].GroupName == "ISA") {
						var infos = jsonStr[0].Infos;
						for(var ii = 0; ii < infos.length; ii++) {
							if(infos[ii].ActQty != 0) {
								window.sessionStorage.setItem("actqty", "1");
								break;
							}
						}
						if(window.sessionStorage.getItem("actqty") == "-1") {
							window.sessionStorage.setItem("actqty", "0");
						}
					}
				}

				contentHtml += renderTabel(jsonStr);

				contentHtml += '</tbody></table>'
				$("#divpmgperson").html(contentHtml);

			} else {
				document.getElementById("divpmgperson").style.display = 'none';

				document.getElementById("no_storeperson").style.display = 'block';
				document.getElementById("no_storeperson").style.height = "30px";
				document.getElementById("no_storeperson").style.backgroundColor = "white";

				$("#no_storeperson").html(getStringstoreperson());

			}
		}
	}, function() {}, "loading");

}

function renderTabel(tt) {
	var s = tt.length;
	var ll = "";
	for(var i = 0; i < s; i++) {
		ll += renderTr(tt[i], i);
	}

	return ll;

}

function renderTr(mtr, i) {
	var n = parseInt(mtr.Infos.length / 3);
	if(mtr.Infos.length % 3 != 0) {
		n++;
	}
	if(n > 1) {
		var ttt = '<tr><td style="color:#000;font-size:12px" rowspan="' + n + '">' + mtr.GroupName + '</td>';
		for(var ii = 0; ii < 3; ii++) {
			if(ii < mtr.Infos.length) {
				if(mtr.Infos[ii].ActQty != 0) {
					ttt += '<td style="color:#428bca;font-size:12px;text-decoration: underline;" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii].UserType + '  ' + mtr.Infos[ii].PlanQty + '/' + mtr.Infos[ii].ActQty + '</td>';

				} else {
					ttt += '<td style="color:#000;font-size:12px;" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii].UserType + '  ' + mtr.Infos[ii].PlanQty + '/' + mtr.Infos[ii].ActQty + '</td>';

				}
			} else {
				ttt += '<td style="display:none"></td>';
			}
		}
		ttt += '</tr>';
		for(var jj = 1; jj < n; jj++) {
			ttt += "<tr>"
			for(var ii = 0; ii < 3; ii++) {
				if(ii + jj * 3 < mtr.Infos.length) {
					if(mtr.Infos[ii].ActQty != "" && mtr.Infos[ii].ActQty != undefined) {
						if(mtr.Infos[ii + jj * 3].ActQty != 0) {
							ttt += '<td style="color:#428bca;font-size:12px;text-decoration: underline;" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii + jj * 3).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii + jj * 3].UserType + '  ' + mtr.Infos[ii + jj * 3].PlanQty + '/' + mtr.Infos[ii + jj * 3].ActQty + '</td>';

						} else {
							ttt += '<td style="color:#000;font-size:12px;" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii + jj * 3).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii + jj * 3].UserType + '  ' + mtr.Infos[ii + jj * 3].PlanQty + '/' + mtr.Infos[ii + jj * 3].ActQty + '</td>';

						}
					} else {
						ttt += '<td style="color:#000;font-size:12px" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii + jj * 3).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii + jj * 3].UserType + '  ' + mtr.Infos[ii + jj * 3].PlanQty + '</td>';
					}
				} else {
					ttt += '<td style="display:none"></td>';
				}
			}
			ttt += '</tr>';
		}

	} else {
		var ttt = '<tr><td style="color:#000;font-size:12px">' + mtr.GroupName + '</td>';
		for(var ii = 0; ii < 3; ii++) {
			if(ii < mtr.Infos.length) {
				if(mtr.Infos[ii].ActQty != "" && mtr.Infos[ii].ActQty != undefined) {
					if(mtr.Infos[ii].ActQty != 0) {
						ttt += '<td style="color:#428bca;font-size:12px;text-decoration: underline;" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii].UserType + '  ' + mtr.Infos[ii].PlanQty + '/' + mtr.Infos[ii].ActQty + '</td>';

					} else {
						ttt += '<td style="color:#000;font-size:12px" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii].UserType + '  ' + mtr.Infos[ii].PlanQty + '/' + mtr.Infos[ii].ActQty + '</td>';

					}
				} else {
					ttt += '<td style="color:#000;font-size:12px" onclick="openModaldialog(' + JSON.stringify(i).replace(/\"/g, "'") + "," + JSON.stringify(ii).replace(/\"/g, "'") + ')";>' + mtr.Infos[ii].UserType + '  ' + mtr.Infos[ii].PlanQty + '</td>';
				}

			} else {
				ttt += '<td style="display:none"></td>';
			}
		}
		ttt += '</tr>';
	}

	return ttt;
}

function openModaldialog(i, ii) {
	var condition = {
		type: "accreditingDetail",
		store_code: store_code
	}
	HttpGet(condition, function(jsonStr) {
		if(jsonStr == 0) {

		} else if(jsonStr == 1) {

		} else {
			if(jsonStr.length > 0) {
				var mtr = jsonStr[i];
				openModelDialog(mtr.GroupName, mtr.Infos[ii]);
			} else {

			}
		}
	}, function() {}, "loading");
}

function openModelDialog(groupname, info) {
	var user = info.Users;
	if(user == undefined) {
		return "";
	}
	var dia = '<div class="modal-content"><div class="mui-scroll-wrapper"><div class="mui-scroll"><div class="modal-body" style="padding:5px"><div>';
	dia += groupname;
	dia += '</div><div style="width: 100%;height: 1px;background-color: #CCCCCC;margin-top: 2px;"></div><div id=""><ul>';
	for(var i in user) {
		dia += '<li  style="margin-right:5px" ><div style="padding-left:5px"><div id="" style="float: left;width: 60px;height: 120px;margin-top: 5px;">';
		dia += '<img src="' + user[i].ImageUrl + '" style="width: 60px;height:80px" /></div>';
		dia += '<div style="margin-left: 60px;height: 120px;"><div style="display: flex;flex-direction:row;justify-content: space-between;padding: 5px 5px;"><div style="display: flex;font-size:12px"><div id="">' +
			user[i].Name +
			'</div>';
		dia += '<img src="../../../img/phone1.png" style="width: 15px;height: 15px;display: inline-flex;margin-left: 10px;margin-top:3px" /><a href="tel:' + user[i].Phone + '" style="text-decoration: underline;color: #FF8A00;"><div style="color: #FF8A00;">' +
			user[i].Phone +
			'</div></a>';
		if(user[i].Score == '0') {
			dia += '</div><div style="color: #FF8A00;">' + Language.getValue("point[1]") + '</div></div>';

		} else {
			dia += '</div><div style="color: #FF8A00;">' + user[i].Score + Language.getValue("point[0]") + '</div></div>';

		}
		dia += '<div style="display: inline-flex;flex-direction: row;padding: 0px 0px;">' +
			'<div style="margin: 0px 5px;font-size:12px">' +
			user[i].StaffType +
			'</div></div>';
		dia += '<div style="display: flex;flex-direction: row;padding: 0px 0px;">' +
			'<img src="../../../img/work03.png" style="width: 14px;height: 14px;display: inline;margin-left: 7px;" />' +
			'<div style="margin: 0px 5px;font-size:12px">' +
			user[i].WorkType +
			'</div></div>';
		dia += '<div style="display: flex;flex-direction: row;padding: 0px 5px;">' +
			'<img src="../../../img/work.png" style="width: 20px;height: 20px;display: inline;" />' +
			'<div style="font-size:12px">' +
			user[i].WorkTime +
			'</div></div>';
		dia += '<div style="display: flex;flex-direction: row;justify-content: space-between;padding: 0px 5px;">' +
			'<div style="display: flex;">' +
			'<img src="../../../img/eat.png" style="width: 20px;height: 20px;display: inline;" />' +
			'<div style="margin: auto;font-size:12px;white-space:nowrap">' +
			user[i].EatTime +
			'</div>' +
			'</div>' +
			'<div style="display: flex;" onclick="openGradeSub(' + JSON.stringify(user[i]).replace(/\"/g, "'") + "," + JSON.stringify(groupname).replace(/\"/g, "'") + ');">';
		var iii = parseFloat(user[i].Score).toFixed(0);

		for(var m = 0; m < iii; m++) {
			dia += '<img src="../../../img/starsybig.png" style="width: 20px;height: 20px;display: inline-flex;" />';
		}
		for(var n = 0; n < (5 - iii); n++) {
			dia += '<img src="../../../img/star.png" style="width: 20px;height: 20px;display: inline-flex;" />';

		}
		dia += '</div></div>';
		dia += '</div></div><div style="width: 100%;height: 1px;background-color: #CCCCCC;margin-top:5px"></div></li>'
	}

	dia += '</ul></div><div style="align-content: center;margin-top: 10px;"><div id="closeModel" style="text-align: center;"><span class="language" style="border: 1px solid;padding: 2px 5px;margin: 10px">'+Language.getValue("versioncheck[3]")+'</span></div></div></div></div></div></div></div>';
	
	$("#popover").html(dia);
	//$('#closeModel span').text(getstringclose());
	mui('#popover').popover('toggle');
	mui('.mui-scroll-wrapper').scroll();
	$('#popover').css("top",window.innerHeight/2-110);
	$('#closeModel').on("tap", function(event) {
		event.preventDefault();
		mui('#popover').popover('toggle');
		event.stopPropagation();
	});
}

function getActivityList() {

	HttpGet(activityListconditon, function(data) {
		if(data == 1) {
			$(".noactivity").css("display", "block");
			$(".agactivity").css("display", "none");
			$(".isaactivity").css("display", "none");
		} else {
			for(var i = 0; i < data.data.length; i++) {

				if(data.data[i].ACTIVE_TYPE == "AG") {
					var content = '<li class="mui-table-view-cell"><div class="subheader"><span>' + data.data[i].SFA_COLLECT_TITLE + '</span><span>' + data.data[i].COLLECT_DATE + '</span></div><div class="subcontent">' + data.data[i].ACTIVE_MECHANISM + '</div>';
					$(".agactivity ul").append(content);
				} else if(data.data[i].ACTIVE_TYPE == "ISA") {
					var content = '<li class="mui-table-view-cell"><div class="subheader"><span>' + data.data[i].SFA_COLLECT_TITLE + '</span><span>' + data.data[i].COLLECT_DATE + '</span></div>';
					$(".isaactivity ul").append(content);
				}
			}
			if($(".agactivity ul").children().length == 0) {
				$(".agactivity").css("display", "none");
			}
			if($(".isaactivity ul").children().length == 0) {
				$(".isaactivity").css("display", "none");
			}

			if($(".agactivity ul").children().length == 0 && $(".isaactivity ul").children().length == 0) {
				$(".noactivity").css("display", "block");
			}

		}

	}, function() {}, "loading");
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
				mui.back();
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
};

window.addEventListener('detail', function(event) {
	//获得事件参数
	window.location.reload();
});