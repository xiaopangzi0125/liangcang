$(function(){
//放大镜效果
	//获取大小图片的宽高
	var smallWidth = $("#middleImg").outerWidth(),
		smallHeight = $("#middleImg").outerHeight(),
		markWidth = $("#mark").innerWidth(),
		markHeight =$("#mark").innerHeight(),
		bigWidth = $("#bigImg").outerWidth(),
		bigHeight = $("#bigImg").outerHeight(),
		rateX = bigWidth / markWidth,
		rateY = bigHeight / markHeight;
	console.log(smallWidth,markWidth,bigWidth,rateX ,rateY);

	//鼠标移入时大小图出现或消失
	$("#middleImg").on("mouseover",function(){
		$("#mark").show();
		$("#bigImg").show();
	});
	$("#middleImg").on("mouseout",function(){
		$("#mark").hide();
		$("#bigImg").hide();
	});
	
	//镜头移动
	$("#middleImg").on("mousemove",function(e){
		//获得镜头坐标
		var ox = e.pageX - markWidth / 2;
		var oy = e.pageY - markHeight / 2;
		//获取镜头文档定位
		$("#mark").offset({left:ox,top:oy});
		var lx = $("#mark").position().left,
			ly = $("#mark").position().top;
		//限制镜头移动范围
		if(lx < 0)
			lx = 0;
		else if(lx > smallWidth - markWidth)
			lx = smallWidth - markWidth;
		if(ly<0)
			ly=0;
		else if(ly>=smallHeight-markHeight)
			ly=smallHeight-markHeight;
		//设置镜头坐标
		$("#mark").css({left:lx,top:ly});
		//设置大图坐标
		$("#bigImg img").css({left:-1 * rateX * lx,top:-1 * rateY * ly});
	});
	//切换小图片时，相应切换中图和大图	
	var imgmd = $("#middleImg li"),
		imgbg = $("#bigImg img"),
		imgsm = $("#listBox li");
	for(let i = 0;i < imgsm.length;i++){
		imgsm.eq(i).on("click",function(){
			//中图变化
			for(var j = 0;j < imgmd.length;j++){
				imgmd.eq(j).hide();
				imgsm.eq(j).css({border:"2px solid #fff"})
			}
			imgmd.eq(i).show();
			imgsm.eq(i).css({border:"2px solid red"})
			//大图变化
			for(var j = 0;j < imgbg.length;j++){
				imgbg.eq(j).hide();
			}
			imgbg.eq(i).show();
		})
	}

//点击立即购买，跳转至确认页
	$("#buynow").click(function(){
		location:"结算页面还没写啊"
	});
//点击+ - 增加/减少商品数量（0-99之间）
	$("#minu").on("click",function(){
		if(Number($(".inpt").val()) > 0){
			$(".inpt").val(Number($(".inpt").val())-1);
		}
	});
	$("#add").on("click",function(){
		if(Number($(".inpt").val()) < 99){
			$(".inpt").val(Number($(".inpt").val())+1);
		}
	});
	
//购物车飞入效果
	$(function(){
		$(".btn1").on("click",function(e){
			console.log("111")
			//购物车飞入效果
			var $fly = $("<img src='../img/01.jpg' style='position:absolute;width:100px'>"),
				cartOffset = $("#cart").offset();
				
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
			})
		});	
	});	
	
//点击购物车,保存cookie
	$(".btn1").on("click",function(){
		//获取页面的数据
		var product_id = $("#like").text(),
			product_name = $(".brand").text(),
			product_price = $(".bprice span").text(),
			product_amount = Number($(".inpt").val()),
			pic = $(".url").attr("src");
		
		var pro = {
				id : product_id,
				name : product_name,
				price : product_price,
				amount : product_amount,
				url : pic
		}
		$.cookie.json = true;
		var prod = $.cookie("products")||[];
		console.log(prod)
//		if(prod === null)
//			prod = [];
		var index = exist(product_id,prod);
		//存到本地cookie保存
		if(index === -1){
			prod.push(pro);
			//上传到数据库保存
			$.ajax({
				type:"get",
				url:"../php/cart.php",
				async:true,
				dataType:"json",
				data:{
					action : "add",
					username : "test",
					id : product_id,
					name : product_name,
					price : product_price,
					amount : product_amount
				},
				success:function(data){
					console.log(data)
				}
			});
		}else{
			//更新本地cookie
			prod[index].amount += Number(product_amount)
			//更新数据库购物车信息
			$.ajax({
				url:"../php/cart.php",
				type:"get",
				dataType:"json",
				data:{
					action:"update",
					username:"test",
					id : product_id,
					amount:prod[index].amount
				},
				success:function(data){
					console.log(data)
				}
			});
		}
		$.cookie("products",prod,{expires:7,path:"/"});
		//判断商品是否存在的函数
		function exist(id,prod){
			for(var i = 0,len = prod.length;i < len;i++){
				if(prod[i].id === id)
					return i;
			}
			return -1;
		}
	});	
});































