$(document).ready(function(){
        imgLacation();
})

function imgLacation(){
    //获取装照片大盒子的宽度
    var box=$(".box");
    //获取装照片小盒子的宽度
    var boxWidth=box.eq(0).width();
    console.log(boxWidth);
    //获取窗口宽/当前装照片容器的宽度=每行放的照片数量
    //Math.floor化整数
    var num=Math.floor($(window).width()/boxWidth);
    //创建一个空数组，放这一行中所有照片的高度
    var boxArr=[];
    //遍历box类数组对象取每个照片的高度
    box.each(function(index,value){
        console.log(index+"-----------"+value);
        //拿每个照片的高度
        var boxHeight=box.eq(index).height();
        console.log(boxHeight);

        //拿到的高度放在空数组中
        if(index<num){
            boxArr[index]=boxHeight;

        }else{
            //从boxArr[index]数组中判断最小高
            var minboxHeight=Math.min.apply(null,boxArr);
            //获取当前最小高的位置
            var minboxIndex=$.inArray(minboxHeight,boxArr);
            console.log(minboxHeight);
            console.log(value);
            $(value).css({
                "position":"absolute", 
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=box.eq(index).height();
        }
    })
}