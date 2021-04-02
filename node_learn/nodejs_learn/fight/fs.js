/**
 * Created by mac on 15/12/9.
 */

//同步 异步 读取文件
/*
var fs = require('fs');

fs.readFile('../mac/project/nodejs_learn/fight/input.txt',function(err,data){
   if(err){
       return console.error(err);
   }
                           //这里data返回input里边的内容 ， 读取出来
    console.log("异步读取:" + data.toString());
}); //异步读取


var data = fs.readFileSync('../mac/project/nodejs_learn/fight/input.txt');

console.log("同步读取：" + data.toString());


console.log("程序执行完毕");*/



//打开文件
/*var fs = require('fs');

fs.open('../mac/project/nodejs_learn/fight/input.txt','w',function(err,fd) {
    if (err) {
        return console.error(err)
    }

    console.log(fd);
    console.log("文件打开成功！" + fd.toString());
});

console.log("准备打开文件!");*/


//获取文件信息

/*
var fs = require('fs');

fs.stat('../mac/project/nodejs_learn/fight/input.txt',function(err,stats){
    console.log(stats);
    console.log(stats.isCharacterDevice());
});

console.log("程序执行完毕");*/



/*
//写入文件

var fs = require('fs');

console.log("文件准备创建");

fs.writeFile('../mac/project/nodejs_learn/fight/input.txt',
      '我是新写入的内容，hello ，初次见面。',
       function(err,data){
           if(err){
               return console.error(err)
           }

           console.log("我是新写入的内容");
           console.log("我是----------分割线");
           console.log("读取写入的数据;");
           fs.readFile('../mac/project/nodejs_learn/fight/input.txt',function(err,data){
               if(err){
                   return console.error(err);
               }

               console.log("新写入的数据：" + data.toString());
           })

       });*/


/*
//du'qu读取文件

var fs = require('fs');

var buf = new Buffer(1024);

console.log("准备打开已存在的文件");

fs.open('../mac/project/nodejs_learn/fight/input.txt','r+',function(err,fd){
    if(err){
        return console.error(err);
    }

    console.log("文件打开成功！");
    console.log("准备读取文件：");
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){

        if(err){
            return console.error(err);
        }

        console.log(bytes + '字节数读取');

     //仅输出读取的字节

    if(bytes > 0){
        console.log(buf.slice(0,bytes).toString());
    }

    })

});
*/



/*
//关闭文件

var fs = require('fs');

var buf = new Buffer(1024);

console.log("准备打开文件");

fs.open('../mac/project/nodejs_learn/fight/input.txt','r',function(err,fd){

    if(err){
        return console.error(err)
    }

    console.log("文件打开成功!");
    console.log("准备读取文件内容");
    console.log("-------------分隔符");
    fs.read(fd,buf,0,buf.length,0,function(err,bytes){

        if(err){
            return console.error(err);
        }

        console.log(bytes + '字节数读取');

        //仅输出读取的字节

        if(bytes > 0){
           console.log(buf.slice(0 , bytes).toString());
        }


        //关闭文件
        fs.close(fd,function(err){

            if(err){
                return console.error(err);
            }

            console.log("文件关闭成功！");
        });

    });


});*/



/*//截取文件

var fs = require('fs');

var buf = new Buffer(1024);

console.log("准备打开文件");

fs.open('../mac/project/nodejs_learn/fight/input.txt','r+',function(err,fd){

    if(err){
        return console.error(err);
    }

    console.log("打开文件成功");
    console.log("截取10字节后的文件内容");

    //直接把input.txt 文件删除了 10字节之后的内容
    fs.ftruncate(fd,10,function(err){

        if(err){
            return console.error(err);
        }

        console.log("文件截取成功");
        console.log("读取相同的文件");

        fs.read(fd,buf,0,buf.length,0,function(err,bytes){

            if(err){
                return console.error(err);
            }

            //仅输出读取的字节
            if(bytes > 0){
                console.log(buf.slice(0,bytes).toString());  //此时输出的是截取过后的文件内容
            }

            //关闭文件
            fs.close(fd,function(err){
                if(err){
                    return console.error(err);
                }

                console.log("文件关闭成功");
            })
        })

        })
})*/



/*
//删除文件

var fs = require('fs');

console.log("准备删除文件");

fs.unlink('../mac/project/nodejs_learn/fight/inputo.txt',function(err){
    if(err){
        return console.error(err);
    }

    console.log("文件删除成功");
})
*/


/*
//创建文件目录

var fs = require('fs');

console.log("创建目录  ../mac/project/nodejs_learn/hello");

fs.mkdir('../mac/project/nodejs_learn/hello',function(err){
    if(err){
        return console.error(err);
    }

    console.log("目录创建成功");
})*/



/*
//读取目录

var fs = require('fs');

console.log("准备读取目录");
                                        //files 为 目录下的文件数组列表。
fs.readdir('../mac/project/nodejs_learn/fight',function(err,files){
    if(err){
        return console.error(err);
    }

    files.forEach(function(file){
        console.log(file);
    });

    console.log("文件目录读取成功");
});*/



//删除目录

var fs = require('fs');

console.log("准备删除文件");

fs.rmdir('../mac/project/nodejs_learn/hello',function(err){

    if(err){
        return console.error(err);
    }

    console.log('目录删除成功');
    
    console.log("再读取一下这个目录，就发现已经删除掉了");

        fs.readdir("../mac/project/nodejs_learn/hello",function(err, files){
            if (err) {
                return console.error(err);
            }
            files.forEach( function (file){
                console.log( file );
            });
        });
})