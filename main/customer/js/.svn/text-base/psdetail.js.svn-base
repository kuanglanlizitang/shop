var store_code;
var channel_code;
var monthStr = "";

var pscondition = {
	type: "customerPerfectSearch",
	store_code: "",
	month_code: ""
}

function monthMapping1(month) {
	var a = "";
	if(month == '1') {
		return "Jan";
	}
	if(month == '2') {
		return "Feb";
	}
	if(month == '3') {
		return "Mar";
	}
	if(month == '4') {
		return "Apr";
	}
	if(month == '5') {
		return "May";
	}
	if(month == '6') {
		return "Jun";
	}
	if(month == '7') {
		return "Jul";
	}
	if(month == '8') {
		return "Aug";
	}
	if(month == '9') {
		return "Sep";
	}
	if(month == '10') {
		return "Oct";
	}
	if(month == '11') {
		return "Nov";
	}
	if(month == '12') {
		return "Dec";
	}
	return a;
}

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

function checkInitType(d) {
	if(checkPerfectShow(channel_code) == "1") {
		//new
		return "bignew";
	} else {
		//new
		if(checkPerfectShow(channel_code) == "2") {
			//ss
			return "newss";
		} else if(checkPerfectShow(channel_code) == "3") {
			//cos
			return "newcos";
		}

	}

}

mui.init({

})

mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	store_code = w.store_code;
	channel_code = w.channel_code;
	pscondition.store_code = store_code;
	var today = new Date();
	var month3 = today.getMonth();
	month3++;
	var date = today.getDate();
	var mdate2 = new Date(today.getFullYear(), today.getMonth() - 1, 1);
	var mdate1 = new Date(today.getFullYear(), today.getMonth() - 2, 1);
	var month2 = mdate2.getMonth() + 1;
	var month1 = mdate1.getMonth() + 1;
	if(plus.storage.getItem("language") == "cn") {
		document.getElementById("month3").innerText = month3 + "月";
		document.getElementById("month2").innerText = month2 + "月";
		document.getElementById("month1").innerText = month1 + "月";
	} else {
		document.getElementById("month3").innerText = monthMapping1(month3);
		document.getElementById("month2").innerText = monthMapping1(month2);
		document.getElementById("month1").innerText = monthMapping1(month1);
	}
	if(checkPerfectShow(channel_code) == "1") {
		$("[data-store=big]").show();
		$("[data-store=small]").hide();
		$("[data-store=small2]").hide();

	} else if(checkPerfectShow(channel_code) == "2") {
		$("[data-store=big]").hide();
		$("[data-store=small]").show();
		$("[data-store=small2]").hide();
	} else if(checkPerfectShow(channel_code) == "3") {
		$("[data-store=big]").hide();
		$("[data-store=small]").hide();
		$("[data-store=small2]").show();
	}
	exchangeMonth(3);

})

function exchangeMonth(tag) {
	initspanbg();
	var now = new Date();
	var lMonth;
	lMonth = new Date(now.getFullYear(), now.getMonth() - 3 + tag, 1);
	monthStr = formatDateString(lMonth);
	if(tag == 1) {
		document.getElementById("month1").style.backgroundColor = "#FFA329";
		document.getElementById("month1").style.color = "#fff";
		buttoncheck = 1;
	} else if(tag == 2) {

		document.getElementById("month2").style.backgroundColor = "#FFA329";
		document.getElementById("month2").style.color = "#fff";
		buttoncheck = 2;

	} else if(tag == 3) {
		document.getElementById("month3").style.backgroundColor = "#FFA329";
		document.getElementById("month3").style.color = "#fff";
		buttoncheck = 3;
	}
	if(checkInitType(lMonth) == "bignew") {
		if(plus.storage.getItem("language") == "cn") {
			$("#adgrhrdb").html("点击达成,查看该考核项的目标值<br/>红色-不达标;绿色-达标；蓝色-仅完成SOS门店目标<br/><span style='color: red;'>TCP和AG,如果是跨月档期,积分归档在档期结束月份</span>");
		} else {
			$("#adgrhrdb").html("Click value to check KPI target <br/>Marked in red: un-achieved ; Marked in green: achieved<br/>" + "Skin care" + ": no category achievement score<br/><span style='color: red;'>TCP & AG points be counted in the month which the round ends in</span>");
		}
	} else {
		if(plus.storage.getItem("language") == "cn") {
			$("#adgrhrdb").html("点击达成,查看该考核项的目标值<br/>红色-不达标;绿色-达标；蓝色-仅完成SOS门店目标<br/>");
		} else {
			$("#adgrhrdb").html("Click value to check KPI target <br/>Marked in red: un-achieved ; Marked in green: achieved<br/>" + "Skin care" + ": no category achievement score");
		}
	}

	document.getElementById('openrule').addEventListener('tap', function(e) {
		if(checkPerfectShow(channel_code) == "0") {
			return;
		}
		console.log("rule");
		document.getElementById("ttipdiv").style.display = 'none';
		document.getElementById("tipdiv").style.display = 'none';
		document.getElementById("psbgdiv").style.display = 'block';
		document.getElementById("ruletipdiv").style.display = 'block';
		document.getElementById("ruletipdiv").style.width = "96%";
		if(checkPerfectShow(channel_code) == "1") {
			//	ruledialog_big
			document.getElementById("ruletipdiv").style.top = e.pageY + 20 + 'px';
			document.getElementById("ruledialog_big").style.display = 'block';
			document.getElementById("ruledialog_cos").style.display = 'none';
			document.getElementById("ruledialog_ss").style.display = 'none';
		} else if(checkPerfectShow(channel_code) == "2") {
			document.getElementById("ruletipdiv").style.top = e.pageY + 100 + 'px';
			document.getElementById("ruledialog_big").style.display = 'none';
			document.getElementById("ruledialog_cos").style.display = 'none';
			document.getElementById("ruledialog_ss").style.display = 'block';
		}
		if(checkPerfectShow(channel_code) == "3") {
			document.getElementById("ruletipdiv").style.top = e.pageY + 100 + 'px';
			document.getElementById("ruledialog_big").style.display = 'none';
			document.getElementById("ruledialog_cos").style.display = 'block';
			document.getElementById("ruledialog_ss").style.display = 'none';
		}

	});

	getData(monthStr);

}

function getData(month_code) {
	pscondition.month_code = month_code;
	HttpGet(pscondition, function(data) {
		channel_code = data.ChannelCode;
		if(checkPerfectShow(channel_code) == "1") {
			$("#psnewtop .pstop1").text(data.PerfectScore);
			$("#psnewtop .pstop2").text(data.CatScore);
			$("#psnewtop .pstop3").text(data.NonCoreSku);
			$("#month0").text(data.DateRange);
			$("#psnewtop").css("display", "flex");
			$("#pssmallnewtop").css("display", "none");
			$("#pssmall2newtop").css("display", "none");
			for(var i = 0; i < data.Cats.length; i++) {
				var row = $("#psbig_tbody tr").eq(i);
				var tmp = data.Cats[i];
				$(row).children().eq(1).attr("onclick", "go2psOSA(" + JSON.stringify(tmp.OSA.Details) + ",'" + tmp.CategoryName + "')");
				$(row).children().eq(1).html('<span style="color:' + tmp.OSA.ActualColor + '">' + checkUndefined(tmp.OSA.Actual) + '</span><br><span style="color:#aaa;">' + checkAddbracket(+tmp.OSA.Target) + '</span>')
				$(row).children().eq(2).attr("onclick", "openSOS(" + JSON.stringify(tmp.SOS) + ",'" + tmp.CategoryName + "')");
				$(row).children().eq(2).html(getTdDefault(tmp.SOS.Actual, tmp.SOS.ActualColor));
				$(row).children().eq(3).html(getTdDefault(tmp.PSP.Actual, tmp.PSP.ActualColor));
				$(row).children().eq(4).attr("onclick", "openCTA(" + JSON.stringify(tmp.CTA) + ",'" + tmp.CategoryName + "')");
				$(row).children().eq(4).html(getTdDefault(tmp.CTA.Actual, tmp.CTA.ActualColor));
				$(row).children().eq(5).html(getTdDefault(tmp.NPD.Actual, tmp.NPD.ActualColor));
				$(row).children().eq(6).attr("onclick", "openNON(" + JSON.stringify(tmp.NON) + ",'" + tmp.CategoryName + "')");
				$(row).children().eq(6).html(getTdDefault(tmp.NON.Actual, tmp.NON.ActualColor));
				$(row).children().eq(7).attr("onclick", "openTCP(" + JSON.stringify(tmp.TCP.Details) + ",'" + tmp.CategoryName + "')");
				$(row).children().eq(7).html(getTdDefault(tmp.TCP.Actual, tmp.TCP.ActualColor));
				$(row).children().eq(8).attr("onclick", "openAG(" + JSON.stringify(tmp.AG.Details) + ",'" + tmp.CategoryName + "')");
				$(row).children().eq(8).html(getTdDefault(tmp.AG.Actual, tmp.AG.ActualColor));

			}

		} else if(checkPerfectShow(channel_code) == "2") {
			$("#pssmallnewtop .pstop1").text(data.PerfectScore);
			$("#pssmallnewtop .pstop2").text(data.AllOsaScore);
			$("#pssmallnewtop .pstop3").text(data.NonCoreSku);
			$("#month0").text(data.DateRange);
			$("#psnewtop").css("display", "none");
			$("#pssmallnewtop").css("display", "flex");
			$("#pssmall2newtop").css("display", "none");
			for(var i = 0; i < data.Cats.length; i++) {
				var row = $("#pssmall_tbody tr").eq(i);
				var tmp = data.Cats[i];
				$(row).children().eq(0).html(getTdDefault(tmp.CategoryName));
				$(row).children().eq(2).html(getTdDefault(tmp.OSA.Actual, tmp.OSA.ActualColor));
				$(row).children().eq(3).html(getTdDefault(tmp.SOS.Actual, tmp.SOS.ActualColor));
				$(row).children().eq(4).html(getTdDefault(tmp.CTA.Actual, tmp.CTA.ActualColor));
				$(row).children().eq(5).html(getTdDefault(tmp.NON.Actual, tmp.NON.ActualColor));

			}

		} else if(checkPerfectShow(channel_code) == "3") {
			$("#pssmall2newtop .pstop1").text(data.PerfectScore);
			$("#pssmall2newtop .pstop3").text(data.NonCoreSku);
			$("#month0").text(data.DateRange);
			$("#psnewtop").css("display", "none");
			$("#pssmallnewtop").css("display", "none");
			$("#pssmall2newtop").css("display", "flex");
			for(var i = 0; i < data.Cats.length; i++) {
				var row = $("#pssmall2_tbody tr").eq(i);
				var tmp = data.Cats[i];
				$(row).children().eq(0).html(getTdDefault(tmp.CategoryName));
				$(row).children().eq(2).html(getTdDefault(tmp.OSA.Actual, tmp.OSA.ActualColor));
				$(row).children().eq(3).html(getTdDefault(tmp.SOS.Actual, tmp.SOS.ActualColor));
				$(row).children().eq(4).html(getTdDefault(tmp.NON.Actual, tmp.NON.ActualColor));

			}
		}
	}, function() {}, "loading");
}

function hidetipdiv() {
	document.getElementById("psbgdiv").style.display = 'none';
	document.getElementById("tipdiv").style.display = 'none';
	document.getElementById("ttipdiv").style.display = 'none';
	document.getElementById("ruletipdiv").style.display = 'none';
}

function initspanbg() {
	document.getElementById("month3").style.backgroundColor = "#f4faff";
	document.getElementById("month2").style.backgroundColor = "#f4faff";
	document.getElementById("month1").style.backgroundColor = "#f4faff";

	document.getElementById("month3").style.color = "#FFA329";
	document.getElementById("month2").style.color = "#FFA329";
	document.getElementById("month1").style.color = "#FFA329";
}

function formatDateString(dateObject) {
	var d = new Date(dateObject);
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	if(day < 10) {
		day = "0" + day;
	}
	if(month < 10) {
		month = "0" + month;
	}
	var date = year + "-" + month + "-01";
	return date;
}

function getTdDefault(data, color) {
	if(color == undefined) {
		return '<span>' + checkUndefined(data) + '</span>'
	}
	return '<span style="color:' + color + '">' + checkUndefined(data) + '</span>';
}

function go2psOSA(data, categoryname) {
	console.log(data);
	console.log(categoryname);
	mui.openWindow({
		url: "../html/osadetail.html",
		id: "osadetail",
		extras: {
			data: data,
			categoryname: categoryname
		}
	});
}

function openSOS(data, category) {
	console.log("sos==>" + data);
	if(data.Details.length==0){
		return;
	}else if(data.Details[0]==undefined||data.Details[0].BrandName==undefined){
		return;
	}
	var e = window.event;
	var de_content = "";
	de_content += '<p ><span style="color:#f07b15">' + category + '</span><span style="color:#f07b15;float:right;width:65%;margin-right:5px;margin-top:5px;">' + Language.getValue("sos[0]") + ':' + data.Actual + ' ; ' + Language.getValue("sos[1]") + ':' + data.BTarget + ' ; ' + Language.getValue("sos[2]") + ':' + data.STarget + '</span></p>';
	for(var i = 0; i < data.Details.length; i++) {
		de_content += '<p><span>' + data.Details[i].BrandName + '</span><span>' + data.Details[i].QuestionName + '</span><span>' + data.Details[i].Facing + '</span></p>';
	}
	document.getElementById("ttipdiv").style.display = 'none';
	document.getElementById("ruletipdiv").style.display = 'none';
	document.getElementById("psbgdiv").style.display = 'block';
	document.getElementById("tipdiv").style.display = 'block';
	document.getElementById("tipdiv").style.top = e.pageY + 5 + 'px';
	document.getElementById("tipdiv").innerHTML = de_content;
	document.getElementById("tipdiv").style.width = "96%"
}

function openCTA(data, category) {
	var e = window.event;
	var de_content = "";
	de_content += '<p>' + data.Target + '</p>';
	document.getElementById("ttipdiv").style.display = 'none';
	document.getElementById("ruletipdiv").style.display = 'none';
	document.getElementById("psbgdiv").style.display = 'block';
	document.getElementById("tipdiv").style.display = 'block';
	document.getElementById("tipdiv").style.top = e.pageY + 5 + 'px';
	document.getElementById("tipdiv").innerHTML = de_content;
	document.getElementById("tipdiv").style.width = "96%"
}

function openNON(data, category) {
	var e = window.event;
	var de_content = "";
	for(var i = 0; i < data.Details.length; i++) {
		de_content += '<p><span style="width:92%;text-align:left">' + data.Details[i].SkuName + '</span></p>';
	}
	document.getElementById("ttipdiv").style.display = 'none';
	document.getElementById("ruletipdiv").style.display = 'none';
	document.getElementById("psbgdiv").style.display = 'block';
	document.getElementById("tipdiv").style.display = 'block';
	document.getElementById("tipdiv").style.top = e.pageY + 5 + 'px';
	document.getElementById("tipdiv").innerHTML = de_content;
	document.getElementById("tipdiv").style.width = "96%"
}

function openTCP(data, cate) {
	var e = window.event;
	var de_content;
	if(plus.storage.getItem("language") == "cn") {
		de_content = '<div style="width:96%; background: black;position: relative;margin: 2%;padding: 2%;"><table id="agdialog" class="ruledialog" border="0" cellspacing="1" style="display: table;"><thead><td>档期</td><td>目标</td><td>填报</td><td>达成</td><td>审核状态</td></thead><tbody>';
	} else {
		de_content = '<div style="width:96%; background: black;position: relative;margin: 2%;padding: 2%;"><table id="agdialog" class="ruledialog" border="0" cellspacing="1" style="display: table;"><thead><td>Period</td><td>Plan</td><td>Actual</td><td>Achieved</td><td>Audit Status</td></thead><tbody>';
	}
	//<thead><td>档期</td><td>活动</td><td>TG目标</td><td>TG填报</td><td>POSM提报</td><td>总达成</td><td>审核状态</td></thead>
	//var de_content = '<div style="width:92%; background: black;position: relative;margin: 2%;padding: 2%;"><table id="agdialog" class="ruledialog" border="0" cellspacing="1" style="display: table;"><thead><td>档期</td><td>目标</td><td>填报</td><td>达成</td><td>审核状态</td></thead><tbody>';
	for(var y = 0; y < data.length; y++) {
		de_content += "<tr><td>" + data[y].SpDate + "</td>" + "<td>" + data[y].TcpTarget + "</td>" + "<td>" + data[y].TcpActual + "</td>" + "<td>" + data[y].TcpArchi + "</td>" + "<td>" + data[y].TcpStatus + "</td></tr>";
	}
	de_content += "</tbody></table></div>";
	document.getElementById("ttipdiv").style.display = 'none';
	document.getElementById("ruletipdiv").style.display = 'none';
	document.getElementById("psbgdiv").style.display = 'block';
	document.getElementById("tipdiv").style.display = 'block';
	document.getElementById("tipdiv").style.top = e.pageY + 5 + 'px';
	document.getElementById("tipdiv").innerHTML = de_content;
	document.getElementById("tipdiv").style.width = "96%"

}

function openAG(data, cate) {
	var e = window.event;
	var de_content;
	//<thead><td>档期</td><td>活动</td><td>TG目标</td><td>TG填报</td><td>POSM提报</td><td>总达成</td><td>审核状态</td></thead>
	if(plus.storage.getItem("language") == "cn") {
		de_content = '<div style="width:96%; background: black;position: relative;margin: 2%;padding: 2%;"><table id="agdialog" class="ruledialog" border="0" cellspacing="1" style="display: table;"><thead><td>档期</td><td>活动</td><td>TG目标</td><td>TG填报</td><td>POSM提报</td><td>总达成</td><td>审核状态</td></thead><tbody>';
	} else {
		de_content = '<div style="width:96%; background: black;position: relative;margin: 2%;padding: 2%;"><table id="agdialog" class="ruledialog" border="0" cellspacing="1" style="display: table;"><thead><td>Period</td><td>Activity</td><td>TG Plan</td><td>TG Actual</td><td>POSM Actual</td><td>Achieved</td><td>Audit Status</td></thead><tbody>';

	}

	for(var y = 0; y < data.length; y++) {
		de_content += "<tr><td>" + data[y].AgDate + "</td>" + "<td>" + data[y].ActivityName + "</td>" + "<td>" + data[y].TgTarget + "</td>" + "<td>" + data[y].TgActual + "<td>" + data[y].PosmActual + "</td>" + "<td>" + data[y].AgArchi + "</td>" + "</td>" + "<td>" + data[y].AgStatus + "</td></tr>";
	}
	de_content += "</tbody></table></div>";
	document.getElementById("ttipdiv").style.display = 'none';
	document.getElementById("ruletipdiv").style.display = 'none';
	document.getElementById("psbgdiv").style.display = 'block';
	document.getElementById("tipdiv").style.display = 'block';
	document.getElementById("tipdiv").style.top = e.pageY + 5 + 'px';
	document.getElementById("tipdiv").innerHTML = de_content;
	document.getElementById("tipdiv").style.width = "96%"
}

function checkUndefined(obj) {
	if(obj) {
		return obj;
	}
	return "";
}

function checkAddbracket(obj) {
	if(obj) {
		return "(" + obj + ")";
	}
	return "";
}