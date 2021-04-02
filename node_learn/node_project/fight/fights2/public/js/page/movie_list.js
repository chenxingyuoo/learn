/**
 * Created by mac on 16/7/5.
 */
$(function () {

    var movie_id,
        movie_item;
    //点击删除按钮 ， 获取id
    $(document).on('click', '.btn-danger.del', function (e) {
        var target = $(e.target);
        movie_id = target.data('id');
        movie_item = $('.item-id-' + movie_id);
    });

    //点击确定按钮
    $(document).on('click', '.movie-del-btn', function (e) {
        //promise 模式
        $.ajax({
            type: 'delete',
            url: '/admin/movie/del?id=' + movie_id,
        }).done(function (results) {   //results 后台返回的数据
            //成功
            if (results.success === 1) {  //跟后台的约定
                if (movie_item.length > 0) {
                    movie_item.remove();
                }
            }
        })
    })

});