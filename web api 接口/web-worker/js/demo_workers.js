/**
 * Created by chenxingyu on 2017/1/6.
 */


var i=0;

function timedCount()
{
    i = i+1;
    debugger;
    postMessage(i);
    setTimeout("timedCount()",500);
}

timedCount();