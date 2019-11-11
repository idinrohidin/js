---
---
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open('blog').then(function(cache) {
    return cache.addAll([
      {% for page in site.pages %}
      '{{ page.url | remove: '.html' }}',
      {% endfor %}
      {% for post in site.posts %}
      '{{ post.url | remove: '.html' }}',
      {% endfor %}
      {% for file in site.static_files %}
      '{{ site.baseurl }}{{ file.path }}',
      {% endfor %}                
      'https://cdn.statically.io/gh/idinrohidin/css/2cb6275d/idinrohidin.min.css',
      'https://cdn.statically.io/gh/idinrohidin/js/ce50b484/jquery-full.min.js',
      'https://cdn.statically.io/gh/idinrohidin/js/0ff197cf/bootstrap.min.js',
      'https://cdn.statically.io/gh/idinrohidin/js/2238b70f/jquery.easing.min.js',
      'https://cdn.statically.io/gh/idinrohidin/js/60e9a49d/modernrecent.min.js',
      'https://cdn.statically.io/gh/idinrohidin/js/0ef138a8/creativy.min.js',      
      'https://cdn.statically.io/gh/idinrohidin/js/2fa14abd/idinrohidin.min.js',      
    ]);
  }));
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(cacheNames) {
    return Promise.all(
      cacheNames.map(function(cacheName) {
        if (cacheName != 'blog-{{ site.github.build_revision }}') {
          return caches.delete(cacheName);
        }
      })
    );
  }));
});

self.addEventListener('fetch', function(e) {
  e.respondWith(caches.match(e.request).then(function(response) {   
    return response || fetch(e.request);
  }));
});
