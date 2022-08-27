const PLAYER_DIAMETER = 20;
const ENEMY_DIAMETER = 20;

let player;
let enemies = [];
let frame = 0;

function setup() {
  createCanvas(400, 400);
  noStroke()
  player = {
    x: 400 / 2,
    y: 300,
    playerSpeed: 2,
  };
  enemies = [];
}

function draw() {
  frame += 1;
  if (frame % 7 == 0)
    enemies.push({
      x: random(400),
      y: 0 - ENEMY_DIAMETER / 2,
      dy: random(1, 2),
    });

  // UPDATE
  if (keyIsDown(LEFT_ARROW)) player.x -= player.playerSpeed;
  if (keyIsDown(RIGHT_ARROW)) player.x += player.playerSpeed;
  if (keyIsDown(UP_ARROW)) player.y -= player.playerSpeed;
  if (keyIsDown(DOWN_ARROW)) player.y += player.playerSpeed;
  player.x = min(max(player.x, PLAYER_DIAMETER/2), 400-PLAYER_DIAMETER/2)
  player.y = min(max(player.y, PLAYER_DIAMETER/2), 400-PLAYER_DIAMETER/2)

  enemies = enemies.filter((enemy) => enemy.y < 400 + ENEMY_DIAMETER / 2);
  enemies.forEach((enemy) => {
    enemy.y += enemy.dy;
    let distance = sqrt((player.x - enemy.x) ** 2 + (player.y - enemy.y) ** 2);
    if (distance < PLAYER_DIAMETER / 2 + ENEMY_DIAMETER / 2) setup();
  });

  // DRAW
  background("black");
  fill("lightblue");
  circle(player.x, player.y, PLAYER_DIAMETER);
  fill("pink");
  enemies.forEach((enemy) => circle(enemy.x, enemy.y, ENEMY_DIAMETER));
}
