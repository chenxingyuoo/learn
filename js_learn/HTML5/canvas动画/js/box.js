/**
 * Created by mac on 16/6/22.
 */
function Box(width, height ,color){
    if(width === undefined) {width = 40;}
    if(height === undefined) {height = 40;}
    if(color === undefined){color = '#00ff00';}
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.width = width;
    this.height = height;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.name = "";
    this.color = utils.parseColor(color);
    this.lineWidth = 1;

}

Box.prototype.draw = function(context){
    context.save();
    context.translate(this.x,this.y);
    context.rotate(this.rotation);
    context.scale(this.scaleX,this.scaleY);
    context.lineWidth = this.lineWidth;
    context.fillStyle = this.color;
    context.strokeStyle = this.color;
    context.beginPath();
    context.rect(0,0,this.width,this.height);
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};