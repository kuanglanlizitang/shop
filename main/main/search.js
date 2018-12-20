mui.init({

})
mui.plusReady(function() {
	Language.init();
})
var condition = {
	type: "storeListSearch",
	city_code: "",
	city_name: "",
	key: "",
};
mui.plusReady(function() {
	Language.init();
	//	open_soft_keyboard();
	initNativeObjects();
	$("#input").trigger("click").focus();
	showSoftInput();

	document.getElementById('search').addEventListener('tap', function() {
		search();
	});

});

function open_soft_keyboard() {
	if(plus.os.name == 'iOS') {
		setTimeout(function() {
			var wv_current = plus.webview.currentWebview().nativeInstanceObject();
			wv_current.plusCallMethod({
				"setKeyboardDisplayRequiresUserAction": false
			});
			document.querySelector("#input").focus();
		}, 0);
	} else {
		// 因为安卓autofocus只有4.0版本以上才支持，所以这里使用native.js来强制弹出
		setTimeout(function() {
			var Context = plus.android.importClass("android.content.Context");
			var InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager");
			var main = plus.android.runtimeMainActivity();
			var imm = main.getSystemService(Context.INPUT_METHOD_SERVICE);
			imm.toggleSoftInput(0, InputMethodManager.SHOW_FORCED);
			document.querySelector("#input").focus();
		}, 0);
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
		var inputElem = document.querySelector('input');
		inputElem.focus();
	}, 200);
};

function search() {
	var p = eval('(' + plus.storage.getItem("geolocation") + ')');
	//	condition.city_name = p.address.city;
	//	condition.latitude = p.coords.latitude;
	//	condition.lontitude = p.coords.longitude;
	condition.city_name = "深圳市";
	condition.latitude = 114.07;
	condition.lontitude = 22.62;
	var keyword = document.getElementById("input").value;
	condition.key = keyword;
	console.log("输入的名称：" + condition.key);
	console.log("输入的名称：" + condition.city_name);
	console.log(condition);
	$("#container ul").find("li").remove();
	HttpGet(condition, function(jsonStr) {
			if(jsonStr == 0) {
				var content = '';
				content += '<li><div id="tijiao" style="display:block;width:100%;text-align: center;float: left;padding-top: 20px;">' + Language.getValue("point[2]") + '</div></li>'
				$("#container").append(content);
			} else if(jsonStr == 1) {
				var content = '';
				content += '<li><div id="tijiao" style="display:block;width:100%;text-align: center;float: left;padding-top: 20px;">' + Language.getValue("point[2]") + '</div></li>'
				$("#container").append(content);
			} else {
				var content = '';
				for(i = 0; i < jsonStr.data.length; i++) {
					content = content + "<li class=\"mui-table-view-cell\" id=\"item\" onclick=\"sel_store('" + jsonStr.data[i].STORE_CODE + "','" + jsonStr.data[i].STORE_NAME + "')\">";
					content += '<div style="display:flex"><div id="" >';
					content += '<img src="' + Init.picurl + 'ulsfa_mobile/servlet/MobileUploadServlet?type=downloadFile&fnm=' + jsonStr.data[i].STORE_PICTURE + '" style="width: 60px;height: 80px;margin-top: 5px;margin-right:5px;margin-left:10px" /></div>';
					content += '<div style="height: 80px;margin: 5px 5px;margin-left: 10px;"><div style="display: flex;flex-direction:row;justify-content: space-between;width:250px;">';
					content += '<div style="display: flex;"><div id="" style="display: block;flex-direction: row;padding: 0px 5px;">';
					content += jsonStr.data[i].STORE_CODE;
					content += '</div></div><div style="color: #FF8A00;">' + parseInt(jsonStr.data[i].DISTANCE / 1000) + 'KM</div></div>';
					content += '<div class="my_sx_parent">';
					content += '<a class="my_sx">';
					content += jsonStr.data[i].STORE_NAME;
					content += '</a></div>';
					content += '<div class="my_sx_parent">';
					content += '<a class="my_sx">';
					content += jsonStr.data[i].ADDRESS;
					content += '</a></div></div></div></li>';
				}
				$("#container ul").append(content);
			}

		},
		function() {}, "loading");

}

function sel_store(code, name) {
	var w = plus.webview.currentWebview();
	var tag = w.tag;
	console.log(tag);
	var p = plus.webview.getWebviewById(tag);
	mui.fire(p, "result", {
		storeCode: code,
		storeName: name
	});
	mui.back();
}

//http://ivisit.u-iboard.com/ivisit_mobile/servlet/MobileUploadServlet?type=imageSearch&staff_code=000343496&store_code=0755-2485&month_code=2018-11&category_code=&brand_code=&image_category=PS&image_sub_category=&sort=&page=0&language=cn&t=0.3598271342919892"

{
	"rows": 20,
	"data": [{
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd890b2-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017141237846.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd8bed5-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017142653658.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd8e9b2-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017141753828.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd9116f-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017141743986.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd93aed-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017141413258.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd960fd-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017141829976.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd98af4-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017140908651.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd9b7ef-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017140855630.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddd9e450-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017140924699.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddda3118-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017142705450.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddda5e07-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017142639623.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "ddda87fa-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017142647725.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "dddab6bf-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017142729961.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "dddae6db-d253-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-17 14:30:55.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181017142745079.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "e4277104-cd9c-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-11 11:44:50.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181011114439866.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "e4279469-cd9c-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-11 11:44:50.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181011111701869.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "e427c12a-cd9c-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-11 11:44:50.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181011112635299.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "e427ff9e-cd9c-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-11 11:44:50.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181011112453451.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "e42834ce-cd9c-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-11 11:44:50.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181011113900886.jpg",
		"STORE_CODE": "0755-2485"
	}, {
		"STORE_NAME": "天虹投资西丽店",
		"REPLY_COUNT": "1",
		"COMMENTS_ID": "",
		"IS_ASSESS": "0",
		"ID": "e4286077-cd9c-11e8-8228-52547770379e",
		"MONGO_TYPE": "sfa_month",
		"COLLECT_DATE": "2018-10-11 11:44:50.0",
		"COLLECT_PERSON": "姚莉莉",
		"HATE_COUNT": "0",
		"LIKE_COUNT": "0",
		"IMAGE": "S20000359620181011112511116.jpg",
		"STORE_CODE": "0755-2485"
	}]
}