/**
 * Created by mac on 16/7/5.
 */
$(function () {

    var user_id,
        user_item;
    //点击删除按钮 ， 获取id
    $(document).on('click', '.btn-danger.del', function (e) {
        var target = $(e.target);
        user_id = target.data('id');
        user_item = $('.item-id-' + user_id);
    });

    //点击确定按钮
    $(document).on('click', '.user-del-btn', function (e) {
        //promise 模式
        $.ajax({
            type: 'delete',
            url: '/admin/user/del?id=' + user_id,
        }).done(function (results) {   //results 后台返回的数据
            //成功
            if (results.success === 1) {  //跟后台的约定
                if (user_item.length > 0) {
                    user_item.remove();
                }
                if(results.isCurDel) location.reload();
            }
        })
    })

});