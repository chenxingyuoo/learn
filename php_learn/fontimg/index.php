<?php
//1. 绘制图像资源（创建一个画布）
$image = imagecreatetruecolor(500, 300);
//2. 先分配一个绿色
// $green = imagecolorallocate($image, 22, 153, 0);
//3. 使用绿色填充画布
// imagefill($image, 0, 0, $green);

//4. 在画布中绘制图像
$bai = imagecolorallocate($image, 255, 255, 255);
//使用指定的字体文件绘制文字
//参数2：字体大小
//参数3：字体倾斜的角度
//参数4、5：文字的x、y坐标
//参数6：文字的颜色
//参数7：字体文件
//参数8：绘制的文字
imagettftext($image, 30, 30, 200, 250, $bai, 'pangmenzhengdao.ttf', 'helloworld');

//5. 在浏览器直接输出图像资源
header("Content-Type:image/jpeg");
imagejpeg($image);

//6. 销毁图像资源
imagedestroy($image);
?>