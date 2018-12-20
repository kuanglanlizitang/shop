/**
 * 版本检查主要会比较两个版本号
 * 1.应用版本号(对应html资源):配置在manifest.json里面,如0.0.1
 * 2.外壳版本号(对应在apk/ipa中):
 * 		ios配置在General->Identity->Version
 * 		android配置在AndroidManifest.xml->android:versionCode
 */
(function($, owner) {

	var progress, label, isPanelinit;
	
	owner.initPanel = function(pid, lid) {
		if(document.getElementById(pid) != null) {
			document.getElementById(pid).style.display = '';
			progress = mui("#" + pid).progressbar();
			if(document.getElementById(lid) != null) {
				document.getElementById(lid).style.display = '';
				label = document.getElementById(lid);
				isPanelinit = true;
				return;
			}
		}
		isPanelinit = false;
	}

	owner.setPanel = function(process) {
		if(isPanelinit) {
			progress.setProgress(process);
			label.innerText = "已下载 " + process + "%";
		}
	}
	owner.setLabel = function(str) {
		if(isPanelinit) {
			label.innerText = str;
		}
	}

	owner.init = function(pid, lid, callback) {
		owner.initPanel(pid, lid);
		plus.runtime.getProperty(plus.runtime.appid, function(inf) {
			var appversion = inf.version;
			var nativeversion = plus.runtime.version;
			console.log("本地appversion:" + appversion + "   本地nativeversion:" + nativeversion);
			if(nativeversion=="9.0.8"){
				return callback();
			}
			
			
			HttpGet({
				type: "iVisitVersion"
			}, function(data) {
				console.log("网络appversion:" + data.data[0].APP_CODE + "   网络nativeversion:" + data.data[0].VERSION_CODE);
				
				
//				if(data.data[0].VERSION_CODE != nativeversion) {
//					//升级整体
//					if(plus.os.name.toUpperCase() == 'IOS') {
//						//跳转到系统浏览器进行升级
//						//plus.runtime.openURL(data.data[0].LOCATION);
//						//内部打开网页
//						mui.openWindow({
//							url: data.data[0].LOCATION,
//							id: 'download',
//						});
//					} else {
//						owner.downWgtorApp(data.data[0].LOCATION, 1);
//					}
//					return;
//				}
				if(parseInt(data.data[0].APP_CODE) > parseInt(appversion)) {
					//升级资源包
					owner.downWgtorApp(data.data[0].APP_URL, 2);
					return;
				}
				//进入主界面
				return callback();
			}, function(error) {
				plus.nativeUI.alert(Language.getValue("versioncheck[4]"),function(){},Language.getValue("versioncheck[0]"));
//				+ JSON.stringify(error));
			}, null);
		})
	}

	owner.downWgtorApp = function(wgtUrl, flag) {
		var download = plus.downloader.createDownload(wgtUrl, {
			filename: "_doc/update/"
		}, function(d, status) {
			if(status == 200) {
				if(flag == 2) {
					 owner.installWgt(d.filename);
				} else if(flag == 1) {
					plus.runtime.install(d.filename);
				}
			} else {
				plus.nativeUI.alert(Language.getValue("versioncheck[5]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
			}
		});
		download.addEventListener('statechanged', function(task, status) {
			switch(task.state) {
				case 2:
					owner.setLabel(Language.getValue("versioncheck[6]"));
					break;
				case 3:
					var percent = task.downloadedSize / task.totalSize * 100;
					owner.setPanel(parseInt(percent));
					break;
				case 4:
					owner.setLabel(Language.getValue("versioncheck[7]"));
					break;
			}
		});
		download.start();
	}

	owner.installWgt = function(path) {
		owner.setLabel("安装升级资源...");
		plus.runtime.install(path, {}, function() {
			plus.runtime.restart();
		}, function(e) {
			plus.nativeUI.alert("安装升级资源失败[" + e.code + "]：" + e.message);
		});
	}

}(mui, window.Version = {}));