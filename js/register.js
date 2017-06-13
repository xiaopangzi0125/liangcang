$(function(){
//获得光标，默认提示属性消失
	$("#article input").on("focus",function(){
		$(this).attr({placeholder:""});
	});

//电话号码是否正确
	$("#phone").on("blur",function(){
		var reg = /^1[3578]\d{9}$/;
		if(!reg.test($(this).val())){
			$(".error1").text("请输入正确格式手机号");
		}else{
			$(".error1").hide();
		}
	});
	//设置密码
	$("#password").on("blur",function(){
		var reg = /^[a-z0-9_-]{6,20}$/;
		if(!reg.test($(this).val())){
			$(".error3").text("请输入至少6位的密码");
		}else{
			$(".error3").text("")
		}
	});	
	//验证密码是否相同
	$("#sure").on("blur",function(event){
		var pwd = $("#password").val();
		var pwdsure = $(this).val();
		if(pwd !== pwdsure){
			$(".error4").text("密码输入不一致");
		}else{
			$(".error4").text("");
		}
	});
	
	//图片验证码
	var verifyCode = new GVerify("scode");
	$("#code").on("blur",function(){
		var res = verifyCode.validate($("#code").val());
		if(res){
			$(".error2").text("");
		}else{
			$(".error2").text("验证码输入错误");
		}
	})
	
//点击注册按钮，验证注册成功后去登录，	
	$("#btn").click(function(event){
		var phone = $("#phone").val();
		var pwd = $("#password").val();
		var pwdsure = $("#sure").val();
		var code = $("#code").val();
		var rights = $("#article span").text();
		if(phone!=="" && pwd!=="" && pwdsure!=="" && code!=="" && rights === ""){
			var user = {
				id : phone,
				password : pwd
			};
			$(".success").text("注册成功,快去登录吧!").css({color:"limegreen"});
			//保存到cookie中
			$.cookie.json = true;
			$.cookie("username",user,{expires:7});
			
		}
	});
	
})