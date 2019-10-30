
setTimeout(function(){
(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  })();
  
  var canvas = document.getElementById("smoke"),
      ctx = canvas.getContext("2d"),
      settings = {
        color: {
          r: 255,
          g: 255,
          b: 255
        }
      },
      loading = true;
  
  
  var parts = [],
      minSpawnTime = 50,
      lastTime = new Date().getTime(),
      maxLifeTime = 2000,

      emitterX = 100
      emitterY = 100,
      // oh so dirty way of adding a 2nd emitter..
      emitter2X = -100,
      emitter2Y = -100,
      smokeImage = new Image(),
      skullImage = new Image();
  
  function spawn() {
    if (new Date().getTime() > lastTime + minSpawnTime) {
      lastTime = new Date().getTime();
      parts.push(new smoke(emitterX, emitterY));
      parts.push(new smoke(emitter2X, emitter2Y));
    }
  }
  
  function render() {
    if(loading){
      load();
      return false;
    }
    
    var len = parts.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    while (len--) {
      if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
        parts.splice(len, 1);
      } else {
        parts[len].update();
        
        ctx.save();
        var offsetX = -parts[len].size / 2,
            offsetY = -parts[len].size / 2;
        
        ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
        ctx.rotate(parts[len].angle / 180 * Math.PI);
        ctx.globalAlpha = parts[len].alpha;
        ctx.drawImage(parts[len].image, offsetX, offsetY, parts[len].size, parts[len].size);
        ctx.restore();
      }
    }
    spawn();
    requestAnimationFrame(render);
  }
  
  function smoke(x, y, index) {
    this.image = smokeImage;
    this.angle = Math.random() * 359;
    this.startAlpha = 1;
    

    this.x = x;
    this.y = y;
    
    this.size = 1;
    this.startSize = 50 + Math.random()*10;
    this.endSize = 70 + Math.random()*10;;
    
    
    this.startLife = new Date().getTime();
    this.lifeTime = 0;
    
    this.velY = -1;
    this.velX = -2 + (Math.random()*4);
  }
  
  smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.angle += 0.2;
    
    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);
    
    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);
    
    this.alpha = this.startAlpha - (lifePerc * .01);
    this.alpha = Math.max(this.alpha, 0);
    
    this.x += this.velX;
    this.y += this.velY;
  }
  
  skullImage.src = "https://i.imgur.com/kvduFUw.png";
  smokeImage.src = "https://i.imgur.com/jzdSkZd.png";
  smokeImage.onload = function(){
    loading = false;  
  }
  
  function load(){
    if(loading){
      setTimeout(load, 100); 
    }else{
      render(); 
    }
  }
  

  setTimeout(function(){
    canvas.height = 600;
    canvas.width = window.innerWidth;
    render();
  },100);
  
},300)