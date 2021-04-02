/**
 * Created by mac on 16/7/7.
 */
$(function () {
    var $doc = $(document);
    //点击用户给input赋值 ， 表单提交到后端 ， 获取到这个字段就可以做判断
    $doc.on('click','.comment', function (e) {
        e.stopPropagation();
        var $that = $(this),
            $toId = $('#toId'),
            $commentId = $('#commentId'),
            toId = $that.data('tid'),
            commentId = $that.data('cid');

        $toId.val(toId);
        $commentId.val(commentId);
    });

    //点击文本输入框阻止冒泡
    $doc.on('click','.comment-text', function (e) {
        e.stopPropagation();
    });

    //点击提交按钮阻止冒泡
    $doc.on('click','.comment-btn', function (e) {
        e.stopPropagation();
        var comment_text = $('.comment-text').val().replace(/\s/g,'');
        if(comment_text == ''){
            alert('请输入评论内容');
            return false;
        }
    });

    //点击屏幕清除id
    $doc.on('click', function () {
        var $toId = $('#toId'),
            $commentId = $('#commentId');
        $toId.val('');
        $commentId.val('');
    });
});