/**
 * Created by mac on 16/1/6.
 */
$(function (){
    $('.del').click(function (e){
        var target = $(e.target);
        var id = target.data('id');
        var tr = $('.item-id-' + id );

        $.ajax({
            type:"DELETE",
            url :'/admin/list?id=' + id,  //然后定义一个这样的路由
        }).done(function (results){    //results 后台返回的数据
            if(results.success === 1){  //跟后台的约定
                if(tr.length > 0){
                  tr.remove();
                }
            }
        })
    })
})