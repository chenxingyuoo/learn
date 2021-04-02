/**
 * Created by Administrator on 2016/10/10.
 */
var Promise = function (fun, func){

    debugger
    // 状态变化监听函数集合
    this.statusChangeCallback = []

    // 任务队列
    this.queueArr = []

    // 加入到任务队列中,返回一个接受then方法的对象
    this.queueArr.push(fun)


    this.fun = fun;

    this.func = func;

    this.init();

    return this
};

Promise.prototype = {
    init : function (){
        debugger
        // 失败
        this.reject = function(value) {
            this.done('reject', 'fail', value)
        }.bind(this)

        // 完成
        this.resolve = function(value) {
            this.done('resolve', 'done', value)
        }.bind(this)

        // 有时，我们需要同步拿到resolve,reject钩子
        this.func && this.func(this.resolve, this.reject)

        //延时执行
        setTimeout(this.next.bind(this), 1)
    },
    next: function() {
        debugger
        this.status = 'PENDING'
        try {
            this.queueArr[0] && this.queueArr[0](this.resolve, this.reject)
        } catch (mes) {
            this.catchCallback && this.catchCallback(mes)
        }

    },
    then: function(res, rej) {
        debugger
        // 把所有的then都缓存都到队列里
        this.queueArr.push({
            resolve: res,
            reject: rej
        })

        return this
    },
    catch: function(fun) {
        debugger
        this.catchCallback = fun;
        return this

    },
    // 添加一个监听状态发生变化的函数
    addStatusChanger: function(fun) {
        this.statusChangeCallback.push(fun)
    },
    // 状态发生变化
    statusChange: function(value) {
        // status 应该是个数组，因为一个promise对象可能会被多个all/one给监听
        this.statusChangeCallback.forEach(function (item) {
            debugger
            item(value);
        });
    },

    done: function(type, status, value) {
        debugger
        // 移除已经执行的任务
        this.queueArr.splice(0, 1);
        this.status = status
        // 触发状态变化时间
        this.statusChange(this.status, value)
        if (this.queueArr[0]) {
            var then
            try {
                // 执行then resolve/reject函数
                then = this.queueArr[0][type](value)
            } catch (mes) {
                this.catchCallback && this.catchCallback(mes)
            }

            // 移除已经执行了的任务
            this.queueArr.splice(0, 1)

            // 如果then方法执行返回的结果还是一个promise对象，就把队列中的所有then方法转移给新的promise对象
            then instanceof Promise && [].push.apply(then.queueArr, this.queueArr)
        }
    }
};

Promise.all = function(arr) {
    debugger
    // arr = []
    // 接受一个数组参数
    return Promise.some(arr, arr.length)
}

Promise.one = function(arr) {
    // 也是接受一个数组参数
    return Promise.some(arr, 1)
}

Promise.some = function(arr, num) {
    debugger
    // 也是接受一个数组参数
    var len = arr.length
    var i = 0
    // 缓存每个promise的值
    var valueArr = []
    var resolveCache
    // 先新建一个Promise，

    // 因为resolve的获取是异步的，它要比foreach内的statusChange执行的晚
    // 因此Promise的reslove与reject应该被同步获取
    var self
    var ss = new Promise(function(res, rej) {
        // resolveCache = res
    }, function(res, rej) {
        resolveCache = res
    })

    arr.forEach(function(item, index) {
        // 他并没有及时的添加到每一个promise上
        // 因为
        debugger
        item.addStatusChanger(function(value) {
            valueArr[index] = value
            i++;
            // 因为Promise是异步的,如果所有的resolve都是同步的,这时候resolveCache还是undefined
            // 如果有异步的resolve，就会触发ss里的resolve
            i == num && resolveCache && resolveCache(valueArr)
        })
    })

    // 因为Promise是异步的如果Promise.all也是异步的话，就造成不能同步的给传递进来的Promise添加statusChange事件监听
    // 因此Promise.all中的addStatusChanger应该是同步的
    // 如果都是同步的resolve就return一个新的Promise
    if (i == num) {
        return new Promise(function(resolve, reject) {
            debugger
            resolve(valueArr)
        })
    }

    // 处理含有异步的resolve
    return ss
}