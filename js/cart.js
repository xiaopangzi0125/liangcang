$(function(){
	//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");
	
	//点击继续购物，返回首页
	$(".continu").click(function(){
		location: "index.html";
	})
	
	
	
//读取cookie中保存的购物车商品信息
	$.cookie.json = true;
	var prod = $.cookie("products");
	// 显示已选购的商品信息 
		
	var data = {
		products : prod
	};
	var html = template("cart_item",data);
	$(".cartTab").after(html);
	
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
	
	//点击+ - 增加/减少商品数量
	$("#cart").delegate(".add,.minus","click",function(){
		var $row = $(this).parents(".cartBody");
		var num =  $(".count").val();
		var price = Number($(".price span").text());
		// 修改界面显示数量
		if($(this).is(".add")){
			++num;
		}else{
			if(num <= 1)
				return;
			--num;
		}
		$row.find(".count").val(num);
		// 修改显示小计
		$row.children(".sub").text(num * price);
		// 显示合计
		calcTotal();
		// 修改cookie
		var index = $(".cartBody").index($row);
		prod[index].amount = num;
		$.cookie("products",prod,{expires:7});
		console.log(prod);
	});
	
	//输入实现修改
	$("#cart").on("blur",".count",function(){
		var $row = $(this).parents(".cartBody");
		var num = $(".count").val();
		var price = Number($(".price span").text());
		var reg = /^[1-9]\d*$/;
		if(!reg.test($(this).val())){
			$(this).val(num);
		}
		// 输入数量正确
		num = $(this).val();
		// 修改小计显示
		$(".sub").text(price * num);
		//合计
		calcTotal();
		// 修改 cookie
		var index = $(".cartBody").index($row);
		prod[index].amount = num;
		$.cookie("products", prod, {expires:7});
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