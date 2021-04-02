
var fs = require('fs');
var src = '/Users/chenxingyu/project/sq_project/pingan-nianhui/src/assets/img/';
var folders = ['menu/','login/','AI/',''];
var minKb = 10000; //10kb


//遍历文件夹
folders.forEach(function (folder) {
    var newSrc = src + folder;
	
	fs.readdir(newSrc, function(err, files) {    // files是名称数组，因此
		files.forEach(function (fileName) {

		fs.stat(newSrc + fileName,function(err,stat){
			// if (stat.size > minKb) {
	  //       console.log("'./static/img/" + fileName + "',")
			// }
			console.log("require('../assets/img/" + folder + fileName + "'),")
		})

	    })
	});

});

