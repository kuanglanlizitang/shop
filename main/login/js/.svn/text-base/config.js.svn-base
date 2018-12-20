mui.init();
mui.plusReady(function(){
	Language.init();
	var ip = plus.storage.getItem("ip");
	var port = plus.storage.getItem("port");
	if(ip==null){
		document.getElementById("ip").value = "ivisit.u-iboard.com";
		document.getElementById("port").value = "80";
		plus.storage.setItem("ip","ivisit.u-iboard.com");
		plus.storage.setItem("port","80");
	}else{
		document.getElementById("ip").value = ip;
		document.getElementById("port").value = port;
	}
	
});

function settingSave(){
	plus.storage.setItem("ip",document.getElementById("ip").value);
	if(document.getElementById("port").value==""){
		plus.nativeUI.alert(Language.getValue("config[3]"),null,"",Language.getValue("customerSearchPop1Condition[2]"));
		return;
	}
	plus.storage.setItem("port",document.getElementById("port").value);
	plus.nativeUI.toast(Language.getValue("config[0]"));
	mui.back();
}
