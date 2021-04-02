

var cacheFiles = [
    'blog.js',
    '/img/11.jpg',
    '/img/22.jpg'
];

this.addEventListener('install', function (evt) {
    evt.waitUntil(caches.open('v1').then(function (cache) {
            return cache.addAll(cacheFiles);
        })
    );
});

// this.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).catch(function() {
//       return fetch(event.request);
//     });
//   );
// });

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).catch(function() {
    	debugger;
      return fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    }).catch(function() {
      return caches.match('/img/22.jpg');
    })
  );
});