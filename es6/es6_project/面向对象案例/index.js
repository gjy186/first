window.onload = function () {
    var that;
class Tab{
    //用来接受参数
    constructor(id){
        that=this;
        //获取元素
        //constructor中this指向new出来的对象table

        this.main=document.querySelector(id);//获取的是整个选项卡
        this.li=this.main.querySelectorAll("li");//获取选项卡中tab栏中的子选项
        this.section=this.main.querySelectorAll("section");//获取选项卡中内容区域的子选项
        //获取 +
        this.add=this.main.querySelector(".tabadd");//获取+
        this.ul=this.main.querySelector(".fisrstnav ul:first-child");
        this.zsection=this.main.querySelector(".tabscon");
        this.init();
    }
    update(){
        this.li=this.main.querySelectorAll("li");//获取选项卡中tab栏中的子选项
        this.section=this.main.querySelectorAll("section");//获取选项卡中内容区域的子选
        this.delete=this.main.querySelectorAll(".icon-guanbi")//获取小X
        this.span=this.main.querySelectorAll(".fisrstnav ul li span:first-child");//获取Li下的第一个span

    }
    //初始化操作
    init(){
        this.update();
        this.add.onclick=this.addTab;
        for(var i=0;i<this.li.length;i++){
            this.li[i].xb=i;
            // this.li[i].onclick=function(){
            //     // alert(this.xb)

            // }
            //公有属性和方法是new出来的对象可以享用,this指的就是new出来的对象,所有用this调用共有属性和方法
            this.li[i].onclick=this.toggleTab;
            this.delete[i].onclick=this.removeTab;
            this.span[i].ondblclick=this.editTab;
            this.section[i].ondblclick=this.editTab;

           
        }
    }
     //1.切换功能
     toggleTab(){
         //谁调用的toggleTab方法, this就指向谁 指向的是小li
        //  alert(this.xb);
        that.clearClassName();

        this.className="liactive";//通过类名去除下边框线
        that.section[this.xb].className="conactive"
     }
     //去除类名的方法
     clearClassName(){
         for(var i=0;i<this.li.length;i++){
            this.li[i].className="";
            this.section[i].className="";
         }
     }
     //2.添加功能
     addTab(){
         that.clearClassName();
         var random =Math.random();
         //创建新元素 li
         var li=`<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>`
        var section=`<section class="conactive">测试 `+ random +`</section>`
        that.ul.insertAdjacentHTML("beforeend",li);
        that.zsection.insertAdjacentHTML("beforeend",section);
        that.init();
        }
     //3.删除功能
     removeTab(e){
         e.stopPropagation();//阻止冒泡·
        //this 代表的是小X
        var index= this.parentNode.xb;
        that.li[index].remove();
       that.section[index].remove();
       that.init();
            //当删除的不是选中状态,则选中的不变,也就是下面的代码不执行
            if(document.querySelector(".liactive")) return;
            //删除后让前一个li处于选定状态
            index--;
            //当 that.li[index]为true添加点击事件,否则不会添加
            that.li[index] && that.li[index].click();  
     }
     //修改功能
     editTab(){
        var str= this.innerHTML;
         //去除双击选中
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        this.innerHTML='<input type="text" />';
       var input=this.children[0];
        input.value=str;
        input.select();
        // 当离开文本框时,把文字给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车键也可以把文本框中的值给span
        input.onkeyup = function (event) {
            if (event.keyCode === 13) {
                // 回车键是13,回车相当于调用失去焦点的事件
                this.blur();
            }
        }
     }
}
 var Table=new Tab("#tab");
 }