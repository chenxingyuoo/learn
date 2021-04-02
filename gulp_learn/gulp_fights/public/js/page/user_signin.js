/**
 * Created by mac on 16/7/6.
 */
$(function () {
    //登录按钮 ， 表单验证
    $(document).on('click','.user-signin-btn', function () {
        var $signin_modal = $('#signinModal'),
            $alert_danger = $signin_modal.find('.alert-danger'),
            $signin_name = $('#signinName'),
            $signin_password = $('#signinPassword');

        //用户名为空
        if($signin_name.val().replace(/\s/g,'') === ''){
            $alert_danger.find('.alert-text').text('请输入用户名!');
            $alert_danger.show();
            return false;
        }

        //密码为空
        if($signin_password.val().replace(/\s/g,'') === ''){
            $alert_danger.find('.alert-text').text('请输入用户密码!');
            $alert_danger.show();
            return false;
        }

        //隐藏提示框
        $alert_danger.hide();

    });
});