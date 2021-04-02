/**
 * Created by chenxingyu on 2017/3/9.
 */

var cacheFiles = [
    'blog.js'
];

self.addEventListener('install', function (evt) {
    debugger;
    evt.waitUntil(caches.open('my-test-cahce-v1').then(function (cache) {
        debugger;
            return cache.addAll(cacheFiles);
        })
    );
})


// 缓存图片
self.addEventListener('fetch', function (evt) {
    debugger;
    evt.respondWith(
        caches.match(evt.request).then(function(response) {
            debugger;
            if (response) { 
                return response;
            }
            var request = evt.request.clone();
            return fetch(request).then(function (response) {
                debugger;
                if (!response && response.status !== 200 && !response.headers.get('Content-type').match(/image/)) {
                    return response;
                }
                var responseClone = response.clone();
                caches.open('my-test-cache-v1').then(function (cache) {
                    cache.put(evt.request, responseClone);
                });
                return response;
            });
        })
    )
});



