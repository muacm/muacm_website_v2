var PI2 = Math.PI * 2;

function randomColor() {
  return 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
  // return 'rgba(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
}

function Particle(option) {
  option = option || {};
  this.x = option.x || 0; // 运动坐标
  this.y = option.y || 0;
  this.lifeTime = option.lifeTime || 0.95; // 生命
  this.targetX = this.x; // 初始坐标
  this.targetY = this.y;
  this.xSpeed = option.xSpeed || 0;
  this.ySpeed = option.ySpeed || 0;
  this.color = option.color || randomColor();
  this.tickMaxDistance = 100; // 最大捕捉距离
}

Particle.prototype.drawLine = function(x0, y0, x1, y1, ctx) {
    var _loc_6 = null;
    var _loc_7 = null;
    var _loc_8 = null;
    var _loc_9 = null;
    var _loc_10 = null;
    var _loc_11 = null;
    var _loc_12 = null;
    var _loc_13 = null;
    ctx.fillStyle = this.color;
    if (x0 == x1 && y0 == y1) {
      ctx.fillRect(x0, y0, 1, 1);
      return;
    }
    if (x1 >= x0) {
      _loc_8 = x1 - x0;
      _loc_10 = 1;
    } else {
      _loc_8 = x0 - x1;
      _loc_10 = -1;
    }
    if (y1 >= y0) {
      _loc_9 = y1 - y0;
      _loc_11 = 1;
    } else {
      _loc_9 = y0 - y1;
      _loc_11 = -1;
    }
    _loc_6 = x0;
    _loc_7 = y0;
    if (_loc_8 >= _loc_9) {
      _loc_9 = _loc_9 << 1;
      _loc_13 = _loc_9 - _loc_8;
      _loc_8 = _loc_8 << 1;
      while (_loc_6 != x1) {
        ctx.fillRect(_loc_6, _loc_7, 1, 1);
        if (_loc_13 >= 0) {
          _loc_7 = _loc_7 + _loc_11;
          _loc_13 = _loc_13 - _loc_8;
        }
        _loc_13 = _loc_13 + _loc_9;
        _loc_6 = _loc_6 + _loc_10;
      }
      ctx.fillRect(_loc_6, _loc_7, 1, 1);
    } else {
      _loc_8 = _loc_8 << 1;
      _loc_13 = _loc_8 - _loc_9;
      _loc_9 = _loc_9 << 1;
      while (_loc_7 != y1) {
        ctx.fillRect(_loc_6, _loc_7, 1, 1);
        if (_loc_13 >= 0) {
          _loc_6 = _loc_6 + _loc_10;
          _loc_13 = _loc_13 - _loc_9;
        }
        _loc_13 = _loc_13 + _loc_8;
        _loc_7 = _loc_7 + _loc_11;
      }
      ctx.fillRect(_loc_6, _loc_7, 1, 1);
    }
  } // end function

Particle.prototype.tick = function(tickX, tickY, ctx) {
    var targetDistanceX = this.targetX - this.x; // 运动点与目标点的x差
    var targetDistanceY = this.targetY - this.y;
    var tickDistanceX = tickX - this.x; // 运动点与扑捉点x差
    var tickDistanceY = tickY - this.y;
    var targetDistance = Math.sqrt(targetDistanceX * targetDistanceX + targetDistanceY * targetDistanceY); // 运动点与目标的的距离
    var tickDistance = Math.sqrt(tickDistanceX * tickDistanceX + tickDistanceY * tickDistanceY); // 运动点与扑捉点的距离
    if (tickDistance + Math.random() * tickDistance < this.tickMaxDistance) { //捕捉到运动点
      if (tickDistance) {
        this.lifeTime = 1;
        this.xSpeed = this.xSpeed + tickDistanceX / tickDistance;
        this.ySpeed = this.ySpeed + tickDistanceY / tickDistance;
      }
    } else if (targetDistance) {
      this.xSpeed = this.xSpeed + targetDistanceX / targetDistance;
      this.ySpeed = this.ySpeed + targetDistanceY / targetDistance;
    }
    var xx = this.x;
    var yy = this.y;
    var lifeSpeed = this.xSpeed * this.lifeTime;
    this.xSpeed = this.xSpeed * this.lifeTime;
    this.x = this.x + lifeSpeed;
    lifeSpeed = this.ySpeed * this.lifeTime;
    this.ySpeed = this.ySpeed * this.lifeTime;
    this.y = this.y + lifeSpeed;
    this.lifeTime = this.lifeTime - 0.001;
    var minDistance = Math.abs(this.xSpeed) + Math.abs(this.ySpeed) + Math.abs(targetDistanceX) + Math.abs(targetDistanceY);
    if (minDistance < 5) {
      this.lifeTime = this.lifeTime - 0.1;
      if (minDistance < 1) {
        this.x = this.targetX;
        this.y = this.targetY;
        this.xSpeed = 0;
        this.ySpeed = 0;
      }
    }
    this.lifeTime = Math.max(this.lifeTime, 0.1);
    this.drawLine(Math.round(this.x), Math.round(this.y), Math.round(xx), Math.round(yy), ctx);
  } // end function
