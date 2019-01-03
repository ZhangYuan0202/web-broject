//创建游戏对象
(function () {
    //记录游戏对象
    var that;
    function Game(box) {
        this.food=new Food();
        this.snake=new Snake();
        this.box=box;
        that=this;
    }
    Game.prototype.start=function () {
        //1.把食物和蛇渲染到box中
        this.food.render(this.box);
        this.snake.render(this.box);
        //move测试
        // this.snake.move();
        // this.snake.render(this.box);
        // this.snake.move();
        // this.snake.render(this.box);
        // 2.开始游戏的逻辑
        //    2.1让蛇开始移动，并碰到边框结束
        runSnake();
           // 2.2通过上下左右键控制蛇的运动方向
        bindKey();
    }
    //通过方向键控制蛇的移动方向
    function bindKey() {
        document.addEventListener('keydown',function (e) {
            switch (e.keyCode) {
                case 37:
                    this.snake.direction='left';
                    break;
                case 38:
                    this.snake.direction='top';
                    break;
                case 39:
                    this.snake.direction='right';
                    break;
                case 40:
                    this.snake.direction='bottom';
                    break;
            }
        }.bind(that),false)

    }
    function runSnake(){
        //设置定时器，让蛇移动
        var timerId=setInterval(function () {
            //获取游戏对象的蛇属性
            this.snake.move(this.food,this.box);
            this.snake.render(this.box);
            //获取蛇头的位置
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            //获取蛇头能到的最大位置
            var maxX=this.box.offsetWidth/this.snake.width;
            var maxY=this.box.offsetHeight/this.snake.height;
            //判断蛇头等于最大位置游戏结束
            if (headX<0||headX>=maxX){
                alert("game over");
                clearInterval(timerId);
            }
            if (headY<0||headY>=maxY){
                alert("game over");
                clearInterval(timerId);
            }
        }.bind(that),150)
    }
    window.Game=Game;
})();


//测试
var box= document.getElementById('box');
var game=new Game(box);
game.start();