/**
 * Created by chenxingyu on 2016/11/25.
 */
var directives = require('./directives')
var toArray = require('./utils').toArray
var replace = require('./utils').replace

// debugger;

var regTag = /{{([^{}]+)}}/g

exports.compileRoot = function compileRoot(el, options) {
    return function rootLinkFn(vm, el) {
        // TODO
    }
}

//编译
exports.compile = function compile(el, options) {
    // debugger;
    var nodeLinkFn = compileNode(el, options)  //编译节点
    var childLinkFn = el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null  //如果该节点下面还有子节点 ， 编译节点列表

    return function compositeLinkFn(vm, el) {
        debugger;
        var childNodes = [].slice.call(el.childNodes)
        linkAndCapture(function compositeLinkCapturer() {
            debugger;
            if (nodeLinkFn) nodeLinkFn(vm, el)
            if (childLinkFn) childLinkFn(vm, childNodes)
        }, vm)
    }
}

//链接和捕获
function linkAndCapture(linker, vm) {
    debugger;
    var originalDirCount = vm._directives.length
    linker()
    var dirs = vm._directives.slice(originalDirCount)
    dirs.forEach(function (dir) {
        dir._bind()
    })
    return dirs
}

//编译节点
function compileNode(node, options){
    // debugger;
    if (node.nodeType === 1) {
        return compileElement(node, options)
    } else if (node.nodeType === 3) {
        return compileTextNode(node, options);
    } else {
        return null
    }
}

//编译htm节点
function compileElement(node, options){
    // debugger;
    // 只处理 input[type="text"][v-model]
    if (node.tagName === 'INPUT' && node.hasAttribute('v-model')) {
        var exp = node.getAttribute('v-model').trim()
        return makeNodeLinkFn({
            name: 'model',
            exp: exp,
            def: directives.model
        })
    } else {
        return null
    }
}

//编译文本
function compileTextNode(node, options){

    var tokens = parseText(node.wholeText)
    if (tokens){
        // debugger;
        var frag = document.createDocumentFragment()
        tokens.forEach(function (token) {
            debugger;
            var el = token.tag ? processTextToken(token) : document.createTextNode(token.value)
            frag.appendChild(el)
        })
        return makeTextNodeLinkFn(tokens, frag)
    }
}

//编译节点列表
function compileNodeList(nodeList, options){
    // debugger;
    var linkFns = []
    var nodeLinkFn, childLinkFn, node
    for (var i = 0, l = nodeList.length; i < l; i++) {
        node = nodeList[i]
        nodeLinkFn = compileNode(node, options) //编译节点
        childLinkFn = node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null  //如果该节点下面还有子节点 ， 递归编译节点列表
        linkFns.push(nodeLinkFn, childLinkFn)
    }
    return linkFns.length ? makeChildLinkFn(linkFns) : null
}

//使节点链接到 nodeLinkFn
function makeNodeLinkFn(dir) {
    // debugger;
    return function nodeLinkFn(vm, el) {
        // debugger;
        vm._bindDir(dir, el)
    }
}

//使子节点节点链接到 childLinkFn
function makeChildLinkFn(linkFns){
    // debugger;
    return function childLinkFn(vm, nodes) {
        // debugger;
        var node, nodeLinkFn, childrenLinkFn
        for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
            node = nodes[n]
            nodeLinkFn = linkFns[i++]
            childrenLinkFn = linkFns[i++]
            if (nodeLinkFn) nodeLinkFn(vm, node)
            if (childrenLinkFn) childrenLinkFn(vm, toArray(node.childNodes))
        }
    }
}

//使文本节点链接到 textNodeLinkFn
function makeTextNodeLinkFn(tokens, frag){
    // debugger;
    return function textNodeLinkFn(vm, el) {
        // debugger;
        var fragClone = frag.cloneNode(true)
        var childNodes = toArray(fragClone.childNodes)
        tokens.forEach(function (token, i) {
            var value = token.value
            if (token.tag) {
                var node = childNodes[i]
                vm._bindDir(token.descriptor, node)
            }
        })
        replace(el, fragClone)
    }
}

//过程文本标记
function processTextToken(token) {
    // debugger;
    var el = document.createTextNode(' ')
    // 简化，双向绑定，text 模式
    token.descriptor = {
        name: 'text',
        exp: token.value,
        def: directives.text
    }
    return el
}


//解析 {{ }} 文本
function parseText(text){

    //正则表达式匹配
    if (!regTag.test(text)) {
        return
    }


    var tokens = []
    var lastIndex = regTag.lastIndex = 0
    var match, index, value

    while ((match = regTag.exec(text))) {

        index = match.index

        // push text token
        if (index > lastIndex) {
            tokens.push({
                value : text.slice(lastIndex, index)
            });
        }

        value = match[1]

        tokens.push({
            tag: true,
            value: value.trim()
        })

        lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
    }

    // debugger;

    return tokens
}