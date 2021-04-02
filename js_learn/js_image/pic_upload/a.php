
<?php
/**
 * Created by PhpStorm.
 * User: mac
 * Date: 16/5/2
 * Time: 下午3:43
 */
$jarr=array(
       'total'=>239,
       'row'=>array(
          array('code'=>'001','name'=>'中国','addr'=>'Address 11','col4'=>'col4 data'),
          array('code'=>'002','name'=>'Name 2','addr'=>'Address 12','col4'=>'col4 data'),
        ),
        'data' => array(
           'src' => 'http://img0.imgtn.bdimg.com/it/u=2065685890,1762233842&fm=206&gp=0.jpg'
        )
      );
   echo json_encode($jarr);
?>