var list;
var index;
var imgcategory;
var isLoading;
var store_code;

mui.plusReady(function() {
	Language.init();
	var w = plus.webview.currentWebview();
	list = w.list;
	console.log(list);
	list = JSON.parse(list);
	index = w.index;
	console.log(index);
	imgcategory = w.category;
	console.log(imgcategory);
	store_code = w.store_code;
	isLoading = false;
	setSlideImg();

	if(plus.os.name != 'Android') {
		var HyperingMms = {
			sendMMS: function(arg1, arg2, arg3, successCallback, errorCallback) {
				var success = typeof successCallback !== 'function' ? null : function(args) {
						successCallback(args);
					},
					fail = typeof errorCallback !== 'function' ? null : function(code) {
						errorCallback(code);
					};
				callbackID = window.plus.bridge.callbackId(success, fail);
				// 通知Native层plugintest扩展插件运行”PluginTestFunction”方法
				return window.plus.bridge.exec("HyperingMms", "sendMMS", [callbackID, arg1, arg2, arg3]);
			}
		};
		window.plus.MMS = HyperingMms;
	}

	plus.share.getServices(function(s) {
		if(s && s.length > 0) {
			for(var i = 0; i < s.length; i++) {
				var t = s[i];
				shares[t.id] = t;
				console.log(t);
			}
		}
	}, function() {
		console.log("获取分享服务列表失败");
	});

	document.getElementById('gotoStore').addEventListener('tap', function() {
		mui.openWindow({
			url: "../../customer/html/customerdetail.html",
			id: "customerdetail",
			extras: {
				storeCode: store_code
			}

		});
	})
	document.getElementById('share').addEventListener('tap', function() {
		showshare();
	})
})

function setSlideImg() {
	var imgs = new Array();

	for(var i = 0; i < list.length; i++) {
		var tmp = {};
		var item = list[i];
		var imgurl = "";
		if(item.MONGO_TYPE == "ivisit") {
			imgurl = getImageUrl(item.IMAGE, "head");
		} else if(item.MONGO_TYPE == "sfa_master") {
			imgurl = getImageUrl(item.IMAGE, "name");
		} else {
			imgurl = "http://139.198.188.153/ulsfa/DownloadImageServlet?action=compress&resizeWidth=500&token=116173379886375912&fileName=" + item.IMAGE + "&visitDate=" + item.COLLECT_DATE;
		}

		if(imgcategory == "评论" || imgcategory == "Comments") {
			tmp.content = '<div class="indexP"><span style="width: auto;height: 20px;padding:2px 5px;background: rgba(0, 0, 0, 0.6);">' + (i + 1) + '/' + list.length + '</span></div><div class="bigname"><div style="width: 85%;padding-right: 40px; text-overflow:ellipsis;white-space: nowrap;overflow: hidden;float: left;">' + item.STORE_CODE + '/' + item.STORE_NAME + '<br>' + item.COLLECT_PERSON + '/' + item.COLLECT_DATE + '/' + decodeURI(decodeURI(imgcategory)) + '</div><div class="openComment"><img style="position: absolute;right: 40px;margin-top:10px" width="17px" src="../../../img/pl.png"><span style="position: absolute;right: 20px;font-size: 15px;margin-top:10px">' + item.REPLY_COUNT + '</span></div></div><img class="bigimggg" width="' + window.innerWidth + '" height="' + (window.innerHeight * 0.7) + '"  onerror="this.src=\'pic/noimg.png\'" src="' + imgurl + '"/>';
		} else {
			tmp.content = '<div class="indexP"><span style="width: auto;height: 20px;padding:2px 5px;background: rgba(0, 0, 0, 0.6);">' + (i + 1) + '/' + list.length + '</span></div><div class="bigname"><div style="width: 100%;padding-right: 40px; text-overflow:ellipsis;white-space: nowrap;overflow: hidden;float: left;">' + item.STORE_CODE + '/' + item.STORE_NAME + '<br>' + item.COLLECT_PERSON + '/' + item.COLLECT_DATE + '/' + decodeURI(decodeURI(imgcategory)) + '</div></div><img class="bigimggg" width="' + window.innerWidth + '" height="' + (window.innerHeight * 0.7) + '"  onerror="this.src=\'pic/noimg.png\'" src="' + imgurl + '"/>';
		}
		//	tmp.content = '<div class="indexP">' + (i+1) + '/' + list.length + '</div><div class="bigname"><div style="width: 85%;padding-right: 40px; text-overflow:ellipsis;white-space: nowrap;overflow: hidden;float: left;">'+item.STORE_CODE+'/'+item.STORE_NAME+'/'+item.COLLECT_PERSON+'/'+item.COLLECT_DATE+'</div><img style="position: absolute;right: 40px;" width="17px" src="pic/activity_date.png"><span style="position: absolute;right: 20px;font-size: 15px;">11</span></div><img width="'+window.innerWidth+'" height="'+(window.innerHeight*0.7)+'"  onerror="this.src=\'pic/noimg.png\'" src="'+imgurl+'"/>';

		tmp.width = 400;
		tmp.height = 700;
		imgs.push(tmp);
	}

	index = parseInt(index);

	if(list[index].IS_ASSESS == "0") {

	} else if(list[index].IS_ASSESS == "1") {
		$("#imgzan").attr("src", "../../../img/zanlight.png");
	} else {
		$("#imghate").attr("src", "../../../img/cailight.png");
	}
	$("#zancount").html(list[index].LIKE_COUNT);
	$("#hatecount").html(list[index].HATE_COUNT);

	var islider = new iSlider({
		dom: document.getElementById('iSlider-wrapper'),
		data: imgs,
		isLooping: true,
		isDebug: true,
		initIndex: parseInt(index),
		isAutoplay: false,
		animateType: 'default',
		onSlideChanged: function(idx) {
			index = idx;
			changePage(list, idx);
		}
	});

	$("#imgzan").on("tap", function() {
		if(list[index].IS_ASSESS == "0") {
			//	$("#imgzan").attr("src",imgs);
			if(!isLoading) {
				isLoading = true;
				assessImage("1", list, index, 'N');
			}

		} else if(list[index].IS_ASSESS == "1") {
			//	$("#imgzan").attr("src","pic/zanlight.png");
			if(!isLoading) {
				isLoading = true;
				assessImage("1", list, index, 'Y');
			}
		} else {
			//	$("#imghate").attr("src","pic/cailight.png");
		}

	});
	$("#imghate").on("tap", function() {
		if(list[index].IS_ASSESS == "0") {
			//	$("#imgzan").attr("src",imgs);
			if(!isLoading) {
				isLoading = true;
				assessImage("2", list, index, 'N');
			}
		} else if(list[index].IS_ASSESS == "1") {
			//$("#imgzan").attr("src","pic/zanlight.png");
			//				assessImage("2",list,index,'Y');
		} else {
			//				$("#imghate").attr("src","pic/cailight.png");
			if(!isLoading) {
				isLoading = true;
				assessImage("2", list, index, 'Y');
			}
		}

	});

}

function changePage(imgs, idx) {
	if(imgs[idx].IS_ASSESS == "0") {
		$("#imghate").attr("src", "../../../img/cai.png");
		$("#imgzan").attr("src", "../../../img/zan.png");
	} else if(imgs[idx].IS_ASSESS == "1") {
		$("#imgzan").attr("src", "../../../img/zanlight.png");
		$("#imghate").attr("src", "../../../img/cai.png");
	} else {
		$("#imgzan").attr("src", "../../../img/zan.png");
		$("#imghate").attr("src", "../../../img/cailight.png");
	}
	$("#zancount").html(imgs[idx].LIKE_COUNT);
	$("#hatecount").html(imgs[idx].HATE_COUNT);
	$(".openComment").off("tap");
	$(".openComment").on("tap", function() {
		//		$("#newcomment_detail").remove();
		//		window.sessionStorage.setItem("commentdetailid", list[index].COMMENTS_ID);
		//		window.sessionStorage.setItem("commentstorecode", list[index].STORE_CODE);
		//		window.sessionStorage.setItem("imageindex", index);
		//		$.mobile.changePage("newCommentDetail.html");
	});

}

function assessImage(assess_type, imgs, index, iscancel) {
	var assesscondtion = {
		type: "imageAssess",
		assess_type: assess_type,
		image_id: imgs[index].ID,
		is_cancel: iscancel
	};
	HttpGet(assesscondtion, function(data) {
		if(iscancel == 'N') {
			if(assess_type == "1") {
				$("#imgzan").attr("src", "../../../img/zanlight.png");
				list[index]["IS_ASSESS"] = '1';
				list[index]['LIKE_COUNT'] = parseInt(list[index].LIKE_COUNT) + 1;
			} else {
				$("#imghate").attr("src", "../../../img/cailight.png");
				list[index]["IS_ASSESS"] = '2';
				list[index]['HATE_COUNT'] = parseInt(list[index].HATE_COUNT) + 1;
			}
		} else {
			if(assess_type == "1") {
				$("#imgzan").attr("src", "../../../img/zan.png");
				list[index]["IS_ASSESS"] = '0';
				list[index]['LIKE_COUNT'] = parseInt(list[index].LIKE_COUNT) - 1;
			} else {
				$("#imghate").attr("src", "../../../img/cai.png");
				list[index]["IS_ASSESS"] = '0';
				list[index]['HATE_COUNT'] = parseInt(list[index].HATE_COUNT) - 1;
			}
		}
		$("#zancount").html(list[index].LIKE_COUNT);
		$("#hatecount").html(list[index].HATE_COUNT);
		isLoading = false;
	}, function() {

	}, "loading");
}

function share(index) {
	mui('#sheet1').popover('hide');
	var imgurl = $(".islider-active img").attr("src");
	var t = $('.islider-active div.bigname div').html().split("<br>");
	var ew = new Image();
	ew.src = "../../../img/ivisit_barcode.png";

	canvas = document.createElement('CANVAS');
	ctx = canvas.getContext('2d');
	var image = $(".islider-active img");
	canvas.width = image[0].width;
	canvas.height = image[0].height;
	ctx.drawImage(image[0], 0, 0, image[0].width, image[0].height);
	ctx.font = "10px microsoft yahei";
	ctx.fillStyle = "white";
	ctx.fillText(t[0], 0, image[0].height - 30);
	ctx.fillText(t[1], 0, image[0].height - 10);

	ew.onload = function() {
		ctx.drawImage(ew, image[0].width - 55, image[0].height - 70, 50, 50);
		var imm = new Image();
		imm.src = canvas.toDataURL("image/jpg");
		imgurl = imm.src;
		console.log(imgurl);
		loadAndSave(imgurl, index);
	};

}

function loadAndSave(imgurl, index) {
	bitmap = new plus.nativeObj.Bitmap("test");
	bitmap.loadBase64Data(imgurl, function() {
		console.log("加载Base64图片数据成功");
		bitmap.save("_doc/a.jpg", {
			overwrite: true,
			quality: 50,
			format: 'jpg'
		}, function(i) {
			console.log('保存图片成功：' + JSON.stringify(i));

			setTimeout(function() {
				if(index == '4') {
					if(plus.os.name == "Android") {
						var Intent = plus.android.importClass("android.content.Intent");
						var Uri = plus.android.importClass("android.net.Uri");
						var intent = new Intent(Intent.ACTION_SEND);
						intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
						intent.setType("image/jpg");
						intent.putExtra("compose_mode", false);
						intent.putExtra("exit_on_sent", true);
						intent.putExtra("sms_body", "iVisit 下载地址:http://139.198.189.47/ivisit_mobile/index.html");
						intent.setClassName("com.android.mms", "com.android.mms.ui.ComposeMessageActivity");
						var imgpath = plus.io.convertLocalFileSystemURL(i.target);
						intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://" + imgpath));
						plus.android.runtimeMainActivity().startActivity(Intent.createChooser(intent, "请选择短信类应用"));
					} else {
						plus.MMS.sendMMS('', plus.io.convertLocalFileSystemURL(i.target), 'mms', function() {

						}, function(err) {
							mui.alert(Language.getValue('shareerr')[2], Language.getValue('shareerr')[0], Language.getValue('shareerr')[5], null, 'div');
						});
					}
				} else if(index == '5') {
					if(plus.os.name == "Android") {
						var Intent = plus.android.importClass("android.content.Intent");
						var Uri = plus.android.importClass("android.net.Uri");
						var uri = Uri.parse("mailto:");
						//String[] email = {"3802**92@qq.com"};  
						var intent = new Intent(Intent.ACTION_SENDTO, uri);
						intent.putExtra(Intent.EXTRA_CC, ""); // 抄送人  
						intent.putExtra(Intent.EXTRA_SUBJECT, ""); // 主题  
						intent.putExtra(Intent.EXTRA_TEXT, ""); // 正文  
						var imgpath = plus.io.convertLocalFileSystemURL(i.target);
						intent.putExtra(Intent.EXTRA_STREAM, Uri.parse("file://" + imgpath));
						plus.android.runtimeMainActivity().startActivity(Intent.createChooser(intent, "请选择邮件类应用"));

					} else {
						plus.MMS.sendMMS('', plus.io.convertLocalFileSystemURL(i.target), 'email', function() {

						}, function(err) {
							if(err == 1) {
								mui.alert(Language.getValue('shareerr')[3], Language.getValue('shareerr')[1], Language.getValue('shareerr')[5], null, 'div');
							} else if(err == 2) {
								mui.alert(Language.getValue('shareerr')[4], Language.getValue('shareerr')[1], Language.getValue('shareerr')[5], null, 'div');
							}
						});
					}
				} else if(index == '6') {
					if(plus.os.name == 'Android') {
						var Context = plus.android.importClass("android.content.Context");
						var main = plus.android.runtimeMainActivity();
						var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
						plus.android.invoke(clip, "setText", 'http://139.198.189.47/ivisit_mobile/index.html');
					} else {
						var UIPasteboard = plus.ios.importClass("UIPasteboard");
						var generalPasteboard = UIPasteboard.generalPasteboard();
						generalPasteboard.setValueforPasteboardType("http://139.198.189.47/ivisit_mobile/index.html", "public.utf8-plain-text");
						var value = generalPasteboard.valueForPasteboardType("public.utf8-plain-text");
					}
					mui.toast(Language.getValue("copylink"), {
						duration: 1000,
						type: 'div'
					});
				} else {
					var share = shares[shareids[index - 1].id];
					if(share) {
						if(share.authenticated) {
							shareMessage(share, shareids[index - 1].ex, i.target);
						} else {
							share.authorize(function() {
								shareMessage(share, shareids[index - 1].ex, i.target);
							}, function(e) {
								console.log("认证授权失败：" + e.code + " - " + e.message);
							});
						}
					} else {
						mui.toast("无法获取分享服务，请检查manifest.json中分享插件参数配置，并重新打包")
					}
				}

			}, 300);

		}, function(e) {
			console.log('保存图片失败：' + JSON.stringify(e));
		});
	}, function() {
		console.log('加载Base64图片数据失败：' + JSON.stringify(e));
	});
}

var bitmap = null;

function shareMessage(share, ex, path) {
	var msg = {
		extra: {
			scene: ex
		}
	};
	//	msg.title = "iVisit 下载地址:";
	msg.pictures = [];
	console.log(path);
	console.log(plus.io.convertAbsoluteFileSystem(plus.io.convertLocalFileSystemURL(path)));
	msg.pictures.push(plus.io.convertAbsoluteFileSystem(plus.io.convertLocalFileSystemURL(path)));
	//	msg.thumbs = [];
	//	msg.thumbs.push(plus.io.convertAbsoluteFileSystem(path));

	share.send(msg, function() {}, function(e) {});
}

var shares = {};
var shareids = [{
	id: "weixin",
	ex: "WXSceneSession"
}, {
	id: "weixin",
	ex: "WXSceneTimeline"
}, {
	id: "weixin",
	ex: "WXSceneFavorite"
}];

function showshare() {
	mui('#sheet1').popover('toggle');
}