$(function(){
//异步模板加载数据
	$.ajax({
					type:"get",
					url:"../json/products.json",
					async:true,
					dataType:"json",
					success:function(responseData){
						var data={
							products:responseData
						}
					var html=template("item", data);
					$(".leftbox").append(html);
	//				$(".bottombox").append(html);
	//				$(".floor").append(html);
					}
					
				});

/*鼠标经过nav边框滑过*/


/*商品蒙板出现*/
	/*$(".divImg").hover(function(){
		$(".goodsCover").show();
		$(".goodsOver").show();
	},function(){
		$(".goodsCover").hide();
		$(".goodsOver").hide();
	});*/


/*大的无缝轮播图*/
	var $imgs = $("#slideshow li"),
		len = $imgs.length,
		imgWidth = $imgs.eq(0).outerWidth(),
		currentIndex = 1,
		nextIndex = 2,
		timer = null,
		html = "",
		isMoving = false;//标记运动是否结束
	console.log(len,imgWidth,$imgs)
	
	/*克隆头尾两张图片追加到开头和结尾*/
	var first = $imgs.eq(0).clone(true),
		last = $imgs.eq(len - 1).clone(true);
	$("#slideshow ul").append(first).prepend(last);
	
	/*图片张数改变*/
	len += 2;
	
	/*设置ul的宽度,初始显示位置*/
	$("#slideshow ul").css({
		width:imgWidth * len,
		left:-imgWidth
	});
	
	/*创建添加小圆点*/
	for(var i = 0;i < len - 2;i++){
		html += "<div></div>";
	}
	$(html).appendTo("#bigPages").eq(0).addClass("current");
	/*点击小圆点切换显示图片*/
	$("#bigPages div").click(function(){
		nextIndex = $(this).index() + 1;
		move();
	});
	
	/*向前翻页*/
	$("#bigPrev").click(function(){
		if(!isMoving){
			nextIndex = currentIndex - 1;
			move();
		}
	});
	
	/*向后翻页*/
	$("#bigNext").click(function(){
		if(!isMoving)
			move();
	})
	
	/*鼠标移入停止计时器，移出计时*/
	$("#slideshow").hover(function(){
		$("#bigPrev").show();
		$("#bigNext").show()
		clearInterval(timer);
	},function(){
		$("#bigPrev").hide();
		$("#bigNext").hide();
		timer = setInterval(move,3000);
	}).trigger("mouseleave");
	
	/*运动函数*/
	function move(){
		isMoving = true;
		var lx = -imgWidth * nextIndex;
		$("#slideshow ul").stop().animate({left:lx},function(){
			isMoving = false;
			if(nextIndex >= len){
				$("#slideshow ul").css({
					left:-imgWidth
				});
				currentIndex = 1;
				nextIndex = 2;
			}else if(currentIndex <= 0){
				$("#slideshow ul").css({
					left:-imgWidth * (len - 2)
				});
				currentIndex = len - 2;
				nextIndex = len - 1;
			}
		});
		
		/*切换小圆点样式*/
		var circleIndex = (nextIndex === len - 1) ? 0 : (nextIndex - 1);
		$("#bigPages div").eq(circleIndex).addClass("current").siblings().removeClass("current");
		
		
		currentIndex = nextIndex;
		nextIndex++;
	}



/*小的淡入淡出轮播图*/
	var $pics = $("#scroll li"),
		lens = $pics.length,
		currIndex = 0,
		nexIndex = 1,
		intro = "",
		stimer = null;
	
	for(var i = 0;i < lens;i++){
		intro += "<div></div>";
	}
	$(intro).appendTo("#pages").eq(0).addClass("current");
	
	$("#scroll").hover(function(){
		$("#prev").show();
		$("#next").show();
		clearInterval(stimer);
	},function(){
		$("#prev").hide();
		$("#next").hide();
		stimer = setInterval(moves,1500)
	}).trigger("mouseleave");
	
	$("#pages").on("mouseover","div",function(){
		if(currIndex === $(this).index())
			return;
		nexIndex = $(this).index();
		moves();
	})
	
	$("#prev").click(function(){
		nexIndex = currIndex - 1;
		if(nexIndex < 0)
			nexIndex = len - 1;
		moves();
	})
	
	$("#next").click(moves);
	
	function moves(){
		$pics.eq(currIndex).fadeOut().end().eq(nexIndex).fadeIn();
		
		$("#pages div").eq(currIndex).removeClass("current").end().eq(nexIndex).addClass("current");
		
		currIndex = nexIndex;
		nexIndex++;
		if(nexIndex >= len)
			nexIndex = 0;
	}



/*楼层效果*/
	var headerHeight = $(".floor:eq(0)").offset().top,
		windowHeight = $(window).height(),
		nowIndex = 0,
		isMoving = false;
	
	/*窗口滚动事件*/
	$(window).on("scroll",function(){
		if(!isMoving){
			var scTop = $(window).scrollTop();
			//显示导航栏
			if(scTop >= headerHeight - windowHeight / 2){
				$("#menu").stop().fadeIn();
			}else{
				$("#menu").stop().fadeOut();
			}
		
			//遍历每层高度，判断楼层位置
			$(".floor").each(function(index,element){
				if(scTop >= $(element).offset().top - windowHeight / 2){
					$("#menu li").eq(index).children("span").show().end()
								 .siblings().children("span").hide();
								 
					//显示当前楼层
					nowIndex = index;
				}
			});
		}
	});
	
	//点击导航，定位到相应页面位置
	$("#menu li:not(:last)").click(function(){
		var floorIndex = $(this).index(),
			ly = $(".floor").eq(floorIndex).offset().top;//对应楼层的文档定位
		
		isMoving = true;
		
		//对应索引的背景切换
		$(this).children("span").show().end().siblings().children("span").hide();
		
		//将每层定位用动画移动到该层
		$("body,html").stop().animate({scrollTop: ly},600,function(){
			isMoving = false;
		});
	}).hover(function(){
		$(this).children("span").show();
	},function(){
		if($(this).index() !== nowIndex){
			$(this).children("span").hide();
		}
	});
	
	//点击top按钮到最顶部
	$("#menu li:last").click(function(){
		$("body,html").scrollTop(0);
	});


});
