exports.replace = function replace(target, el) {
	debugger;
	target.parentNode.replaceChild(el, target)
}

exports.toArray = function toArray(list) {
	debugger;
	var l = list.length
	var ret = new Array(l)
	while (l--) {
		ret[l] = list[l]
	}
	return ret
}