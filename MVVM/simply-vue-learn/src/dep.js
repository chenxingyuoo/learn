/**
 * Created by chenxingyu on 2016/11/25.
 */
var uid = 0

module.exports = Dep

function Dep(){
    debugger;
    this.id = uid++
    this.subs = []
}

Dep.target = null

Dep.prototype.addSub = function (sub) {
    debugger;
    this.subs.push(sub)
}

Dep.prototype.depend = function () {
    debugger;
    Dep.target.addDep(this)
}

Dep.prototype.notify = function () {
    debugger;
    this.subs.forEach(function (sub) {
        debugger;
        sub.update()
    })
}
