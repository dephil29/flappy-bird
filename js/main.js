
window.onload = function() {
  const c = document.getElementById("canvas");
  c.width = window.innerWidth;
  c.height = 600;

  const ctx = c.getContext("2d");

  const environment = new Environment(c, ctx);
  const bird = new Bird(100, 250, ctx);
  gameLoop();

ctx.fillStyle = "#FFFFFF";

function gameLoop(){
  ctx.fillRect(0, 0, c.width, c.height);
  environment.update();
  environment.render();
  bird.update();
  bird.render();
  window.requestAnimationFrame(gameLoop);
}
};
