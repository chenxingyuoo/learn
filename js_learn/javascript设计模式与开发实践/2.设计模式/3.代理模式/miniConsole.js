/**
 * Created by chenxingyu on 2017/3/3.
 */
window.miniConsole = {
    log: function () {
        console.log(Array.prototype.join.call(arguments));
    }
};