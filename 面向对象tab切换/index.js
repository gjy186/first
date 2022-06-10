window.onload = function () {
    //定义一个Tab类
    var that;
    class Tab {
        constructor(id) {
            that = this;
            //获取元素
            this.main = document.querySelector(id);
            this.add = this.main.querySelector(".tabadd");
            this.ul = this.main.querySelector(".firstNav ul");
            this.tabsContent = this.main.querySelector(".tabsContent");
            //调用init方法
            this.init();
        }
        //初始化操作,让相关的元素绑定事件...
        init() {
            //初始化前获取元素
            this.updateNode();
            //添加功能
            this.add.onclick = this.addTab;
            //切换功能
            for (var i = 0; i<this.lis.length; i++) {
                //添加一个属性
                this.lis[i].index = i;
                //点击时调用函数toggleTab
                this.lis[i].onclick = this.toggleTab;
                //点击时调用函数removeTab
                this.remove[i].onclick = this.removeTab;
                //双击时调用函数editTab
                this.spans[i].ondblclick = this.editTab;
                this.sections[i].ondblclick = this.editTab
            }
        }

        //更新获取
        updateNode() {
            this.lis = this.main.querySelectorAll("li");
            this.sections = this.main.querySelectorAll("section");
            this.remove = this.main.querySelectorAll(".delete");
            this.spans = this.main.querySelectorAll(".firstNav li span:first-child");
        }
        //切换功能
        toggleTab() {
            //再添加前,先还原其他的
            that.clearClass();
            //或者添加换下边框的颜色遮住:this.style.borderBottom='1px solid white';
            this.className = "liActive";
            // section是constructor里的
            that.sections[this.index].className = "contentActive"
        }
        //清除功能
        clearClass() {
            for (var i = 0; i < this.lis.length; i++) {
                this.lis[i].className = "";
                this.sections[i].className = "";
            }
        }
        //添加功能
        addTab() {
            //再添加前先还原其他的
            that.clearClass();
            var random =Math.random();
            //创建元素..
            var li = '<li class="liActive"><span>新的选项卡</span><span class="delete">-</span></li>'
            var section = ' <section class="contentActive">测试'+ random +'</section>'
             // 将元素动态放到父元素中..
             that.ul.insertAdjacentHTML("beforeend",li);
             that.tabsContent.insertAdjacentHTML("beforeend", section);
             // 添加完后要更新方法事件
            that.init();
        }
        //删除功能
        removeTab(event){
            //防止冒泡,防止触发li的切换事件
            event.stopPropagation();
            //拿到d对应li的索引号
            var index=this.parentNode.index;
            //删除点击的li和section
            that.lis[index].remove();
            that.sections[index].remove();
            //删除完后要更新方法事件
            that.init();
            //当删除的不是选中状态,则选中的不变,也就是下面的代码不执行
            if(document.querySelector(".liActive")) return;
            //删除后让前一个li处于选定状态
            index--;
            that.lis[index] && that.lis[index].click();    
        }
        //修改功能
        editTab() {
            var str = this.innerHTML;
            // 双击时禁止选定文字
            window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
            // 双击时生成文本框
            this.innerHTML = '<input type="text" />';
            // 文本框中保存原有文字
            var input = this.children[0];
            input.value = str;
            // 文本框中的文字处于选中状态
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

    new Tab('#tab');
}