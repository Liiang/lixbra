 function Point(x, y) {
  this.x = x | 0;
  this.y = y | 0;
 }

 function Matrix() {

 }
 Matrix.prototype.setTranslate = function(translatepoint) {

 }
 Matrix.prototype.setSkew = function(skewpoint, centerpoint) {

 }
 Matrix.prototype.setRotate = function(rotation, centerpoint) {

 }
 Matrix.prototype.setScale = function(scalepoint, centerpoint) {

 }

 function Collider(point, rotation) {
  this.offset = {
   x: point.x | 0,
   y: point.y | 0
  };
  this.rotation = rotation | 0;
 }
 Collider.prototype.setOffset = function(point) {
  this.offset = {
   x: point.x | 0,
   y: point.y | 0
  };
 }
 Collider.prototype.setRotation = function(rotation) {
  this.rotation = rotation | 0;
 }
 Collider.prototype.getPosition = function() {
  return this.offset;
 }
 Collider.prototype.type = 0;
 Collider.prototype.getType = function() {
  return this.type;
 }

 function CircleCollider(point, rotation, radius) {
  Collider.call(this, point, rotation);
  this.radius = 1;

 }
 CircleCollider.prototype.type = 1;

 function PolygonCollider(point, rotation, points) {
  Collider.call(this, point, rotation);
  this.points = [];

  this._worldpoints = [];

 }
 PolygonCollider.prototype.type = 1;
 PolygonCollider.prototype.addPoint = function(point) {
  this.points.push({
   x: point.x | 0,
   y: point.y | 0
  });
 }
 PolygonCollider.prototype.setPoints = function(points) {
  if (points instanceof Array && points.length > 0) {
   this.points = [];
   let tmp = null;
   for (let i = 0; i < points.length; i++) {
    tmp = points[i];
    this.points.push({
     x: tmp.x | 0,
     y: tmp.y | 0
    });
   }
  }
 }
 PolygonCollider.prototype.getPolygon = function() {
  return this.points;
 }
 PolygonCollider.prototype.getMovePolygon = function(point, bupdate) {
  return this.points;
 }



 var Round = function() {};
 // 点是否在矩形内 
 Round.prototype.pointInPolygon = function(point, polygon) {

  var x = point.x,
   y = point.x;

  var inside = false;
  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
   var xi = polygon[i].x,
    yi = polygon[i].y;
   var xj = polygon[j].x,
    yj = polygon[j].y;

   var intersect = ((yi > y) != (yj > y)) &&
    (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
   if (intersect) inside = !inside;
  }

  return inside;
 };
 //   两线段是否相交 
 Round.prototype.lineLine = function(a1, a2, b1, b2, bIntersection) {
   var sub_a = {
    x: a2.x - a1.x,
    y: a2.y - a1.y
   };
   var sub_b = {
    x: b2.x - b1.x,
    y: b2.y - b1.y
   };


   // var u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
   var u_b = sub_a.x * sub_b.y - sub_b.x * sub_a.y;
   if (u_b !== 0) {
    //  var ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
    //  var ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
    var ua_t = sub_b.x * (a1.y - b1.y) - sub_b.y * (a1.x - b1.x);
    var ub_t = sub_a.x * (a1.y - b1.y) - sub_a.y * (a1.x - b1.x);
    var ua = ua_t / u_b;
    var ub = ub_t / u_b;

    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
     if (bIntersection) {
      var x = (sub_b.x * sub_a.x * (a1.y - b1.y) + sub_b.y * sub_a.x * b1.x - sub_a.y * sub_b.x * a1.x) / u_b;
      var y = -(sub_b.y * sub_a.y * (a1.x - b1.x) + sub_b.x * sub_a.y * b1.y - sub_a.x * sub_b.y * a1.y) / u_b;
      return {
       x: x,
       y: y
      };
     }
     else {
      return true;
     }
    }
   }
   return false;
  }
  //  计算点到直线的距离。如果这是一条线段并且垂足不在线段内，则会计算点到线段端点的距离。
 Round.prototype.pointLineDistance = function(point, start, end, isSegment) {
  var dx = end.x - start.x;
  var dy = end.y - start.y;
  var d = dx * dx + dy * dy;
  var t = ((point.x - start.x) * dx + (point.y - start.y) * dy) / d;
  var p;

  if (!isSegment) {
   p = {
    x: start.x + t * dx,
    y: start.y + t * dy
   };
  }
  else {
   if (d) {
    if (t < 0) p = start;
    else if (t > 1) p = end;
    else p = {
     x: start.x + t * dx,
     y: start.y + t * dy
    };
   }
   else {
    p = start;
   }
  }

  dx = point.x - p.x;
  dy = point.y - p.y;
  return Math.sqrt(dx * dx + dy * dy);
 }
 Round.prototype.circleCircle = function(c1, c2) {
  var distance = Math.pow();
  return distance < (c1.radius + c2.radius);
 }
 Round.prototype.circlePolygon = function(position, radius, polygon) {

  if (this.pointInPolygon(position, polygon)) {
   return true;
  }
  for (var i = 0, l = polygon.length; i < l; i++) {
   var start = i === 0 ? polygon[polygon.length - 1] : polygon[i - 1];
   var end = polygon[i];

   if (this.pointLineDistance(position, start, end, true) < radius) {
    return true;
   }
  }

  return false;

 }
 Round.prototype.linePolygon = function(a1, a2, polygon, bIntersection) {
  var length = polygon.length;
  var intpoint = {
   x: 999999999,
   y: 999999999
  };
  for (var i = 0; i < length; ++i) {
   var b1 = polygon[i];
   var b2 = polygon[(i + 1) % length];
   var ret = this.lineLine(a1, a2, b1, b2, bIntersection);

   if (bIntersection) {
    if (ret && (Math.abs(a1.x - intpoint.x) > Math.abs(a1.x - ret.x) || Math.abs(a1.y - intpoint.y) > Math.abs(a1.y - ret.y))) {
     intpoint = {
      x: ret.x,
      y: ret.y
     };

    }
   }
   else {
    if (ret) {
     return true;
    }
   }

  }
  if (bIntersection && intpoint.x < 999999999) {
   return intpoint;
  }

  return false;
 }
 Round.prototype.polygonPolygon = function(polygon1, polygon2) {
  var a = polygon1;
  var b = polygon2;
  var i, l;

  // check if a intersects b
  for (i = 0, l = a.length; i < l; ++i) {
   var a1 = a[i];
   var a2 = a[(i + 1) % l];

   if (this.linePolygon(a1, a2, b))
    return true;
  }

  // check if a contains b
  // for (i = 0, l = b.length; i < l; ++i) {
  if (this.pointInPolygon(b[0], a)) {
   return true;
  }
  // }

  // check if b contains a
  // for (i = 0, l = a.length; i < l; ++i) {
  if (this.pointInPolygon(a[0], b)) {
   return true;
  }
  //}

  return false;
 }



 // 如果  未  碰撞  返回  false  ;   如果  碰撞   返回  碰撞  临界  值 
 Round.prototype.translatePolygonPolygon = function(translatePolyon1, polygon1, translatePolyon2, polygon2) {
  var ta = translatePolyon1;
  var tb = translatePolyon2;
  var a = polygon1;
  var b = polygon2;
  var i, l;

  // check if a intersects b
  var intpoint = {
   x: 999999999,
   y: 999999999
  };
  for (i = 0, l = a.length; i < l; ++i) {
   var a1 = a[i];
   var a2 = ta[i];
   var ret = this.linePolygon(a1, a2, b, true);

   if (ret) {
    var offset = {
     x: ret.x - b1.x,
     y: ret.y - b1.y
    }
    if (Math.abs(intpoint.x) > Math.abs(offset.x) || Math.abs(intpoint.y) > Math.abs(offset.y))
     intpoint = offset;

   }
  }
  for (i = 0, l = b.length; i < l; ++i) {
   var b1 = b[i];
   var b2 = tb[i];
   var ret = this.linePolygon(b1, b2, a, true);
   var offset = {
    x: ret.x - b1.x,
    y: ret.y - b1.y
   }
   if (ret && (Math.abs(intpoint.x) > Math.abs(offset.x) || Math.abs(intpoint.y) > Math.abs(offset.y))) {
    intpoint = offset;
   }
  }

  if (intpoint.x < 999999999) {
   return intpoint;
  }





  return false;
 }
 Round.prototype.translateCirclePolygon = function(translatePosition, position, radius, translatePolyon) {

 }
 Round.prototype.translatePolygonCircle = function(translatePolyon, position, radius) {

 }
 Round.prototype.translateCircleCircle = function(translatePosition, position, radius, position2, radius2) {

 }