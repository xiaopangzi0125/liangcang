$(function(){
	//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");
	
//	//点击继续购物，返回首页
//	$(".continu").click(()=>{
//		location:"index.html";
//	});
	
	
	
//读取cookie中保存的购物车商品信息
	$.cookie.json = true;
	var prod = $.cookie("products") || [];
	// 显示已选购的商品信息 
	console.log(prod);
	var data = {
		products : prod
	};
	var html = template("cart_item",data);
	$(".cartTab").after(html)
	
	//点击全选，结算信息
	$(".ck_all").click(function(){
		var status = $(this).prop("checked");
		$(".ck_pro").prop("checked",status);
		calcTotal();
	});
	//单选
	$(".cartBody :checkbox").click(function(){
		calcTotal();
		if($(".cartBody :checkbox:checked").length === prod.length){
			$(".ck_all").prop("checked",true);
		}else{
			$(".ck_all").prop("checked",false);
		}
	})
	
	//点击+ - 增加/减少商品数量（0-99之间）
	$("#cart").delegate(".add,.minu","click",function(){
		var $row = $(this).parents(".cartBody");
		var pro = $row.data("product");
		// 修改界面显示数量
		if($(this).is(".add")){
			++pro.amount;
		}else{
			if(pro.amount <= 1)
				return;
			--pro.amount;
		}
		$row.find(".amount").val(pro.amount);
		// 修改显示小计
		$row.children(".sub").text(pro.amount * pro.price);
		// 显示合计
		calcTotal();
		// 修改cookie
		$.cookie("products", _products, {expires:7});
	});
	
	//输入实现修改
	$("#cart").on("blur","amount",function(){
		var pro = $(this).parents(".cartBody").data("product");
		var reg = /^[1-9]\d*$/;
		if(!reg.test($(this).val())){
			$(this).val(pro.amount);
		}
		// 输入数量正确
		pro.amount = $(this).val();
		// 修改小计显示
		$(this).parents(".cartBody").children(".sub").text(pro.price * pro.amount);
		//合计
		calcTotal();
		// 修改 cookie
		$.cookie("products", _products, {expires:7});
	});
	
	//点击删除
	$("#cart").on("click","a",function(e){
		e.preventDefault();
		var $row = $(this).parents(".cartBody");
		var pro = $row.data("product");
		var index = $.inArray(pro,prod);
		prod.splice(index,1);
		$row.remove();
		$.cookie("products",prod,{expires:7});
	});
	
	//合计函数
	function calcTotal(){
		var sum = 0;
		$(".cartBody input:checked").each(function(index,element){
			sum += Number($(element).parents(".cartBody").children(".sub").text());
		});
		$(".sumPrice").children().text(sum.toFixed(2));
	}
	
});