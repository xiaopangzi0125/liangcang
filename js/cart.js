$(function(){
	//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");
	
	//点击继续购物，返回首页
	$(".continu").click(function(){
		location= "index.html";
	})
	
	
	
//读取cookie中保存的购物车商品信息
	$.cookie.json = true;
	var prod = $.cookie("products");
	console.log(prod);
	// 显示已选购的商品信息 
		
	var data = {
		products : prod
	};
	var html = template("cart_item",data);
	$(".cartTab").after(html);
	
	//显示添加商品个数
	$("#allNum").text($(".cartBody").length);
	console.log($(".cartBody").length);
	
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
			console.log(123)
		}else{
			$(".ck_all").prop("checked",false);
//			$(this).parents(".cartBody").css({backgroundColor:"#fffae8"});
		}
	})
	
	//点击+ - 增加/减少商品数量
	$("#cart").delegate(".add,.minus","click",function(){
		var $row = $(this).parents(".cartBody");
		var num =  $(this).siblings(".count").val();
		//console.log(num);
		var price = Number($(this).parents(".amount").siblings(".price").children("span").text());
		console.log(price);
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
		$row.children(".sub").text(num * price*100/100);
		console.log(num,price);
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
		if(confirm("确定删除选中商品么？")){
			var $row = $(this).parents(".cartBody");
			var pro = $row.data("product");
			var index = $.inArray(pro,prod);
			prod.splice(index,1);
			$row.remove();
			$.cookie("products",prod,{expires:7});
			$("#allNum").text($(".cartBody").length);
		}
	});
	
	//删除选中商品
	$(".delete").on("click",function(){
		if(confirm("是否删除选中商品？")){
			$(".cartBody :checkbox:checked").each(function(index,element){
				$row = $(element).parents(".cartBody");
				$row.remove();
				var pro = $row.data("products");
				var index = $.inArray(pro,prod);
				prod.splice(index,1);
				$.cookie("products",prod,{expires:7});
				$("#allNum").text($(".cartBody").length);
			})
		}
	})
	
	//合计函数
	function calcTotal(){
		var sum = 0,
			sumNum = 0;
		$(".cartBody input:checked").each(function(index,element){
			sum += Number($(element).parents(".cartBody").children(".sub").text());
			sumNum += Number($(element).parents(".cartBody").find(".count").val());
//			console.log(sumNum);
		});
		$(".sumPrice").children().text(sum.toFixed(2));
		$(".amount_sum").children().text(sumNum.toFixed(0));
		
	}
	
	
//点击结算按钮，保存选中商品的cookie
	$(".calcBtn").on("click",function(e){
		var products = [];
		$(".cartBody :checkbox:checked").each(function(index,element){
			var _pic = $(element).parents().siblings(".pic").children("img").attr("src");
			var _name = $(element).parents().siblings(".name").children("a").text();
			var _price = $(element).parents().siblings(".price").children("span").text();
			var _amount = $(element).parents().siblings(".amount").find(".count").val();
			var _sub = $(element).parents().siblings(".sub").text();
			var prod = {
				pic:_pic,
				name:_name,
				price:_price,
				amount:_amount,
				sub : _sub
			}
			products.push(prod);
			console.log(prod);
		
			//保存入cookie
			$.cookie("prods",products,{expires:7});
		});
		
		if($(".cartBody :checkbox:checked").length === 0){
			alert("您还没有勾选商品")
			e.preventDefault();
		}
	});
	
});