var cateconditon;
var pages = 0;
var storeCode;
var storeName;
var listData = [];
var agtags;
mui.init({
	//	pullRefresh: {
	//		container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	//		up: {
	//			height: 50, //可选.默认50.触发上拉加载拖动距离
	//			auto: false, //可选,默认false.自动上拉加载一次
	//			contentrefresh: plus..=="cn"?"":"", //可选，正在加载状态时，上拉加载控件上显示的标题内容
	//			contentnomore: Language.getValue("choosecity[3]"), //可选，请求完毕若没有更多数据时显示的提醒内容；
	//			callback: pulluploadmore //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	//		}
	//	}
})

mui.plusReady(function() {
	var w = plus.webview.currentWebview();
	storeCode = w.storeCode;
	storeName = w.storeName;
	console.log(storeCode + "---" + storeName);
	$(".nvtt div").text(storeName);
	cateconditon = {
		type: "imageSearch",
		month_code: "",
		category_code: "",
		brand_code: "",
		image_category: "",
		image_sub_category: "",
		sort: "",
		page: pages,
		store_code: storeCode
	}

	initCateTabs(getStoreDetail, cateconditon);
	getPhotoTags();

	mui("#refreshContainer").pullRefresh({
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: Language.getValue("choosecity[4]"), //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: Language.getValue("choosecity[3]"), //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pulluploadmore //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	});

	mui('#photolist').on('tap', 'li', function() {

		mui.openWindow({
			url: "imagedetail.html",
			id: "imagedetail",
			extras: {
				list: JSON.stringify(listData),
				index: $(this).index(),
				category: cateconditon.image_category,
				store_code: storeCode
			}

		});
	});

})

function pulluploadmore() {
	getStoreDetail(pages + 1);
}

function getStoreDetail(page, changemonth, index) {
	cateconditon.page = page;

	if(changemonth) {
		if(index == 0) {
			$("#tag ul").children().remove();
			var subs = agtags.data[2].SUB_CATEGORY.split(',');
			for(var i = 0; i < subs.length; i++) {
				if(subs[i] != null && subs[i] != "") {
					$("#tag ul")
						.append('<li class="mui-table-view-cell" style="text-align:center"><a style="font-size:12px" pindex="' +
							2 +
							'" subcategory="' +
							subs[i] +
							'" >' +
							subs[i] +
							'</a></li>');

				}
			}
		} else {
			var ag = agtags.data[0].AG_NAMES;
			var ags = ag.split("$");
			var wall_month = document.getElementById("pop_time").innerText.trim();
			for(var i = 0; i < ags.length; i++) {
				var item = ags[i].split("#");
				if(item != null && item != "") {
					var month = item[0];
					var subs = item[1].split(",");
					if(month == wall_month) {
						for(var i = 0; i < subs.length; i++) {
							$("#tag ul")
								.append('<li class="mui-table-view-cell" style="text-align:center"><a style="font-size:12px" pindex="' +
									2 +
									'" subcategory="' +
									subs[i] +
									'" >' +
									subs[i] +
									'</a></li>');

						}
					}
				}

			}

		}
	}

	if(page == 0) {
		listData = [];
		document.getElementById("photolist").innerHTML = '';
		mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
	}
	HttpGet(cateconditon, function(jsonStr) {
		pages = page;
		var content = '';
		console.log(JSON.stringify(jsonStr));
		if(jsonStr == 1) {
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
			return;
		}
		for(i = 0; i < jsonStr.data.length; i++) {
			listData.push(jsonStr.data[i]);
			var tmp = jsonStr.data[i];
			content += '<li class="tabli">';
			content += '<a ><div class="tabname">' +
				tmp.COLLECT_DATE.split(' ')[0] + '</div>';
			var imgurl = "";
			if(tmp.MONGO_TYPE == "ivisit") {
				imgurl = getImageUrl(tmp.IMAGE, "id");
			} else if(tmp.MONGO_TYPE == "sfa_master") {
				imgurl = getImageUrl(tmp.IMAGE, "name");
			} else {
				//				imgurl = getImageUrl(tmp.IMAGE, "name");
				imgurl = "http://139.198.188.153/ulsfa/DownloadImageServlet?action=compress&resizeWidth=100&token=116173379886375912&fileName=" +
					tmp.IMAGE + "&visitDate=" + tmp.COLLECT_DATE;
			}
			content += '<img src="' + imgurl +
				'" class="tabimg" />';
			content += '</a></li>';

		}
		$("#photolist").append(content);

		if(jsonStr.rows < 20) {
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
		} else {
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
		}

	}, function() {

	}, "loading");
}

function getPhotoTags() {
	var condition = {
		"type": "imageSearchImageCategory",
		"store_code": storeCode
	}

	HttpGet(condition, function(data) {
		agtags = data;
		$("#photo_tags").children().remove();
		for(var i = 0; i < data.data.length; i++) {
			$("#photo_tags").append('<span class="tab">' + data.data[i].CATEGORY + '</span>');
		}

		if(data.data[0].SEL_DEFAULT == "AG") {
			if(data.data[2].SUB_CATEGORY == "") {
				cateconditon.image_sub_category = "";
				cateconditon.image_category = data.data[2].CATEGORY;
			} else {
				cateconditon.image_sub_category = data.data[2].SUB_CATEGORY
					.split(',')[0];
				cateconditon.image_category = data.data[2].CATEGORY;
			}
			$("#photo_tags").children().eq(2).removeClass('tab_photo');
			$("#photo_tags").children().eq(2).addClass("tabselect_photo");
		} else {
			if(data.data[0].SUB_CATEGORY == "") {
				cateconditon.image_sub_category = "";
				cateconditon.image_category = data.data[0].CATEGORY;
			} else {
				cateconditon.image_sub_category = data.data[0].SUB_CATEGORY
					.split(',')[0];
				cateconditon.image_category = data.data[0].CATEGORY;
			}
			$("#photo_tags").children().eq(0).removeClass('tab_photo');
			$("#photo_tags").children().eq(0).addClass("tabselect_photo");
		}

		var subs = data.data[2].SUB_CATEGORY.split(',');
		for(var i = 0; i < subs.length; i++) {
			if(subs[i] != null && subs[i] != "") {
				$("#tag ul")
					.append('<li class="mui-table-view-cell" style="text-align:center"><a style="font-size:12px" pindex="' +
						2 +
						'" subcategory="' +
						subs[i] +
						'" >' +
						subs[i] +
						'</a></li>');

			}
		}

		getStoreDetail(0);
		mui('#photo_tags').on('tap', '.tab', function() {
			$(".tabselect_photo").each(function() {
				$(this).removeClass('tabselect_photo');
				$(this).addClass('tab_photo');
			});
			if(data.data[$(this).index()].CATEGORY != "AG") {
				$(this).removeClass('tab_photo');
				$(this).addClass('tabselect_photo');
				$("#photo_tagdropdown").hide();
				cateconditon.image_sub_category = "";
				cateconditon.image_category = data.data[$(this).index()].CATEGORY;
				getStoreDetail(0);
			} else {
				cateconditon.image_sub_category = "";
				cateconditon.image_category = data.data[$(this).index()].CATEGORY;
				if($("#tag li").length > 0) {
					mui('#tag').popover('toggle', this);
				} else {
					$(this).removeClass('tab_photo');
					$(this).addClass('tabselect_photo');
					getStoreDetail(0);
				}

				mui("#tag").on('tap', 'li', function(e) {
					e.preventDefault();
					cateconditon.image_sub_category = $(this).find("a").attr("subcategory");
					getStoreDetail(0);
					mui('#tag').popover('hide', this);
					$('#photo_tags').children().eq(2).removeClass('tab_photo');
					$('#photo_tags').children().eq(2).addClass('tabselect_photo');
					return;
				})
			}
		});

	}, function() {

	}, "loading");

}