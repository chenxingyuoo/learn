/**
 * Created by chenxingyu on 2017/3/9.
 */
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
        console.log(registration);
        console.log('service worker 注册成功');
    }).catch(function (err) {
        console.log('servcie worker 注册失败')
    });
}


fetch("./blog.js").then(function(res) {
    // res instanceof Response == true.
    debugger;
    if (res.ok) {
        res.json().then(function(data) {
            console.log(data.entries);
        });
    } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
    }
}, function(e) {
    console.log("Fetch failed!", e);
});



