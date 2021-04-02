/**
 * Created by chenxingyu on 2016/12/15.
 */

// fs 模块是文件操作的封装，它提供了文件的读取、写入、更改、删除、遍历目录、链接等 POSIX 文件系统操作。
// 与其他模块不同的是，fs 模块中所有的操作都提供了异步的和 同步的两个版本，例如读取文件内容的函数有异步的 fs.readFile()
// 和同步的 fs.readFileSync()。我们以几个函数为代表，介绍 fs 常用的功能，并 出 fs 所有函数 的定 和功能。

//文件I / O是由各地的标准POSIX功能简单封装提供。要使用这个模块做require('fs')。所有的方法都异步和同步形式。

//异步形式始终以完成回调作为最后一个参数。传递到完成回调参数取决于该方法，但是第一个参数总是保留用于一个例外。如果操作成功完成，则第一参数将是null或undefined。

//当使用同步形式的任何异常被立即抛出。您可以使用try / catch来处理异常


/**
 * fs.readFile
 * */

//fs.readFile(filename,[encoding],[callback(err,data)])是最简单的读取文件的函数
//如果不指 定encoding，则callback就是第2个参数
//回调函数提供两个参数err和data，err表示有没有错误发生 ， 如果没有错误发生 ， err就是null或者undefined
// data 是文件内容。如果指定了 encoding，data 是一个解析后的字符  ， 则 data 将会是以 Buffer 形式表示的2进制数据。

var fs = require('fs');

// fs.readFile('content.txt', function (err, data) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });
// //<Buffer 49 20 61 6d 20 63 6f 6e 74 65 6e 74>
//
// fs.readFile('content.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(data);
//     }
// });
//I am content

// 读取文件出现错误时，err 将会是 Error 对象。如果 content.txt 不存在，运行前面
// 的代码则会出现以下结果:

//{ [Error: ENOENT, no such file or directory 'content.txt'] errno: 34, code: 'ENOENT', path: 'content.txt' }

/**
 * fs.readFileSync
 * */

// fs.readFileSync(filename, [encoding])是 fs.readFile 同步的版本。它接受 的参数和 fs.readFile 相同，
// 而读取到的文件内容会以函数返回值的形式 回。如果有错 误发生，fs 将会抛出异常，你需要使用 try 和 catch   并处理异常。


/**
 * fs.open  打开文件
 * */

//fs.open(path, flags, [mode], [callback(err, fd)])是 POSIX open 函数的  装，与 C 语言标准库中的 fopen 函数类似。
// 它接受两个必须参数，path 为文件的路 ， flags 可以是以下值。

// 'r' - 读打开文件。如果该文件不存在发生异常。
//
// 'r+' - 用于读取和写入打开文件。如果该文件不存在发生异常。
//
// 'rs+' - 阅读和同步模式下写入打开文件。指示操作系统绕过本地文件系统高速缓存。
//
// 'w' - 用于编写打开文件。该文件被创建（如果它不存在），或者截断（如果存在）。
//
// 'wx'-像'w'但如果失败path存在。
//
// 'w+' - 用于读取和写入打开文件。该文件被创建（如果它不存在），或者截断（如果存在）。
//
// 'wx+'-像'w+'但如果失败path存在。
//
// 'a' - 对于追加打开文件。如果不存在，该文件被创建。
//
// 'ax'-像'a'但如果失败path存在。
//
// 'a+' - 用于读取和追加打开文件。如果不存在，该文件被创建。
//
// 'ax+'-像'a+'但如果失败path存在。

// mode设置文件模式（许可和粘比特），但只有当文件被创建。它默认为0666，可读可写。

// 回调得到两个参数(err, fd)。

fs.open('content.txt', 'a+', (err, fd) => {
    if (err) {
        console.error(err);
    } else {
        console.log(fd);
    }
    // => [Error: EISDIR: illegal operation on a directory, open <directory>]
});

//10


/**
 * fs.openSync
 * */

// fs.openSync(path, flags, [mode])
// 同步版本的fs.open()。返回表示文件描述符的整数。


/**
 * fs.read  读取文件(文件描述符)
 * */

// fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])
// buffer 是该数据将被写入到缓冲器。
// offset 在缓冲器中的偏移开始在写。
// length 是一个整数，指定要读取的字节的数目。
// position是一个整数，指定从该文件中开始读取。如果position是null，将数据从当前文件位置读取。
// 回调给出三个参数，(err, bytesRead, buffer)。
// 是 POSIX read 函数的封装， 比 fs.readFile 提供了更底层的接口

fs.open('content.txt', 'r', function (err, fd) {
    if (err) {
        console.error(err);
    } else {
        var buf = new Buffer(8);
        fs.read(fd, buf, 0, 8, null, function (err, bytesRead, buffer) {
            if(err){
                console.error(err);
            }else{
                console.log('bytesRead: ' + bytesRead);
                console.log(buffer);
            }
        })
    }
});

//bytesRead: 8
//<Buffer 49 20 61 6d 20 63 6f 6e>

//一般来说，除非必要，否则不要使用这种方式读取文件，因为它要求你手动管理缓存区和文件指针 ， 尤其是在你不知道文件大小的时 ，这将会是一件很麻烦的事 。

/**
 * fs.readSync
 * */
//fs.readSync(fd, buffer, offset, length, position)


/**
 * fs.write  写入文件（文件描述符）
 * */

fs.open('content.txt', 'r+', function (err, fd) {
    if(err){
        console.error(err);
    }else{
        var buf = new Buffer(8);
        fs.write(fd, buf, 0, 8, null, function (err, bytesWritten, buffer){
            if(err){
                console.error(err);
            }else{
                console.log('bytesWrite: ' + bytesWritten);
                console.log(buffer);
            }
        })
    }
});

//bytesWrite: 8
//<Buffer 07 20 00 00 00 00 00 00>

/**
 * fs.writeSync
 * */
//fs.writeSync(fd, buffer, offset, length[, position])



/**
 * fs.writeFile  异步数据写入到文件，替换该文件，如果它已经存在。 data可以是字符串或缓冲。
 * */

// fs.writeFile(file, data[, options], callback)
// 异步数据写入到文件，替换该文件，如果它已经存在。 data可以是字符串或缓冲。

fs.writeFile('hello.txt', 'Hello Node.js', 'utf8', (err) => {
    if (err) {
        throw err;
    } else {
        console.log('It\'s saved!');
        fs.readFile('hello.txt', 'utf-8', function (err, data) {
            if (err) {
                console.error(err);
            } else {
                console.log(data);
            }
        });
    }
});


fs.writeFile('test.txt', 'test', 'utf8', (err) => {
    if (err) {
        throw err;
    } else {
        console.log('It\'s saved test!');
    }
});

// It's saved!
// Hello Node.js

/**
 * fs.writeFileSync
 * */
// fs.writeFileSync(file, data[, options])


/**
 * fs.unlink  删除文件
 * */


fs.unlink('test.txt',function (err){
    if(err){
        console.error(err);
    }else{
        console.log('success');
    }
});

//直接删除了文件，打印success

/**
 * fs.unlinkSync
 * */

//fs.unlinkSync(path);


/**
 * fs.mkdir  创建目录
 * */

//fs.mkdir(path[, mode], callback)
fs.mkdir('./mkdir', '0777' , function (err){
    if(err){
        console.log(err);
    }else{
        console.log("creat done!");
    }
});
//创建了目录mkdir ，打印 creat done!

/**
 * fs.mkdirSync  创建目录
 * */

//fs.mkdirSync(path[, mode])


/**
 * fs.rmdir  删除目录
 * */
//fs.rmdir(path, [callback(err)])
fs.rmdir('./mkdir',function (err){
    if(err){
        console.log(err);
    }else{
        console.log("delete done!");
    }
});

//删除了目录mkdir ，打印 delete done!

/**
 * fs.rmdirSync  删除目录
 * */
//fs.rmdirSync(path)

/**
 * fs.readdir  读取目录
 * */

//fs.readdir(path, [callback(err, files)])
fs.readdir('../', function (err, files){
    if(err){
        console.log(err);
    }else{
        console.log("readdir done!", files);
    }
});

//readdir done! [ '1.全局对象', '2. 常用工具util', '3.事件驱动events', '4.文件系统fs' ]


/**
 * fs.readdirSync  读取目录
 * */
//fs.readdirSync(path)


/**
 * fs.realpath  获取真实路径
 * */

// fs.realpath(path, [callback(err, resolvedPath)])
fs.realpath('../',function (err, resolvedPath){
    if(err){
        console.log(err);
    }else{
        console.log("resolvedPath done!", resolvedPath);
    }
});

//resolvedPath done! /Users/chenxingyu/project/my_learn/node_learn/node开发指南/4.nodejs核心模块

/**
 * fs.realpathSync  获取真实路径
 * */

//fs.realpathSync(path)

/**
 * fs.rename  更名
 * */
//fs.rename(path1, path2, [callback(err)])

fs.rename('rename_test.txt','rename_one.txt',function (err){
    if(err){
        console.error(err);
    }else{
        console.log('rename_one done!');

        fs.rename('rename_one.txt','rename_test.txt',function (err){
            if(err){
                console.error(err);
            }else{
                console.log('rename_test done!');
            }
        });

    }
});

//rename_one done!
//rename_test done!

/**
 * fs.renameSync  更名
 * */

//fs.renameSync(path1, path2)

/**
 * fs.truncate 文件内容截取
 * */

//fs.truncate(fd, len, [callback(err)])
fs.truncate('hello.txt', 2, function(err){
    if(err){
        throw err;
    }else{
        console.log('文件内容截断成功');
    }
});

//文件内容截断成功  只保留第1个字符到第 len 个字符

/**
 * fs.truncateSync 文件内容截取
 * */

// fs.truncateSync(fd, len);

/**
 * fs.chown 更改文件所有权。
 * */
//fs.chown(path, uid, gid, [callback(err)])
// path          目录路径
// uid            用户ID
// gid            群体身份 (指共享资源系统使用者的身份)
// callback    回调 ，传递异常参数 err

// fs.chown('content.txt', uid, gid, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("change done");
//     }
// })

/**
 * fs.chownSync 更改文件所有权。
 * */
// fs.chownSync(path, uid, gid)


/**
 * fs.fchownSync 更改文件所有权(文件描述符)。
 * */
//fs.fchown(fd, uid, gid, [callback(err)])

// fs.open('content.txt', 'a', function (err, fd) {
//     if (err) {
//         throw err;
//     }
//     fs.fchown(fd, uid, gid, function(err){
//         if (err) {
//             throw err;
//         }
//         console.log('fchmod complete');
//         fs.close(fd, function () {
//             console.log('Done');
//         });
//     })
// });

/**
 * fs.fchown 更改文件所有权(文件描述符)。
 * */
//fs.fchownSync(fd, uid, gid)