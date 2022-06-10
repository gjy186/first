
$(document).ready(function(){
		imgLocation()
		
})





function imgLocation(){
	//获取装照片的box盒子 获取的是类数组对象
	var box = $(".box");
	//获取装照片的盒子宽度
	var boxWidth = box.eq(0).width();
	//获取当前设备窗口的宽度,设备宽度除以照片容器宽度就等于每行可以放几张照片
	var num = Math.floor($(window).width()/boxWidth)
	
	
	
	//创建一个空数组 放这一行中放所有照片的高度
	var boxArr = [];
	//遍历box类数组对象,取每个照片的高度
	box.each(function(index,value){
		console.log(index+"------------------------"+value);
		console.log(value);
		//拿到每个照片的的高度
		var boxHeight = box.eq(index).height();
		
		//拿到的高度放入空数组中
		if(index<num){
			boxArr[index]=boxHeight;
		}else{
			//boxArr[index]数组中判断最小高度
			var minboxHeight = Math.min.apply(null,boxArr);
			//获取当前最小高的位置
			var minboxIndex = $.inArray(minboxHeight,boxArr)
			$(value).css({
				"position":"absolute",
				"top":minboxHeight,
				"left":box.eq(minboxIndex).position().left,
			});
			boxArr[minboxIndex]+=box.eq(index).height();
		}
	})
}
window.addEventListener("resize", function(){
			imgLocation();
			location.reload([true])
		},true);