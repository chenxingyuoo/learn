/**
 * Created by mac on 15/12/9.
 */

//Buffer 写入缓存区
/*var buf = new Buffer(226);
 var len = buf.write("hello world. I am here , with you!");

 console.log("写入字节数：" + len);*/


/*//Buffer 读取缓存区
 var buf = new Buffer(26);

 for(var i=0;i<26;i++){
 buf[i] = i + 97;
 }

 console.log(buf.toString('ascii'));
 console.log(buf.toString('ascii',0,5));
 console.log(buf.toString('utf8',0,10));
 console.log(buf.toString(undefined,0,8));*/



//将 Buffer 转换为 JSON 对象
/*var buf = new Buffer("hello world");

 var json = buf.toJSON(buf);

 console.log(json.data);*/


/*//Buffer 缓存区合并
 var buffer1 = new Buffer("one two three ");
 var buffer2 = new Buffer("hello world");
 var buffer3 = Buffer.concat([buffer1 , buffer2]);

 console.log("buffer3 内容" + buffer3.toString());*/


//缓存区比较
/*var buffer1 = new Buffer("ABCde");
 var buffer2 = new Buffer("Helaaalo World");

 var result = buffer1.compare(buffer2);

 console.log(result);

 if(result < 0){
 console.log(buffer1 + "在" + buffer2 + "之前");
 }else if(result == 0){
 console.log(buffer1 + "与" + Buffer2 + "相同");
 }else{
 console.log(buffer1 + "在" + buffer2 + "之后");
 }*/



/*//拷贝缓存区
 var buffer1 = new Buffer("ABCDEFG");

 //拷贝一个缓存区 , 拷贝 3 个字段
 var buffer2 = new Buffer(3);

 buffer1.copy(buffer2);

 console.log("buffer2 content " + buffer2.toString());*/


/*//缓冲区裁剪
 var buffer1 = new Buffer("hello world");

 //剪切缓存区
 var buffer2 = buffer1.slice(0,7);

 console.log("buffer2 content :" + buffer2.toString());*/



/*//缓存区长度
 var buf = new Buffer("hello world!!!");

 //缓存区长度
 console.log("buffer length:" + buf.length);*/