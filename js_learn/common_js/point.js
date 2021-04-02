/**
 * Created by chenxingyu on 2016/12/2.
 */
    // point , 接收x,y坐标 ， 返回拥有x和y属性的对象
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }

    //接收另一个point作为参数，并且返回一个新point ，新point的x，y值 ，是给定的两个point点x ， 点y 相加的和
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };


    Point.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ")";
    };