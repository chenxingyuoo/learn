/**
 * Created by mac on 16/7/7.
 */
$(function () {
    var category_id,
        category_item,
        $doc = $(document);
    //点击删除按钮 ， 获取id
    $doc.on('click', '.btn-danger.del', function (e) {
        var target = $(e.target);
        category_id = target.data('id');
        category_item = $('.item-id-' + category_id);
    });

    //点击确定按钮
    $doc.on('click', '.category-del-btn', function (e) {
        //promise 模式
        $.ajax({
            type: 'delete',
            url: '/admin/movie_category/del?id=' + category_id,
        }).done(function (results) {   //results 后台返回的数据
            //成功
            if (results.success === 1) {  //跟后台的约定
                if (category_item.length > 0) {
                    category_item.remove();
                }
            }
        })
    })
});