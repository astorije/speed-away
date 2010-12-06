var Ball = function() {
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.friction = 350;
  this.acceleration = 800;
  this.maxSpeed = 250;
  this.mass = 1;

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

      if(this.ySpeed <= 0 // Mur au-dessus
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
      else if(this.ySpeed > 0 // Mur au-dessous
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

      if(this.xSpeed <= 0 // Mur à gauche
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
      else if(this.xSpeed > 0 // Mur à droite
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

  else if(other.boundingBox == null) return false;

  else if(other instanceof Ball) {
    if(Collision.between(this.boundingBox, other.boundingBox)) {

      // Calcul de la base orthonormée (n,g)
      // n est perpendiculaire au plan de collision, g est tangent
      var nx = (other.x - this.x)/(this.radius + other.radius);
      var ny = (other.y - this.y)/(this.radius + other.radius);
      var gx = -ny;
      var gy = nx;

      // Calcul des vitesses dans cette base (avant choc)
      var tSpeedN = nx*this.xSpeed + ny*this.ySpeed;
      var tSpeedG = gx*this.xSpeed + gy*this.ySpeed;
      var oSpeedN = nx*other.xSpeed + ny*other.ySpeed;
      var oSpeedG = gx*other.xSpeed + gy*other.ySpeed;

      // Vitesse du centre d'inertie dans cette base
      // Permet de déterminer la normale de choc, utile pour les chocs indirects
      var massCenterSpeedN = (this.mass*tSpeedN + other.mass*oSpeedN) / (this.mass + other.mass);
      var massCenterSpeedG = (this.mass*tSpeedG + other.mass*oSpeedG) / (this.mass + other.mass);

      // Vitesses après choc en fonction des masses et des vitesses initiales
      var new_tSpeedN = - oSpeedN + 2*massCenterSpeedN;
      var new_tSpeedG = - oSpeedG + 2*massCenterSpeedG;
      var new_oSpeedN = - tSpeedN + 2*massCenterSpeedN;
      var new_oSpeedG = - tSpeedG + 2*massCenterSpeedG;

      // Permute les coordonnées n et conserve la vitesse tangentielle
      // Exécute la transformation inverse (base orthonormée => matrice transposée)
      this.xSpeed  = nx*new_oSpeedN + gx*new_tSpeedG;
      this.ySpeed  = ny*new_oSpeedN + gy*new_tSpeedG;
      other.xSpeed = nx*new_tSpeedN + gx*new_oSpeedG;
      other.ySpeed = ny*new_tSpeedN + gy*new_oSpeedG;

      return true;
    }
  }

  else if(other instanceof ExitItem) {
    if(Collision.between(this.boundingBox, other.boundingBox)) {
      alert("You Win!");
      other.destroyVisualGameObject();
    }
  }

  return false;
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

  var j_top = levelView.getLevelRow(this.center.y - this.radius);
  var j_bottom = levelView.getLevelRow(this.center.y + this.radius);
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