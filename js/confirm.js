$(function(){
//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");	
	
//点击返回购物车按钮回到购物车页面
	$(".back").click(function(){
		location= "cart.html";
	})

})