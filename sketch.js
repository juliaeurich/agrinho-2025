let trator;
let milhos = [];
let pontos = 0;
let tempo = 30; // segundos
let jogoAcabou = false;
let inicio;
let vovoImg; // imagem do vovô (como emoji ou sprite opcional)

function setup() {
  createCanvas(600, 400);
  trator = createVector(width / 2, height / 2);
  for (let i = 0; i < 10; i++) {
    milhos.push(createVector(random(width), random(height)));
  }
  inicio = millis();
}

function draw() {
  background(150, 200, 100);

  if (!jogoAcabou) {
    // Atualiza o tempo
    let tempoRestante = tempo - int((millis() - inicio) / 1000);
    if (tempoRestante <= 0) {
      jogoAcabou = true;
    }

    // Mostra trator
    textSize(30);
    text("🚜", trator.x, trator.y);

    // Mostra milhos
    for (let i = 0; i < milhos.length; i++) {
      textSize(25);
      text("🌽", milhos[i].x, milhos[i].y);
    }

    // Detecta colisão com milhos
    for (let i = milhos.length - 1; i >= 0; i--) {
      if (dist(trator.x, trator.y, milhos[i].x, milhos[i].y) < 30) {
        milhos.splice(i, 1);
        pontos++;
        milhos.push(createVector(random(width), random(height)));
      }
    }

    // Texto de pontos e tempo
    fill(0);
    textSize(16);
    text("Milhos colhidos: " + pontos, 10, 20);
    text("Tempo restante: " + tempoRestante + "s", 10, 40);

  } else {
    // Tela de banquete final com vovô
    background(255, 245, 200);
    textSize(30);
    textAlign(CENTER);
    text("🎉 Banquete Rural 🎉", width / 2, 50);

    let banquete = "🍞🥛";
    if (pontos >= 5) banquete += "🧀🍯";
    if (pontos >= 10) banquete += "🍗🥚🌽";

    textSize(40);
    text(banquete, width / 2, height / 2);

    textSize(18);
    text("Você colheu " + pontos + " milhos!", width / 2, height / 2 + 60);

    // 👴 Vovô falando
    textSize(25);
    text("👴", width / 2 - 150, height / 2 + 50);
    textSize(16);
    text('"Muito bem, meu netinho!\nCom esforço vem a fartura!"', width / 2 + 60, height / 2 + 100);
  }
}

function keyPressed() {
  let velocidade = 30;
  if (keyCode === LEFT_ARROW) trator.x -= velocidade;
  if (keyCode === RIGHT_ARROW) trator.x += velocidade;
  if (keyCode === UP_ARROW) trator.y -= velocidade;
  if (keyCode === DOWN_ARROW) trator.y += velocidade;
}
