(function () {
    var elements=[];
//创建食物属性 食物的属性有 宽度 width   高度 height  坐标 x  y   颜色
    function Food(options) {
        options=options||{};
        this.x=options.x||0;
        this.y=options.y||0;
        this.width=options.width||20;
        this.height=options.height||20;
        this.color=options.color||"green";

    }
//声明成变量，便于维护
    var position="absolute";
//创建食物的方法
    Food.prototype.render=function (box) {
        remove();
        //随机设置食物的位置，x 和 y
        this.x=Tools.getRandom(0,box.offsetWidth/this.width-1)*this.width;
        this.y=Tools.getRandom(0,box.offsetHeight/this.height-1)*this.height;

        //动态创建div ，并插入box中
        var div = document.createElement("div");
        box.appendChild(div);
        //把div放入空数组中
        elements.push(div);
        //脱离文档流
        div.style.position=position;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
    }

    function remove() {
        for (var i=elements.length-1;i>=0;i--){
            elements[i].parentNode.removeChild(elements[i]);
            elements.splice(i,1);
        }
    }
    window.Food = Food;
})();