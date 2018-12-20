var cateconditon, storecondition;
var pages = 0,
	storepage = 0;
var listData = [];

mui.init({
	//	pullRefresh: {
	//		container: $("#pageone").css("display") == "none"?"#refreshContainer2":"#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	//		up: {
	//			height: 50, //可选.默认50.触发上拉加载拖动距离
	//			auto: false, //可选,默认false.自动上拉加载一次
	//			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
	//			contentnomore: '当前搜索条件下无照片', //可选，请求完毕若没有更多数据时显示的提醒内容；
	//			callback: pullUpLoadMore //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	//		}
	//	}

})

mui.plusReady(function() {
	cateconditon = {
		type: "imageSearch",
		month_code: "",
		category_code: "",
		brand_code: "",
		image_category: "",
		image_sub_category: "",
		sort: "",
		page: pages
	};

	storecondition = {
		type: "imageCustomerListSearch",
		channel: '',
		svalue: '',
		latitude: '',
		lontitude: '',
		page: storepage,
		city_code: '',
		filter: '',
		filterva: '',
		language: plus.storage.getItem("language")

	};
	initCateTabs(getPhotoList, cateconditon);
	document.getElementById('pageoneswitch').addEventListener('tap', function() {
		switchpage();
	});
	document.getElementById('pagetwoswitch').addEventListener('tap', function() {
		switchpage();
	})
	getPhotoTags();

	mui("#refreshContainer2").pullRefresh({
		up: {
			height: 50,
			contentinit: Language.getValue("choosecity[5]"),
            contentdown: Language.getValue("choosecity[5]"),
			contentrefresh: Language.getValue("choosecity[4]"), //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: Language.getValue("choosecity[3]"), //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullUpLoadMore
		},
	});
	mui('#photolist').on('tap', 'li', function() {
		mui.openWindow({
			url: "imagedetail.html",
			id: "imagedetail",
			extras: {
				list: JSON.stringify(listData),
				index: $(this).index(),
				category: cateconditon.image_category,
				store_code: $(this).attr("code")
			}

		});
	});

	initTabs(getStoreImgList, storecondition);
	mui("#refreshContainer").pullRefresh({
		up: {
			height: 50,
			contentinit: Language.getValue("choosecity[5]"),
            contentdown: Language.getValue("choosecity[5]"),
			contentrefresh: Language.getValue("choosecity[4]"), //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: Language.getValue("choosecity[3]"), //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullUpLoadMoreList
		},
	});

	mui('#refreshContainer').on('tap', 'li', function() {

		var storeCode = this.getAttribute("code");
		var storeName = this.getAttribute("name");
		mui.openWindow({
			url: "storedetail.html",
			id: "storedetail",
			extras: {
				storeCode: storeCode,
				storeName: storeName

			}
		});
	})
})

function getPhotoList(page) {
	cateconditon.page = page;
	if(page == 0) {
		listData = [];
		document.getElementById("photolist").innerHTML = '';
		mui('#refreshContainer2').pullRefresh().enablePullupToRefresh();

	}
	HttpGet(cateconditon, function(jsonStr) {
		pages = page;
		var content = '';
		console.log(JSON.stringify(jsonStr));
		if(jsonStr == 1) {
			mui('#refreshContainer2').pullRefresh().endPullupToRefresh(true);
			return;
		}
		for(i = 0; i < jsonStr.data.length; i++) {
			listData.push(jsonStr.data[i]);
			var tmp = jsonStr.data[i];
			content += '<li class="tabli" code="' + tmp.STORE_CODE + '" name="' + tmp.STORE_NAME + '">';
			content += '<a ><div class="tabname">' +
				tmp.COLLECT_DATE.split(' ')[0] + '</div>';
			var imgurl = "";
			if(tmp.MONGO_TYPE == "ivisit") {
				imgurl = getImageUrl(tmp.IMAGE, "id");
			} else if(tmp.MONGO_TYPE == "sfa_master") {
				imgurl = getImageUrl(tmp.IMAGE, "name");
			} else {
				imgurl = "http://139.198.188.153/ulsfa/DownloadImageServlet?action=compress&resizeWidth=500&token=116173379886375912&fileName=" + tmp.IMAGE + "&visitDate=" + tmp.COLLECT_DATE;

			}
			content += '<img src="' + imgurl +
				'" class="tabimg" />';
			content += '</a></li>';

		}
		$("#photolist").append(content);
		if(pages != 0) {
			if(jsonStr.rows < 20) {
				mui('#refreshContainer2').pullRefresh().endPullupToRefresh(true);
			} else {
				mui('#refreshContainer2').pullRefresh().endPullupToRefresh(false);
			}
		} else {
			mui('#refreshContainer2').pullRefresh().endPullupToRefresh(false);
		}
	}, function() {

	}, "loading");
}

function pullUpLoadMore() {
	getPhotoList(pages + 1)
}

function switchpage() {
	if($("#pageone").css("display") == "none") {
		$("#pageone").css("display", "block");
		$("#pagetwo").css("display", "none");
		mui.fire(plus.webview.currentWebview().parent(), "photochange", {
			page: 1
		})
	} else {
		$("#pageone").css("display", "none");
		$("#pagetwo").css("display", "block");
		mui.fire(plus.webview.currentWebview().parent(), "photochange", {
			page: 2
		})
	}
}

function pullUpLoadMoreList() {
	getStoreImgList(storepage + 1)
}

function getPhotoTags() {
	var condition = {
		"type": "imageSearchImageCategory"

	}

	HttpGet(condition, function(data) {
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

		getPhotoList(0);
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
				getPhotoList(0);
			} else {
				cateconditon.image_sub_category = "";
				cateconditon.image_category = data.data[$(this).index()].CATEGORY;
				mui('#tag').popover('toggle', this);

			}
		});
	}, function() {

	}, "loading");

	mui("#tag").on('tap', 'li', function(e) {
		e.preventDefault();
		//alert($(this).index());

		cateconditon.image_sub_category = $(this).find("a").attr("subcategory");
		getPhotoList(0);
		mui('#tag').popover('hide', this);
		$('#photo_tags').children().eq(2).removeClass('tab_photo');
		$('#photo_tags').children().eq(2).addClass('tabselect_photo');
		return;
	})
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
		storecondition.latitude = p.coords.latitude;
		storecondition.lontitude = p.coords.longitude;
		storecondition.city_name = p.address.city;
	} else {
		storecondition.city_name = e.detail.city;
	}
	getStoreImgList(0);
});


function getStoreImgList(page) {
	storecondition.page = page;
	if(page == 0) {
		document.getElementById("storelist").innerHTML = '';
		mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
		
	}
	HttpGet(storecondition, function(jsonStr) {
		var content = '';
		console.log(JSON.stringify(jsonStr));
		if(jsonStr==1){
			return;
		}
		for(i = 0; i < jsonStr.data.length; i++) {
			//	dataList.push(jsonStr.data[i]);
			var tmp = jsonStr.data[i];
			content += '<li code="' + tmp.STORE_CODE + '" name="' + tmp.STORE_NAME + '"><div class="topborder">';
			content += '<span class="txtcolorgrey1"><span class="txtcolorlight ">' +
				tmp.STORE_CODE + '</span>';

			content += '<span class="txtcolorgrey ">' + tmp.STORE_NAME +
				'</span></span>';
			content += '<span class="txtposition ">';
			content += '<span class="txtcolorlight ">' +
				(tmp.DISTANCE / 1000).toFixed(2) + '</span>';
			content += '<span class="txtcolorgrey "></span></span></div>';
			content += '<div class="imgborder" style="height:80px">';
			var imgs = tmp.STORE_PICTURE;
			imgs = imgs.split("#");
			for(var j = 0; j < imgs.length; j++) {
				var item = imgs[j].split("$");
				var imgurl = "";
				if(item[0] == "ivisit") {
					imgurl = getImageUrl(item[1], "id");
				} else if(item[0] == "sfa_master") {
					imgurl = getImageUrl(item[1], "name");
				} else {
					imgurl = "http://139.198.188.153/ulsfa/DownloadImageServlet?action=compress&resizeWidth=100&token=116173379886375912&fileName=" +
						item[1] + "&visitDate=" + item[2];
				}
				if(item[2] == undefined) {
					content += '<div class="tabdiv"><img style="width:100%;"  src="' +
						imgurl + '" /></div>';
				} else {
					content += '<div class="tabdiv"><div class="tabname">' +
						item[2] +
						'</div><img style="width:100%;"  src="' +
						imgurl + '" /></div>';
				}

			}
			if(imgs.length < 4) {
				var m = 4 - imgs.length;
				for(var ii = 0; ii < m; ii++) {
					if(plus.storage.getItem("language") == "en") {
						content += '<div class="tabdiv"><img style="width:100%;"  src="../../../img/no_image_en.png" /></div>';
					} else {
						content += '<div class="tabdiv"><img style="width:100%;"  src="../../../img/no_image.png" /></div>';
					}
				}
			}

			content += '<img src="../../../img/pic_arrow.png " style="width:auto;height:auto; position: absolute;margin-top:30px;margin-left: 5px;" class="rightarrow" />';
			content += '</div></li>';

		}
		$("#storelist").append(content);
//		if(storepage != 0) {
//			if(jsonStr.rows < 10) {
//				mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
//			} else {
//				mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
//			}
//		} else {
//			mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
//		}
	}, function() {

	}, "loading");

}