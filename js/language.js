/**
 * @author xiangyh
 * @param {Object} owner
 * js使用方法:
 * 调用Language.init()即可//因为在本js最下面调用了,所有页面中无需再次调用;
 * 同时如果需要刷新语言的页面也可使用Language.init()直接刷新.//因为在本js最下面添加了对页面刷新的方法,所有页面中无需手动刷新
 * 如果语言需要切换:
 * Language.setLanguage()切换语言并且刷新.
 * 
 * 
 * 元素使用方法:
 * 需要定义class为language,是为了方便遍历替换
 * 需要定义language属性,属性内容为资源里面的Key
 * <span language="loginerr" class="language"></span>
 * 
 */
(function(owner) {
	/**
	 * @description 设置语言
	 */
	owner.setLanguage = function setLanguage(str) {
		if(str === "cn" || str === "en") {
			cacheLanguage = str;
			plus.storage.setItem("language", str);
		} else {
			cacheLanguage = "cn";
			plus.storage.setItem("language", "cn");
		}

		//		var wvs = plus.webview.all();
		//		//同时通知其他页面刷新
		//		for(var i = 0; i < wvs.length; i++) {
		//			mui.fire(wvs[i], 'LanguageRefresh', {});
		//		}

		Language.init();
	};

	var cacheLanguage = null;

	/**
	 * @description 获取当前语言
	 */
	getLanguage = function() {
		if(cacheLanguage == null) {
			cacheLanguage = plus.storage.getItem("language");
		}
		return cacheLanguage;
	};

	/**
	 * @param {Object} key 获取标签在对应语言中的具体描述
	 */
	owner.getValue = function getJson(key) {
		
		if(key.indexOf("[") > 0) {
			var index = key.substring(key.indexOf("[") + 1, key.indexOf("]"));
			console.log(index);
			key = key.substr(0, key.indexOf("["));
			console.log(key);
			if(eval("nameSources." + key) == undefined)
				console.log("[key=" + key + ",value=" + JSON.stringify(eval("nameSources." + key)) + "]");
			if(getLanguage() === "cn") {
				return eval("nameSources." + key + ".cn")[index];
			} else {
				return eval("nameSources." + key + ".en")[index];
			}
		} else {
			if(eval("nameSources." + key) == undefined)
				console.log("[key=" + key + ",value=" + JSON.stringify(eval("nameSources." + key)) + "]");
			if(getLanguage() === "cn") {
				return eval("nameSources." + key + ".cn");
			} else {
				return eval("nameSources." + key + ".en");
			}
		}

	};

	/**
	 * 刷新当前页面元素的语言
	 */
	owner.init = function initPage() {
		if(plus.storage.getItem("language") === "cn" || plus.storage.getItem("language") === "en") {
			cacheLanguage = plus.storage.getItem("language");
		} else {
			cacheLanguage = "cn";
			plus.storage.setItem("language", "cn");
		}
		var cells = document.getElementsByClassName("language");
		for(var i = 0; i < cells.length; i++) {
			var key = cells[i].getAttribute("language");
			var index = -1;
			if(key.indexOf("[") > 0) {
				index = key.substring(key.indexOf("[") + 1, key.indexOf("]"));
				key = key.substr(0, key.indexOf("["));
			}
			var type = cells[i].getAttribute("data-type");
			if(cells[i].tagName.toUpperCase() == 'INPUT'||cells[i].tagName.toUpperCase() == 'TEXTAREA') {
				//对input的placeholder处理
				if(index != undefined&&index!=-1) {
					cells[i].placeholder = owner.getValue(key)[index];
				} else {
					cells[i].placeholder = owner.getValue(key);
				}

			} else {
				//通用元素
				if(type == undefined || type == null || type.toUpperCase() != 'HTML') {
					if(index != undefined&&index!=-1) {
						console.log("key="+key+"index="+index);
						cells[i].innerText = owner.getValue(key)[index];
					} else {
						console.log("key="+key);
						cells[i].innerText = owner.getValue(key);
					}

				} else {
					if(index != undefined&&index!=-1) {
						console.log("key="+key+"index="+index);
						cells[i].innerHTML = owner.getValue(key)[index];
					} else {
						console.log("key="+key);
						cells[i].innerHTML = owner.getValue(key);
					}
				}
			}

		}
	};

})(window.Language = {});
//引入js即可,无需要在js中调用
//Language.init();
//添加监听,刷新所有的页面的语言
//window.addEventListener('LanguageRefresh', function(event) {
//	Language.init();
//});