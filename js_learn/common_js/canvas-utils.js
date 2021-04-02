window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
            return window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * 获取两点直线的角度
 * @param  {[Number]} x1 [description]
 * @param  {[Number]} y1 [description]
 * @param  {[Number]} x2 [description]
 * @param  {[Number]} y2 [description]
 * @return {[Number]}    [description]
 */
function getAngle(x1, y1,  x2, y2){
   var x = Math.abs(x1 - x2);
   var y = Math.abs(y1 - y2);
   var z = Math.sqrt(x*x + y*y);
   return  Math.round((Math.asin(y / z) / Math.PI*180));
}


/**
 * 获取两点坐标的距离（长度）
 * @param  {[Number]} x1 [description]
 * @param  {[Number]} y1 [description]
 * @param  {[Number]} x2 [description]
 * @param  {[Number]} y2 [description]
 * @return {[Number]}    [description]
 */
function calLength(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}



//返回指定区域的随机值
function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}