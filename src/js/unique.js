var animeObjArr = [];
var lastTimeRender = +new Date();

var animeObj = function(x, y) {
  this.t = 0;
  this.x = x;
  this.y = y;
};

animeObj.prototype.move = function() {
  this.t += frameTime / 1000;
};

animeObj.prototype.render = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 10, 0, Math.PI / 180, true);
  ctx.fill();
  ctx.closePath();
};

animeObj.prototype.isLast = function() {
  if (this.t > 1) {
    return true;
  } else {
    return false;
  }
};

var render = function() {
  ctx.clearRect(0, 0, width, height);

  for (var i = 0; i < animeObjArr.length; i++) {
    animeObjArr[i].move();
    animeObjArr[i].render();
    if (animeObjArr[i].isLast()) {
      animeObjArr.splice(i,1);
    }
  }
};

var renderloop = function() {
  var now = +new Date();
  requestAnimationFrame(renderloop);

  if (now - lastTimeRender < frameTime) {
    return;
  }
  render();
  lastTimeRender = +new Date();
};
renderloop();

// document.addEventListener('click', function(event) {
//   event.preventDefault();
//   var x = event.x * 2;
//   var y = event.y * 2;
//   animeObjArr.push(new animeObj(x, y));
// }, false);

document.addEventListener('mousemove', function(event) {
  event.preventDefault();
  var x = event.x * 2;
  var y = event.y * 2;
  animeObjArr.push(new animeObj(x, y));
}, false);

// document.addEventListener('touchstart', function(event) {
//   event.preventDefault();
//   var x = event.touches[0].pageX * 2;
//   var y = event.touches[0].pageY * 2;
//   animeObjArr.push(new animeObj(x, y));
// }, false);

// document.addEventListener('touchmove', function(event) {
  // event.preventDefault();
//   var x = event.touches[0].pageX * 2;
//   var y = event.touches[0].pageY * 2;
//   animeObjArr.push(new animeObj(x, y));
// }, false);