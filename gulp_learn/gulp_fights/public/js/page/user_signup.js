/**
 * Created by mac on 16/7/6.
 */
$(function () {
    //登录按钮 ， 表单验证
   $(document).on('click','.user-signup-btn', function () {
       var $signup_modal = $('#signupModal'),
           $alert_danger = $signup_modal.find('.alert-danger'),
           $signup_name = $('#signupName'),
           $signup_password = $('#signupPassword');

       //用户名为空
       if($signup_name.val().replace(/\s/g,'') === ''){
           $alert_danger.find('.alert-text').text('请输入用户名!');
           $alert_danger.show();
           return false;
       }

       //密码为空
       if($signup_password.val().replace(/\s/g,'') === ''){
           $alert_danger.find('.alert-text').text('请输入用户密码!');
           $alert_danger.show();
           return false;
       }

       //隐藏提示框
       $alert_danger.hide();

   });
});