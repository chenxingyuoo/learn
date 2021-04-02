/**
 * Created by chenxingyu on 2017/1/3.
 */
(function() {
    var sender = document.getElementById('J_MsgSender'),
        list = document.getElementById('J_MsgList');
    function pasteImage(imgObj) {
        var reader = new FileReader();
        var file = imgObj.getAsFile ? imgObj.getAsFile() : imgObj;
        // 读取文件后将其显示在网页中
        reader.onload = function(e) {
            var img = new Image(), p = document.createElement('p');
            img.src = e.target.result;
            p.appendChild(img);
            list.appendChild(p);
        };

        reader.readAsDataURL(file);
    }
    sender.addEventListener('paste', function(ev) {
        // 通过事件对象访问系统剪贴板
        var ev = ev || window.event, clipboardData = ev.clipboardData,
            i = 0, items, item, files;
        if (clipboardData) {
            items = clipboardData.items;
            files = clipboardData.files;

            if (files && files.length) {
                pasteImage(files[0]);
                return;
            }
            if (!items) { return; }

            for (; i < items.length; i++) {
                if (items[i].kind === 'file' && items[i].type.match(/^image\//i)) {
                    item = items[i];
                    break;
                }
            }
            // 如果存在图片数据
            if (item) {
                pasteImage(item); // 读取该图片
            }
        }
    });
})();