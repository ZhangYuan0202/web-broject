//自调用函数，创建一个新的局部作用域，避免命名冲突
(function () {
    //创建一个空数组，用于存放蛇对象
    var elements=[];
//创建蛇对象  蛇对象的属性都有大小 ，运动方式，坐标
    function Snake(options) {
        options=options||{};
        this.width=options.width||20;
        this.height=options.height||20;
        this.direction=options.direction||'right';
        this.body=[
            {x:3 ,y:2,color:'red'},
            {x:2, y:2,color:'blue'},
            {x:1,y:2,color:'blue'},
        ]

    }
//蛇对象的方法
    Snake.prototype.render=function (box) {
        //删除之前的蛇
        remove();
        for (var i=0;i<this.body.length;i++){
            //蛇节
            var object=this.body[i];
            //动态创建div
            var div= document.createElement("div");
            box.appendChild(div);
            //把蛇放入空数组中
            elements.push(div);
            div.style.position='absolute';
            div.style.width=this.width+'px';
            div.style.height=this.height+'px';
            div.style.left=object.x*this.width+'px';
            div.style.top=object.y*this.height+'px';
            div.style.backgroundColor=object.color;
        }
    }
//创建一个私有函数，删除之前的蛇
    function remove() {
        for (var i = elements.length - 1; i >= 0; i--) {
            //删除div
            elements[i].parentNode.removeChild(elements[i]);
            //删除数组中的元素
            elements.splice(i, 1);
        }
    }

        //控制蛇的移动方法
     Snake.prototype.move=function (food ,box) {
            //蛇身的移动，每次移动到的位置为上一个蛇身的位置（遍历不包括蛇头，所以i!=0）
         for (var i=this.body.length-1;i>0;i--){
             this.body[i].x=this.body[i-1].x;
             this.body[i].y=this.body[i-1].y;
         }
         //判断蛇头的移动方向
         var head=this.body[0];
         switch (this.direction) {
             case 'right':
                 head.x+=1;
                 break;
             case 'left':
                 head.x-=1;
                 break;
             case 'top':
                 head.y-=1;
                 break;
             case 'bottom':
                 head.y+=1;
                 break;
         }
         //判断蛇头的位置是否和食物的位置重合
         var headX=head.x*this.width;
         var headY=head.y*this.height;
         if (headX===food.x && headY===food.y){
            var last=this.body[this.body.length-1];
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color,
                })
             food.render(box)

         }
     }
    //暴露构造函数给外部
    window.Snake=Snake;
})();
//测试n
// var box=document.getElementById("box");
// var snake=new Snake();
// snake.render(box);