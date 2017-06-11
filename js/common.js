$(function(){
	/*鼠标移入商品图标上上展示菜单*/
	$("#allproducts").on("mouseenter",function(){
		$("#nav_hid").slideDown(800);
	});
	$("#nav_hid").on("mouseleave",function(){
		$(this).slideUp(600);
	});
	
	/*点击搜索按钮出现搜索栏*/
	$("#search_icon").click(function(){
		$(this).hide();
		$("#search").show();
		$("#sousuo").animate({right: "0px"}).focus()		
	})
	$("#sousuo").blur(()=>{
		$("#search_icon").show();
		$("#search").hide();
		$("#sousuo").animate({right: "-500px"});
			console.log("111")
		});
	
	/*鼠标经过显示客户端二维码*/
	$(".clientdown").on("mouseenter",function(){
		$(".downcode").show();
	});
	$(".clientdown").on("mouseleave",function(){
		$(".downcode").hide();
	});
	
	/*鼠标经过微信显示微信二维码*/
	$(".wechart").on("mouseenter",function(){
		$(".wechart_code").show();
	});
	$(".wechart").on("mouseleave",function(){
		$(".wechart_code").hide();
	});
	
	/*吸顶效果*/
	var headerTop = $("#nav").offset().top;
	$(window).on("scroll",function(){
		if($(this).scrollTop() > headerTop){
			$("#nav").css({position:"fixed",top:0});
		}else{
			$("#nav").css({position:"relative"});
		}
	})
})














