var glob = require('glob');
var path = require('path');

exports.assetsPath = function (_path) {
	// var assetsSubDirectory = process.env.NODE_ENV === 'production'
	// 	? config.build.assetsSubDirectory
	// 	: config.dev.assetsSubDirectory
	// console.log(path.posix.join('static', _path));
	return path.posix.join('static', _path)
};

exports.getEntry = function getEntry(globPath) {
  var entries = {},
  basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {

	basename = path.basename(entry, path.extname(entry));

	tmp = entry.split('/').splice(-3);

	  // console.log(tmp);

	// pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径

	  // console.log(tmp);

	  // pathname = tmp.splice(1, 1);


	  // console.log(tmp[0] + '/' + tmp[1]);

	  // pathname = tmp[0] + '/' + tmp[1];

	pathname = tmp[1];

	console.log(tmp[1]);

	entries[pathname] = [entry];
  });

	console.log(entries);

  return entries;
};
