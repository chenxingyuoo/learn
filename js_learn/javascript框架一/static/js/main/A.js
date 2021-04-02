/**
 * Created by mac on 16/3/7.
 */
function A(name){
    this.name = name || '匿名';
    return alert(this.name);
}

A.prototype.hello = function(){
    alert('hello, ' + this.name );
}

window.A = A