const Bird = function(x, y, ctx){
  this.x = x;
  this.y = y;
  this.ctx = ctx;
  this.velY = 0;
  this.width = 90;
  this.height = 64;
  this.ticks = 0;
  this.spriteIndex = 0;
  this.dead = false;
  this.sprites = [document.getElementById("bird1"),
      document.getElementById("bird2"),
      document.getElementById("bird3")];
  var self = this;
  window.addEventListener("keydown", function(e){
    if(e.keyCode === 32){
      self.velY = -12;
    }
  });
};
Bird.prototype.update = function(pipes){
  this.y += this.velY;
  this.velY += 1;
  if(this.detectCollisions(pipes)){
    this.dead = true;
  };
  if(this.dead) return;
  this.ticks++;
  if(this.ticks % 5 === 0) this.spriteIndex = (this.spriteIndex+1) % this.sprites.length;
};

Bird.prototype.render = function(){
  let renderX = - this.width/2;
  let renderY = - this.height/2;
  this.ctx.save();
  this.ctx.translate(this.x, this.y);
  let angle = this.velY/32;
  this.ctx.rotate(angle);
  this.ctx.drawImage(this.sprites[this.spriteIndex], renderX, renderY);

  this.ctx.restore();
};

Bird.prototype.detectCollisions = function(pipes){
  let collisionDetected = false;
  for(var i = 0; i < pipes.length; i++){
    let e = pipes[i];
    let highPipe = e.ypos <= 0;
    let x0 = e.xpos, x1 = e.xpos + e.width;
    let a2 = this.x +44;
    let b2 = this.y;
    if(highPipe){
      let y0 = e.ypos + e.length;
      let a = this.x;
      let b = this.y - this.height/2;
      if (a > x0 && a < x1 && b < y0 ||
          a2 > x0 && a2 < x1 && b2 < y0){
        return true;
      }
    }
    else {
      let y2 = e.ypos;
      let a = this.x;
      let b = this.y + this.height/2;
      if(a > x0 && a < x1 && b > y2 ||
          a2 > x0 && a2 < x1 && b2 > y2){
        return true;
      }
    }
  };
  return false;
}
