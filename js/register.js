$(function(){
	//图片验证码
	var verifyCode = new GVerify("scode");
	$("#btn").click(function(){
		var res = verifyCode.validate($("#code").val());
		if(res){
			
		}else{
			alert("验证码错误，请重新输入");
		}
	})
	
	
})