$(function(){
//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");	
	
//点击返回购物车按钮回到购物车页面
	$(".back").click(function(){
		location= "cart.html";
	});

//地市级三级联
	//省级
	function initpro(data){
		var provinces = data.showapi_res_body.data;
		var html = "";
		provinces.forEach(function(province){
			html += '<option value="'+province.id+'">'+province.areaName+'</option>';
		});
		$("#province").append(html);
	}
	$.getJSON("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054&level=1&page=1",function(data){
		initpro(data);
		//显示第二页
		$.getJSON("http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054&level=1&page=2",function(data){
			initpro(data);
			initcity();//绑定城市
		})
	});
	
	//查询城市信息
	function initcity(){
		var province_id = $("#province").val();
		$.getJSON("http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054&parentId="+province_id,function(data){
			var cities = data.showapi_res_body.data;
			var html = "";
			cities.forEach(function(city){
				html += '<option value="'+city.id+'">'+city.areaName+'</option>';
			});
			$("#city").empty().append(html);
			initdis();
		})
	}
	
	//根据城市的选择，查询区县信息
	function initdis(){
		var city_id = $("#city").val();
		$.getJSON("http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=e48f5d7e50334ffca41693016df78054&parentId="+city_id,function(data){
			var districts = data.showapi_res_body.data;
			var html = "";
			
			districts.forEach(function(district){
				html += '<option value="'+district.id+'">'+district.areaName+'</option>';
			});
			$("#district").empty().append(html);
		});
	}
	// 当省份选择改变时，更新城市下拉列表内容
	$("#province").change(initcity);
	// 当城市选择改变时，更新区县下拉列表内容
	$("#city").change(initdis);

//点击保存按钮将地址保存到页面
	$("#save").click(function(){
		//获取输入的信息
		var name = $(".men").val(),
			phone = $(".iphone").val(),
			prov = $("#province :selected").text(),
			city = $("#city :selected").text(),
			disc = $("#district :selected").text(),
			addr = $(".inpt").val(),
			mail = $(".email").val();
		//验证电话号码
		$(".iphone").on("blur",function(){
			var reg = /^1[3578]\d{9}$/;
			if(!reg.test(phone)){
				$(".into").text("手机号码格式不正确");
			}else{
				$(".into").text("");
			}
		});
		if(name!=="" && phone!=="" && addr!=="" && mail!==""){
			var html = "<div class='over'>" + prov + "," +city + "," + disc + "," + addr + "<br>" + name + " " + phone + "</div>";
			$(".read").append(html);
		}else{
			alert("为了保证商品准确到达您的手中，请填写完整信息");
		}
		
	});

//点击取消按钮，清除填写的信息
	$("#cancel").click(function(){
		if(confirm("是否清除已填写信息？")){
			//设置输入的信息为空
			$(".men").val(""),
			$(".iphone").val(""),
			$(".inpt").val(""),
			$(".email").val("");
		}
	})
	
//点击支付物流方式，出现确认框
	$(".click_pay").on("click",function(){
		$(this).css({border:"2px solid #000"}).children(".arrow").show().end().siblings(".click_pay").css({border:"2px solid #ddd"}).children(".arrow").hide();
	});
	$(".cli").on("click",function(){
		$(this).css({border:"2px solid #000"}).children(".arrow").show().end().siblings(".cli").css({border:"2px solid #ddd"}).children(".arrow").hide();
	});
	
//读取购物车要结算商品的cookie，显示到页面上
	$.cookie.json = true;
	var prod = $.cookie("prods");
	var data = {
		products : prod
	};
	
	var html = template("cart_over",data);
	$(".list").after(html);
	//合计总金额
	var totals = 0;
	$(".prodSure").each(function(index,element){
		totals += Number($(element).children(".sum").text());
		console.log(totals);
	});
	$("#pro_total").text(totals);
	$("#total").text(totals);
		
	
//点击提交按钮，温馨提示
	$("#submit").click(function(){
		alert("感谢光顾<良仓>，支付系统暂未开放！你可以瞅瞅...")
	})
})