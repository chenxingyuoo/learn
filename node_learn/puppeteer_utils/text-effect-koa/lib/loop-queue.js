const isFunction = (val) => {
    return typeof val === 'function'
}

const isObject = (val) => {
    return typeof val === 'object'
}

const isNumber = (val) => {
    return typeof val === 'number'
}

/**
 * 循环任务队列
 * @description 循环任务队列
 * @class LoopQueue
 * @param opts.runtimeCount 最大任务并发数
 * @param opts.delay 定时器时间
 */
class LoopQueue {
    constructor (opts = {}) {
        this.list = [];  //任务列表
        this.runingCount = 0;  //当前运行任务数
        this.ps = false; //暂停
        this.timer = null // 定时器
        this.delay = !opts.delay || opts.delay <= 0 || !isNumber(opts.delay) ? 500 : opts.delay // 延迟
        this.count = !opts.runtimeCount || opts.runtimeCount <= 0 || !isNumber(opts.runtimeCount) ? 20 : opts.runtimeCount //最高并发数
    }
    _shift () {
        return this.list.shift()
    }
    //清空任务队列
    clear () {
        this.list = [];
        return this;
    }
    //暂停任务队列
    pause () {
        this.ps = true
        this.timer && clearInterval(this.timer)
    }
    //设置任务
    push (item) {
        if (!isObject(item) && !isFunction(item)) {
            console.log('push item need object or function')
            return
        }
        this.list.push(item)
        return this
    }
    // 获取队列长度
    getLen () {
        return this.list.length
    }
    // 运行
    run () {
        this.ps = false
        this.timer = setInterval(() => {
            const listLen = this.getLen()
            if (!listLen) {
                return
            }

            const i = this.count - this.runingCount
            let len

            if (i - listLen > 0) {
                len = listLen
            } else {
                len = i
            }

            // 并发处理
            while (len) {
                len--

                let fn, options
                let item = this._shift()
                
                if (isFunction(item)) {
                    fn = item
                } else if (isObject(item)) {
                    fn = item.fn
                    options = item.options
                }

                this.runingCount++
                fn(options).then(() => {
                    this.runingCount--
                }).catch(() => {
                    this.runingCount--
                })
            }
           
        }, this.delay)
    }
}

module.exports = LoopQueue