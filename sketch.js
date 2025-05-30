let player;
let energy = 0;
let score = 0;
let obstacles = [];
let speed = 3; // Velocidade dos obstáculos
let level = 1;

function setup() {
  createCanvas(400, 400);
  player = new Player();
}

function draw() {
  background(135, 206, 250); // Céu azul

  // Exibe energia, pontos e nível
  fill(0);
  textSize(16);
  text("Energia: " + energy, 10, 20);
  text("Pontos: " + score, 10, 40);
  text("Nível: " + level, 10, 60);

  player.show();
  player.move();

  // Gera obstáculos e fontes de energia a cada 60 frames
  if (frameCount % 60 === 0) {
    obstacles.push(new Obstacle());
    if (random() < 0.3) {
      obstacles.push(new EnergySource());
    }
  }

  // Atualiza obstáculos e fontes de energia
  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].show();

    // Colisão com poluentes (perde energia)
    if (obstacles[i].hits(player)) {
      if (obstacles[i] instanceof Obstacle) {
        energy -= 10;
        score -= 5;
      } else if (obstacles[i] instanceof EnergySource) {
        energy += 20;
        score += 10;
      }
      obstacles.splice(i, 1);
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
    }
  }

  // Aumenta a velocidade do jogo conforme o nível
  if (score >= level * 50) {
    level++;
    speed += 0.5; // Aumenta a velocidade dos obstáculos
  }

  // Verifica se o jogador venceu a fase (chegou no topo)
  if (player.y < 10) {
    player.resetPosition();
    score += 20;
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) player.setDir(-1);
  if (keyCode === RIGHT_ARROW) player.setDir(1);
}

function keyReleased() {
  player.setDir(0);
}

// Classe do jogador
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 30;
    this.w = 30;
    this.h = 30;
    this.dir = 0;
    this.speed = 5;
  }

  show() {
    fill(0, 255, 0); // Cor verde para o jogador
    rect(this.x, this.y, this.w, this.h);
  }

  move() {
    this.x += this.dir * this.speed;
    this.x = constrain(this.x, 0, width - this.w);
    this.y -= speed / 200; // Movimento gradual para cima (simula corrida)
  }

  setDir(dir) {
    this.dir = dir;
  }

  resetPosition() {
    this.x = width / 2;
    this.y = height - 30;
  }
}

// Classe de obstáculos (poluentes)
class Obstacle {
  constructor() {
    this.w = 40;
    this.h = 20;
    this.x = random(width - this.w);
    this.y = 0;
    this.speed = speed;
    this.color = [169, 169, 169]; // Cor cinza dos poluentes
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(...this.color);
    rect(this.x, this.y, this.w, this.h);
  }

  hits(player) {
    return !(player.x + player.w < this.x || player.x > this.x + this.w || player.y + player.h < this.y || player.y > this.y + this.h);
  }

  offscreen() {
    return this.y > height;
  }
}

// Classe de energia limpa (solar, eólica)
class EnergySource {
  constructor() {
    this.w = 30;
    this.h = 30;
    this.x = random(width - this.w);
    this.y = 0;
    this.speed = speed;
    this.color = [255, 223, 0]; // Cor amarela para energia solar
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(...this.color);
    ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h);
  }

  hits(player) {
    return !(player.x + player.w < this.x || player.x > this.x + this.w || player.y + player.h < this.y || player.y > this.y + this.h);
  }

  offscreen() {
    return this.y > height;
  }
}
