/**
 * Created by mac on 16/7/1.
 */
(function($) {
    $.websocket = function(options) {
        var defaults = {
            domain: top.location.hostname,
            port:80,
            path: ""
        };
        debugger
        var opts = $.extend(defaults,options);
        // 注意：必须为绝对url，websocket不支持同源策略。
        var szServer = (top.location.protocol == 'http:' ? "ws://" : "wss://")
            + opts.domain + ":" + opts.port + "/" + opts.path ;
        var socket = null;
        var bOpen = false;
        var t1 = 0;
        var t2 = 0;
        var messageevent = {
            onInit:function(){
                if(!("WebSocket" in window) && !("MozWebSocket" in window)){
                    if(!Boolean($.cookie('session'))) {
                        $.moyuAlert('您的浏览器不支持websocket，将不能使用好友功能。');
                        $.cookie('session', true);
                    }
                    return false;
                }
                if(("MozWebSocket" in window)){
                    socket = new MozWebSocket(szServer);
                }else{
                    socket = new WebSocket(szServer);
                }
                if(opts.onInit){
                    opts.onInit();
                }
                // 成功建立连接时触发
                socket.onopen = messageevent.onOpen;
                // 接受到服务器的数据触发
                socket.onmessage = messageevent.onReceive;
                // 发生错误时触发
                socket.onerror = messageevent.onError;
                // 连接关闭时触发
                socket.onclose = messageevent.onClose;
            },
            onOpen:function(event){
                bOpen = true;
                if(opts.onOpen){
                    opts.onOpen(event);
                }
            },
            onSend:function(msg){
                t1 = new Date().getTime();
                if(opts.onSend){
                    opts.onSend(msg);
                }
                // 发送数据至服务器
                socket.send(msg);
            },
            onReceive:function(msg){
                t2 = new Date().getTime();
                if(opts.onReceive){
                    opts.onReceive(msg.data,t2 - t1);
                }
            },
            onError:function(event){
                if(opts.onError){
                    opts.onError(event);
                }
            },
            onClose:function(event){
                if(opts.onClose){
                    opts.onClose(event);
                }
                // 关闭连接
                if(socket.close() != null){
                    socket = null;
                }
            }
        };
        messageevent.onInit();
        this.send = function(pData){
            if(bOpen == false){
                return false;
            }
            messageevent.onSend(pData);
            return true;
        }
        //
        this.close = function(){
            messageevent.onClose();
        }
        this.bOpen=bOpen;
        return this;
    };
})(jQuery);