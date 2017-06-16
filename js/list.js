$(function(){
	//引入头部
	$("#topbox").load("../html/include/header.html");
	//引入尾部
	$("#bottombox").load("../html/include/footer.html");
});

//------------商品数据----------------------
$.getJSON("../json/list.json",function(responseData){
	var data = {
		products : responseData
	}
	var html = template("list",data);    
	$(".products").append(html)
});

//点击购物车图标时,保存cookie，加入购物车
$(".products").delegate(".goCart","click",function(){
	console.log($(this));
	//获取页面的数据
	var product_id = $(this).parents("._cart").siblings(".intro").children(".id").text(),
		product_name = $(this).parents("._cart").siblings(".intro").children(".tle").text(),
		product_price = $(this).parents("._cart").siblings(".intro").children(".money").children("span").text(),
		product_amount = 1,
		product_pic = $(this).parents("._cart").siblings(".img").find(".move").attr("src");
	console.log(product_name,product_id,product_price,product_pic);
	
	var pro = {
		id : product_id,
		name : product_name,
		price : product_price,
		amount : 1,
		url : product_pic
	}
	console.log(pro)
	//保存到cookie
	$.cookie.json = true;
	var prod = $.cookie("products")||[];
	console.log(prod);
	var index = exist(product_id,prod);
	if(index === -1)
		prod.push(pro);
	else
		++prod[index].amount;
	$.cookie("products",prod,{expires:7});
	console.log($.cookie("products"));
	
	function exist(id,prod){
		for(var i = 0;i < prod.length;i++){
			if(prod[i].id === id)
				return i;
		}
		return -1;
	}
});

//购物车飞入效果
$(function(){
	$(".products").on("click",".goCart",function(e){
		//购物车飞入效果
		var $fly = $("<img src='../img/che2.png' style='position:absolute;width:100px'>"),
			cartOffset = $("#fly").offset();
		$fly.fly({
			start : {
				top : e.pageY - $(window).scrollTop(),
				left : e.pageX
			},
			end : {
				top : cartOffset.top - $(window).scrollTop(),
				left : cartOffset.left,
				width : 0,
				height : 0
			}
		});
	});
	
//返回顶部
	$(window).on("scroll",function(){
		var scTop = $(window).scrollTop();
		if(scTop >= 300){
			$("#backTop").stop().fadeIn();
		}else{
			$("#backTop").stop().fadeOut();
		}
		//点击图片返回顶部
		$("#backTop").click(function(){
			$("body,html").scrollTop(0);
		})
	});


});