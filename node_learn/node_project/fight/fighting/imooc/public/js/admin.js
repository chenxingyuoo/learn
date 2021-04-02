/**
 * Created by mac on 16/1/5.
 */
//删除电影数据
$(function(){
    $('.del').click(function (e){
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id)

        $.ajax({
            type : 'delete',
            url : '/admin/movie/list?id=' + id,

        })
        .done(function (results){   //results 后台返回的数据
            if(results.success === 1){  //跟后台的约定
                if(tr.length > 0){
                    tr.remove();
                }
            }
        })
    })
});