// 构造函数
THREE.VTKLoader = function () {
    THREE.EventDispatcher.call(this); // 继承自监听器，使这个类有监听的功能
};

// VTKLoader的原型函数，里面包含了VTKloader的成员函数，成员变量的定义
THREE.VTKLoader.prototype = {
    // 构造函数
    constructor: THREE.VTKLoader,
    // 加载函数，url表示要加载的vtk文件的url路径，callback表示加载完成后要调用的后续处理函数，这里是异步操作，加载需要一个过程，不能将程序阻塞在这里，所以需要异步回调
    load: function (url, callback) {
// 将类自身保存在scope中，scope表示域的意思，这里是为了避免this的歧义，因为，每一个地方使用this，其意义不一样。
        var scope = this;
// ajax 异步请求
        var request = new XMLHttpRequest();
// 加载完成的监听器，加载完成后，将调用第二个参数定义的回调函数
        request.addEventListener('load', function (event) {
            // 对服务器加载下来的数据进行解析，后面详细解释
            var geometry = scope.parse(event.target.responseText);
// 解析完成后，发一个load事件，表示数据解析完成
            scope.dispatchEvent({type: 'load', content: geometry});
// 如果设置了回调函数，那么调用回调函数
            if (callback) callback(geometry);
        }, false);
// 加载过程中，向自身发送进度progress信息，信息中包含已经加载的数据的字节数和文件总共的字节数，通过两者的百分比能够了解加载进度。
        request.addEventListener('progress', function (event) {
// 发送正在加载的消息，两个参数分别是已经加载了多少字节，总共多少字节
            scope.dispatchEvent({type: 'progress', loaded: event.loaded, total: event.total});
        }, false);
// 加载出错的监听器，加载的过程也可能出错，这里如果出错，进行错误处理，
        request.addEventListener('error', function () {
// 加载出错之后需要发布的错误消息，
            scope.dispatchEvent({type: 'error', message: 'Couldn\'t load URL [' + url + ']'});

        }, false);
// 初始化 HTTP 请求参数，例如 URL 和 HTTP 方法，但是并不发送请求。
        request.open('GET', url, true);
//发送 HTTP 请求，开始下载
        request.send(null);
    },

// parse函数在上面调用过，主要负责解析数据的功能，我们将在后面详细介绍解析函数，这里就不介绍了。
// data是从服务器传过来的数据，其实就是vtk文件中的文本数据 ，打开平【初级教程\chapter7A\models\vtk\bunny.vtk】看一下，你就知道是什么了？一定打开这个文件哦。
    parse: function ( data ) {
        // new 一个几何体
        var geometry = new THREE.Geometry();
// 定义一个内部函数vertex，用参数x,y,z生成一个顶点，并放入geometry的vertices数组中，
        function vertex( x, y, z ) {
            geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        }

// 定义一个面索引函数face3，将面的3个点的索引放入geometry的faces数组中。
        function face3( a, b, c ) {
            geometry.faces.push( new THREE.Face3( a, b, c ) );
        }
// 定义一个面索引函数。如果一个面由4个顶点组成，那么我们构造一个Face4放入faces中，注意面可以由在同一平面的3个点组成，也可以由同一平面的4个顶点组成。
        function face4( a, b, c, d ) {
            geometry.faces.push( new THREE.Face4( a, b, c, d ) );
        }
// pattern存放模式字符串，result是临时变量
        var pattern, result;

        // float float float
// pattern是一个正则表达式，能够匹配3个空格隔开的float，如-0.0378297 0.12794 0.00447467都是pattern的菜。对正则表达式不了解，请一定补习一下哦。
        pattern = /([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)[ ]+([\+|\-]?[\d]+[\.][\d|\-|e]+)/g;
// exec是正则表达式的执行匹配函数，result返回一个包含3个字符串的数组，如果data读到了最后，那么result将返回null
// while 循环在data中，寻找符合正则表示式的数据，将符合条件的数据，转换为一个顶点
        while ( ( result = pattern.exec( data ) ) != null ) {
            // ["1.0 2.0 3.0", "1.0", "2.0", "3.0"]
// 将字符串转换为float，并放入geometry中
            vertex( parseFloat( result[ 1 ] ), parseFloat( result[ 2 ] ), parseFloat( result[ 3 ] ) );
        }

        // 3 int int int
// 这里匹配面数据，如3 21216 21215 20399，这类数据是面索引数据
        pattern = /3[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;
// 取出data中的所有面索引数据，
        while ( ( result = pattern.exec( data ) ) != null ) {
            // ["3 1 2 3", "1", "2", "3"]
// 将面数据放入geometry的faces中
            face3( parseInt( result[ 1 ] ), parseInt( result[ 2 ] ), parseInt( result[ 3 ] ) );

        }

        // 4 int int int int
// 这里是4个顶点一个面的情况，本例的vtk文件，没有这种情况
        pattern = /4[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)[ ]+([\d]+)/g;

        while ( ( result = pattern.exec( data ) ) != null ) {
            // ["4 1 2 3 4", "1", "2", "3", "4"]
            face4( parseInt( result[ 1 ] ), parseInt( result[ 2 ] ), parseInt( result[ 3 ] ), parseInt( result[ 4 ] ) );

        }

// 这里的4个函数，在后面解释
        geometry.computeCentroids();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();

        return geometry;

    }

}