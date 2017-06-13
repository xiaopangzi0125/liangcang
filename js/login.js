$(function(){
//电话号码是否正确
	$("#mobile").on("blur",function(){
		var reg = /^1[3578]\d{9}$/;
		if(!reg.test($(this).val())){
			$(".into").text("请输入正确格式手机号").css({color:"red",position:"absolute",right:"-140px",fontSize:"14px"});
		}else{
			$(".into").text("");
		}
	});
	//验证密码格式
	$("#pwd").on("blur",function(){
		var reg = /^[a-z0-9_-]{6,20}$/;
		if(!reg.test($(this).val())){
			$(".error").text("请输入正确格式的密码").css({color:"red",position:"absolute",right:"-140px",fontSize:"14px"});
		}else{
			$(".error").text("")
		}
	});
	
})