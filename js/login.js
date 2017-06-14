$(function(){
//点击登录按钮，进入首页	
	//电话号码是否正确
			console.log(11111);
	$("#mobile").on("blur",function(){
		var reg = /^1[3578]\d{9}$/;
		if(!reg.test($(this).val())){
			$(".into").text("请输入正确格式手机号");
		}else{
			$(".into").text("");
		}
	});
	//验证密码格式
	$("#pwd").on("blur",function(){
		var reg = /^[a-z0-9_-]{6,20}$/;
		if(!reg.test($(this).val())){
			$(".error").text("请输入正确格式的密码");
		}else{
			$(".error").text("")
		}
	});
	$("#btn").click(function(){
		if($("#mobile").val() !=="" && $("#pwd").val() !=="" && $("#login span").text() === ""){
			location="index.html";
		}
	});
	
})