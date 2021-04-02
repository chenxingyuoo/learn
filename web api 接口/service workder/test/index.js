/**
 * Created by chenxingyu on 2017/3/10.
 */
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
        console.log(registration);
        console.log('service worker 注册成功');
    }).catch(function (err) {
        console.log('servcie worker 注册失败')
    });
}