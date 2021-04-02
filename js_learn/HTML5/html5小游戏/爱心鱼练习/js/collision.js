/**
 * Created by mac on 16/5/23.
 */
//判断大鱼和果实之间的距离
function bigFruitCollision(){
    for (var i = 0; i < fruit.num; i++) {
        //果实的 fruit.alive = true
        if(fruit.alive[i]){
            var l = calLength2(fruit.x[i], fruit.y[i] , big_fish.x , big_fish.y);

            //吃到果实时候的操作
            if(l < 900){
                //果实被吃掉
                fruit.dead(i);

                //...
            }
        }
    }
}

//判断大鱼和小鱼的距离
function monBabyCollision(){
    var l = calLength2(big_fish.x, big_fish.y , small_fish.x , small_fish.y);  //两个坐标的距离
}