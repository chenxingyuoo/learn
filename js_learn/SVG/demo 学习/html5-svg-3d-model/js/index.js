var $ = document.querySelectorAll.bind(document);

/* -------------------------------- */
/* ---------- Navigation ---------- */
/* -------------------------------- */
var article = $('article')[0];
var perspective = $('#perspective')[0];
var buttons = $('button');

var click = false;
var cursor = { x: 0, y: 0 };
var transform = {
  position: { x: 0, y: 0 },
  rotation: { x: 0, y: 0 },
  zoom: 0
};
var target = {
  position: { x: 0, y: 0 },
  rotation: { x: -20, y: -45 },
  zoom: 100
};
var targetOnDown = {
  position: { x: 0, y: 0 },
  rotation: { x: 0, y: 0 },
  zoom: 0
};

article.onmousedown = function(e) {
  if (e.which < 3) {
    if (e.which == 2) article.className = 'pan';
    if (article.className == 'pan')
      article.style.cursor = '-webkit-grabbing';
    cursor.x = e.pageX;
    cursor.y = e.pageY;
    targetOnDown.position.x = target.position.x;
    targetOnDown.position.y = target.position.y;
    targetOnDown.rotation.x = target.rotation.x;
    targetOnDown.rotation.y = target.rotation.y;
    targetOnDown.zoom = target.zoom;
    click = true;
  }
};
article.onmousemove = function(e) {
  if (click) {
    switch (article.className) {
      case 'pan':    target.position.x = targetOnDown.position.x + e.pageX - cursor.x;
                     target.position.y = targetOnDown.position.y + e.pageY - cursor.y;
                     break;

      case 'rotate': target.rotation.x = targetOnDown.rotation.x - (e.pageY - cursor.y) * 0.3;
                     target.rotation.y = targetOnDown.rotation.y + (e.pageX - cursor.x) * 0.3;
                     break;

      case 'zoom':   target.zoom = targetOnDown.zoom - (e.pageY - cursor.y) * 0.4;
                     if (target.zoom < 50) target.zoom = 50;
                     break;
    }
  }
};
article.onmouseup = function(e) {
  click = false;
  if (article.className == 'pan')
    article.style.cursor = '';
  if (e.which == 2) returnValue();
};

onkeydown = function(e) {
  if (e.altKey) article.className = 'rotate';
};
onkeyup = function(e) {
  if (e.keyCode == 18) returnValue();
};

article.addEventListener('mousewheel', scroll, false);
article.addEventListener('DOMMouseScroll', scroll, false);
function scroll(e) {
  e.preventDefault();
  var delta = (e.wheelDelta) ? e.wheelDelta : - e.detail;
  target.zoom += (delta > 0) ? 15 : -15;
  if (target.zoom < 50) target.zoom = 50;
}

function select(button) {
  [].forEach.call(buttons, function(b) { if (b != button) b.removeAttribute('class'); });
  (button.className) ? button.removeAttribute('class') : button.className = 'selected';
  switch (button.innerHTML) {
    case 'Pan': (article.className == 'pan') ? article.removeAttribute('class') : article.className = 'pan'; break;
    case 'Rotate': (article.className == 'rotate') ? article.removeAttribute('class') : article.className = 'rotate'; break;
    case 'Zoom': (article.className == 'zoom') ? article.removeAttribute('class') : article.className = 'zoom'; break;
  }
}

function returnValue() {
  for (var i = 0; i < buttons.length; i++)
    if (buttons[i].className == 'selected')
      var str = buttons[i].innerHTML.toLowerCase();
  if (str) article.className = str;
  else article.removeAttribute('class');
}

function resetViewport() {
  target.position.x = target.position.y = 0;
  target.rotation.x = -20;
  target.rotation.y = -45;
  target.zoom = 100;
}

(function animate() {
  transform.position.x += (target.position.x - transform.position.x) * 0.2;
  transform.position.y += (target.position.y - transform.position.y) * 0.2;
  transform.rotation.x += (target.rotation.x - transform.rotation.x) * 0.1;
  transform.rotation.y += (target.rotation.y - transform.rotation.y) * 0.1;
  transform.zoom += (target.zoom - transform.zoom) * 0.1;

  transform.position.x = parseFloat(transform.position.x.toFixed(2));
  transform.position.y = parseFloat(transform.position.y.toFixed(2));
  transform.rotation.x = parseFloat(transform.rotation.x.toFixed(2));
  transform.rotation.y = parseFloat(transform.rotation.y.toFixed(2));
  transform.zoom = parseFloat(transform.zoom.toFixed(2));

  perspective.style.transform =
  perspective.style.msTransform =
  perspective.style.mozTransform =
  perspective.style.webkitTransform = 'translate(' + transform.position.x + 'px, ' + transform.position.y + 'px) rotateX(' + transform.rotation.x + 'deg) rotateY(' + transform.rotation.y + 'deg) scale3d(' + transform.zoom / 100 + ', ' + transform.zoom / 100 + ', ' + transform.zoom / 100 + ')';
  requestAnimationFrame(animate);
})();

/* -------------------------------- */
/* -------- Graph Plotting -------- */
/* -------------------------------- */

/*
var graph = $('#graph')[0];

for (var x = -6; x <= 6; x++) {
  for (var y = -6; y <= 6; y++) {
    var z = Math.pow(x, 2) + Math.pow(y, 2);
    var point = document.createElement('figure');
    point.className = 'point';
    point.innerHTML = '<div class="front"></div><div class="back"></div><div class="left"></div><div class="right"></div><div class="top"></div><div class="bottom"></div>';
    point.style.transform =
    point.style.msTransform =
    point.style.mozTransform =
    point.style.webkitTransform = 'translate3d('+(x*25)+'px,'+(y*25)+'px,'+(z*3)+'px)';
    graph.appendChild(point);
  }
}
*/