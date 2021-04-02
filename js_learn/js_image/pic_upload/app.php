<?php
/**
 * Created by PhpStorm.
 * User: way
 * Date: 15/4/8
 * Time: 下午11:51
 */



define('PATH_ROOT',$_SERVER['DOCUMENT_ROOT']);
define('PATH_SELF',$_SERVER['PHP_SELF']);


error_reporting(E_ALL & ~E_NOTICE);
//header('Access-Control-Allow-Origin:*');
$host = 'www.pccn.com.cn';
$req_host = $_SERVER['HTTP_HOST'];
Session_start();

$dir_app = '/app.php';
include_once 'net.php';
include_once 'wx.php';
include_once 'baidu_map.php';
include_once 'upload_file.php';
$net = new net();
$wx = new wx();
$map = new baidu_map();
$upload = new upload_file();

$wx -> config(array(
    appid => 'wx21e0de0bfa12aad9',
    secret => 'c209a08a1a8fdc33224a6cfec7b7a66b'
));

$map-> config(array(
    key=> 'm4rpRNGws0FrqwUrAH9uo0Gh'
));



//创建临时文件目录
if (!file_exists('temp/')){
    mkdir('temp/');
    chmod('temp/',0777);
}



switch ($_GET['act']){
    //上传接口
    case "upload" :
       $data = array(
           'url' => 'sdasdsadsdf.jpg'
       );
        _echo($data);
        break;
    default :
        //echo file_get_contents('index.html');
        break;
}

//获取UID
function get_uid(){
    $uid = explode(';',$_COOKIE['php_cookies']);
    $uid = explode('=',$uid[0]);
    $uid = $uid[1];
    return $uid;
}


//base64转成图片
function base64_to_file($data,$k=0){
    $uid = get_uid();
    $upload_temp = 'temp/'.$uid.time().$k.'.png';
    //preg_match('/.*base64,/',$data,$match);
    $data = str_replace('data:image/png;base64,', '', $data);
    $data = str_replace(' ', '+', $data);
    /*print_r($data);
    exit;*/
    $data = base64_decode($data);
    if (file_put_contents($upload_temp, $data)){
        return $upload_temp;
    }else{
        return false;
    }
}


function get_url($host='www.pccn.com.cn',$path='/app.php',$param=''){
    $host = $host ? $host : $_SERVER['HTTP_HOST'];
    $path = $path ? $path : $_SERVER['PHP_SELF'];
    $param = $param ? $param : $_SERVER['QUERY_STRING'];
    return $host.$path.'?'.$param;
}

//输出
function _echo($data){
    /*foreach($data['php_res']['cookies'] as $v){
        setcookie($v['key'],$v['val'], time()+3600*24,'/',$_SERVER['HTTP_HOST']);
    }*/
    if ($data['php_res']['cookies']){
        setcookie('kw_php_cookies',$data['php_res']['cookies'],time()+3600*24*10,'/',$_SERVER['HTTP_HOST']);
    }

    exit(json_encode($data));
}

//获取json
function get_jsonData(){
    $json = file_get_contents("php://input");
    return $json;
}



//网络发送
function curl_send($url, $param=array(), $type='get'){

    if ($type == 'get'){
        $p='';
        foreach($param as $key => $value){
            $p=$p.$key.'='.$value.'&';
        }
        if(preg_match('/\?[\d\D]+/',$url)){//matched ?c
            $p='&'.$p;
        }else if(preg_match('/\?$/',$url)){//matched ?$
            $p=$p;
        }else{
            $p='?'.$p;
        }
        $p=preg_replace('/&$/','',$p);
        $url=$url.$p;
    }

    $curl = curl_init($url); //初始化
    $param = str_replace('\\','',$param);
    if ($type == 'post'){
        if (!is_string($param)){
            $post = http_build_query($param);
        }else{
            $post = json_encode($param);
        }
        curl_setopt($curl,CURLOPT_POSTFIELDS,$post);
    }
    curl_setopt($curl,CURLOPT_HEADER,1); //将头文件的信息作为数据流输出

    curl_setopt($curl,CURLOPT_RETURNTRANSFER,1); //返回获取的输出文本流

    curl_setopt($curl,CURLOPT_COOKIE,$_COOKIE['kw_php_cookies']);

    $rst = curl_exec($curl); //执行curl并赋值给$content
    preg_match_all('/^Set-Cookie:\s(.*);/m',$rst,$str); //正则匹配
    $cookies = '';
    if (count($str[1]) > 0){
        foreach ($str[1] as $v) {
            /*$arr = explode('=',$v);
            array_push($cookies,array(
                key => $arr[0],
                val => $arr[1]
            ));*/
            $cookies .= $v.'; ';
        }
    }
    curl_close($curl);
    $rst = resolve_res($rst,'de');
    //print_r($rst);
    if ($rst == false){
        $rst = array();
    }
    $rst = array_merge($rst,array(
        php_res  =>  array(
            url  => $url,
            data => $param,
            type => $type,
            cookies  => $cookies
        )
    ));


    return $rst;
}

//解析send请求的返回值
function resolve_res($data,$json_type){
    preg_match('/{.*}/', $data, $matches, PREG_OFFSET_CAPTURE);
    $matche = $matches[0][0];
    if (!$json_type){
        $results = $matche;
    }elseif($json_type == 'en'){
        $results = json_encode($matche);
    }else{
        $results = json_decode($matche,true);
    }
    if (!$results['access_token']){
        //exit(dump($matches));
    }
    return $results;
}


