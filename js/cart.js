$(function(){
	//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");
	
	//点击继续购物，返回首页
	$(".continu").click(()=>{
		location:"index.html";
	});
	
	//读取cookie中保存的购物车商品信息
	$.cookie.json = true;
	var prod = $.cookie("products") || [];
	
	// 显示已选购的商品信息 
	prod.forEach(function(product){
		$(".template").clone(true).data("product",prod).insertBefore("#calcTotal")
					  .addClass("cartTab").removeClass("template").show()
					  .children(".product").text(prod.name)
					  .next()
	})
	
	
	
	
	
});