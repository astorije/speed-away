var Ball = function() {
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.friction = 350;
  this.acceleration = 800;
  this.maxSpeed = 250;

  this.left = false;
  this.right = false;
  this.up = false;
  this.down = false;

  this.upKey = null;
  this.downKey = null;
  this.leftKey = null;
  this.rightKey = null;

  this.center = null;
  this.boundingBox = null;
  this.radius = 12;

  this.collidingObjects = new Array();
}

Ball.prototype = new VisualGameObject();

Ball.prototype.initBall = function(x, y, z, image, upKey, downKey, leftKey, rightKey) {
  this.initVisualGameObject(x, y, z, image);
  this.upKey = upKey;
  this.downKey = downKey;
  this.leftKey = leftKey;
  this.rightKey = rightKey;

  this.center = new Point();
  this.boundingBox = new Circle();
  this.boundingBox.radius = this.radius;
  this.updateCenter();

  return this;
}

Ball.prototype.keyDown = function(event) {
  if(event.keyCode == this.leftKey) {
    this.left = true;
    event.preventDefault();
  }
  if(event.keyCode == this.rightKey) {
    this.right = true;
    event.preventDefault();
  }
  if(event.keyCode == this.upKey) {
    this.up = true;
    event.preventDefault();
  }
  if(event.keyCode == this.downKey) {
    this.down = true;
    event.preventDefault();
  }
}

Ball.prototype.keyUp = function(event) {
  if(event.keyCode == this.leftKey)
    this.left = false;
  if(event.keyCode == this.rightKey)
    this.right = false;
  if(event.keyCode == this.upKey)
    this.up = false;
  if(event.keyCode == this.downKey)
    this.down = false;
}

Ball.prototype.update = function (dt, context, xScroll, yScroll) {
  //this.ySpeed = Math.min(this.ySpeed + 10, this.maxSpeed); // Gravité foireuse
//dt = 0.025;
  var X = this.x;
  var Y = this.y;

  // Calcul de la position
  this.x = this.x + this.xSpeed*dt;
  this.y = this.y + this.ySpeed*dt;


  this.updateCenter();


  //if(this.xSpeed != 0 || this.ySpeed != 0)
    for(var i=0; i<this.collidingObjects.length; i++)
      if(this.intersects(this.collidingObjects[i])) {
        this.x = X;
        this.y = Y;
        this.updateCenter();
    }

  // Action des forces de frottements sur la vitesse
  if(this.xSpeed > 0)
    this.xSpeed = Math.max(0, this.xSpeed - dt*this.friction*Math.cos(this.ySpeed/this.xSpeed));
  else if(this.xSpeed < 0)
    this.xSpeed = Math.min(0, this.xSpeed + dt*this.friction*Math.cos(this.ySpeed/this.xSpeed));
  if(this.ySpeed > 0)
    this.ySpeed = Math.max(0, this.ySpeed - dt*this.friction*Math.cos(this.xSpeed/this.ySpeed));
  else if(this.ySpeed < 0)
    this.ySpeed = Math.min(0, this.ySpeed + dt*this.friction*Math.cos(this.xSpeed/this.ySpeed));

  // Calcul de la vitesse
  if(this.left)
    this.xSpeed = Math.max(this.xSpeed - dt*this.acceleration, - this.maxSpeed);
  if(this.right)
    this.xSpeed = Math.min(this.xSpeed + dt*this.acceleration, this.maxSpeed);
  if (this.up)
    this.ySpeed = Math.max(this.ySpeed - dt*this.acceleration, - this.maxSpeed);
  if (this.down)
    this.ySpeed = Math.min(this.ySpeed + dt*this.acceleration, this.maxSpeed);

/*  if (this.x > context.canvas.width - this.image.width) {
    this.x = context.canvas.width - this.image.width;
    this.xSpeed *= -1;
  }
  if (this.x < 0) {
    this.x = 0;
    this.xSpeed *= -1;
  }
  if (this.y > context.canvas.height - this.image.height) {
    this.y = context.canvas.height - this.image.height;
    this.ySpeed *= -1;
  }
  if (this.y < 0) {
    this.y = 0;
    this.ySpeed *= -1;
  }
*/
}

Ball.prototype.updateCenter = function() {
  this.center.x = this.x + this.image.width / 2;
  this.center.y = this.y + this.image.height / 2;
  this.updateBoundingBox();
}
Ball.prototype.updateBoundingBox = function() {
  this.boundingBox.center = this.center;
}

Ball.prototype.intersects = function(other) {
  if(other instanceof LevelView) {
    var i, j, casesUnder = this.getCasesUnder(other);
    for(var k=0; k<casesUnder.length; k++) {
      i = casesUnder[k][0];
      j = casesUnder[k][1];

      if(this.ySpeed <= 0 && other.level.hasTopWall(i, j) // Mur au-dessus
      && Collision.between(
        other.getTopWall(i, j).boundingBox.bottomBorder,
        this.boundingBox
      )) {
 /*       do {
          this.y++;
          this.updateCenter();
        } while(Collision.between(
          other.getTopWall(i, j).boundingBox.bottomBorder,
          this.boundingBox
        ));
  */      this.bounceAroundNormal(
          new Segment().initSegment(
            Collision.getShortestIntersection(
              this.center,
              other.getTopWall(i, j).boundingBox.bottomBorder
            ),
            this.center
        ));
        return true;
      }
      else if(this.ySpeed > 0 && other.level.hasBottomWall(i, j) // Mur au-dessous
      && Collision.between(
        other.getBottomWall(i, j).boundingBox.topBorder,
        this.boundingBox
      )) {
 /*       do {
          this.y--;
          this.updateCenter();
        } while(Collision.between(
          other.getBottomWall(i, j).boundingBox.topBorder,
          this.boundingBox
        ));
 */       this.bounceAroundNormal(
          new Segment().initSegment(
            Collision.getShortestIntersection(
              this.center,
              other.getBottomWall(i, j).boundingBox.topBorder
            ),
            this.center
        ));
        return true;
      }

      if(this.xSpeed <= 0 && other.level.hasLeftWall(i, j) // Mur à gauche
      && Collision.between(
        other.getLeftWall(i, j).boundingBox.rightBorder,
        this.boundingBox
      )) {
 /*       do {
          this.x++;
          this.updateCenter();
        } while(Collision.between(
          other.getLeftWall(i, j).boundingBox.rightBorder,
          this.boundingBox
        ));
  */      this.bounceAroundNormal(
          new Segment().initSegment(
            Collision.getShortestIntersection(
              this.center,
              other.getLeftWall(i, j).boundingBox.rightBorder
            ),
            this.center
        ));
        return true;
      }
      else if(this.xSpeed > 0 && other.level.hasRightWall(i, j) // Mur à droite
      && Collision.between(
        other.getRightWall(i, j).boundingBox.leftBorder,
        this.boundingBox
      )) {
  /*      do {
          this.x--;
          this.updateCenter();
        } while(Collision.between(
          other.getRightWall(i, j).boundingBox.leftBorder,
          this.boundingBox
        ));
   */     this.bounceAroundNormal(
          new Segment().initSegment(
            Collision.getShortestIntersection(
              this.center,
              other.getRightWall(i, j).boundingBox.leftBorder
            ),
            this.center
        ));
        return true;
      }
    }
  }

  else if(other instanceof Ball) {
    if(Collision.between(this.boundingBox, other.boundingBox)) {

  // Calcul de la base orthonormée (n,g)
  // n est perpendiculaire au plan de collision, g est tangent
  nx = (other.x - this.x)/(this.radius + other.radius);
  ny = (other.y - this.y)/(this.radius + other.radius);
  gx = -ny;
  gy = nx;

  vix = (this.mass*this.xSpeed + other.mass*other.xSpeed) / (this.mass + other.mass);
  viy = (this.mass*this.ySpeed + other.mass*other.ySpeed) / (this.mass + other.mass);

  // Calcul des vitesses dans cette base
  v1n = nx*this.xSpeed + ny*this.ySpeed;
  v1g = gx*this.xSpeed + gy*this.ySpeed;
  v2n = nx*other.xSpeed + ny*other.ySpeed;
  v2g = gx*other.xSpeed + gy*other.ySpeed;

  vin = (this.mass*v1n + other.mass*v2n) / (this.mass + other.mass);
  vig = (this.mass*v1g + other.mass*v2g) / (this.mass + other.mass);

  v1nf = - v1n + 2*vin;
  v1gf = - v1g + 2*vig;
  v2nf = - v2n + 2*vin;
  v2gf = - v2g + 2*vig;

  // Permute les coordonnées n et conserve la vitesse tangentielle
  // Exécute la transformation inverse (base orthonormée => matrice transposée)
  //this.xSpeed = nx*(-v1n+2*vin) + gx*(-v2g+2*vig);
  //this.ySpeed = ny*(-v1n+2*vin) +  gy*(-v2g+2*vig);
  //other.xSpeed = nx*(-v2n+2*vin) +  gx*(-v1g+2*vig);
  //other.ySpeed = ny*(-v2n+2*vin) +  gy*(-v1g+2*vig);

  this.xSpeed = nx*v1nf + gx*v2gf;
  this.ySpeed = ny*v1nf + gy*v2gf;
  other.xSpeed = nx*v2nf + gx*v1gf;
  other.ySpeed = ny*v2nf + gy*v1gf;

      return true;
    }
  }

  return false;
}

Ball.prototype.canCollideWith = function(object) {
  if(object != this && !this.collidingObjects.contains(object))
    this.collidingObjects.push(object);
}

Ball.prototype.getCasesUnder = function(levelView) {
  var cases = new Array();

  var i_center = levelView.getLevelColumn(this.center.x);
  var j_center = levelView.getLevelRow(this.center.y);
  cases.push([i_center, j_center]);

  var i_left = levelView.getLevelColumn(this.center.x - this.radius);
  var i_right = levelView.getLevelColumn(this.center.x + this.radius);
  if(i_left >= 0 && i_left != i_center) cases.push([i_left, j_center]);
  else if(i_right != i_center) cases.push([i_right, j_center]);

  var j_top = levelView.getLevelColumn(this.center.y - this.radius);
  var j_bottom = levelView.getLevelColumn(this.center.y + this.radius);
  if(j_top >= 0 && j_top != j_center) cases.push([i_center, j_top]);
  else if(j_bottom != j_center) cases.push([i_center, j_bottom]);

  if(i_left != i_center) {
    if(j_top != j_center) cases.push([i_left, j_top]);
    else if(j_bottom != j_center) cases.push([i_left, j_bottom]);
  }
  else if(i_right != i_center) {
    if(j_top != j_center) cases.push([i_right, j_top]);
    else if(j_bottom != j_center) cases.push([i_right, j_bottom]);
  }

  return cases;
}

Ball.prototype.bounceAroundNormal = function(normal) {
  var norme = Math.sqrt(normal.x*normal.x + normal.y*normal.y);
  normal.x /= norme;
  normal.y /= norme;

  var pscal = this.xSpeed*normal.x + this.ySpeed*normal.y;
  this.xSpeed = this.xSpeed - 2*pscal*normal.x;
  this.ySpeed = this.ySpeed - 2*pscal*normal.y;
}