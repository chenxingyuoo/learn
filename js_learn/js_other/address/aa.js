
progressJs().setOptions({overlayMode: true, theme: 'blueOverlay'}).start().autoIncrease(4, 500);

if(window.attachEvent) {
window.attachEvent('onload', function(){ progressJs().end(); });
} else {
if(window.onload) {
    var curronload = window.onload;
var newonload = function() {
curronload();
progressJs().end();
};
window.onload = newonload;
} else {
window.onload = function(){ progressJs().end(); };
}
}

(function(doc, script) {
var js,
fjs = doc.getElementsByTagName(script)[0],
frag = doc.createDocumentFragment(),
add = function(url, id) {
if (doc.getElementById(id)) {return;}
js = doc.createElement(script);
js.src = url;
id && (js.id = id);
frag.appendChild( js );
};

// Google+ button
add('http://apis.google.com/js/plusone.js');
// Facebook SDK
add('//connect.facebook.net/en_US/all.js#xfbml=1&appId=200103733347528', 'facebook-jssdk');
// Twitter SDK
add('//platform.twitter.com/widgets.js');

fjs.parentNode.insertBefore(frag, fjs);
}(document, 'script'));

