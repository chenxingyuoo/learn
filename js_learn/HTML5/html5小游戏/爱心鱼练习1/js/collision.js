/**
 * Created by mac on 16/5/23.
 */
//判断大鱼和果实之间的距离
function bigFruitCollision(){
    //游戏进行中才可以操作
    if(data.gameOver) {
        for (var i = 0; i < fruit.num; i++) {
            //果实的 fruit.alive = true
            if (fruit.alive[i]) {
                var l = calLength2(fruit.x[i], fruit.y[i], big_fish.x, big_fish.y);

                //吃到果实时候的操作
                if (l < 900) {
                    //果实被吃掉
                    fruit.dead(i);

                    data.fruitNum++;  //大鱼吃掉的果实个数++
                    //判断吃到什么颜色的果实 , 吃到蓝色 ， 分数加2
                    if (fruit.fruitType[i] == 'blue')  data.double = 2;

                    big_fish.bigBodyCount++; //吃到一个果实 ， 大鱼身体颜色索引值++
                    if (big_fish.bigBodyCount > 7)  big_fish.bigBodyCount = 7; // 大于7 就 = 7 ; 只有7张图片

                    //波浪出现
                    wave.bron(fruit.x[i] , fruit.y[i]);
                }
            }
        }
    }
}

//判断大鱼和小鱼的距离
function monBabyCollision(){
    //大鱼吃掉的果实个数大于0个  ， 并且游戏进行中
    if(data.fruitNum > 0 && data.gameOver){
        var l = calLength2(big_fish.x, big_fish.y , small_fish.x , small_fish.y);  //两个坐标的距离
        if(l < 900){
            //小鱼身体状态回到0的图片上
            small_fish.smallBodyCount = 0;

            //得到分数 ， 大鱼吃掉的果实个数重置
            data.addScore();

            //大鱼的身体颜色重置
            big_fish.bigBodyCount = 0;

            halo.bron(big_fish.x , big_fish.y);
        }
   }
}