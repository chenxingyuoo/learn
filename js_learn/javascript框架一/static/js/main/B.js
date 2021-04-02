/**
 * Created by mac on 16/3/7.
 */
function B(name){
    this.name = name || '匿名';
    return alert(this.name);
}

B.prototype.hello = function(){
    alert('hello, ' + this.name );
}