function addNormalPop(id, tag, datas, onclickListener) {
	//	document.getElementById(id).setAttribute("href", "#" + tag);
	var oDiv = document.createElement("div");
	oDiv.setAttribute("id", tag);
	oDiv.className = "mui-popover mui-bar-popover";
	var html = "";
	mui.each(datas, function(index, obj) {
		if(obj == "消费指数" || obj == "SSCORE") {
			html += '<li style="display:none" class="mui-table-view-cell" index="' + index + '"><a href="#">' + obj + '</a></li>';
		} else {
			html += '<li class="mui-table-view-cell" index="' + index + '"><a href="#">' + obj + '</a></li>';
		}

	});
	oDiv.innerHTML += '<div class="mui-popover-arrow"></div><ul class="mui-table-view">' + html + '</ul>';
	document.body.appendChild(oDiv);
	mui("#" + tag).on('tap', 'li', function() {
		if(plus.webview.currentWebview().getURL().indexOf("tab-1") > 0 && document.getElementById("mapCon").style.display != '') {
			mui('#refreshContainer').pullRefresh().enablePulldownToRefresh();
			mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
		}
		mui('#' + tag).popover('hide');
		onclickListener(this.getAttribute("index"));
	});
}

function addNormalPop2(id, tag, datas, onclickListener) {
	//	document.getElementById(id).setAttribute("href", "#" + tag);
	var oDiv = document.createElement("div");
	oDiv.setAttribute("id", tag);
	oDiv.className = "mui-popover mui-bar-popover";
	var html = "";
	mui.each(datas, function(index, obj) {
		html += '<li class="mui-table-view-cell" index="' + index + '"><a href="#">' + obj + '</a></li>';
	});

	oDiv.innerHTML += '<div class="mui-popover-arrow"></div><div class="mui-scroll-wrapper" style="height:300px;padding-top:44px;"><div class="mui-scroll"><ul class="mui-table-view">' + html + '</ul></div></div>';
	if(plus.webview.currentWebview().getURL().indexOf("storedetail") > 0) {
		oDiv.innerHTML += '<div class="mui-popover-arrow"></div><div class="mui-scroll-wrapper" style="height:300px;margin-top:44px;"><div class="mui-scroll"><ul class="mui-table-view">' + html + '</ul></div></div>';
	} else {
		oDiv.innerHTML += '<div class="mui-popover-arrow"></div><div class="mui-scroll-wrapper" style="height:300px;margin-top:' + 0 + 'px;"><div class="mui-scroll"><ul class="mui-table-view">' + html + '</ul></div></div>';
	}

	document.body.appendChild(oDiv);
	mui("#" + tag).on('tap', 'li', function() {
		if(plus.webview.currentWebview().getURL().indexOf("tab-1") > 0 && document.getElementById("mapCon").style.display != '') {
			mui('#refreshContainer').pullRefresh().enablePulldownToRefresh();
			mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
		}
		mui('#' + tag).popover('hide');
		onclickListener(this.getAttribute("index"));
	});
	mui('.mui-scroll-wrapper').scroll();
}

function addDoublePop(id, tag, datas, onclickListener) {
	//	document.getElementById(id).setAttribute("href", "#" + tag);
	var oDiv = document.createElement("div");
	oDiv.setAttribute("id", tag);
	oDiv.className = "mui-popover mui-bar-popover";
	oDiv.style.width = "50%";
	var htmlTotal = "";
	mui.each(datas, function(index, obj) {
		var html = '<div class="mui-scroll">';
		//		var html = '<div class="mui-scroll-wrapper"><div class="mui-scroll">';
		mui.each(obj, function(i, o) {
			if(index == 0) {
				html += '<div class="double-cell a">' + o + '</div>';
			} else {
				html += '<div class="double-cell b">' + o + '</div>';
			}
		});
		html = '<div id="' + tag + '-' + index + '" class="mui-table-view double mui-scroll-wrapper">' + html + '</div></div>';
		htmlTotal += html;
	});
	oDiv.innerHTML += '<div class="mui-popover-arrow"></div><div><span style="display: inline-block;width: 50%;text-align: center;padding: 5px 5px 0px 5px;">' + Language.getValue("customerSearchPop1Condition")[0] + '</span><span style="display: inline-block;width: 50%;text-align: center;padding: 5px 5px 0px 5px;">' + Language.getValue("customerSearchPop1Condition")[1] + '</span></div>' + htmlTotal + '<div><span style="display: inline-block;width: 50%;text-align: center;padding: 5px;border-right: 1px solid #333333;" id="popcancel">' + Language.getValue("customerSearchPop1Condition")[3] + '</span><span style="display: inline-block;width: 50%;text-align: center;padding: 5px;" id="popok">' + Language.getValue("customerSearchPop1Condition")[2] + '</span></div>';
	document.body.appendChild(oDiv);
	mui('.double .mui-scroll-wrapper').scroll({
		indicators: false,
		deceleration: 0.0006,
		bounce: true
	});
	mui("#" + tag + "-0").on('tap', '.double-cell.a', function() {
		if(this.className == 'double-cell a double-cell-active') {
			this.className = 'double-cell a';
		} else {
			if(this.innerText == "ALL") {
				mui.each(document.querySelectorAll('.double-cell.a'), function(index, obj) {
					if(index != 0) {
						obj.className = "double-cell a";
					}
				});
			} else {
				document.querySelectorAll('.double-cell.a')[0].className = 'double-cell a';
			}
			this.className = 'double-cell a double-cell-active';
		}
	});
	mui("#" + tag + "-1").on('tap', '.double-cell.b', function() {
		if(this.className == 'double-cell b double-cell-active') {
			this.className = 'double-cell b';
		} else {
			if(this.innerText == "ALL") {
				mui.each(document.querySelectorAll('.double-cell.b'), function(index, obj) {
					if(index != 0) {
						obj.className = "double-cell b";
					}
				});
			} else {
				document.querySelectorAll('.double-cell.b')[0].className = 'double-cell b';
			}
			this.className = 'double-cell b double-cell-active';
		}
	});
	document.getElementById("popok").addEventListener('tap', function() {
		if(plus.webview.currentWebview().getURL().indexOf("tab-1") > 0 && document.getElementById("mapCon").style.display != '') {
			mui('#refreshContainer').pullRefresh().enablePulldownToRefresh();
			mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
		}
		mui('#' + tag).popover('hide');
		//将选择的项目保留...
		var tagsA = [];
		var tagsB = [];
		mui.each(document.querySelectorAll('.double-cell'), function(index, obj) {
			if(obj.className == 'double-cell a double-cell-active') {
				tagsA.push(obj.innerText);
			} else if(obj.className == 'double-cell b double-cell-active') {
				tagsB.push(obj.innerText);
			}
		});
		document.getElementById(tag).setAttribute("tagsA", JSON.stringify(tagsA));
		document.getElementById(tag).setAttribute("tagsB", JSON.stringify(tagsB));
		onclickListener(tagsA, tagsB);
	});
	document.getElementById("popcancel").addEventListener('tap', function() {
		mui('#' + tag).popover('hide');
		resetPopCell(tag);
	});
	mui(".body").on('tap', '.mui-backdrop .mui-active .mui-bar-backdrop', function() {
		resetPopCell(tag);
	});
}

function resetPopCell(e) {
	//	从选择的项目重新设置...
	mui('#refreshContainer').pullRefresh().enablePulldownToRefresh();
	mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
	var tagsA = [];
	var tagsB = [];
	if(document.getElementById(e).getAttribute("tagsA") != null) {
		tagsA = eval("(" + document.getElementById(e).getAttribute("tagsA") + ")");
	}
	if(document.getElementById(e).getAttribute("tagsB") != null) {
		tagsB = eval("(" + document.getElementById(e).getAttribute("tagsB") + ")");
	}
	mui.each(document.querySelectorAll('.double-cell.a'), function(index, obj) {
		obj.className = "double-cell a";
		mui.each(tagsA, function(i, o) {
			if(o == obj.innerText) {
				obj.className = 'double-cell a double-cell-active';
			}
		});
	});
	mui.each(document.querySelectorAll('.double-cell.b'), function(index, obj) {
		obj.className = "double-cell b";
		mui.each(tagsB, function(i, o) {
			if(o == obj.innerText) {
				obj.className = 'double-cell b double-cell-active';
			}
		});
	});
}

function showPop(tag, id, container) {

	mui('#' + tag).popover('show', document.getElementById(id));
	if(container == 'refreshContainer') {
		mui('#' + container).pullRefresh().disablePulldownToRefresh();

	}
	mui('#' + container).pullRefresh().disablePullupToRefresh();
}

function initTabs(fun, conditon) {

	document.getElementById("pop1").innerHTML = '<div>' + Language.getValue("customerTab")[0] + '/' + Language.getValue("customerTab")[1] + '</div>';
	document.getElementById("pop2").innerHTML = '<div>' + Language.getValue("customerTab")[3] + '</div>';
	document.getElementById("pop3").innerHTML = '<div>' + Language.getValue("customerTab")[2] + '</div>';
	document.getElementById('pop1').addEventListener('tap', function() {
		showPop('Popover_1', 'pop1', 'refreshContainer');
	})
	document.getElementById('pop2').addEventListener('tap', function() {
		showPop('Popover_2', 'pop2', 'refreshContainer');
	})
	document.getElementById('pop3').addEventListener('tap', function() {
		showPop('Popover_3', 'pop3', 'refreshContainer');
	})
	document.getElementById('citylabel').addEventListener('tap', function() {
		chooseCity()
	})

	addDoublePop('pop1', "Popover_1", [
		["ALL", "C＆C", "H", "LS", "SS", "CVS", "PC", "W", "Gro", "Cos/HD", "DS", "Ecommerce", "Others"],
		["ALL", "DT", "RKA-DT", "NKC", "RKC", "RKA-LKC"]
	], function(tagsA, tagsB) {
		var channel = "",
			cust_type = "";
		mui.each(tagsA, function(index, obj) {
			if(obj !== 'ALL') {
				channel += obj + "/";
			}
		});
		if(channel.length > 0) {
			channel = channel.substring(0, channel.length - 1);
			conditon.channel = channel;
		} else {
			channel = Language.getValue("customerTab")[0];
			conditon.channel = '';
		}

		mui.each(tagsB, function(index, obj) {
			if(obj !== 'ALL') {
				cust_type += obj + "/";
			}
		});
		if(cust_type.length > 0) {
			cust_type = cust_type.substring(0, cust_type.length - 1);
			conditon.cust_type = cust_type;
		} else {
			cust_type = Language.getValue("customerTab")[1];
			conditon.cust_type = '';
		}
		document.getElementById("pop1").innerHTML = "<div>" + channel + "/" + cust_type + "</div>";
		fun(0);
	})
	addNormalPop('pop2', "Popover_2", Language.getValue("customerSearchPop3Condition"), function(index) {
		document.getElementById("pop2").innerHTML = "<div>" + Language.getValue("customerSearchPop3Condition")[index] + "</div>";
		$("#Popover_3 li").eq(4).css("display", "none");
		switch(parseInt(index)) {
			case 0:
				conditon.filter = '';
				break;
			case 1:
				conditon.filter = 'UL';
				break;
			case 2:
				conditon.filter = 'NIELSEN';
				$("#Popover_3 li").eq(4).css("display", "block");
				break;
			case 3:
				conditon.filter = 'AG';
				break;
			case 4:
				conditon.filter = 'PS';
				break;
		}
		conditon.filterva = 'DISTANCE';
		document.getElementById("pop3").innerHTML = "<div>" + Language.getValue("customerSearchPop2Condition")[0] + "</div>";
		fun(0);
	})

	addNormalPop('pop3', "Popover_3", Language.getValue("customerSearchPop2Condition"), function(index) {
		$("#Popover_3 li").eq(4).css("display", "none");
		document.getElementById("pop3").innerHTML = "<div>" + Language.getValue("customerSearchPop2Condition")[index] + "</div>";
		switch(parseInt(index)) {
			case 0:
				conditon.filterva = 'DISTANCE';
				break;
			case 1:
				conditon.filterva = 'SALESUP';
				break;
			case 2:
				conditon.filterva = 'SALESDOWN';
				break;
			case 3:
				conditon.filterva = 'AREA';
				break;
			case 4:
				conditon.filterva = 'SSCORE';
				break;
		}
		fun(0);
	})

	plus.nativeUI.showWaiting(Language.getValue("geoing"));
	plus.geolocation.getCurrentPosition(function(p) {
		console.log("获取坐标");
	    console.log('Geolocation Latitude:' + p.coords.latitude + ' Longitude:' + p.coords.longitude + ' Altitude:' + p.coords.altitude);
		//将坐标信息缓存,除非重新获取.
		plus.storage.setItem("geolocation", JSON.stringify(p));
		if(plus.storage.getItem("language") == 'cn') {
			document.getElementById("citylabel").innerHTML = '<div>' + p.address.city + '</div>';
			if(plus.webview.currentWebview().getURL().indexOf("tab-1") > 0) {
				document.getElementById("useraddress").innerText = p.addresses;
			}
		} else {
			document.getElementById("citylabel").innerHTML = '<div>' + ConvertPinyin(p.address.city) + '</div>';
			var appid = '20170428000045842';
			var key = '9LdTwEBrG6sKG2rIV2Gr';
			var salt = (new Date).getTime();
			var query = p.addresses;
			var from = 'zh';
			var to = 'en';
			var str1 = appid + query + salt + key;
			var sign = MD5(str1);
			mui.getJSON('http://api.fanyi.baidu.com/api/trans/vip/translate', {
				q: query,
				appid: appid,
				salt: salt,
				from: from,
				to: to,
				sign: sign
			}, function(data) {
				if(plus.webview.currentWebview().getURL().indexOf("tab-1") > 0) {
					document.getElementById("useraddress").innerText = data.trans_result[0].dst;
				}
				
			});
			//			if(plus.webview.currentWebview().getURL().indexOf("tab-1") > 0) {
			//				document.getElementById("useraddress").innerText = '翻译需要收费,次数限时,测试不开放';
			//			}
		}
		//启动循环..每隔20分钟计算.如果坐标改变过大则自动刷新列表
		//请求门店数据...
		conditon.latitude = p.coords.latitude;
		conditon.lontitude = p.coords.longitude;
		conditon.city_name = p.address.city;
		fun(0);
	}, function(e) {
		document.getElementById("citylabel").innerHTML = "<div>" + Language.getValue("geo") + "</div>";
		mui.toast(Language.getValue("geo"), {
			duration: 1000,
			type: 'div'
		});
	}, {
		enableHighAccuracy: true,
		geocode: true,
		provider: 'baidu',
		coordsType: "bd09ll"
	});
}

function initCateTabs(fun, condition) {

	var d = new Date();
	var mon = d.getMonth();
	var dates = [];
	for(var i = 0; i < 3; i++) {
		var tmp = mon - i;
		if(i != 2) {
			if(tmp < 0) {

				dates.push((d.getFullYear() - 1) + '-' + (tmp + 13));

			} else {
				if(tmp < 9) {
					dates.push(d.getFullYear() + '-0' + (tmp + 1));
				} else {
					dates.push(d.getFullYear() + '-' + (tmp + 1));
				}

			}
		} else {
			if(tmp < 0) {
				dates.push((d.getFullYear() - 1) + '-' + (tmp + 13));
			} else {
				if(tmp < 9) {
					dates.push(d.getFullYear() + '-0' + (tmp + 1));
				} else {
					dates.push(d.getFullYear() + '-' + (tmp + 1));
				}

			}
		}
	}
	condition.month_code = dates[0];
	document.getElementById("pop_time").innerHTML = "<div>" + dates[0] + "</div>";
	document.getElementById("pop_category").innerHTML = "<div>" + Language.getValue("photo")[0] + "</div>";
	document.getElementById("pop_brand").innerHTML = "<div>" + Language.getValue("photo")[1] + "</div>";
	document.getElementById("pop_sort").innerHTML = "<div>" + Language.getValue("photo")[2] + "</div>";
	addNormalPop("pop_time", "Popover_time", dates, function(index) {
		document.getElementById("pop_time").innerHTML = "<div>" + dates[index] + "</div>";
		condition.month_code = dates[index];
		fun(0, true, index);
	});

	document.getElementById('pop_time').addEventListener('tap', function() {
		showPop('Popover_time', 'pop_time', 'refreshContainer');
	})

	document.getElementById('pop_category').addEventListener('tap', function() {
		showPop('Popover_category', 'pop_category', 'refreshContainer');
	})
	document.getElementById('pop_brand').addEventListener('tap', function() {
		if(document.getElementById("Popover_brand") == undefined) {
			plus.nativeUI.alert(Language.getValue("commonUI[0]"), null, "", Language.getValue("customerSearchPop1Condition[2]"));
			return;
		}
		showPop('Popover_brand', 'pop_brand', 'refreshContainer');
	})
	document.getElementById('pop_sort').addEventListener('tap', function() {
		showPop('Popover_sort', 'pop_sort', 'refreshContainer');
	})

	HttpGet({
		"type": "imageSearchCategory"
	}, function(data) {
		var cates = [];
		var cateCode = [];
		if(plus.storage.getItem("language") === "cn") {
			cates.push("全部");
			cateCode.push("");
		} else {
			cates.push("All");
			cateCode.push("");
		}
		mui.each(data, function(index, element) {
			if(plus.storage.getItem("language") === "cn") {
				cates.push(element.CategoryChinese);
				cateCode.push(element.CategoryCode);
			} else {
				cates.push(element.CategoryName);
				cateCode.push(element.CategoryCode);
			}
		})

		addNormalPop2("pop_category", "Popover_category", cates, function(index) {
			if(index == 0) {
				document.getElementById("pop_category").innerHTML = "<div>" + Language.getValue("photo[0]") + "</div>";
				condition.category_code = "";
				var child = document.getElementById("Popover_brand");
				child.parentNode.removeChild(child);
				return;
			} else {
				document.getElementById("pop_category").innerHTML = "<div>" + cates[index] + "</div>";
				condition.category_code = cateCode[index].CategoryCode;
			}
			document.getElementById("pop_brand").innerHTML = "<div>" + Language.getValue("photo[1]") + "</div>";
			var brand = [];
			var brandCode = [];
			if(plus.storage.getItem("language") === "cn") {
				brand.push("全部");
				brandCode.push("")
			} else {
				brand.push("All");
				brandCode.push("")
			}
			mui.each(data[index - 1].Brands, function(i, element) {
				if(plus.storage.getItem("language") === "cn") {
					brand.push(element.BrandNameChinese);
					brandCode.push(element.BrandCode);
				} else {
					brand.push(element.BrandName);
					brandCode.push(element.BrandCode);
				}
			})
			$("#Popover_brand").remove();
			addNormalPop2("pop_brand", "Popover_brand", brand, function(i) {
				if(i == 0) {
					document.getElementById("pop_brand").innerHTML = "<div>" + Language.getValue("photo[1]") + "</div>";
					condition.brand_code = "";
				} else {
					document.getElementById("pop_brand").innerHTML = "<div>" + brand[i] + "</div>";
					condition.brand_code = brandCode[i];
				}

				fun(0);
			});

			fun(0);
		});
		mui('.mui-scroll-wrapper').scroll();
	});

	var sort = Language.getValue("sort");
	addNormalPop("pop_sort", "Popover_sort", sort, function(index) {
		document.getElementById("pop_sort").innerHTML = "<div>" + sort[index] + "</div>";
		fun(0);
	});

}

function chooseCity() {
	clicked("/main/main/choosecity.html")
}