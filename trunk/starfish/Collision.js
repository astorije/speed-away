var Collision = function() {}

Collision.between = function(obj1, obj2) {
  if(obj1 == null || obj2 == null) return false;

  if(obj1 instanceof Segment
  && obj2 instanceof Circle)
    return Collision.circleSegment(obj2, obj1);

  if(obj2 instanceof Segment
  && obj1 instanceof Circle)
    return Collision.circleSegment(obj1, obj2);

  if(obj1 instanceof AARectangle
  && obj2 instanceof Circle)
    return Collision.circleAARectangle(obj2, obj1);

  if(obj2 instanceof AARectangle
  && obj1 instanceof Circle)
    return Collision.circleAARectangle(obj1, obj2);

  if(obj1 instanceof Circle
  && obj2 instanceof Circle)
    return Collision.circleCircle(obj1, obj2);

  if(obj1 instanceof Point
  && obj2 instanceof Circle)
    return Collision.circlePoint(obj2, obj1);

  if(obj2 instanceof Point
  && obj1 instanceof Circle)
    return Collision.circlePoint(obj1, obj2);

  throw 'Unknown collision between two types.';
}

Collision.circleLine = function(circle, line) {
  var acx = circle.center.x - line.a.x;
  var acy = circle.center.y - line.a.y;

  var numerateur = line.x*acy - line.y*acx;   // norme du vecteur v

  if (numerateur < 0)
    numerateur = -numerateur ;   // valeur absolue ; si c'est négatif, on prend l'opposé.

  var denominateur = Math.sqrt(line.x*line.x + line.y*line.y);  // norme de u

  if (numerateur / denominateur < circle.radius)
    return true;
  else
    return false;
}

Collision.DroiteSeg = function(ab, op) {
  var abx = ab.b.x - ab.a.x;
  var aby = ab.b.y - ab.a.y;
  var apx = op.b.x - ab.a.x;
  var apy = op.b.y - ab.a.y;
  var aox = op.a.x - ab.a.x;
  var aoy = op.a.y - ab.a.y;

  if ((abx*apy - aby*apx)*(abx*aoy - aby*aox) < 0)
    return true;
  else
    return false;
}

Collision.SegSeg = function (ab, op) {
  if (!Collision.DroiteSeg(ab, op))
     return false;  // inutile d'aller plus loin si le segment [OP] ne touche pas la droite (AB)
  if (!Collision.DroiteSeg(op, ab))
     return false;

  return true;
}

Collision.circleAARectangle = function(circle, rect) {
  if((rect.topLeft.x <= circle.center.x && circle.center.x <= rect.bottomRight.x
    && rect.topLeft.y <= circle.center.y && circle.center.y <= rect.bottomRight.y)
  || Collision.between(circle, rect.topBorder)
  || Collision.between(circle, rect.leftBorder)
  || Collision.between(circle, rect.bottomBorder)
  || Collision.between(circle, rect.rightBorder))
    return true;
  return false;
}

Collision.circleSegment = function(circle, segment) {
  if (Collision.circleLine(circle, segment) == false)
   return false;  // si on ne touche pas la droite, on ne touchera jamais le segment

  var acx = circle.center.x - segment.a.x;
  var acy = circle.center.y - segment.a.y;
  var bcx = circle.center.x - segment.b.x;
  var bcy = circle.center.y - segment.b.y;
  var pscal1 = segment.x*acx + segment.y*acy;  // produit scalaire
  var pscal2 = - segment.x*bcx - segment.y*bcy;  // produit scalaire
  if (pscal1 >= 0 && pscal2 >= 0)
    return true; // I entre A et B, ok.
  // dernière possibilité, A ou B dans le cercle
  if (Collision.between(circle, segment.a))
    return true;
  if (Collision.between(circle, segment.b))
    return true;
  return false;
}

Collision.circlePoint = function(circle, point) {
  var square_distance =
    (circle.center.x - point.x)*(circle.center.x - point.x)
    +
    (circle.center.y - point.y)*(circle.center.y - point.y);
  return square_distance <= circle.radius * circle.radius;
}

Collision.getShortestIntersection = function(point, segment) {
  var apx = point.x - segment.a.x;
  var apy = point.y - segment.a.y;
  var ti = (segment.x*apx + segment.y*apy)/(segment.x*segment.x + segment.y*segment.y);

  var i = new Point().initPoint(
    segment.a.x + ti*segment.x,
    segment.a.y + ti*segment.y
  );
  if(((segment.a.x <= i.x && i.x <= segment.b.x) || (segment.b.x <= i.x && i.x <= segment.a.x))
    && ((segment.a.y <= i.y && i.y <= segment.b.y) || (segment.b.y <= i.y && i.y <= segment.a.y)))
    return i;

  var square_distance_a =
  (segment.a.x - point.x)*(segment.a.x - point.x)
  +
  (segment.a.y - point.y)*(segment.a.y - point.y);

  var square_distance_b =
  (segment.b.x - point.x)*(segment.b.x - point.x)
  +
  (segment.b.y - point.y)*(segment.b.y - point.y);

  if(square_distance_a < square_distance_b)
    return segment.a;
  else
    return segment.b;
}

Collision.circleCircle = function(circle1, circle2) {
  var square_distance =
    (circle2.center.x - circle1.center.x) * (circle2.center.x - circle1.center.x)
    +
    (circle2.center.y - circle1.center.y) * (circle2.center.y - circle1.center.y);

  return square_distance <= (circle1.radius + circle2.radius)*(circle1.radius + circle2.radius);
}