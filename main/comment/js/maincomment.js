var pages = -1;
var conditon;
var at_staff_code = "",
	at_staff_name = "";
var w;
var mecount = 0,
	atmecount = 0;

mui.init({
	//	pullRefresh: {
	//		container: "#refreshContainer", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
	//		up: {
	//			height: 50, //可选.默认50.触发上拉加载拖动距离
	//			auto: false, //可选,默认false.自动上拉加载一次
	//			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
	//			contentnomore: no_more, //可选，请求完毕若没有更多数据时显示的提醒内容；
	//			callback: pullUpLoadMore //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
	//		}
	//	}
})

mui.plusReady(function() {
	Language.init();
	initNativeObjects();
	w = plus.webview.currentWebview();
	console.log(w.id);
	condition = {
		type: "commentt",
		store_name: "",
		page: pages,
		heat_word: "",
		comments_type: "",
		store_code: ""
	}
	//getCommentList(pages);

	//	mui('#refreshContainer').on('tap','',function(){
	//	  alert($(this));
	//	}) 

	mui("#refreshContainer").pullRefresh({
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: false, //可选,默认false.自动上拉加载一次
			contentrefresh: Language.getValue("choosecity[4]"), //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: Language.getValue("choosecity[3]"), //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullUpLoadMore //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}
	});

	mui('#refreshContainer').on('tap', 'li .zan', function() {
		dianzan(this, $(this).parents("li").attr("id"))

	})
	
	

	mui('#refreshContainer').on('tap', 'li .huifu', function() {
		$(this).parent().siblings("div").toggle();

		if(plus.os.name == "iOS"){
				$(this).parent().siblings("div")[0].scrollIntoViewIfNeeded(true);
				$(this).parent().siblings("div").children().eq(1).focus();
		}
		else {
			var yy = mui('.mui-scroll-wrapper').scroll().y;
			mui('.mui-scroll-wrapper').scroll().scrollTo(0, yy - $(this).parent().siblings("div").offset().top + 50, 100);
			$(this).parent().siblings("div").children().eq(1).focus();
		}

	})

	mui('#refreshContainer').on('tap', 'li .commitbtn', function() {
		var txt = $(this).parent().siblings("textarea").val();
		var code = $(this).parents(".item").find("span[code]").attr("code");
		if(txt == "") {
			plus.nativeUI.alert(Language.getValue("grade[5]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			return;
		}
		submitText($(this).parents("li").attr("id"), txt, code);
	})

	mui('#commentlist').on('tap', '.img100', function() {
		var imgs = $(this).attr("imgs");
		var index = $(this).attr("index");

		//		//plus.nativeUI.previewImage(imgs);
		var arr = imgs.split(",");
		var images = [];
		for(var i = 0; i < arr.length; i++) {
			images.push(getImageUrl(arr[i], "head"));
		}
		plus.nativeUI.previewImage(images);
	})

	mui('#refreshContainer').on('tap', 'li .atsm', function() {

		plus.storage.removeItem("tagindex");
		if($(this).parents("li").index() != plus.storage.getItem("oldtagindex")) {
			at_staff_code = "";
			at_staff_name = "";
		}
		plus.storage.setItem("tagindex", "" + $(this).parents("li").index());
		plus.storage.setItem("oldtagindex", "" + $(this).parents("li").index());
		mui.openWindow({
			url: "../../../main/comment/html/comment_atgroup.html",
			id: "comment_atgroup"
		});
	});
	if(w.id == "customerdetail") {
		condition.store_code = w.storeCode;
		condition.type = "customerDetail";
	} else {
		document.getElementById('me').addEventListener('tap', function() {
			initTopPane();
			$("#me div").css("background-color", "#ff8a00");
			condition.comments_type = "me";
			$("#me_count").hide();
			var rest = plus.storage.getItem("commentcount") - mecount;
			plus.storage.setItem("commentcount", "" + rest);
			//mecount = 0;
			var w = plus.webview.currentWebview().opener();

			mui.fire(w, "setCommentCount", {
				commentCount: rest
			})
			getCommentList(0);
		})

		document.getElementById('atme').addEventListener('tap', function() {
			initTopPane();
			$("#atme div").css("background-color", "#ff8a00");
			condition.comments_type = "atme";
			$("#atme_count").hide();
			var rest = plus.storage.getItem("commentcount") - atmecount;
			plus.storage.setItem("commentcount", "" + rest);
			atmecount = 0;
			var w = plus.webview.currentWebview().opener();

			mui.fire(w, "setCommentCount", {
				commentCount: rest
			})
			getCommentList(0);
		})

		document.getElementById('hot').addEventListener('tap', function() {
			initTopPane();
			$("#hot div").css("background-color", "#ff8a00");
			condition.heat_word = "";
			mui.openWindow({
				url: "hotwordList.html",
				id: "hotwordList"
			});
		})
	}

	mui('#refreshContainer').on('tap', '.delimg', function() {
		console.log($(this).parents("li").index());
		var commentid = $(this).parents("li").attr("id");
		plus.nativeUI.confirm(Language.getValue("customerdetail1[4]"), function(e) {
			if(e.index == 1) {

			} else {
				HttpGet({
					type: "commenttDelete",
					id: commentid
				}, function(data) {
					console.log(data);
					if(data == 0) {
						//mui('#refreshContainer').pullRefresh().refresh();	
						console.log('00');
						window.location.reload();
					}
				}, function() {}, "loading");
			}

		}, Language.getValue("versioncheck[0]"),[Language.getValue("customerSearchPop1Condition[2]"),Language.getValue("opendetail[11]")]);
	})
	pullUpLoadMore();



})

//window.addEventListener('touchmove', function(e) {
//	var target = e.target;
//	if(target && target.tagName === 'TEXTAREA') { //textarea阻止冒泡
//		e.stopPropagation();
//	}
//}, true);

window.addEventListener("getHotword", function(e) {
	var hot = e.detail.hotword;
	if(hot != "All") {
		condition.heat_word = hot;
		$("#hot div").text(hot);
	} else {
		condition.heat_word = "";
		$("#hot div").text(Language.getValue("commenttip[2]"));
	}
	getCommentList(0);

})


window.addEventListener("atresult", function(e) {
	var code = e.detail.code;
	var name = e.detail.name;
	at_staff_code += "$" + code;
	at_staff_name += "$@" + name;
	if(at_staff_code.indexOf("$") == 0) {
		at_staff_code = at_staff_code.substr(1);
		at_staff_name = at_staff_name.substr(1);
	}
	$(".listtags").children().remove();
	console.log(plus.storage.getItem("tagindex"));
	var names = "";
	var len = at_staff_name.split("$").length;
	for(var i = 0; i < len; i++) {
		names += '<div onclick="removeself(this);" style="color: #ff8a00;margin-left: 10px;font-size: 14px;display: inline;">' + at_staff_name.split("$")[i] + '</div>';
	}
	$(".listtags").eq(plus.storage.getItem("tagindex")).append(names);

})

function submitText(commentid, content, createcode) {
	var subcondition = {
		type: "replyComment",
		comment_id: commentid,
		content: content,
		at_staff_code: at_staff_code,
		at_staff_name: at_staff_name,
	}

	HttpGet(subcondition, function(data) {

		if(at_staff_code.length > 0) {
			mui.each(at_staff_code.split("$"), function(index, element) {
				sendRequest(element, "有人@你了，快去看看吧");
			})
		}
		sendRequest(createcode, "有人回复你了，快去看看吧");
		at_staff_code = "";
		at_staff_name = "";
		pages = 0;
		condition.page = 0;
//		getCommentList(0);
plus.webview.currentWebview().reload(true);

	}, function() {}, "loading");
}

function dianzan(s, id) {
	var zan = {
		type: "commentsAssess",
		comments_id: id
	}

	HttpGet(zan, function() {
		$(s).attr("src", '../../../img/pic_zanlight.png');
	}, function() {}, "loading");

}

function initTopPane() {

	$("#me div").css("background-color", "#d1d1d1");
	$("#atme div").css("background-color", "#d1d1d1");
	$("#hot div").css("background-color", "#d1d1d1");
	condition.comments_type = "";
	condition.heat_word = "";
	$("#hot div").text(Language.getValue("commenttip[2]"));
}

function removeself(tag) {
	var index = $(tag).index();
	$(tag).remove();
	var tmp = at_staff_name.split("$");
	var tmp2 = at_staff_code.split("$");

	tmp.splice(index, 1);
	tmp2.splice(index, 1);
	at_staff_name = "";
	at_staff_code = "";
	for(var ii = 0; ii < tmp.length; ii++) {
		at_staff_name += "$" + tmp[ii];
		at_staff_code += "$" + tmp2[ii];
	}
	if(at_staff_name.indexOf("$") == "0") {
		at_staff_code = at_staff_code.substr(1);
		at_staff_name = at_staff_name.substr(1);
	}

}

var nativeWebview, imm, InputMethodManager;
var initNativeObjects = function() {
	if(mui.os.android) {
		var main = plus.android.runtimeMainActivity();
		var Context = plus.android.importClass("android.content.Context");
		InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
		imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
	} else {
		nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	}
};
var showSoftInput = function(dd) {
	var nativeWebview = plus.webview.currentWebview().nativeInstanceObject();
	if(mui.os.android) {
		//强制当前webview获得焦点
		plus.android.importClass(nativeWebview);
		nativeWebview.requestFocus();
		imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
	} else {
		nativeWebview.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		});
	}
	setTimeout(function() {
		//此处可写具体逻辑设置获取焦点的input
		//     var inputElem = document.querySelector('input');
		//            inputElem.focus(); 
		$(dd)[0].scrollIntoView(true);
	}, 200);
};

//添加newId自定义事件监听
window.addEventListener('result', function(event) {
	var storeCode = event.detail.storeCode;
	var storeName = event.detail.storeName;
	condition.store_name = storeCode;
	var w = plus.webview.getWebviewById("HBuilder");
	mui.fire(w, 'setResult', {
		storeName: storeName
	})
	getCommentList(0);
});

window.addEventListener('deletekey', function(event) {

	condition.store_name = "";

	getCommentList(0);
});

function pullUpLoadMore() {
	getCommentList(pages + 1);
}

function getCommentList(page) {
	condition.page = page;
	if(page == 0) {
		document.getElementById("commentlist").innerHTML = '';
		//	mui('#refreshContainer').pullRefresh().enablePullupToRefresh();
	}

	HttpGet(condition, function(data) {
		pages = page;
		var content = '';
		console.log("图片：" + JSON.stringify(data));
		if(data == 1) {
			if(w.id == "customerdetail") {
				document.getElementById("num").innerHTML = Language.getValue("customerdetail[9]");
			}
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
			return;
		}
		if(w.id == "customerdetail") {
			document.getElementById("num").innerHTML = Language.getValue("customerdetail[10]") + data.data[0].COUNT + Language.getValue("customerdetail[11]");
		} else {
			atmecount = data.data[0].ATME_COUNT;
			if(data.data[0].ATME_COUNT > 0) {
				$("#atme_count").css("display", "block");
			} else {
				$("#atme_count").css("display", "none");
			}
			mecount = data.data[0].ME_COUNT;
			if(data.data[0].ME_COUNT > 0) {
				$("#me_count").css("display", "block");
			} else {
				$("#me_count").css("display", "none");
			}

		}

		for(var i = 0; i < data.data.length; i++) {
			var tmp = data.data[i];
			var cdate = tmp.CREATE_DATE.split(".");
			console.log("时间：" + cdate[0]);
			content += '<li class="mui-table-view-cell" id=' + tmp.ID + '><div class="item"><div id="" class="topitem"><div id="" style="width: 55px;"><img id="headicon" src="' + getImageUrl(tmp.HEAD_IMAGE, "id") + '" style="width: 35px;height: 35px;" onerror="this.src=\'' + "../../../img/image01.png" + '\'" /></div><div id="centercon"><div><span class="language" language="评论人"></span><span code=' + tmp.STAFF_CODE + '>' + tmp.STAFF_NAME + '</span><span style="color:#999999;">  ' + cdate[0] + '</span></div><div style="width:200px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"><span style="color:#ff8a00;">' + tmp.STORE_NAME + '</span></div>';
			content += '<div><div style="font-size: 14px; color:#919191;word-break: break-word;">' + tmp.HEAT_WORDS + tmp.AT_STAFF_NAME + " " + tmp.COMMENTS + '</div></div>';
			content += '<div style="display: flex;flex-direction: column;">'
			if(tmp.IMG != "") {
				var imgs = tmp.IMG.split(",");
				var len = Math.ceil(data.data[i].IMG.split(",").length / 3);
				for(var ii = 0; ii < len; ii++) {
					content += '<div style="display: flex;"><div style="margin: 5px;width: 30%;text-align: center;"><img data-preview-src="" data-preview-group="' + ii + '" src="' + getImageUrl(imgs[ii * 3], "id") + '" class="img100" imgs="' + imgs + '" index="' + ii * 3 + '" /></div>';
					if(imgs[ii * 3 + 1] != undefined) {
						content += '<div style="margin: 5px;width: 30%;text-align: center;"><img data-preview-src="" data-preview-group="' + ii + '" src="' + getImageUrl(imgs[ii * 3 + 1], "id") + '" class="img100" imgs="' + imgs + '" index="' + (ii * 3 + 1) + '" /></div>';

					}
					if(imgs[ii * 3 + 2] != undefined) {
						content += '<div style="margin: 5px;width: 30%;text-align: center;"><img data-preview-src="" data-preview-group="' + ii + '" src="' + getImageUrl(imgs[ii * 3 + 2], "id") + '" class="img100" imgs="' + imgs + '" index="' + (ii * 3 + 2) + '" /></div>';

					}

					content += "</div>";
				}
			}
			content += "</div>";
			if(tmp.RYNAME_CONTENT != "") {
				content += '<div style="display: flex;flex-direction: column;background: #f3f3f5;">';

				var ll = tmp.RYNAME_CONTENT.split("#@hhg@#");
				for(var jj = 0; jj < ll.length; jj++) {
					content += '<span style="word-break: break-word;">' + ll[jj] + '</span>';
				}
				content += '</div>';
			}
			content += '</div>';

			if(plus.storage.getItem("staff_code") == tmp.STAFF_CODE) {
				content += '<div class="delimg" style="width: 40px;"><img src="../../../img/pic_delete.png" class="img25px" /></div>'
			}

			content += '</div>';
			content += '<div style="display: flex;flex-direction: column;padding-top:10px"><div id="bottomitem">';
			if(tmp.IS_ASSESS == '1') {
				content += '<img src="../../../img/pic_zanlight.png" class="zan" />'
			} else {
				content += '<img src="../../../img/pic_zan.png" class="zan" />'
			}

			content += '<img src="../../../img/pic_huifu.png" class="huifu" /></div><div style="border: 1px solid #c3c3c3;display: none;"><div class="listtags"></div><textarea maxlength="100" ></textarea><hr class="line"><div class="commentpane"><div class="atsm">@</div><div class="commitbtn">' + Language.getValue("commenttip[3]") + '</div></div></div></div></div></li>'


		}
		$("#commentlist").append(content);
		if(data.rows < 10) {
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
		} else {
			mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
		};
	}, function() {}, "loading");

}