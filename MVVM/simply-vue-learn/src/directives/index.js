/**
 * Created by chenxingyu on 2016/11/25.
 */
exports.model = {
    bind : function (){
        debugger;
        var self = this
        this.on('change', function () {
            self.set(self.el.value)
        })
    },
    update: function (value) {
        debugger;
        this.el.value = value
    }
}

exports.text = {
    bind: function () {
        // do nothing
    },
    update: function (value) {
        debugger;
        this.el.textContent = value
    }
}

