<?php
2     //header('content-type:text/html charset:utf-8');  /* 这句要删除，否则可能会导致IE下回传HTML变成下载 */
3     //不存在当前上传文件则上传
4     if(!file_exists($_FILES['up-load-file"']['name'])) move_uploaded_file($_FILES['upload_file']['tmp_name'],iconv('utf-8','gb2312',$_FILES['upload_file']['name']));
5     //输出图片文件<img>标签
6     echo "<textarea><img src='{$_FILES['up-load-file"']['name']}'/></textarea>";
7 //End_php
?>